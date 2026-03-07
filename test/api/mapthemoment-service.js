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

   async createArea(area) {
    const res = await axios.post(`${this.mapthemomentUrl}/api/areas`, area);
    return res.data;
  },

  async deleteAllAreas() {
    const response = await axios.delete(`${this.mapthemomentUrl}/api/areas`);
    return response.data;
  },

  async deleteArea(id) {
    const response = await axios.delete(`${this.mapthemomentUrl}/api/areas/${id}`);
    return response;
  },

    async getAllAreas() {
    const res = await axios.get(`${this.mapthemomentUrl}/api/areas`);
    return res.data;
  },

  async getArea(id) {
    const res = await axios.get(`${this.mapthemomentUrl}/api/areas/${id}`);
    return res.data;
  },


    async getAllVenues() {
    const res = await axios.get(`${this.mapthemomentUrl}/api/venues`);
    return res.data;
  },

  async createVenue(id, venue) {
    const res = await axios.post(`${this.mapthemomentUrl}/api/areas/${id}/venues`, venue);
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
};
