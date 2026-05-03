import { userMemStore } from "./mem/user-mem-store.js";
import { areaMemStore } from "./mem/area-mem-store.js";
import { venueMemStore } from "./mem/venue-mem-store.js";
import { commentMemStore } from "./mem/comment-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { areaJsonStore } from "./json/area-json-store.js";
import { venueJsonStore } from "./json/venue-json-store.js";
import { commentJsonStore } from "./json/comment-json-store.js";

import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { areaMongoStore } from "./mongo/area-mongo-store.js";
import { venueMongoStore } from "./mongo/venue-mongo-store.js";
import { commentMongoStore } from "./mongo/comment-mongo-store.js";

export const db = {
  userStore: null,
  areaStore: null,
  venueStore: null,
  commentStore: null,

 init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.areaStore = areaJsonStore;
        this.venueStore = venueJsonStore;
        this.commentStore = commentJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.areaStore = areaMongoStore;
        this.venueStore = venueMongoStore;
        this.commentStore = commentMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.areaStore = areaMemStore;
        this.venueStore = venueMemStore;
        this.commentStore = commentMemStore;
    }
  },
};