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
        const clone = { ...item };

        // If item is without a picked
        if (picked === "") {
          // Find item with same name
          const itemExists = state.basket.find((el) => el.name === clone.name);
          if (!itemExists) {
            // If item does not exist, push to basket
            clone.amount = counter;
            state.basket.push(clone);
          } else if (itemExists) {
            // If item exists, increase amount
            itemExists.amount += counter;
          }
          // If item has a picked
        } else if (picked !== "") {
          // Find item with same name and picked
          const itemExists = state.basket.find((el) => el.name === clone.name && el.picked === picked);
          if (!itemExists) {
            // If item does not exist, push to basket
            clone.amount = counter;
            clone.picked = picked;
            state.basket.push(clone);
          } else if (itemExists) {
            // If item exists, increase amount
            itemExists.amount += counter;
          }
        }
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
