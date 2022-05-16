import { defineStore } from "pinia";

export const useLocationStore = defineStore("location", {
  state: () => {
    return {
      address: "",
      latitude: 0,
      longitude: 0,
    };
  },
  getters: {},
  actions: {
    updateLocation(lat, lng, adr) {
      console.log(lat, lng, adr);
      this.latitude = lat;
      this.longitude = lng;
      this.address = adr;
    },
  },
});
