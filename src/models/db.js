import { userMemStore } from "./mem/user-mem-store.js";
import { areaMemStore } from "./mem/area-mem-store.js";
import { venueMemStore } from "./mem/venue-mem-store.js";

export const db = {
  userStore: null,
  areaStore: null,
  venueStore: null,

  init() {
    this.userStore = userMemStore;
    this.areaStore = areaMemStore;
    this.venueStore = venueMemStore;
  },
};
