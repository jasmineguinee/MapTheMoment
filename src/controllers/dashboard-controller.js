import dayjs from "dayjs";
import { db } from "../models/db.js";
import { AreaSpec, ReviewSpec, RatingSpec } from "../models/joi-schemas.js";
import { cleanHtml, cleanString } from "../utils/sanitisation.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const areas = await db.areaStore.getUserAreas(loggedInUser._id);
      const pubWeddingVenues = await db.venueStore.getPublicWeddingVenues();
      const pubProposalSpots = await db.venueStore.getPublicProposalSpots();
      const pubWeddingVenueStrings = JSON.stringify(pubWeddingVenues);
      const pubProposalSpotsStrings = JSON.stringify(pubProposalSpots);
      
      await Promise.all(
        areas.map(async (area) => {
          area.venues = await db.venueStore.getVenuesByAreaId(area._id);
        })
        );


      const viewData = {
        areas:areas,
        title: "MapTheMoment Dashboard",
        user: loggedInUser,
        pubWeddingVenueStrings: pubWeddingVenueStrings,
        pubProposalSpotsStrings: pubProposalSpotsStrings,
      };
      return h.view("dashboard-view", viewData);
      
    },
  },

  addArea: {
     validate: {
      payload: AreaSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Area error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newArea = {
        userid: loggedInUser._id,
        title: cleanString(request.payload.title),
      };
      await db.areaStore.addArea(newArea);
      return h.redirect("/dashboard");
    },
  },

    deleteArea: {
    handler: async function (request, h) {
      const area = await db.areaStore.getAreaById(request.params.id);
      await db.areaStore.deleteAreaById(area._id);
      return h.redirect("/dashboard");
    },
  },


     getVenueDetails: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const area = await db.areaStore.getAreaById(request.params.id);
      const venue = await db.venueStore.getVenueById(request.params.venueid);
      const reviews = await db.reviewStore.getReviewsByVenueId(request.params.venueid);
      const ratings = await db.ratingStore.getRatingsByVenueId(request.params.venueid);
      const myrating = await db.ratingStore.usersRatingForVenue(request.params.venueid, loggedInUser._id);
      const avgrating = await db.ratingStore.getVenueRatingAvg(request.params.venueid);  
      const roundedAvg = avgrating.toFixed(2);
      
      
      const viewData = {
        title: "Public POI View",
        area: area,
        venue: venue,
        venuestring: JSON.stringify(venue),
        reviews: reviews,
        ratings: ratings,
        avgrating:avgrating,
        roundedAvg:roundedAvg,
        myrating:myrating,
      };
   
      return h.view("dash-poi-view", viewData);
    },
  },

   addPubReview: {
      validate: {
        payload: ReviewSpec,
        options: { abortEarly: false },
        failAction: function (request, h, error) {
          return h.view("dash-poi-view", { title: "Add review error", errors: error.details }).takeover().code(400);
        },
      },
      handler: async function (request, h) {
        const loggedInUser = request.auth.credentials;
        const venue = await db.venueStore.getVenueById(request.params.venueid);
         const postedBy = loggedInUser.firstName.concat(" ", loggedInUser.lastName);
        const time = dayjs().format("D/M/YY HH:mm");
        
        const newReview = {
          content: cleanHtml(request.payload.content),
          postedBy: postedBy,
          time:time,
        };
        await db.reviewStore.addReview(venue._id, newReview);
        return h.redirect(`/dashboard/${request.params.venueid}/getvenuedetails/${request.params.venueid}`);
         
      },
    },

    addRating: {
      validate: {
        payload: RatingSpec,
        options: { abortEarly: false },
        failAction: function (request, h, error) {
          return h.view("dash-poi-view", { title: "Add review error", errors: error.details }).takeover().code(400);
        },
      },
      handler: async function (request, h) {
        const loggedInUser = request.auth.credentials;
        const venue = await db.venueStore.getVenueById(request.params.venueid);
        const postedBy = loggedInUser.firstName.concat(" ", loggedInUser.lastName);
        const newRating = {
          number: request.payload.number,
          userid: loggedInUser._id,
        };
        await db.ratingStore.addRating(venue._id, newRating);
         return h.redirect(`/dashboard/${request.params.venueid}/getvenuedetails/${request.params.venueid}`);
         
      },
    },
};