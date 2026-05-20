import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const ratingJsonStore = {
  async getAllRatings() {
    await db.read();
    return db.data.ratings;
  },


  async addRating(venueId, rating) {
    await db.read();
    rating._id = v4();
    rating.venueid = venueId;
    db.data.ratings.push(rating);
    await db.write();
    return rating;
  },

  async getRatingsByVenueId(id) {
    await db.read();
    let foundRatings = db.data.ratings.filter((rating) => rating.venueid === id);
    if (!foundRatings) {
      foundRatings = null;
    }
    return foundRatings;
  },


  async usersRatingForVenue(venueid, id) {
    await db.read();
    const foundRatings = db.data.ratings.filter((rating) => rating.venueid === venueid && rating.userid === id);
    if (foundRatings.length === 0) {
      return null;
    }
    return foundRatings;
    
  },



  async getRatingById(id) {
    await db.read();
    let foundRating = db.data.ratings.find((rating) => rating._id === id);
    if (!foundRating) {
      foundRating = null;
    }
    return foundRating;
  },

  // async getVenueRatings(venueId) {
  //   await db.read();
  //   let foundRatings = ratings.filter((rating) => rating.venueid === venueId);
  //   if (!foundRatings) {
  //     foundRatings = null;
  //   }
  //   return foundRatings;
  // },

 
  async getVenueRatingAvg(venueId){
     await db.read();
    let foundRatings = ratings.filter((rating) => rating.venueid === venueId);
    if (!foundRatings) {
      foundRatings = null;
    }

    const numberOfRatings = foundRatings.length;
    
   // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
    const totalsum = foundRatings.reduce(
      (accumulator, rating) => 
     accumulator + rating.number,
   0);

   if (totalsum === 0) {
    return 0;
   }

   return totalsum / numberOfRatings;
  
  },


  async deleteRating(id) {
    await db.read();
    const index = db.data.ratings.findIndex((rating) => rating._id === id);
    if (index !== -1) db.data.ratings.splice(index, 1);
    await db.write();
  },

  async deleteAllRatings() {
    db.data.ratings = [];
    await db.write();
  },

  async updateRating(venue, updatedRating) {
    rating.number = updatedRating.number;
    rating.userid = updatedRating.userid;
    await db.write();
  },
};
