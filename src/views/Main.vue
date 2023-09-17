<template>
  <div>
    {{ $t("dummy.main_message") }}
  </div>
  <div class="mt-20">
    <button @click="onSample()">Go to Sample Page contains List and Detail page.</button>
  </div>
</template>
<script>
export default {
  name: "Main",
  components: {},
  methods: {
    onSample() {
      this.$router.push("Sample");
    },
  },
};
</script>
<style scoped>
.mt-20 {
  margin-top: 20px;
}
</style>
