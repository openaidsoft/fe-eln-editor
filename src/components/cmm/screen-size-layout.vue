<template>
  <div class="screenOption" :class="{ optBasic: optBasic, optFull: optFull }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Layout",
  props: {
    optBasic: Boolean,
    optFull: Boolean,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss">
.option-btn {
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

  & i {
    margin-right: 3px;
  }

  &-slim {
    opacity: 0.3;
    &.active {
      opacity: 1;
    }
  }

  &-wide {
    opacity: 0.3;
    &.active {
      opacity: 1;
    }
  }
}

.optBasic {
  min-width: 800px;
  margin-right: 20%;
  margin-left: 20%;
  animation-name: screen-sm;
  animation-duration: 0.7s;
}

@keyframes screen-sm {
  0% {
    margin-right: 0%;
    margin-left: 0%;
  }

  100% {
    margin-right: 20%;
    margin-left: 20%;
  }
}

.optFull {
  min-width: 800px;
  margin-right: 0%;
  margin-left: 0%;
  animation-name: screen-full;
  animation-duration: 0.7s;
}

@keyframes screen-full {
  100% {
    margin-right: 0%;
    margin-left: 0%;
  }

  0% {
    margin-right: 20%;
    margin-left: 20%;
  }
}

@media screen and (max-width: 1200px) {
  .optBasic {
    margin: 0;
  }
  .optFull {
    margin: 0;
  }
}
</style>
