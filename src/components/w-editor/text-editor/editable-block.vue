<template>
  <TagMenu class="tag" ref="taglist" :id="this.id" :tagName="tagNm" v-if="openTagMenu" @closeTagMenu="closeTagMenu" @select="tagSelect" />
  <span v-if="icon" v-html="icon" :style="iconStyle"></span>
  <component
    class="block d-inline"
    ref="editable"
    v-html="html"
    contenteditable
    :id="id"
    :is="this.tag"
    :order="order"
    :style="style"
    @keydown="onKeyDownHandler"
    @focus="focusHandler"
    @focusout="focusoutHandler"
    @input="onChangeHandler"
  >
  </component>
</template>

<script>
import { watch, ref } from "vue";
import Content from "@/Content.js";
import TagMenu from "@/components/w-editor/w-editor-addon-menu.vue";
import EditorOption from "@/components/w-editor/text-editor/block-functions.vue";

function getCur(el) {
  var bl = document.getElementsByClassName("block");
  bl.forEach((element, i) => {
    if (element.id == el.id) {
      setTimeout(() => {
        bl[i].focus();
      }, 200);
    }
    return;
  });
}

async function getPre(el) {
  const bl = document.getElementsByClassName("block");
  await bl.forEach((element, i) => {
    if (element.id == el.id) {
      if (i !== 0) {
        var pre = i - 1;
        setTimeout(() => {
          bl[pre].focus();
        }, 100);
      }
    }
  });
}

/**
 *
 */
// async function getNext(el) {
//   var bl = document.getElementsByClassName("block");
//   await bl.forEach((element, i) => {
//     if (element.id == el.id) {
//       var next = i + 1;
//       setTimeout(() => {
//         if (bl[next]) {
//           bl[next].focus();
//         }
//       }, 100);
//       console.log(bl[next].id);
//       return bl[next].id;
//     }
//   });
// }

export default {
  name: "EditableBlock",
  components: {
    TagMenu,
    EditorOption,
  },
  inject: ["blocks"],
  setup() {
    const OPT_REACTION = "reaction";
    const OPT_FULL_SCREEN = "fullScreenIcon";

    return {
      OPT_REACTION,
      OPT_FULL_SCREEN,
    };
  },
  props: {
    id: Number,
    tag: String,
    editTag: String,
    modelValue: String,
    positionId: String,
    order: Number,
    style: Object,
    emoji: Object,
    icon: String,
    iconStyle: Object,
  },
  data() {
    return {
      placeholderText: "다양한 입력 옵션은 '/' 를 사용하세요.",
      html: null,
      openTagMenu: false,
      openOption: false,
      tagNm: "",
      optionNm: "",
      inputTag: "",
      preBlock: null,
      tab: null,
      nextId: null,
    };
  },
  created() {
    this.inputTag = this.tag;
    this.html = this.modelValue;
  },
  methods: {
    onChangeHandler(e) {
      e.preventDefault();
      this.$emit("updateHTML", this.currentBlock());
    },
    /**
     * block focus 되었을 때 입력된 내용이 없을 시 placeholder 내용 출력
     */
    focusHandler(e) {
      setTimeout(() => {
        if (e.target.innerHTML.length === 0) {
          e.target.innerHTML = this.placeholderText;
          e.target.style.color = "#a1a1a1";
        }
      }, 50);
    },
    /**
     * block에서 focusout 되었을 때 placeholder 이동
    //  */
    focusoutHandler(e) {
      if (e.target.innerHTML === this.placeholderText) {
        e.target.innerHTML = "";
      }
    },
    /**
     * 현재 block을 ref로 가져옴
     */
    currentBlock() {
      const currentBlock = this.$refs.editable;
      return currentBlock;
    },
    /**
     * 태그 선택시 기본 text태그와 추가기능 태그로 나뉨
     * 블럭 업데이트 'tagUpdate'
     * 추가기능 태그 선택시 기능을 추가하고 아래에 새로운 기본 블럭을 추가함 'addBlock'
     */
    tagSelect(item, id) {
      if (Content.EDITOR_TYPE_OPT.includes(item.tag)) {
        this.inputTag = item.tag;
        setTimeout(() => {
          this.$emit("addBlock", this.currentBlock());
          this.$emit("tagUpdate", item, id, this.currentBlock());
          getNext(this.currentBlock());
        }, 100);
      } else if (item.tag === "list") {
        console.log("9675, 9632, 9679");
        this.$emit("tagUpdate", item, id, this.currentBlock());
      } else if (item.tag === "number-list") {
        item.icon = `${item.icon}.`;
        this.$emit("tagUpdate", item, id, this.currentBlock());
      } else {
        this.inputTag = item.tag;
        setTimeout(() => {
          this.$emit("tagUpdate", item, id, this.currentBlock());
          getCur(this.currentBlock());
        }, 100);
      }
      this.openTagMenu = false;
    },
    closeTagMenu() {
      this.openTagMenu = false;
    },
    /**
     * 에디터 텍스트 입력
     */
    onKeyDownHandler(e) {
      if (e.target.innerHTML === this.placeholderText) {
        e.target.innerHTML = "";
        e.target.style.color = "black";
      }

      const Nm = "";
      this.tagNm = Nm + e.key;
      /**
       * '/' 키로 에디터 옵션메뉴를 오픈
       */
      if (e.key === "/") {
        e.preventDefault();
        this.openTagMenu = true;
      }
      /**
       * 에디터 옵션메뉴가 열려 있을때 ref로 옵션메뉴의 키보드메서드를 사용
       */
      if (this.openTagMenu) {
        e.preventDefault();
        this.$refs.taglist.onKeyDown(e.key);
        if (e.key === "Escape") {
          this.openTagMenu = false;
        }
        if (e.key === "Backspace") {
          // Backspace로 지웠을 때 메뉴 닫힘
          setTimeout(() => {
            e.preventDefault();
            if (e.target.innerHTML.length == 0) {
              this.openTagMenu = false;
            }
          }, 100);
        }
      } else {
        if (e.key === "Enter") {
          if (this.previousKey !== "Shift") {
            e.preventDefault();
            if (this.icon) {
              if (isNaN(Number(this.icon))) {
                this.$emit("updateHTML", this.currentBlock());
                this.$emit("addBlock", this.currentBlock());
                this.getNext(this.currentBlock());
                setTimeout(() => {
                  this.$emit("updateList", this.icon, this.iconStyle, this.nextId);
                }, 100);
              } else {
                console.log(Number(this.icon) + 1);
                this.$emit("updateHTML", this.currentBlock());
                this.$emit("addBlock", this.currentBlock());
                this.getNext(this.currentBlock());
                setTimeout(() => {
                  this.$emit("updateList", `${Number(this.icon) + 1}.`, this.iconStyle, this.nextId);
                  console.log(e.target);
                }, 100);
              }
            } else {
              this.$emit("updateHTML", this.currentBlock());
              this.$emit("addBlock", this.currentBlock());
              this.getNext(this.currentBlock());
            }
          }
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          getPre(this.currentBlock());
        }
        if (e.key === "ArrowDown") {
          e.preventDefault();
          this.getNext(this.currentBlock());
        }
        if (e.key === "Backspace") {
          /**
           * 마지막 텍스트를 지웠을 때 placeholder 출력
           */
          if (e.target.innerHTML.length === 1) {
            e.target.innerHTML = this.placeholderText;
            e.target.innerHTML === this.placeholderText ? (e.target.style.color = "#a1a1a1") : "";
          }

          // 내용이 없을 때 backspace 눌러, text block 한칸 삭제
          if (e.target.innerHTML.length === 0) {
            e.preventDefault();
            if (this.icon) {
              this.$emit("deleteList", this.currentBlock().id);
              e.target.innerHTML = this.placeholderText;
              setTimeout(() => {
                e.target.style.color = "#a1a1a1";
              }, 30);
            } else {
              getPre(this.currentBlock());
              this.$emit("deleteBlock", this.currentBlock().id);
            }
          }
        }
        if (e.key === "Tap") {
        }
        if (e.key === "Escape") {
          this.openTagMenu = false;
        }
        this.previousKey = e.key;
      }
    },
    getNext(el) {
      var bl = document.getElementsByClassName("block");
      bl.forEach((element, i) => {
        if (element.id == el.id) {
          var next = i + 1;
          setTimeout(() => {
            if (bl[next]) {
              bl[next].focus();
              this.nextId = bl[next].id;
            }
            bl[next].style.color = "#a1a1a1";
          }, 100);
        }
      });
    },
  },
  watch: {
    emoji: {
      handler() {
        if (this.emoji !== null) {
          if (this.id === this.currentBlock().id) {
            this.html = this.modelValue;
          }
        }
      },
    },
  },
};
</script>

<style lang="scss">
.block {
  width: 100%;
  padding: 2px;
  margin: 0px;
  outline: none;
}

#dragDiv {
  margin-right: 2px;
  font-size: 20px;
  color: gray;
}
</style>
