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

    hasViewInspection: (state) =>  state.permissions?.some((p) => p.permission.key === "view_inspection"),
    hasViewReading: (state) =>  state.permissions?.some((p) => p.permission.key === "view_reading"),
    hasViewWatermeter: (state) =>  state.permissions?.some((p) => p.permission.key === "view_watermeter"),
    hasViewReading: (state) =>  state.permissions?.some((p) => p.permission.key === "view_graphic_reading"),

    hasCreateEmployee: (state) =>  state.permissions?.some((p) => p.permission.key === "create_employee"),
    hasEditEmployee: (state) =>  state.permissions?.some((p) => p.permission.key === "edit_employee"),
    hasViewEmployee: (state) =>  state.permissions?.some((p) => p.permission.key === "view_employee"),
    hasDeleteEmployee: (state) =>  state.permissions?.some((p) => p.permission.key === "delete_employee"),
    hasAssignZoneEmployee: (state) =>  state.permissions?.some((p) => p.permission.key === "assign_zone_employee"),

    hasCreateCustomer: (state) =>  state.permissions?.some((p) => p.permission.key === "create_customer"),
    hasEditCustomer: (state) =>  state.permissions?.some((p) => p.permission.key === "edit_customer"),
    hasViewCustomer: (state) =>  state.permissions?.some((p) => p.permission.key === "view_customer"),
    hasDeleteCustomer: (state) =>  state.permissions?.some((p) => p.permission.key === "delete_customer"),

    hasCreateWatermeter: (state) =>  state.permissions?.some((p) => p.permission.key === "create_watermeter"),
    hasEditWatermeter: (state) =>  state.permissions?.some((p) => p.permission.key === "edit_watermeter"),
    hasViewWatermeter: (state) =>  state.permissions?.some((p) => p.permission.key === "view_watermeter"),
    hasDeleteWatermeter: (state) =>  state.permissions?.some((p) => p.permission.key === "delete_watermeter"),
    hasAssignWatermeterCustomer: (state) =>  state.permissions?.some((p) => p.permission.key === "assign_watemeter_customer"),
    hasViewWatermeterReading: (state) =>  state.permissions?.some((p) => p.permission.key === "view_watemeter_reading"),

    hasCreateInspection: (state) =>  state.permissions?.some((p) => p.permission.key === "create_inspection"),
    hasEditInspection: (state) =>  state.permissions?.some((p) => p.permission.key === "edit_inspection"),
    hasViewInspection: (state) =>  state.permissions?.some((p) => p.permission.key === "view_inspection"),
    hasDeleteInspection: (state) =>  state.permissions?.some((p) => p.permission.key === "delete_inspection"),
    hasDistribuiteWatermeter: (state) =>  state.permissions?.some((p) => p.permission.key === "distribuite_watermeter"),
    hasViewDistribuiteWatermeter: (state) =>  state.permissions?.some((p) => p.permission.key === "view_distribuite_watermeter"),
    hasAddWatermeterInspection: (state) =>  state.permissions?.some((p) => p.permission.key === "add_watermeter_inspection"),

    hasViewReadings: (state) =>  state.permissions?.some((p) => p.permission.key === "view_readings"),
    hasExportReadings: (state) =>  state.permissions?.some((p) => p.permission.key === "export_readings"),
    hasCreateReadings: (state) =>  state.permissions?.some((p) => p.permission.key === "create_readings"),
    hasInvalidReadings: (state) =>  state.permissions?.some((p) => p.permission.key === "invalid_readings"),

    hasCreateAnomaly: (state) =>  state.permissions?.some((p) => p.permission.key === "create_anomaly"),
    hasEditAnomaly: (state) =>  state.permissions?.some((p) => p.permission.key === "edit_anomaly"),
    hasViewAnomaly: (state) =>  state.permissions?.some((p) => p.permission.key === "view_anomaly"),
    hasDeleteAnomaly: (state) =>  state.permissions?.some((p) => p.permission.key === "delete_anomaly"),

    hasCreateZone: (state) =>  state.permissions?.some((p) => p.permission.key === "create_zone"),
    hasEditZone: (state) =>  state.permissions?.some((p) => p.permission.key === "edit_zone"),
    hasViewZone: (state) =>  state.permissions?.some((p) => p.permission.key === "view_zone"),
    hasDeleteZone: (state) =>  state.permissions?.some((p) => p.permission.key === "delete_zone"),

    hasCreateUser: (state) =>  state.permissions?.some((p) => p.permission.key === "create_user"),
    hasEditUser: (state) =>  state.permissions?.some((p) => p.permission.key === "edit_user"),
    hasViewUser: (state) =>  state.permissions?.some((p) => p.permission.key === "view_user"),
    hasDeleteUser: (state) =>  state.permissions?.some((p) => p.permission.key === "delete_user"),
    
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
