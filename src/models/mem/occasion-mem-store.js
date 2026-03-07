import { v4 } from "uuid";
import { venueMemStore } from "./venue-mem-store.js";

let occasions = [];

export const occasionMemStore = {
  async getAllOccasions() {
    return occasions;
  },

  async addOccasion(occasion) {
    occasion._id = v4();
    occasions.push(occasion);
    return occasion;
  },

  async getOccasionById(id) {
    const list = occasions.find((occasion) => occasion._id === id);
    list.venues = await venueMemStore.getVenuesByOccasionId(list._id);
    return list;
  },

  async deleteOccasionById(id) {
    const index = occasions.findIndex((occasion) => occasion._id === id);
    occasions.splice(index, 1);
  },

  async deleteAllOccasions() {
    occasions = [];
  },

    async getUserOccasions(userid) {
    return occasions.filter((occasion) => occasion.userid === userid);
  },

};
