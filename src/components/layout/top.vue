<template>
  <div>
    <button @click="goToMain">Go to Main page</button>
    <span>Here is a top area of this app.</span>
    <button @click="changeLang()">{{ getLang }}</button>
  </div>
</template>

<script>
import { LOCALES } from "@/localization/locales";
import { storeToRefs } from "pinia";
import { localeStore } from "@/store/locale.js";

export default {
  name: "Top",
  setup() {
    const { lang } = storeToRefs(localeStore());
    const { localeChange } = localeStore();
    return {
      locale_lang: lang.value,
      localeChange,
    };
  },
  methods: {
    goToMain() {
      this.$router.push("/");
    },
    changeLang() {
      const currLang = this.locale_lang === "en" ? "ko" : "en";
      this.$store.commit("localeChange", currLang);
    },
  },
  computed: {
    getLang() {
      return LOCALES.filter((r) => r.value == this.locale_lang)[0].caption;
    },
  },
};
</script>

<style scoped>
div {
  height: 30px;
  background: #2c3e50;
  color: white;
  width: 100%;
}
</style>
