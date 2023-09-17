<template>
  <b-tabs active-nav-item-class="font-weight-bold text-uppercase text-success" content-class="mt-1">
    <b-tab title="전체노트" :title-link-class="'text-secondary'" @click="noteOpt('all')" active>
      <NoteList :noteOpt="this.opt"></NoteList>
    </b-tab>
    <b-tab title="나의노트" :title-link-class="'text-secondary fs-6'" @click="noteOpt('my')">
      <NoteList :noteOpt="this.opt"></NoteList>
    </b-tab>
    <b-tab title="공람노트" :title-link-class="'text-secondary fs-6'" @click="noteOpt('shared')">
      <NoteList :noteOpt="this.opt"></NoteList>
    </b-tab>
  </b-tabs>
</template>

<script>
import NoteList from "@/components/my-note/all-note.vue";

export default {
  name: "note-container",
  components: {
    NoteList,
  },
  data() {
    return {
      opt: "",
    };
  },
  methods: {
    noteOpt(opt) {
      this.opt = opt;
    },
  },
};
</script>

<style lang="scss">
.search-box {
  & label {
    font-size: 14px;
  }
}
</style>
