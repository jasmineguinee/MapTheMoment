import { userMemStore } from "./mem/user-mem-store.js";
import { areaMemStore } from "./mem/area-mem-store.js";
import { venueMemStore } from "./mem/venue-mem-store.js";
import { reviewMemStore } from "./mem/review-mem-store.js";
import { ratingMemStore } from "./mem/rating-mem-store.js";
import { postMemStore } from "./mem/post-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { areaJsonStore } from "./json/area-json-store.js";
import { venueJsonStore } from "./json/venue-json-store.js";
import { reviewJsonStore } from "./json/review-json-store.js";
import { ratingJsonStore } from "./json/rating-json-store.js";
import { postJsonStore } from "./json/post-json-store.js";

import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { areaMongoStore } from "./mongo/area-mongo-store.js";
import { venueMongoStore } from "./mongo/venue-mongo-store.js";
import { reviewMongoStore } from "./mongo/review-mongo-store.js";
import { ratingMongoStore } from "./mongo/rating-mongo-store.js";
import { postMongoStore } from "./mongo/post-mongo-store.js";



export const db = {
  userStore: null,
  areaStore: null,
  venueStore: null,
  reviewStore: null,
  ratingStore:null,
  postStore: null,

 init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.areaStore = areaJsonStore;
        this.venueStore = venueJsonStore;
        this.reviewStore = reviewJsonStore;
        this.ratingStore = ratingJsonStore;
        this.postStore = postJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.areaStore = areaMongoStore;
        this.venueStore = venueMongoStore;
        this.reviewStore = reviewMongoStore;
        this.ratingStore = ratingMongoStore;
        this.postStore = postMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.areaStore = areaMemStore;
        this.venueStore = venueMemStore;
        this.reviewStore = reviewMemStore;
        this.ratingStore = ratingMemStore;
        this.postStore = postMemStore;
    }
  },
};