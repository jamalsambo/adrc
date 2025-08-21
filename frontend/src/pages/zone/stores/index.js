import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useZoneStore = defineStore("zone", {
  state: () => ({
    zones: [],
    zone: {}
  }),
  getters: {},
  actions: {
    async create(params) {
      const { data, error } = await api.post("/locations/zones", {
        ...params,
      });
      if (error) throw error;
      this.zone = data;
    },
    async update(id, params) {
      const { data, error } = await api.patch(`//locations/zones/${id}`, { ...params });
      if (error) throw error;
      this.zone = data;
    },
    async findOne(id) {
      const { data, error } = await api.get(`/locations/zones/${id}`);
      if (error) throw error;
      this.zone = data;
    },
    async remove(id) {
      const { error } = await api.delete(`/locations/zones/${id}`);
      if (error) throw error;
    },
    async find() {
      const { data, error } = await api.get("/locations/zones");
      if (error) throw error;
      this.zones = data;
    },
  },
});
