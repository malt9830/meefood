import { defineStore } from "pinia";

export const useFilterStore = defineStore("filter", {
  state: () => {
    return {
      filters: ["italiensk", "pizza", "vegetar", "salat", "sandwich", "burger", "indisk", "asiatisk", "polsk", "sushi", "kebab", "fisk"],
      sorting: ["Mest populære", "Nærmeste", "Pris", "Leveringspris", "Leveringstid", "Minimumspris"],
      activeFilters: [],
      activeSorting: "Mest populære",
    };
  },
  getters: {
    sortingValue(state) {
      if (state.activeSorting === "Mest populære") return "rating";
      if (state.activeSorting === "Pris") return "priceRange";
      if (state.activeSorting === "Leveringspris") return "deliveryCost";
      if (state.activeSorting === "Leveringstid") return "deliveryTime";
      if (state.activeSorting === "Minimumspris") return "minimumPrice";
    },
    sortingDirection(state) {
      if (state.activeSorting === "Mest populære") return -1;
      if (state.activeSorting === "Pris") return -1;
      return 1;
    },
  },
  actions: {
    updateFilters(activeFilters, activeSorting) {
      this.activeFilters = activeFilters;
      this.activeSorting = activeSorting;
    },
  },
});
