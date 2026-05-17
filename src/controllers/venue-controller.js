import dayjs from "dayjs";
import { VenueSpec, ReviewSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";
import { cleanHtml, cleanString} from "../utils/sanitisation.js";

export const venueController = {
  index: {
    handler: async function (request, h) {

      const area = await db.areaStore.getAreaById(request.params.id);
      const venues = await db.venueStore.getVenuesByAreaId(request.params.id);
      const venue = await db.venueStore.getVenueById(request.params.venueid);
      const weddingVenues = await db.venueStore.getAreaWeddingVenues(request.params.id);
      const proposalVenues = await db.venueStore.getAreaProposalVenues(request.params.id);
      const weddingVenuesStrings = JSON.stringify(weddingVenues);
      const proposalVenueStrings = JSON.stringify(proposalVenues);
      const reviews = await db.reviewStore.getReviewsByVenueId(request.params.venueid);
      const ratings = await db.ratingStore.getRatingsByVenueId(request.params.venueid);

      

      const viewData = {
        title: "Add the title",
        reviews: reviews,
        ratings:ratings,
        area: area,
        venue: venue,
        venuestring: JSON.stringify(venue),
        weddingVenuesStrings: weddingVenuesStrings,
        proposalVenueStrings: proposalVenueStrings,
      };
      return h.view("venue-view", viewData);
  },
  
},

 
  update: {
    validate: {
      payload: VenueSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("venue-view", { title: "Edit venue error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const venue = await db.venueStore.getVenueById(request.params.venueid);
      const poster = loggedInUser.firstName.concat(" ", loggedInUser.lastName);
      const newVenue = {
        title: cleanString(request.payload.title),
        venuetype: cleanString(request.payload.venuetype),
        description:cleanHtml(request.payload.description),
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
        visability: cleanString(request.payload.visability),
        img:venue.img,
        poster: poster,
    
      };
      await db.venueStore.updateVenue(venue, newVenue);
      return h.redirect(`/area/${request.params.id}`);
    },
  },

uploadImage: {
    handler: async function (request, h) {
    try {

        const venue = await db.venueStore.getVenueById(request.params.venueid);
        const loggedInUser = request.auth.credentials;
        const poster = loggedInUser.firstName.concat(" ", loggedInUser.lastName);
        const file = request.payload.imagefile;

        if (Object.keys(file).length > 0) {
          const url =  await imageStore.uploadImage(request.payload.imagefile);
         
        const updatedVenue = {
          title: venue.title,
          venuetype: venue.venuetype,
          description: venue.description,
          latitude: venue.latitude,
          longitude: venue.longitude,
          visability: venue.visability,
          poster: poster,
          img: url,
        };

        await db.venueStore.updateVenue(venue, updatedVenue);
      }
  
      return h.redirect(`/venue/${request.params.id}/editvenue/${request.params.venueid}`);
     
    
    } catch (err) {
      console.log(err);

      return h.redirect("/");
    }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },


  

};

