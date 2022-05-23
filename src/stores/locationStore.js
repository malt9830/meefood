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
    getLocation() {
      // Adjust securement in Google API before building
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      const key = "AIzaSyDkTlYsFLGYBZLggJBXm2ioiiinqj3Odt4";
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      // Get coordinates of current location
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        this.updateLocation("Testvej 12A, Protoby 9090, Danmark");

        // Fake address while testing to reduce API calls
        return;

        axios
          .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`)
          .then((res) => {
            console.log(res);
            // address.value = res.data.results[0].formatted_address
            this.updateLocation(res.data.results[0].formatted_address);
          })
          .catch((err) => console.log(err));
      });
    },
    updateLocation(adr) {
      this.address = adr;
    },
  },
});
