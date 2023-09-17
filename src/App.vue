<template>
  <div
    class="app app-header-fixed app-sidebar-fixed"
    v-if="!appOptions.appEmpty"
    v-bind:class="{
      'app-sidebar-minified': appOptions.appSidebarMinified,
      'app-content-full-height': appOptions.appContentFullHeight,
      'app-without-sidebar': appOptions.appSidebarNone,
      'app-with-end-sidebar': appOptions.appSidebarEnd,
      'app-with-two-sidebar': appOptions.appSidebarTwo,
      'app-with-wide-sidebar': appOptions.appSidebarWide,
      'app-with-light-sidebar': appOptions.appSidebarLight,
      'app-sidebar-mobile-toggled': appOptions.appSidebarMobileToggled,
      'app-sidebar-end-toggled': appOptions.appSidebarEndToggled,
      'app-sidebar-end-collapsed': !appOptions.appSidebarEndToggled,
      'app-sidebar-end-mobile-toggled': appOptions.appSidebarEndMobileToggled,
      'app-header-fixed': !appOptions.appHeaderNone,
      'app-without-header': appOptions.appHeaderNone,
      'app-with-top-menu': appOptions.appTopMenu,
      'has-scroll': appOptions.appBodyScrollTop,
    }"
  >
    <!-- <div v-if="!memberConfirmed">
      <Login @loginResult="loginChcek"></Login>
    </div>
    <div v-if="memberConfirmed"> -->
      <Header />
      <TopMenu v-if="appOptions.appTopMenu" />
      <Sidebar v-if="!appOptions.appSidebarNone" />
      <SidebarRight v-if="appOptions.appSidebarTwo" />
      <div id="content" class="app-content" v-bind:class="appOptions.appContentClass">
        <router-view></router-view>
      </div>
    <!-- </div> -->
  </div>
  <!-- <div v-else>
        <router-view></router-view>
    </div> -->
  <!-- <spinner :loading="$store.state.LoadingStatus" />
  <block-ui :show="$store.state.BlockStatus" /> -->
  <spinner :loading="LoadingStatus" />
  <block-ui :show="BlockStatus" />
</template>

<script>
const alertOnlineStatus = () => {
  window.alert(navigator.onLine ? "online" : "offline");
};
window.addEventListener("online", alertOnlineStatus);
window.addEventListener("offline", alertOnlineStatus);
import SidebarRight from "@/components/sidebar-right/SidebarRight.vue";
import Sidebar from "@/components/sidebar/Sidebar.vue";
import TopMenu from "@/components/top-menu/TopMenu.vue";
import Spinner from "@/components/cmm/Spinner.vue";
import AppOptions from "@/config/AppOptions.vue";
import Header from "@/components/header/Header.vue";
import BlockUi from "@/components/cmm/BlockUi.vue";
import Login from "@/views/login/loginView.vue";
import { useAppStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
import { TreeLayout } from 'gojs';

export default {
  name: "App",
  components: {
    BlockUi,
    SidebarRight,
    Sidebar,
    TopMenu,
    Spinner,
    Header,
    Login,
  },
  setup() {
    const { LoadingStatus, BlockStatus } = storeToRefs(useAppStore());
    return {
      LoadingStatus,
      BlockStatus,
    };
  },
  mounted() {
    // if (this.$session.get("usr_id")) {
    //   console.log("id");
    //   this.memberConfirmed = TreeLayout;
    // }
  },
  data() {
    return {
      appOptions: AppOptions,
      memberConfirmed: false, //로그인확인
      // sessionConfirmed: false,
    };
  },
  methods: {
    handleScroll: function () {
      AppOptions.appBodyScrollTop = window.scrollY;
    },
    loginChcek(result) {
      if (result === true) {
        this.memberConfirmed = true;
      }
    },
  },
  created() {
    AppOptions.appBodyScrollTop = window.scrollY;
    window.addEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss">
@import "src/assets/styles/vue.scss";
</style>

<style lang="scss">
@import "../node_modules/ag-grid-community/dist/styles/ag-grid.css";
@import "../node_modules/ag-grid-community/dist/styles/ag-theme-alpine.css";
@import "../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css";
@import "../node_modules/ag-grid-community/dist/styles/ag-theme-balham-dark.css";
/*
    Theme
    ag-heme-alpine-dark
    ag-theme-balham
    ag-theme-balham-dark
    ag-theme-material
    */
$color: #000;
.dummy {
  color: $color !important;
}
</style>
<style>
@import "../node_modules/flag-icon-css/css/flag-icon.min.css";
</style>
<!--<style>

    @import 'assets/styles/vue.scss';
    @import 'assets/styles/default/styles.scss';
    @import 'assets/styles/default/_functions.scss';
    /*@import 'assets/styles/default/_variables.scss';
    @import 'assets/styles/default/_mixins.scss';
    @import 'assets/styles/default/_reboot.scss';
    @import 'assets/styles/default/_app.scss';
    @import 'assets/styles/default/_layout.scss';
    @import 'assets/styles/default/_ui.scss';
    @import 'assets/styles/default/_pages.scss';
    @import 'assets/styles/default/_plugins.scss';
    @import 'assets/styles/default/_helper.scss';
    @import 'assets/styles/default/_rtl.scss';*/

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>-->
