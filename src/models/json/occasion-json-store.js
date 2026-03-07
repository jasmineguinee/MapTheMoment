import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { venueJsonStore } from "./venue-json-store.js";

export const occasionJsonStore = {
  async getAllOccasions() {
    await db.read();
    return db.data.occasions;
  },

  async addOccasion(occasion) {
    await db.read();
    occasion._id = v4();
    db.data.occasions.push(occasion);
    await db.write();
    return occasion;
  },

  async getOccasionById(id) {
    await db.read();
    let list = db.data.occasions.find((occasion) => occasion._id === id);
    if (list) {
      list.venues = await venueJsonStore.getVenuesByOccasionId(list._id);
    } else {
      list = null;
    }
    return list;
  },


  async getUserOccasions(userid) {
    await db.read();
    return db.data.occasions.filter((occasion) => occasion.userid === userid);
  },

  async deleteOccasionById(id) {
    await db.read();
    const index = db.data.occasions.findIndex((occasion) => occasion._id === id);
    if (index !== -1) db.data.occasions.splice(index, 1);
    await db.write();
  },

  async deleteAllOccasions() {
    db.data.occasions = [];
    await db.write();
  },
};
