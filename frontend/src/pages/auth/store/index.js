import { defineStore } from "pinia";
import * as storage from "./storage";
import { api } from "src/boot/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: "",
    user: {},
    permissions: [],
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async Actionlogin(data) {
      const response = await api.post("/auth", data);
      this.ActionSetUser(response.data.user);
      this.ActionSetToken(response.data.token);
      this.ActionSetPermissions(response.data.user.permissions);
    },

    async ActionCheckToken() {
      if (this.token) {
        return this.token;
      }

      const token = storage.getLocalToken();

      if (!token) {
        return Promise.reject(new Error("Token Inválido"));
      }

      this.ActionSetToken(token);

      return this.ActionLoadSession();
    },

    async ActionLoadSession() {
      try {
        const {
          data: { user, permissions },
        } = await api.get("/auth/resfresh-token");
        this.ActionSetUser(user);
        this.ActionSetPermissions(permissions);
      } catch (err) {
        this.signOut();
      }
    },

    ActionSetUser(user) {
      this.user = user;
    },

    ActionSetPermissions(permissions) {
      this.permissions = permissions;
    },

    ActionSetToken(token) {
      storage.setLocalToken(token);
      this.token = token;
    },

    signOut() {
      storage.deleteLocalToken();
      this.ActionSetUser({});
      this.ActionSetToken("");
    },
  },
});
