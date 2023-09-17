<template>
  <div v-if="appOptions.appSidebarMinified" @mouseover="showSideNoteList" @mouseleave="hideSideNoteList" class="note-menu-icon d-flex">
    <i class="fas fa-file-alt"></i>
    <div class="menu-caret"></div>
  </div>
  <div class="note-menu">
    <div class="note-menu-list">
      <div class="note-menu-title">{{ note_title }}</div>

      <div class="note-menu-list-scroll" style="height: 190px">
        <div class="note-menu-item" v-for="(item, idx) in note_menu" :key="idx">
          <div v-if="note_opt === 'project'" class="d-flex">
            <i class="note-menu-item-icon fas fa-folder"></i>
            <div class="note-menu-item-text" @click="open_project_note(item, idx)">{{ item.pjt_nm }}</div>
          </div>
          <div v-else class="d-flex">
            <i class="note-menu-item-icon fas fa-file-alt"></i>
            <router-link v-bind:to="`/note/${item.note_uid}`" class="note-menu-item-link">
              <div class="note-menu-item-text">{{ item.title }}</div>
            </router-link>
          </div>
          <!-- note with submenu -->
          <div v-if="idx == note_idx && is_note_children">
            <div class="note-menu-chidren-item d-flex" v-for="(note, i) in item.title" :key="i">
              <i class="fas fa-file-alt note-menu-chidren-item-icon"></i>
              <router-link v-bind:to="`/note/${item.note_uid[i]}`" class="note-menu-chidren-item-link">
                <div class="note-menu-chidren-item-text">{{ note }}</div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppOptions from "../../../config/AppOptions.vue";
import VariableContent from "@/Content.js";

export default {
  name: "NoteList",
  props: {
    menu: Array,
    note_opt: String,
    note_title: String,
  },
  data() {
    return {
      appOptions: AppOptions,
      note_menu: this.menu,
      pjt_note_menu: null,
      note_idx: null,
      is_note_children: null,
    };
  },
  methods: {
    open_project_note(note, i) {
      console.log("프로젝트 각 노트 오픈");
      console.log(note);
      this.note_idx = i;
      if (note.title.length) {
        this.is_note_children = !this.is_note_children;
      }
    },
  },
};
</script>

<style lang="scss">
.note-menu {
  &-title {
    height: 30px;
    font-size: 14px;
    font-weight: 500;
    padding: 5px;
    padding-left: 20px;
    color: white;
    background: #182130;
    &-icon {
      font-size: 16px;
      margin-right: 10px;
    }
  }

  &-list {
    background: white;
    border-top: 1px solid #efefef;
    border-bottom: 1px solid #efefef;

    &-scroll {
      padding: 10px 10px 10px 35px;
      overflow-y: scroll;
    }
  }

  &-item {
    margin-bottom: 10px;
    &-text {
      padding-top: 2px;
      font-size: 12px;
      line-height: 1.2;
      text-decoration: none;
      color: #50586c;

      &:hover {
        color: #5b5bd6;
        font-weight: 600;
        cursor: pointer;
      }
    }

    &-link {
      text-decoration: none;
    }

    &-icon {
      font-size: 16px;
      margin-right: 8px;
      color: #9db7c6;
    }
  }

  // children note
  &-chidren-item {
    font-size: 13px;
    margin-left: 15px;
    margin-top: 5px;

    &-text {
      font-size: 12px;
      text-decoration: none;
      color: #50586c;

      &:hover {
        color: #5b5bd6;
        font-weight: 600;
        cursor: pointer;
      }
    }

    &-link {
      text-decoration: none;
    }

    &-icon {
      color: #9db7c6;
      font-size: 14px;
      margin-right: 8px;
      line-height: 1.3;
    }
  }
}
</style>
