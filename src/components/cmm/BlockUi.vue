<template>
<!--  <div class="block-layer fade" :class="{'show': show}"></div>-->
  <div class="block-layer show" v-if="show"></div>
</template>

<script>
export default {
  name: "BlockUi",
  props: {
    show: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  .block-layer {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1040;
    width: 100vw;
    height: 100vh;
    background-color: #20252a;
  }
  .show {
    opacity: 0.55;
  }
  .fade {
    opacity: 0;
  }
</style>
