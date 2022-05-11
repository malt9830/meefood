import { defineStore } from "pinia";

export const useBasketStore = defineStore({
  id: "basket",
  state: () => ({
    basket: [],
  }),
  getters: {},
  actions: {
    addToBasket(item) {
      this.$patch((state) => {
        if (state.basket.includes(item)) {
          item.amount = item.amount + 1;
          console.log(item.amount);
          console.log(state.basket)
        } else {
          item.amount = 1;
          state.basket.push(item);
          console.log(state.basket)
        }
      });
    },
  },
});
