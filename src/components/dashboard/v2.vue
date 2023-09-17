<template>
  <div>
    <div id="jsme_container" ref="jsme"></div>
    <div>
      <p>Smile Code: {{ smileCode }}</p>
      <p><span>Input SmileCode :</span> <input type="text" v-model="inputData" @input="updateSmileCode()" /></p>

      <button @click="setOption">JSME options</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

const JSME_LOADER_JS_PATH = "/jsme-editor/loadJSME.js";
const JSME_JS_PATH = "/jsme-editor/jsme.nocache.js";

export default {
  data() {
    return {
      jsmeApplet: undefined,
      smileCode: "",
      inputData: "",
      re: true,
    };
  },
  setup() {},
  created() {
    this.loadJSMEScript();
  },
  mounted() {
    console.log(this.$refs.jsme);
  },
  methods: {
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
      this.jsmeApplet = new window.JSApplet.JSME("jsme_container", "1000px", "800px", {
        options: "fullScreenIcon, reaction",
      });
      this.jsmeApplet.setCallBack("AfterStructureModified", this.getSmile);
    },
    updateSmileCode() {
      //키보드로 스마일 코드 입력하여 화면에 그리기
      console.log(this.jsmeApplet.readGenericMolecularInput(this.inputData));
    },
    getSmile(event) {
      //등록한 콜백에 대하여 이벤트를 받음
      this.smileCode = event.src.smiles();
      console.log(event.src.smiles());
      this.inputData = event.src.smiles();
    },
    setOption() {
      console.log(this.jsmeApplet.options);
      this.jsmeApplet.options("reaction");
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
