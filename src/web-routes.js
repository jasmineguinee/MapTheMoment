import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { areaController } from "./controllers/area-controller.js";
import { venueController } from "./controllers/venue-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },
  { method: "GET", path: "/about", config: aboutController.index },
  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addarea", config: dashboardController.addArea },
  { method: "GET", path: "/area/{id}", config: areaController.index },
  { method: "POST", path: "/area/{id}/addvenue", config: areaController.addVenue },
  { method: "GET", path: "/dashboard/deletearea/{id}", config: dashboardController.deleteArea },
  { method: "GET", path: "/area/{id}/deletevenue/{venueid}", config: areaController.deleteVenue },

 { method: "GET", path: "/venue/{id}/editvenue/{venueid}", config: venueController.index },
  { method: "POST", path: "/venue/{id}/updatevenue/{venueid}", config: venueController.update },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },
  { method: "POST", path: "/venue/{id}/uploadimage/{venueid}", config: venueController.uploadImage },


];
