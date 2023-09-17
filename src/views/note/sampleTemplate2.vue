<template>
  <div class="note-option text-end">
    <button class="note-option-icon"><i class="far fa-star"></i></button>
    <button class="note-option-icon" @click="openWEditorOpt"><i class="fas fa-ellipsis-h"></i></button>
  </div>
  <WEditorOption v-if="showWEditorOpt" :optBasic="optBasic" :optFull="optFull" @screenOpt="screenOpt" @select-editor-opt="closeWEditorOpt" @openTemplateOpt="openTemplateOpt"></WEditorOption>
  <TemplateLayer :showTemplateOpt="showTemplateOpt" @closeTemplateOpt="closeTemplateOpt"></TemplateLayer>
  <ScreenSizeLayout :optBasic="optBasic" :optFull="optFull">
    <Template2Editor></Template2Editor>
  </ScreenSizeLayout>
</template>

<script>
import WEditorOption from "@/components/w-editor/note-option.vue";
import TemplateLayer from "@/components/w-editor/template-list.vue";
import ScreenSizeLayout from "@/components/cmm/screen-size-layout.vue";
import Template2Editor from "@/components/w-editor/sample-editor/template2-editor.vue";

export default {
  name: "newNote",
  components: {
    WEditorOption,
    TemplateLayer,
    ScreenSizeLayout,
    Template2Editor,
  },
  data() {
    return {
      optBasic: true,
      optFull: false,
      showWEditorOpt: false,
      showTemplateOpt: false,
    };
  },
  methods: {
    openWEditorOpt() {
      this.showWEditorOpt = !this.showWEditorOpt;
    },
    closeWEditorOpt() {
      this.showWEditorOpt = false;
    },
    screenOpt(opt) {
      console.log(opt);
      if (opt === "optBasic") {
        this.optBasic = true;
        this.optFull = false;
      } else {
        this.optBasic = false;
        this.optFull = true;
      }
    },
    openTemplateOpt() {
      this.showTemplateOpt = true;
    },
    closeTemplateOpt() {
      this.showTemplateOpt = false;
    },
  },
};
</script>

<style lang="scss">
.note-option-icon {
  font-size: 16px;
  border: none;
  background: transparent;
  color: rgb(163, 163, 163);
  &:hover {
    border: 1px solid rgb(163, 163, 163);
    border-radius: 5px;
    cursor: pointer;
  }
}
</style>
