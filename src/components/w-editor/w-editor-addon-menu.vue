<template>
  <ul class="list-group tag-list-group" style="margin-top: 30px" id="tagGroup" @mouseleave="$emit('closeTagMenu')">
    <li
      v-for="(tagItem, idx) in searchedItems.length !== 0 ? searchedItems : items"
      :key="idx"
      class="px-4 py-1 tag-list-group-item"
      :class="{ selected: isSelected(selectedItem, idx) }"
      :id="`${tagItem.seq}.${selectedItem}`"
      ref="tagItem"
    >
      <div class="pr-2" @click="$emit('select', tagItem, this.id, e)">
        <div v-if="tagItem.img">
          <img class="rounded white border" width="46" height="46" :src="tagItem.img" />
          {{ tagItem.label }}
        </div>
        <div v-else class="d-flex">
          <div class="tag-color-icon" :style="tagItem.tag === 'color' ? { color: tagItem.colorLabel } : { background: tagItem.colorLabel }"><i class="fas fa-font"></i></div>
          <div>{{ tagItem.label }}</div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "TagMenu",
  components: {},
  props: {
    id: String,
    tagName: String,
  },
  data() {
    return {
      items: [
        {
          id: "text",
          seq: 1,
          tagGroup: "기본그룹",
          tag: "p",
          label: "Text",
          description: "Just start writing with plain text.",
          img: "https://www.notion.so/images/blocks/text.9fdb530b.png",
        },
        {
          id: "heading-1",
          seq: 2,
          tagGroup: "기본그룹",
          tag: "h1",
          label: "제목 1",
          description: "Big section heading.",
          img: "https://www.notion.so/images/blocks/header.57a7576a.png",
        },
        {
          id: "heading-2",
          seq: 3,
          tagGroup: "기본그룹",
          tag: "h2",
          label: "제목 2",
          description: "Medium section heading.",
          img: "https://www.notion.so/images/blocks/subheader.9aab4769.png",
        },
        {
          id: "heading-3",
          seq: 4,
          tagGroup: "기본그룹",
          tag: "h3",
          label: "제목 3",
          description: "Small section heading.",
          img: "https://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png",
        },
        {
          id: "emoji",
          seq: 5,
          tagGroup: "기본그룹",
          tag: "emoji",
          label: "Emoji",
          description: "Writing with emoji.",
          img: "https://www.notion.so/images/blocks/text.9fdb530b.png",
        },
        {
          id: "jsme",
          seq: 7,
          tagGroup: "기본그룹",
          tag: "jsme",
          label: "Jsme",
          description: "Jsme.",
          img: "https://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png",
        },
        {
          id: "excel",
          seq: 6,
          tagGroup: "기본그룹",
          tag: "excel",
          label: "엑셀",
          description: "Excel.",
          img: "https://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png",
        },
        {
          id: "formula",
          seq: 8,
          tagGroup: "기본그룹",
          tag: "formula",
          label: "계산식",
          description: "Formula.",
          img: "https://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png",
        },
        {
          id: "image",
          seq: 9,
          tagGroup: "기본그룹",
          tag: "image",
          label: "이미지",
          description: "image",
          img: "https://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png",
        },
        {
          id: "divider",
          seq: 10,
          tagGroup: "기본그룹",
          tag: "divider",
          label: "구분선",
          description: "divider",
          img: "https://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png",
        },
        { label: "빨간색", tag: "color", colorLabel: "rgb(250, 0, 0)", tagGroup: "색", seq: 11 },
        { label: "노란색", tag: "color", colorLabel: "rgb(250, 215, 4)", tagGroup: "색", seq: 12 },
        { label: "초록색", tag: "color", colorLabel: "rgb(0, 250, 0)", tagGroup: "색", seq: 13 },
        { label: "주황색", tag: "color", colorLabel: "rgb(250, 142, 4)", tagGroup: "색", seq: 14 },
        { label: "파란색", tag: "color", colorLabel: "rgb(0, 0, 250)", tagGroup: "색", seq: 15 },
        { label: "빨간색", tag: "background", colorLabel: "rgba(250, 0, 0, 0.2)", tagGroup: "배경색", seq: 16 },
        { label: "노란색", tag: "background", colorLabel: "rgba(250, 215, 4, 0.2)", tagGroup: "배경색", seq: 17 },
        { label: "초록색", tag: "background", colorLabel: "rgba(0, 250, 0, 0.2)", tagGroup: "배경색", seq: 18 },
        { label: "주황색", tag: "background", colorLabel: "rgba(250, 142, 4, 0.2)", tagGroup: "배경색", seq: 19 },
        { label: "파란색", tag: "background", colorLabel: "rgba(0, 0, 250, 0.2)", tagGroup: "배경색", seq: 20 },
        {
          id: "list",
          seq: 10,
          tagGroup: "기본그룹",
          tag: "list",
          label: "리스트",
          description: "list",
          icon: "&#9679",
          iconStyle: { fontSize: "8px", marginLeft: "", marginRight: "8px", marginTop: "7px" },
          img: "https://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png",
        },
        {
          id: "number-list",
          seq: 10,
          tagGroup: "기본그룹",
          tag: "number-list",
          label: "번호리스트",
          description: "number-list",
          icon: 1,
          iconStyle: { marginLeft: "", marginRight: "8px", marginRight: "5px" },
          img: "https://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png",
        },
      ],
      selectedItem: 0,
      directKey: ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"],
      searchedItems: [],
      command: "",
      menu: false,
      isInputOption: false,
      selected: false,
      isActive: "",
    };
  },
  methods: {
    isSelected(selectedItem, i) {
      if (i == selectedItem) {
        return true;
      } else {
        return false;
      }
    },
    menuScroll(id) {
      document.getElementById(id).scrollIntoView({ block: "center" });
    },
    onKeyDown(key) {
      if (this.$refs.tagItem[0]) {
        this.selected = this.isActive;
      }
      this.searchedItems = [];
      this.items.forEach((each, i) => {
        if (each.tag.includes(key)) {
          this.searchedItems.push(each);
        }
        return this.searchedItems;
      });
      switch (key) {
        case "Enter":
          let selecItem = this.items[this.selectedItem];
          this.$emit("select", selecItem, this.id);
          this.menu = false;
          break;
        case "Backspace":
          if (!this.command) this.menu = false;
          this.command = this.command.substring(0, this.command.length - 1);
          break;
        case "ArrowUp":
          const prevSelected = this.selectedItem == 0 ? this.items.length - 1 : this.selectedItem - 1;
          this.selectedItem = prevSelected;
          this.isSelected();
          this.menuScroll(this.$refs.tagItem[this.selectedItem].id);
          break;
        case "ArrowDown":
          const nextSelected = this.selectedItem === this.items.length - 1 ? 0 : this.selectedItem + 1;
          this.selectedItem = nextSelected;
          this.isSelected();
          this.menuScroll(this.$refs.tagItem[this.selectedItem].id);
          break;
        default:
          break;
      }
    },
  },
  watch: {
    value(val) {
      val && (this.menu = true);
    },
    menu(val) {
      !val && this.$emit("input", false);
      val && (this.selectedItem = 0);
    },
  },
  provide() {
    return {};
  },
  inject: [],
};
</script>

<style lang="scss">
.tag-list-group {
  height: 500px;
  list-style: none;
  overflow: hidden;
  overflow-y: scroll;
  background: #fbfbfb;
  padding-left: 8px;
  margin-left: 52px;
  position: absolute;
  z-index: 9999999;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  box-shadow: 2px 2px rgb(179, 179, 179);

  &-item {
    width: 250px;
    list-style: none;
    font-size: 14px;
    &:hover {
      cursor: pointer;
      background: rgb(238, 237, 237);
    }
  }

  &-children {
    margin-bottom: 5px;
    &-item {
      padding: 2px;
      &:hover {
        cursor: pointer;
        background: rgb(193, 193, 193);
      }
    }
  }
}
.tag-list-group-item.selected {
  background: rgb(212, 212, 212);
}

.option-title {
  margin-bottom: 0px;
  margin-left: 20px;
  font-size: 10px;
  color: #808080;
}
#dragDiv {
  margin-right: 2px;
  font-size: 20px;
  color: gray;
}

.inputOption {
  font-size: 20px;
  color: gray;
}

.tag-color-icon {
  margin-right: 5px;
}
</style>
