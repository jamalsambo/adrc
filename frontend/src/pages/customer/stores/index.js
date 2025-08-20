import { defineStore } from 'pinia';
import { api } from "src/boot/axios";

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    customers: [],
    customer: {},
  }),
  getters: {

  },
  actions: {
    async create(params) {
      const { data, error } = await api.post("/customers", {
        ...params,
      });
      if (error) throw error;
      this.customer = data;
    },
     async update(id,params) {
      const { data, error } = await api.patch(`/customers/${id}`, {...params});
      if (error) throw error;
      this.customer = data;
    },
    async find() {
      const { data, error } = await api.get("/customers");
      if (error) throw error;
      this.customers = data;
    },
    async findOne(id) {
      const { data, error } = await api.get(`/customers/${id}`);
      if (error) throw error;
      this.customer = data;
    },
    async addWatermeter(params){
      const { data, error } = await api.post(`/customers/add-watermeter`, params);
      if (error) throw error;
      return data;
    }
  },
});
