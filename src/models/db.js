import { userMemStore } from "./mem/user-mem-store.js";
import { occasionMemStore } from "./mem/occasion-mem-store.js";
import { venueMemStore } from "./mem/venue-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { occasionJsonStore } from "./json/occasion-json-store.js";
import { venueJsonStore } from "./json/venue-json-store.js";

import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { occasionMongoStore } from "./mongo/occasion-mongo-store.js";
import { venueMongoStore } from "./mongo/venue-mongo-store.js";

export const db = {
  userStore: null,
  occasionStore: null,
  venueStore: null,

 init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.occasionStore = occasionJsonStore;
        this.venueStore = venueJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.occasionStore = occasionMongoStore;
        this.venueStore = venueMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.occasionStore = occasionMemStore;
        this.venueStore = venueMemStore;
    }
  },
};