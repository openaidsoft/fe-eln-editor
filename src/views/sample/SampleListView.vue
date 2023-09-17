<template>
  <sample-list @onDetail="onDetail"></sample-list>
</template>
<script>
import SampleList from "@/components/sample/SampleList.vue";
export default {
  name: "SampleListView",
  components: { SampleList },
  methods: {
    onDetail(id) {
      this.$router.push({ name: "SampleDetailView", params: { id: id } });
    },
  },
};
</script>
<style scoped></style>
