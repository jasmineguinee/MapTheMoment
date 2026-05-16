import dayjs from "dayjs";
import { db } from "../models/db.js";
import { AreaSpec, ReviewSpec, PostSpec } from "../models/joi-schemas.js";
import { cleanHtml, cleanString } from "../utils/sanitisation.js";

export const noticeController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const areas = await db.areaStore.getUserAreas(loggedInUser._id);
      const pubWeddingVenues = await db.venueStore.getPublicWeddingVenues();
      const pubProposalSpots = await db.venueStore.getPublicProposalSpots();
      const pubWeddingVenueStrings = JSON.stringify(pubWeddingVenues);
      const pubProposalSpotsStrings = JSON.stringify(pubProposalSpots);
      const posts = await db.postStore.getAllPosts();
      posts.reverse();
   

      await Promise.all(
        areas.map(async (area) => {
          area.venues = await db.venueStore.getVenuesByAreaId(area._id);
        })
        );

        await Promise.all(
         posts.map(async (post) => {
          if (post.venueid){
          post.venue = await db.venueStore.getVenueById(post.venueid.toString());
          
         const venuestring = JSON.stringify(post.venue);
          }
        })
      );
  

      const viewData = {
        areas:areas,
        posts:posts,
        title: "Notice Board",
        pubWeddingVenueStrings: pubWeddingVenueStrings,
        pubProposalSpotsStrings: pubProposalSpotsStrings,
      };
      return h.view("notice-view", viewData);
      
    },
  },


  publishPost: {
     validate: {
      payload: PostSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("notice-view", { title: "Add Post Error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
    const loggedInUser = request.auth.credentials;
    const poster = loggedInUser.firstName.concat(" ", loggedInUser.lastName);
    const venueId =  request.payload.venueid || null;
    const time = dayjs().format("D/M/YY HH:mm");

      const newPost = {
        time:time,
        userid: loggedInUser._id,
        body: request.payload.body,
        venueid: venueId,
        poster: poster,
      };
      await db.postStore.addPost(newPost);
      return h.redirect("/noticeboard");
    },
  },


    
};