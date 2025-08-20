import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { v4 as uuidv4 } from "uuid";

export const useComposablesStores = defineStore("composables", {
  state: () => ({
    provinces: [],
    districts: [],
    zones: [],
    userSupabase: ''
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async findProvinces() {
      const { data, error } = await api.get("/locations/provinces");
      if (error) throw error;
      this.provinces = data;
    },
    async findDistricts() {
      const { data, error } = await api.get("/locations/districts");
      if (error) throw error;
      this.districts = data;
    },
    async findZones() {
      const { data, error } = await api.get("/locations/zones");
      if (error) throw error;
      this.zones = data;
    },
    async login( email, password )  {
      const { supabase } = useSupabase();
      const { user, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      return user
    },
    async upload(formData) {
      const { data, error } = await api.post("/upload/single", formData);
      if (error) throw error;
      return data;
    },
  }
});
