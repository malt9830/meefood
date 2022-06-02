import { defineStore } from "pinia";

export const useSearchStore = defineStore({
  id: "search",
  state: () => ({
    searchValue: "",
  }),
  getters: {},
  actions: {
    startSearch(input) {
      this.searchValue = input;
    },
  },
});
