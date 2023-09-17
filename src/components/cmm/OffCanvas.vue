<template>
  <div class="offcanvas" :class="{ show: show, 'offcanvas-end': offcanvasEnd }" v-if="show" style="visibility: visible">
    <div class="offcanvas-header">
      <slot name="header"></slot>
      <button type="button" class="btn-close text-reset" v-on:click="close"></button>
    </div>
    <slot name="body"></slot>
  </div>
</template>
<script>
/**
 * OffCanvas options 상수
 */
export class OffCanvasConst {
  static PROP_TEST = {
    LEFT: "offcanvas-start", // 좌에서 우
    RIGHT: "offcanvas-end", // 우에서 좌
    BOTTOM: "offcanvas-bottom", // 아래서 위
  };
}

export default {
  // offcanvas-start, offcanvas-bottom, offcanvas-end
  name: "OffCanvas",
  props: {
    show: Boolean,
    offcanvasEnd: Boolean,
  },
  data() {
    return {};
  },
  emits: ["onClose"],
  methods: {
    close() {
      this.$emit("onClose", null);
    },
  },
};
</script>
<style scoped lang="scss">
.offcanvas-end {
  padding: 5px;
}
.offcanvas {
  padding: 5px;
}
</style>
