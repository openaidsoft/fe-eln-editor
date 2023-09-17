<template>
  <div class="note-option text-end">
    <button class="note-option-icon" @click="this.$emit('isHotList')"><i class="fas fa-star" :class="{ hotList: addHotList }"></i></button>
    <button class="note-option-icon" @click="openWEditorOpt"><i class="fas fa-ellipsis-h"></i></button>
  </div>
  <div class="d-flex justify-content-end" v-if="showWEditorOpt">
    <ul class="editor-opt-list-group" @mouseleave="$emit('closeTagMenu')">
      <div class="editor-opt-list-group-title list-title">노트 옵션</div>
      <hr class="editor-opt-dvider" />
      <li class="editor-opt-list-group-item" @click="$emit('select', item, this.id, e)">
        <div class="editor-opt-list-group-item-label">폰트 사이즈</div>
        <div class="editor-opt-list-group-item-btn">
          <!-- <button class="note-option-size-icon"><i class="fas fa-compress-arrows-alt" :class="optBasic === false ? 'active' : ''"></i></button>
          <button class="note-option-size-icon"><i class="fas fa-expand-arrows-alt" :class="optBasic === true ? 'active' : ''"></i></button> -->
        </div>
      </li>
      <li class="editor-opt-list-group-item" @click="closeWEditorOpt">
        <div class="editor-opt-list-group-item-label">화면 사이즈</div>
        <div class="editor-opt-list-group-item-btn">
          <button class="editor-option-icon">
            <i class="fas fa-compress-arrows-alt editor-option-icon-slim" :class="optBasic === true ? 'active' : ''" @click="$emit('screenOpt', 'optBasic')"></i>
          </button>
          <button class="editor-option-icon">
            <i class="fas fa-expand-arrows-alt editor-option-icon-wide" :class="optBasic === false ? 'active' : ''" @click="$emit('screenOpt', 'optFull')"></i>
          </button>
        </div>
      </li>
      <li class="editor-opt-list-group-item" @click="closeWEditorOpt('template')">
        <div class="editor-opt-list-group-item-label">템플릿</div>
        <button class="editor-option-icon editor-option-icon-template"><i class="far fa-newspaper"></i></button>
      </li>
    </ul>
  </div>
  <slot></slot>
</template>

<script>
//TODO: option 상태는 cookie에 저장하여 활용한다.
export default {
  name: "Layout",
  props: {
    optBasic: Boolean,
    optFull: Boolean,
    addHotList: Boolean,
  },
  data() {
    return {
      showWEditorOpt: false,
    };
  },
  methods: {
    openWEditorOpt() {
      this.showWEditorOpt = !this.showWEditorOpt;
    },
    closeWEditorOpt(e) {
      this.showWEditorOpt = false;
      if (e === "template") {
        this.$emit("openTemplateOpt");
      }
    },
  },
};
</script>

<style lang="scss">
.editor-opt-list {
  &-group {
    width: 300px;
    max-height: 500px;
    padding: 10px;
    position: absolute;
    border: 1px solid rgb(163, 163, 163);
    border-radius: 8px;
    z-index: 99999;
    background: white;

    &-title {
      font-size: 14px;
      font-weight: 600px;
      padding: 5px;
      color: gray;
    }

    &-item {
      height: 40px;
      font-size: 14px;
      padding: 5px;
      color: gray;
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:hover {
        background: rgb(233, 233, 233);
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
}

.editor-option-icon {
  background: none;
  border: none;
  color: gray;

  & a {
    &:hover {
      border: none;
      font-size: 18px;
    }
  }
  &:hover {
    border: none;
    font-size: 18px;
  }

  &-slim {
    &.active {
      color: #42b983;
    }
  }

  &-wide {
    &.active {
      color: #42b983;
    }
  }
}

.editor-opt-dvider {
  margin-top: 5px;
}

.hotList {
  color: yellow;
}
</style>
