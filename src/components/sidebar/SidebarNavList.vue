<template>
  <!-- menu with submenu -->
  <div v-if="menu.children" class="menu-item has-sub" v-bind:class="{ active: subIsActive(menu.path), expand: this.stat == 'expand', 'd-none': this.stat == 'hide' }">
    <div href="#" class="menu-link" v-on:click.prevent.stop="expand($event)" @mouseover="mouseOver(menu.children, $event)" @mouseleave="hideFloatSubmenu">
      <div class="menu-icon" v-if="menu.icon"><i v-bind:class="menu.icon"></i></div>
      <div v-if="menu.img" class="menu-icon-img"><img v-bind:src="menu.img" alt="" /></div>
      <div class="menu-text">
        {{ menu.title }}
        <span v-if="menu.label" class="menu-label">{{ menu.label }}</span>
        <i v-if="menu.highlight" class="fa fa-paper-plane text-theme"></i>
      </div>
      <div v-if="menu.badge" class="menu-badge">{{ menu.badge }}</div>
      <div v-else class="menu-caret"></div>
    </div>
    <div
      class="menu-submenu"
      v-bind:class="{ 'd-block': this.stat == 'expand', 'd-none': this.stat == 'collapse' }"
      v-bind:style="{ marginTop: appOptions.appSidebarMinified ? -(scrollTop + 60) + 'px' : '' }"
    >
      <div v-for="submenu in menu.children" v-bind:key="submenu.path" class="d-flex">
        <sidebar-nav-list
          v-bind:menu="submenu"
          v-bind:key="submenu.path"
          ref="sidebarNavList"
          v-on:calc-float-submenu="handleCalcFloatSubmenu"
          v-on:collapse-other="handleCollapseOther(submenu)"
        ></sidebar-nav-list>
      </div>
    </div>

    <!-- note menu -->
    <div v-if="menu.title === '나의노트'" class="project-box menu-item" v-bind:class="{ 'd-none': this.stat == 'hide', active: checkActive(menu.path) }">
      <note-list :menu="projectNoteMenu" :note_opt="'project'" :note_title="'NOTES IN PROJECT'"></note-list>
      <note-list :menu="noteMenu" :note_opt="'my_note'" :note_title="'MY NOTES'"></note-list>
    </div>
  </div>

  <router-link v-else v-bind:to="menu" class="menu-item" v-bind:class="{ 'd-none': this.stat == 'hide', active: checkActive(menu.path) }" active-class="" tag="div" @click="collapseOther()">
    <a class="menu-link">
      <div class="menu-icon" v-if="menu.icon"><i v-bind:class="menu.icon"></i></div>
      <div v-if="menu.img" class="menu-icon-img"><img v-bind:src="menu.img" alt="" /></div>
      <div class="menu-text">
        {{ menu.title }}
        <span v-if="menu.label" class="menu-label">{{ menu.label }}</span>
        <i v-if="menu.highlight" class="fa fa-paper-plane text-theme"></i>
      </div>
      <div v-if="menu.badge" class="menu-badge">{{ menu.badge }}</div>
    </a>
  </router-link>
</template>

<script>
import AppOptions from "../../config/AppOptions.vue";
import ProjectNoteMenu from "./note/ProjectNoteMenu.vue";
import NoteMenu from "./note/NoteMenu.vue";
import NoteList from "./note/NoteList.vue";

export default {
  name: "SidebarNavList",
  props: ["menu", "menus", "scrollTop"],
  components: {
    NoteList,
  },
  data() {
    return {
      projectNoteMenu: ProjectNoteMenu,
      noteMenu: NoteMenu,
      stat: "",
      active: false,
      appOptions: AppOptions,
    };
  },
  created() {
    if (this.menu.menu) {
      this.childrenMenu = this.menu;
    } else {
      if (this.menu.has_menu_yn == "N") {
        this.singleMenu = this.menu;
      } else {
        this.hasChildren = this.menu;
      }
    }
  },
  methods: {
    mouseOver: function (data, event) {
      if (this.appOptions.appSidebarMinified) {
        var offset = event.target.offsetParent.getBoundingClientRect();
        this.$emit("show-float-submenu", data, offset);
      }
    },
    hideFloatSubmenu: function () {
      if (this.appOptions.appSidebarMinified) {
        this.$emit("hide-float-submenu");
      }
    },
    expand: function () {
      if (this.stat == "") {
        this.stat = this.subIsActive(this.menu.path) ? "collapse" : "expand";
      } else {
        this.stat = this.stat == "expand" ? "collapse" : "expand";
      }
      this.$emit("collapse-other", this.menu);

      if (this.appOptions.appSidebarMinified) {
        this.$emit("calc-float-submenu");
      }
    },
    handleCalcFloatSubmenu: function () {
      if (this.appOptions.appSidebarMinified) {
        this.$emit("calc-float-submenu");
      }
    },
    collapse: function (menu) {
      if (this.menu != menu) {
        this.stat = "collapse";
      }
    },
    hide: function () {
      this.stat = "hide";
    },
    show: function () {
      this.stat = "";
    },
    searchExpand: function () {
      this.stat = "expand";
    },
    checkActive(path) {
      return this.$route.path.indexOf(path) === 0;
    },
    collapseOther: function () {
      this.$emit("collapse-other", this.menu);
    },
    handleCollapseOther: function (menu) {
      for (var i = 0; i < this.menu.children.length; i++) {
        this.$refs.sidebarNavList[i].collapse(menu);
      }
    },
    subIsActive(path) {
      console.log(path);
      if (this.stat == "expand") {
        return true;
      }
      //return this.$route.path.indexOf(path) === 0;
      // const paths = Array.isArray(path) ? path : [path];
      // return paths.some((path) => {
      //   return this.$route.path.indexOf(path) === 0;
      // });
    },
  },
};
</script>
<style></style>
