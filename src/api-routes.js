import { userApi } from "./api/user-api.js";
import { occasionApi } from "./api/occasion-api.js";
import { venueApi } from "./api/venue-api.js";

export const apiRoutes = [
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
    { method: "POST", path: "/api/occasions", config: occasionApi.create },
  { method: "DELETE", path: "/api/occasions", config: occasionApi.deleteAll },
  { method: "GET", path: "/api/occasions", config: occasionApi.find },
  { method: "GET", path: "/api/occasions/{id}", config: occasionApi.findOne },
  { method: "DELETE", path: "/api/occasions/{id}", config: occasionApi.deleteOne },
   { method: "GET", path: "/api/venues", config: venueApi.find },
  { method: "GET", path: "/api/venues/{id}", config: venueApi.findOne },
  { method: "POST", path: "/api/occasions/{id}/venues", config: venueApi.create },
  { method: "DELETE", path: "/api/venues", config: venueApi.deleteAll },
  { method: "DELETE", path: "/api/venues/{id}", config: venueApi.deleteOne },
];
