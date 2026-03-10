import { userApi } from "./api/user-api.js";
import { areaApi } from "./api/area-api.js";
import { venueApi } from "./api/venue-api.js";

export const apiRoutes = [
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

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
 

];
