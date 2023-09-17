<template>
  <off-canvas :style="{ background: '#faf8e6' }">
    <template v-slot:header>
      <h4>{{ title }}</h4>
    </template>
    <template v-slot:body>
      <div class="pjt-edit-form">
        <div class="each-input">
          <div class="ms-1">
            <label for="" class="form-label">프로젝트 명</label>
          </div>
          <input class="w-100 pjt-edit-input" v-model="title" />
        </div>
        <div class="each-input">
          <div class="ms-1">
            <label for="" class="form-label">프로젝트 리더</label>
          </div>
          <input class="w-100 pjt-edit-input" v-model="leader" />
        </div>
        <div class="each-input">
          <div class="ms-1">
            <label for="" class="form-label">태그</label>
          </div>
          <Tag :value="tags" @inputTags="getTags"></Tag>
        </div>

        <div class="text-end">
          <Button @click="editPjt">수정</Button>
        </div>
      </div>
    </template>
  </off-canvas>
</template>

<script>
import offCanvas from "@/components/cmm/offCanvas.vue";
import { defineComponent } from "vue-demi";
import Tag from "@/components/cmm/Tag.vue";


export default defineComponent({
  name: "pjt-eidt",
  components: {
    offCanvas,
    Tag,
  },
  data() {
    return {
      title: "",
      leader: "",
      tags: null,
      pjt_uid: null,
    };
  },
  props: {
    data: Object,
  },
  methods: {
    editPjt() {
      this.$emit("editPjt", this.pjt_uid, this.title, this.leader, this.tags);
    },
    getTags(val) {
      if (val) {
        this.tags = val;
        console.log(this.tags);
      }
    },
  },
  watch: {
    data: {
      handler() {
        this.title = this.data.pjt_nm;
        this.pjt_uid = this.data.pjt_uid;
        this.leader = this.data.pjt_leader;
        this.tags = this.data.tag_nm;
      },
    },
  },
});
</script>

<style lang="scss">
.pjt-edit-form {
  margin-top: 10px;
  padding: 20px 20px;
  border-top: 1px solid rgb(209, 209, 209);
  border-bottom: 1px solid rgb(209, 209, 209);
}
.each-input {
  margin-bottom: 20px;
}

.pjt-edit-input {
  border-radius: 8px;
  border: none;
  border-bottom: 1px solid gray;
  font-size: 13px;
  font-weight: 600px;
  color: gray;
  padding: 10px;

  &:focus {
    outline: none;
  }
}
</style>
