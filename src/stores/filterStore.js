import { defineStore } from "pinia";

export const useFilterStore = defineStore("filter", {
  state: () => {
    return {
      filters: ["italiensk", "pizza", "vegetar", "salat", "sandwich", "burger", "indisk", "asiatisk", "polsk", "sushi", "kebab", "fisk"],
      sorting: ["Mest populære", "Nærmeste", "Leveringspris", "Leveringstid", "Alfabetisk"],
      activeFilters: [],
      activeSorting: "Mest populære",
    };
  },
  getters: {},
  actions: {
    updateFilters(activeFilters, activeSorting) {
      this.activeFilters = activeFilters;
      this.activeSorting = activeSorting;
    },
  },
});
