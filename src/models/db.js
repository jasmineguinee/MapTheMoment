// import { userMemStore } from "./mem/user-mem-store.js";
// import { areaMemStore } from "./mem/area-mem-store.js";
// import { venueMemStore } from "./mem/venue-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { areaJsonStore } from "./json/area-json-store.js";
import { venueJsonStore } from "./json/venue-json-store.js";

export const db = {
  userStore: null,
  areaStore: null,
  venueStore: null,

  init() {
    this.userStore = userJsonStore;
    this.areaStore = areaJsonStore;
    this.venueStore = venueJsonStore;
  },
};
