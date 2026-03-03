import { v4 } from "uuid";
import { venueMemStore } from "./venue-mem-store.js";

let areas = [];

export const areaMemStore = {
  async getAllAreas() {
    return areas;
  },

  async addArea(area) {
    area._id = v4();
    areas.push(area);
    return area;
  },

  async getAreaById(id) {
    const list = areas.find((area) => area._id === id);
    list.venues = await venueMemStore.getVenuesByAreaId(list._id);
    return list;
  },

  async deleteAreaById(id) {
    const index = areas.findIndex((area) => area._id === id);
    areas.splice(index, 1);
  },

  async deleteAllAreas() {
    areas = [];
  },

    async getUserAreas(userid) {
    return areas.filter((area) => area.userid === userid);
  },

};
