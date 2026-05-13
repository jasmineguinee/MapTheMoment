import { v4 } from "uuid";

let ratings = [];

export const ratingMemStore = {
  async getAllRatings() {
    return ratings;
  },

  // function to get public ratings only

 async getPublicRatings(){
    await db.read();

    let publicRatings = db.data.ratings.filter((rating) => rating.visability === "public");
    if (!publicRatings) {
      publicRatings = null;
    }
    return publicRatings;
  },

 


  async addRating(venueId, rating) {
    rating._id = v4();
    rating.venueid = venueId;
    ratings.push(rating);
    return rating;
  },

  async getRatingsByVenueId(id) {
    return ratings.filter((rating) => rating.venueid === id);
  },

  async getRatingById(id) {
    let foundRating = ratings.find((rating) => rating._id === id);
    if (!foundRating) {
      foundRating = null;
    }
    return foundRating;
  },

  async getVenueRatings(venueId) {
    let foundRatings = ratings.filter((rating) => rating.venueid === venueId);
    if (!foundRatings) {
      foundRatings = null;
    }
    return foundRatings;
  },

  async deleteRating(id) {
    const index = ratings.findIndex((rating) => rating._id === id);
    if (index !== -1) ratings.splice(index, 1);
  },


  async deleteAllRatings() {
    ratings = [];
  },

  async updateRating(rating, updatedRating) {
    rating.number = updatedRating.number;
   
  },
};
