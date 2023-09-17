<template>
  <Button type="button" class="molfile-btn mr-2" @click="getMolfile(false)"><i class="fas fa-file-alt molfile-btn-icon"></i>Get molfile</Button>
  <Button @click="getSmiles()">Get smiles</Button>
  <Button type="button" v-show="showMolFile" class="molfile-btn" @click="molfileDownload(false)"><i class="fas fa-file-pdf molfile-btn-icon"></i>Get molfile download</Button>
  <div :id="id" :width="width" :height="height" :options="options" @onChange="chageHandler({ src: jsmeApplet })"></div>
  <textarea id="jme_output" v-show="showMolFile" rows="10" :style="{ width: width + 'px' }" v-model="jme_output"></textarea>
</template>

<script>
const JSME_LOADER_JS_PATH = "/jsme-editor/loadJSME.js";
const JSME_JS_PATH = "/jsme-editor/jsme.nocache.js";

export default {
  name: "jsme",
  inject: ["blocks", "updateBlocks"],
  props: {
    id: String,
    width: String,
    height: String,
    options: String,
    editTagItem: Object,
  },
  data() {
    return {
      jsmeApplet: undefined,
      showMolFile: false,
      jme_output: null,
    };
  },
  created() {
    this.loadJSMEScript();
  },
  methods: {
    getSmiles() {
      document.JME = this.jsmeApplet;
      var data = document.JME.smiles();
      this.jme_output = data;
      this.showMolFile = true;
    },
    chageHandler(event) {
      let smiles = event.src.smiles(); //atom that are colored are numbered
      let target = this.blocks.filter((r) => r.block.editTagId === this.id)[0];
      const editTagItem = { editTagItem: { data: smiles } };
      target.block = { ...target.block, ...editTagItem };
      this.updateBlocks(this.blocks);
    },
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
    getMolfile(isV3000) {
      document.JME = this.jsmeApplet;
      var data = document.JME.molFile(isV3000);
      this.jme_output = data;
      this.showMolFile = true;
    },
    molfileDownload() {
      this.$refs.vue3SimpleHtml2pdf.download();
    },
    loadJSMEScript() {
      this.destoryJSME();
      this.$loadScript(JSME_LOADER_JS_PATH)
        .then(() => {
          window.callBackJSME = this.initJSME;
          return this.$loadScript(JSME_JS_PATH);
        })
        .then(() => {})
        .catch(() => {
          console.log("Error-Jsme load");
        });
    },
    initJSME() {
      var smiles = null;
      if (this.editTagItem) {
        smiles = this.editTagItem.data;
      }
      this.jsmeApplet = new window.JSApplet.JSME(this.id, `${this.width}px`, `${this.height}px`, {
        options: this.options,
        chem: smiles,
      });
      this.jsmeApplet.setCallBack("AfterStructureModified", this.chageHandler); // 수정 이벤트
    },
    destoryJSME() {
      console.log("jsme destroyed");
      window.JSApplet = null;
      window.callBackJSME = null;
      this.$unloadScript(JSME_LOADER_JS_PATH).then(() => {
        console.log("unload loadJSME");
      });
      this.$unloadScript(JSME_JS_PATH).then(() => {
        console.log("unload nocache");
      });
    },
  },
  destroyed() {
    this.destoryJSME();
  },
};
</script>

<style lang="scss">
.molfile-btn {
  &-icon {
    margin-right: 5px;
  }
}

#jme_output {
  margin-top: 2px;
}
</style>
