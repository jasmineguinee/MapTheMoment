import { v4 } from "uuid";

let ratings = [];

export const ratingMemStore = {
  async getAllRatings() {
    return ratings;
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

  // async getVenueRatings(venueId) {
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
     
     return totalsum / numberOfRatings;
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
