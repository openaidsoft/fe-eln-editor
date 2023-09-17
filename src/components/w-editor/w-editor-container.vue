<template>
  <div class="headerBox">
    <slot name="header"></slot>
  </div>
  <div class="editor-box d-flex justify-content-between">
    <div class="editor-body" :class="{ 'comment-box-mode': isSideComment }">
      <slot name="body"></slot>
    </div>
    <div class="editor-comment" :class="{ 'show-comment-box': isSideComment }">
      <slot name="comment"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "wEditorContainer",
  props: {
    isSideComment: Boolean,
  },
};
</script>

<style lang="scss">
.headerBox {
  padding-left: 52px;
}
.editor {
  &-box {
    margin-bottom: 300px;
  }
  &-body {
    width: 100%;
    &.comment-box-mode {
      width: 90%;
      margin-right: 15px;
    }
  }
  &-comment {
    &.show-comment-box {
      min-width: 300px;
      max-width: 400px;
    }
  }
}
</style>
