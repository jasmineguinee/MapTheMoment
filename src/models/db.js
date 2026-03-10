import { userMemStore } from "./mem/user-mem-store.js";
import { areaMemStore } from "./mem/area-mem-store.js";
import { venueMemStore } from "./mem/venue-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { areaJsonStore } from "./json/area-json-store.js";
import { venueJsonStore } from "./json/venue-json-store.js";

import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { areaMongoStore } from "./mongo/area-mongo-store.js";
import { venueMongoStore } from "./mongo/venue-mongo-store.js";

export const db = {
  userStore: null,
  areaStore: null,
  venueStore: null,

 init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.areaStore = areaJsonStore;
        this.venueStore = venueJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.areaStore = areaMongoStore;
        this.venueStore = venueMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.areaStore = areaMemStore;
        this.venueStore = venueMemStore;
    }
  },
};