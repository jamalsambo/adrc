import { defineStore } from 'pinia';
import { api } from "src/boot/axios";

export const useInspectionStore = defineStore('inspection', {
  state: () => ({
    inspections: [],
    inspection: {},
    types: [],
    watermeters: []
  }),
  getters: {

  },
  actions: {
    async create(params) {
      const { data, error } = await api.post("/inspections", {
        ...params,
      });
      if (error) throw error;
      this.inspection = data;
    },
    async update(id, params) {
      const { data, error } = await api.patch(`/inspections/${id}`, { ...params });
      if (error) throw error;
      this.inspection = data;
    },
    async find(params) {
      const { data, error } = await api.get("/inspections", {
        params: {
          ...params
        }
      });
      if (error) throw error;
      this.inspections = data;
    },
    async findTypes() {
      const { data, error } = await api.get("/inspections/types");
      if (error) throw error;
      this.types = data;
    },
    async findOne(id, params) {
      const { data, error } = await api.get(`/inspections/${id}`, { params: { ...params } });
      if (error) throw error;
      this.inspection = data;
    },
    async findWatermeter(id) {
      const { data, error } = await api.get(`/inspections/${id}/watermeters`);
      if (error) throw error;
      this.watermeters = data;
    },
  },
});
