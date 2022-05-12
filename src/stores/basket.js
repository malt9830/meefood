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
    addToBasket(item, counter, comment) {
      this.$patch((state) => {
        if (state.basket.includes(item) && comment === item.comment) {
          item.amount = item.amount + counter;
          console.log(item.amount);
          console.log(state.basket);
        } else if (!state.basket.includes(item)) {
          item.amount = counter;
          item.comment = comment;
          console.log(item.comment);
          state.basket.push(item);
          console.log(state.basket);
        } else if (state.basket.includes(item) && comment !== item.comment) {
          console.log(comment);
          //push new item to basket with new comment
        }
      });
    },
    subtractAmount(item) {
      this.$patch(() => {
        if (item.amount >= 2) {
          item.amount = item.amount - 1;
          console.log(state.basket);
        } else {
          this.$patch((state) => {
            state.basket = state.basket.filter((el) => el !== item);
            console.log(state.basket);
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
