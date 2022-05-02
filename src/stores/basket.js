import { defineStore } from "pinia";

export const useBasketStore = defineStore({
  id: "basket",
  state: () => ({
    basket: [],
  }),
  getters: {},
  actions: {},
});
