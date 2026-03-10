import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const mapthemomentService = {
  mapthemomentUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.mapthemomentUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.mapthemomentUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.mapthemomentUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.mapthemomentUrl}/api/users`);
    return res.data;
  },

   async createOccasion(occasion) {
    const res = await axios.post(`${this.mapthemomentUrl}/api/occasions`, occasion);
    return res.data;
  },

  async deleteAllOccasions() {
    const response = await axios.delete(`${this.mapthemomentUrl}/api/occasions`);
    return response.data;
  },

  async deleteOccasion(id) {
    const response = await axios.delete(`${this.mapthemomentUrl}/api/occasions/${id}`);
    return response;
  },

    async getAllOccasions() {
    const res = await axios.get(`${this.mapthemomentUrl}/api/occasions`);
    return res.data;
  },

  async getOccasion(id) {
    const res = await axios.get(`${this.mapthemomentUrl}/api/occasions/${id}`);
    return res.data;
  },


    async getAllVenues() {
    const res = await axios.get(`${this.mapthemomentUrl}/api/venues`);
    return res.data;
  },

  async createVenue(id, venue) {
    const res = await axios.post(`${this.mapthemomentUrl}/api/occasions/${id}/venues`, venue);
    return res.data;
  },

  async deleteAllVenues() {
    const res = await axios.delete(`${this.mapthemomentUrl}/api/venues`);
    return res.data;
  },

  async getVenue(id) {
    const res = await axios.get(`${this.mapthemomentUrl}/api/venues/${id}`);
    return res.data;
  },

  async deleteVenue(id) {
    const res = await axios.delete(`${this.mapthemomentUrl}/api/venues/${id}`);
    return res.data;
  },

    async authenticate(user) {
    const response = await axios.post(`${this.mapthemomentUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  }

};
