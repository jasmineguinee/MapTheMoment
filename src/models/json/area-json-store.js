import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { venueJsonStore } from "./venue-json-store.js";

export const areaJsonStore = {
  async getAllareas() {
    await db.read();
    return db.data.areas;
  },

  async addArea(area) {
    await db.read();
    area._id = v4();
    db.data.areas.push(area);
    await db.write();
    return area;
  },

  async getAreaById(id) {
    await db.read();
    const list = db.data.areas.find((area) => area._id === id);
    list.venues = await venueJsonStore.getVenuesByAreaId(list._id);
    return list;
  },

  async getUserAreas(userid) {
    await db.read();
    return db.data.areas.filter((area) => area.userid === userid);
  },

  async deleteAreaById(id) {
    await db.read();
    const index = db.data.areas.findIndex((area) => area._id === id);
    db.data.areas.splice(index, 1);
    await db.write();
  },

  async deleteAllAreas() {
    db.data.areas = [];
    await db.write();
  },
};
