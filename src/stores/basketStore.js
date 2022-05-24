import { defineStore } from "pinia";

export const useBasketStore = defineStore({
  id: "basket",
  state: () => ({
    basket: [],
  }),
  getters: {
    totalPrice(state) {
      let total = 0;
      state.basket.map((el) => (total += el.price * el.amount));
      return total;
    },
  },
  actions: {
    addToBasket(item, counter, picked) {
      this.$patch((state) => {
        // If dish had no picked
        if (picked === "") {
          if (!state.basket.includes(item)) {
            item.amount = counter;
            state.basket.push(item);
          } else if (state.basket.includes(item)) {
            item.amount += counter;
          }
        } else if (picked !== "") {
          if (!state.basket.includes(item)) {
            item.amount = counter;
            item.picked = picked;
            state.basket.push(item);
          } else if (state.basket.includes(item)) {
            item.amount += counter;
          }
        }
        // if (state.basket.includes(item) && picked === item.picked) {
        //   item.amount = item.amount + counter;
        // } else if (!state.basket.includes(item)) {
        //   item.amount = counter;
        //   item.comment = comment;
        //   item.picked = picked;
        //   state.basket.push(item);
        // } else if (state.basket.includes(item) && picked !== item.picked) {
        //   item.picked = picked;
        //   state.basket.push(item);
        // }
      });
    },
    subtractAmount(item) {
      this.$patch(() => {
        if (item.amount > 1) {
          item.amount = item.amount - 1;
        } else {
          this.$patch((state) => {
            state.basket = state.basket.filter((el) => el !== item);
          });
        }
      });
    },
    addAmount(item) {
      this.$patch(() => {
        item.amount = item.amount + 1;
      });
    },
  },
});
