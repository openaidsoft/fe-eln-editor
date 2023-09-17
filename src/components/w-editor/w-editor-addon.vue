<template>
  <div style="width: 100%">
    <JExcel v-if="editTag === editOption[0] ? true : false" :id="this.editTagId" :editTagItem="editTagItem"></JExcel>
    <Jsme v-if="editTag === editOption[1] ? true : false" :id="this.editTagId" :editTagItem="editTagItem" :width="600" :height="400" :options="opt_full_screen" @change="logSmiles"></Jsme>
    <Formula v-if="editTag === editOption[2] ? true : false" :id="this.editTagId" :editTagItem="editTagItem" class="w-100"></Formula>
    <ImageUpload v-if="editTag === editOption[3] ? true : false" @uploadImage="uploadImage" :imgUrl="imgUrl" :id="this.editTagId"></ImageUpload>
    <div v-if="editTag === editOption[4] ? true : false" :id="this.editTagId" style="border-top: 1px solid #c7c7c7; margin-top: 6px"></div>
  </div>
</template>

<script>
import Jsme from "@/components/jsme/jsme.vue";
import JExcel from "@/components/excel/jexcel.vue";
import Formula from "@/components/formula/formula.vue";
import ImageUpload from "@/components/cmm/ImageUpload.vue";
import Content from "@/Content.js";

export default {
  name: "w-editor-addon",
  components: {
    Jsme,
    JExcel,
    Formula,
    ImageUpload,
  },
  props: {
    editTag: String,
    id: String,
    imgUrl: String,
    editTagId: String,
    editTagItem: Object,
  },
  data() {
    return {
      opt_full_screen: Content.OPT_FULL_SCREEN, // JSME 옵션
      editOption: Content.EDITOR_TYPE_OPT,
    };
  },
  methods: {
    uploadImage(url, imageNm) {
      this.$emit("saveImageHandler", this.id, url, imageNm);
    },
  },
};
</script>
