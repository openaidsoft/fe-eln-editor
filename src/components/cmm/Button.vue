<template>
  <button class="cmmButton">
    <slot></slot>
  </button>
</template>

<script></script>

<style lang="scss">
.cmmButton {
  border: none;
  border-radius: 5px;
  margin-bottom: 2px;
  margin-right: 5px;
  font-size: 12px;
  padding: 5px 10px;
  color: #676767;
  box-shadow: 2px 2px rgb(179, 179, 179);
  &:hover {
    cursor: pointer;
    color: rgb(203, 203, 203);
    background: rgb(115, 115, 115);
  }
}
</style>
