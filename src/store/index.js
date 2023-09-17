import { defineStore } from "pinia";

export const useAppStore = defineStore({
  id: "useAppStore",
  state: () => ({
    LoadingStatus: false,
    BlockStatus: false,
  }),
});
