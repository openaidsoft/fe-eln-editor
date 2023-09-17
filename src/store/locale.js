import { defineStore } from "pinia";
import { defaultLocale } from "../localization/locales";
import { i18n } from "../localization/index";

export const localeStore = defineStore({
  id: "localeStore",
  state: () => ({
    lang: defaultLocale,
  }),
  actions: {
    localeChange(payload) {
      this.lang = payload;
      i18n.global.locale = this.lang;
    },
  },
  getters: {
    getLang() {
      return this.lang;
    },
  },
});
