import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useReadingStore = defineStore("reading", {
  state: () => ({
    readings: [],
    reading: {},
    types: [],
    fotoURL: '',
  }),
  getters: {},
  actions: {
    async create(params) {
      const { data, error } = await api.post("/readings", {
        ...params,
      });
      if (error) throw error;
      this.reading = data;
    },
     async find(params) {
      const { data, error } = await api.get(`/readings`, {params: {...params}});
      if (error) throw error;
      this.readings = data;
    },
    async findOne(id) {
      const { data, error } = await api.get(`/readings/${id}`);
      if (error) throw error;
      this.reading = data;
    },
     async getFotoURL(id) {
      const { data, error } = await api.get(`/upload/${id}`);
      if (error) throw error;
      return data;
    },
    async findTypes() {
      const { data, error } = await api.get("/readings/types");
      if (error) throw error;
      this.types = data;
    },
  },
});
