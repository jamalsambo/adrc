import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useAnomalyStore = defineStore("anomaly", {
  state: () => ({
    anomalies: [],
    anomaly: {}
  }),
  getters: {},
  actions: {
    async create(params) {
      const { data, error } = await api.post("/anomalies", {
        ...params,
      });
      if (error) throw error;
      this.anomaly = data;
    },
    async update(id, params) {
      const { data, error } = await api.patch(`/anomalies/${id}`, { ...params });
      if (error) throw error;
      this.anomaly = data;
    },
    async findOne(id) {
      const { data, error } = await api.get(`/anomalies/${id}`);
      if (error) throw error;
      this.anomaly = data;
    },
    async remove(id) {
      const { error } = await api.delete(`/anomalies/${id}`);
      if (error) throw error;
    },
    async find() {
      const { data, error } = await api.get("/anomalies");
      if (error) throw error;
      this.anomalies = data;
    },
  },
});
