import { createRouter, createWebHistory } from "vue-router";
import IndexVue from "../views/Index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: IndexVue,
    },
    {
      path: "/restaurants",
      name: "restaurants",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Restaurants.vue"),
    },
    {
      path: "/restaurant/:id",
      name: "restaurant",
      component: () => import("../views/RestaurantPage.vue"),
    },
  ],
});

export default router;
