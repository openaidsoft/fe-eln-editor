import { Locales } from "./locales";

import {LANG_EN} from "./en";
import {LANG_KR} from "./kr";
import {defaultLocale} from "./locales";
import {createI18n} from "vue-i18n";

export const messages = {
  [Locales.EN]: LANG_EN,
  [Locales.KR]: LANG_KR
};

export const i18n = new createI18n({
  locale: defaultLocale,
  messages: messages,
  globalInjection: true,
  // fallbackLocale: defaultLocale
});
