import { userApi } from "./api/user-api.js";
import { areaApi } from "./api/area-api.js";
import { venueApi } from "./api/venue-api.js";
import { reviewApi } from "./api/review-api.js";
import { ratingApi } from "./api/rating-api.js";
import { postApi } from "./api/post-api.js";

export const apiRoutes = [
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },


  { method: "POST", path: "/api/areas", config: areaApi.create },
  { method: "DELETE", path: "/api/areas", config: areaApi.deleteAll },
  { method: "GET", path: "/api/areas", config: areaApi.find },
  { method: "GET", path: "/api/areas/{id}", config: areaApi.findOne },
  { method: "DELETE", path: "/api/areas/{id}", config: areaApi.deleteOne },

  { method: "GET", path: "/api/venues", config: venueApi.find },
  { method: "GET", path: "/api/venues/{id}", config: venueApi.findOne },
  { method: "POST", path: "/api/areas/{id}/venues", config: venueApi.create },
  { method: "DELETE", path: "/api/venues", config: venueApi.deleteAll },
  { method: "DELETE", path: "/api/venues/{id}", config: venueApi.deleteOne },
 
  { method: "GET", path: "/api/reviews", config: reviewApi.find },
  { method: "GET", path: "/api/reviews/{id}", config: reviewApi.findOne },
  { method: "POST", path: "/api/venues/{id}/reviews", config: reviewApi.create },
  { method: "DELETE", path: "/api/reviews", config: reviewApi.deleteAll },
  { method: "DELETE", path: "/api/reviews/{id}", config: reviewApi.deleteOne },

  { method: "GET", path: "/api/ratings", config: ratingApi.find },
  { method: "GET", path: "/api/ratings/{id}", config: ratingApi.findOne },
  { method: "POST", path: "/api/venues/{id}/ratings", config: ratingApi.create },
  { method: "DELETE", path: "/api/ratings", config: ratingApi.deleteAll },
  { method: "DELETE", path: "/api/ratings/{id}", config: ratingApi.deleteOne },

  
  { method: "POST", path: "/api/posts", config: postApi.create },
  { method: "DELETE", path: "/api/posts", config: postApi.deleteAll },
  { method: "GET", path: "/api/posts", config: postApi.find },
  { method: "GET", path: "/api/posts/{id}", config: postApi.findOne },
  { method: "DELETE", path: "/api/posts/{id}", config: postApi.deleteOne },

];
