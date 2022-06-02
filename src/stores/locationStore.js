import { defineStore } from "pinia";

export const useLocationStore = defineStore("location", {
  state: () => {
    return {
      address: "",
    };
  },
  getters: {},
  actions: {
    getLocation() {
      // Adjust securement in Google API before building
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      const key = "AIzaSyCDb9v5y3vRhGxqOLqUybFvNEXCRKD4bsM";
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      // Get coordinates of current location
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        axios
          .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`)
          .then((res) => {
            this.updateLocation(res.data.results[0].formatted_address);
          })
          .catch((err) => console.log(err));
      });
    },
    updateLocation(adr) {
      if (adr === "") return;
      this.address = adr;
    },
  },
});
