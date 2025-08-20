import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useAnomalyStore = defineStore("anomaly", {
  state: () => ({
    anomalies: {},
  }),
  getters: {},
  actions: {
    async find() {
      const { data, error } = await api.get("/anomalies");
      if (error) throw error;
      this.anomalies = data;
    },
  },
});
