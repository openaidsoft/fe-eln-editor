<template>
  <ul class="list-group optionGroup p-3" style="margin-top: 20px; z-index: 100" id="optionGroup" v-click-outside="closeOption">
    <div class="text-left list-group-item border-bottom p-0 fs-6 text-mute">
      <p class="option-title">기본블록</p>
    </div>
    <!-- <li class="list-group-item">
      <input type="text" class="" @keydown="keyDownHandler" autofocus />
    </li> -->
    <li v-for="(item, i) in searchedItems.length != 0 ? searchedItems : items" :key="i" class="px-4 py-1 list-group-item" :class="{ selected: isSelected(selectedItem, i) }" ref="optionItem">
      <div class="pr-2" @click="$emit('selectOption', item, this.id, e)">
        <i :class="item.icon" width="46" height="46"></i>
        {{ item.label }}
      </div>
    </li>
  </ul>
</template>

<script>
import vClickOutside from "click-outside-vue3";
export default {
  name: "TagMenu",
  components: {
    vClickOutside,
  },
  props: {
    id: String,
    positionId: String,
    tagName: String,
  },
  data() {
    return {
      items: [
        {
          id: "delete",
          label: "삭제",
          description: "Delete",
          icon: "fas fa-trash-alt",
        },
        {
          id: "copy",
          label: "복제",
          description: "Copy",
          icon: "far fa-copy",
        },
        {
          id: "comment",
          label: "코멘트",
          description: "Comment",
          icon: "far fa-comment-dots",
        },
      ],
      selectedItem: 0,
      searchedItems: [],
      command: "",
      menu: false,
      isInputOption: false,
      selected: false,
      isActive: "",
    };
  },
  methods: {
    closeOption() {
      this.$emit("closeOption");
    },
    isSelected(selectedItem, i) {
      if (i == selectedItem) {
        return true;
      } else {
        return false;
      }
    },
    keyDownHandler(e) {
      this.searchedItems = [];
      // if (key !== "" && key !== null) {
      //   this.items.forEach((each, i) => {
      //     if (each.tag.includes(e.key)) {
      //       this.searchedItems.push(each);
      //     }
      //     return this.searchedItems;
      //   });
      // }
      switch (e.key) {
        case "Enter":
          this.$emit("selectOption", this.items[this.selectedItem], this.id);
          this.menu = false;
          break;
        case "Backspace":
          if (!this.command) this.menu = false;
          this.command = this.command.substring(0, this.command.length - 1);
          break;
        case "ArrowUp":
          e.preventDefault();
          const prevSelected = this.selectedItem == 0 ? this.items.length - 1 : this.selectedItem - 1;
          this.selectedItem = prevSelected;
          this.isSelected();
          break;
        case "ArrowDown":
          e.preventDefault();
          const nextSelected = this.selectedItem === this.items.length - 1 ? 0 : this.selectedItem + 1;
          this.selectedItem = nextSelected;
          this.isSelected();
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
};
</script>

<style lang="scss">
.list-group-item.selected {
  background: rgb(212, 212, 212);
}

.list-group-item {
  width: 200px;
  list-style: none;
}

.list-group-item:hover {
  cursor: pointer;
  background: rgb(238, 237, 237);
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

.optionGroup {
  width: 150px;
  padding-right: 8px;
  padding-left: 8px;
  margin-top: 30px;
}
#optionGroup {
  position: absolute;
  z-index: 999;
}
</style>
