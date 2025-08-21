import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {},
    roles: [],
    userTypes: [],
  }),
  getters: {},
  actions: {
    async create(params) {
      const { data, error } = await api.post("/users", {
        ...params,
      });
      if (error) throw error;
      this.user = data;
    },
    async update(id, params) {
      const { data, error } = await api.patch(`/users/${id}`, { ...params });
      if (error) throw error;
      return data;
    },
    async findOne(id) {
      const { data, error } = await api.get(`/users/${id}`);
      if (error) throw error;
      this.user = data;
    },
    async findTypes() {
      const { data, error } = await api.get("/users/types");
      if (error) throw error;
      this.userTypes = data;
    },
    async findRoles() {
      const { data, error } = await api.get("/users/roles");
      if (error) throw error;
      this.roles = data;
    },
    async addPermissions(userId, params) {
      const { data, error } = await api.post(
        `/users/${userId}/add-permissions`,
        {
          ...params,
        }
      );
      if (error) throw error;
      this.user = data;
    },
  },
});
