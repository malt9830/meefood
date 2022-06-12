import { defineStore } from "pinia";

export const useUserStore = defineStore({
    id: "user",
    state: () => ({
        loggedIn: false
    }),
    getters: {},
    actions: {},
})