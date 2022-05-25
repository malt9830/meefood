import { defineStore } from "pinia";

export const useSearchStore = defineStore({
  id: "search",
  state: () => ({
    dish: "",
  }),
  getters: {},
  actions: {
    startSearch(input) {
      this.$patch((state) => (state.dish = input));
    },
  },
});