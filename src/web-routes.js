import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { occasionController } from "./controllers/occasion-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },
  { method: "GET", path: "/about", config: aboutController.index },
  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addoccasion", config: dashboardController.addOccasion },
  { method: "GET", path: "/occasion/{id}", config: occasionController.index },
  { method: "POST", path: "/occasion/{id}/addvenue", config: occasionController.addVenue },
  { method: "GET", path: "/dashboard/deleteoccasion/{id}", config: dashboardController.deleteOccasion },
  { method: "GET", path: "/occasion/{id}/deletevenue/{venueid}", config: occasionController.deleteVenue },
  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } }

];
