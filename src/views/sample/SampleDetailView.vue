<template>
  <div>
    <sample-detail :board-id="id"></sample-detail>
  </div>
  <div>
    <back-button button-name="뒤로"></back-button>
  </div>
</template>
<script>
import SampleDetail from "@/components/sample/SampleDetail.vue";
import BackButton from "../../components/cmm/BackButton.vue";

export default {
  name: "SampleDetailView",
  components: { BackButton, SampleDetail },
  data() {
    return {
      id: String,
    };
  },
  created() {
    this.id = this.$route.params.id;
  },
};
</script>
<style scoped></style>
