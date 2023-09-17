<template>
  <Modal v-if="showPageTag" @close="showModal = Modal" :width="'600px'">
    <template v-slot:header class="tag-layer-header">
      <h3>Add Tag</h3>
    </template>
    <template v-slot:body>
      <form>
        <div class="form-group mb-2">
          <label for="title">Tags : </label>
          <Tag @inputTags="addTags"></Tag>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <button class="page-tag-button" @click="save()">저장</button>
      <button class="page-tag-button" @click="close()">닫기</button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/cmm/Modal.vue";
import Tag from "@/components/cmm/Tag.vue";

export default {
  name: "w-editor-tag.vue",
  components: {
    Modal,
    Tag,
  },
  props: {
    showPageTag: String,
  },
  data() {
    return {};
  },
  methods: {
    addTags(tags) {
      this.$emit("inputTags", tags);
      console.log("tagssssssssss :: ");
      console.log(tags);
    },
    close() {
      this.$emit("closeTagModal");
    },
  },
};
</script>

<style lang="scss">
.tag-layer {
  &-header {
    padding: 0px;

    & h3 {
      padding-bottom: 0;
    }
  }
}

.page-tag-button {
  font-size: 13px;
  font-weight: 600;
  color: gray;
  border: none;
  border-radius: 8px;
  background: #dadada;
  margin-left: 10px;
  padding: 5px 10px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  &:hover {
    background: #2265f6;
    color: white;
  }
}
</style>
