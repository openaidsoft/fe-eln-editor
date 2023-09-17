<template>
  <wEditorContainer :isSideComment="isSideComment">
    <template v-slot:header>
      <div id="titleBox" @mouseover="showTitleOpt" @mouseleave="hideTitleOpt" style="margin-bottom: 20px" :class="pageId">
        <div class="page-option d-flex">
          <!-- <p type="button" class="page-option-tag m-0" @click="openPageTag" :class="{ invisible: tagOption }"><i class="fas fa-tag"></i>태그추가</p> -->
          <p type="button" class="page-option-comment m-0" @click="openComment" :class="{ invisible: titleOpt }"><i class="far fa-comment-dots mr-1"></i>코멘트</p>
        </div>
        <input class="page-title" type="text" v-bind:value="title" v-on:input="updateInputTitle" @keydown="titleOnKeyDownHandler" />
        <WeditorTag :showPageTag="showPageTag" :tags="tags" @inputTags="inputTags" @closeTagModal="hidePageTag"></WeditorTag>
        <Comment :openInputComment="openInputComment" :pageKey="'newNote'" :note_uid="note_uid" :titleComments="titleComments" ref="comment" @closeInputComment="closeInputComment"></Comment>
      </div>
    </template>
    <template v-slot:body>
      <draggable :list="blocks" item-key="id" @change="dragEvent" handle=".handle">
        <template #item="{ element }" style="margin-right: 50px">
          <div class="board d-flex" @mouseover="showIcon(element.id)" @mouseout="hideIcon(element.id)" :id="element.id" ref="board">
            <div class="d-flex icons invisible" ref="iconBox" :id="element.id">
              <i class="fas fa-arrows-alt icon handle" title="드래그로 이동할 수 있습니다." :id="element.block.positionId"> <input type="hidden" value="{{ element.id }}" /></i>
              <i class="fas fa-ellipsis-h icon" title="삭제 및 추가기능" @click="showOption(element.block.positionId, element.id)"></i>
            </div>
            <wOptEditor
              ref="editortypeBlock"
              v-if="element.block.editTag"
              :editTag="element.block.editTag"
              :editTagId="element.block.editTagId"
              :editTagItem="element.block.editTagItem"
              :id="element.id"
              :imgUrl="element.image.url"
              @saveImageHandler="saveImageHandler"
            ></wOptEditor>
            <EditorOption
              ref="optionlist"
              :id="element.id"
              :positionId="element.block.positionId"
              @closeOption="hideOption"
              @selectOption="optionSelect"
              v-if="positionId == element.block.positionId"
            ></EditorOption>
            <Emoji :showEmoji="showEmoji" v-if="currentId == element.id" v-click-outside="emojiClose" @selectedEmoji="inputEmoji" :id="element.id"></Emoji>
            <eitableBlock
              v-if="!editor_type_opt.includes(element.block.editTag)"
              :id="element.id"
              :tag="element.block.tag"
              :editTag="element.block.editTag"
              :order="element.order"
              :modelValue="element.block.html"
              :positionId="element.block.positionId"
              :style="{ color: element.block.color, background: element.block.background }"
              :emoji="emoji"
              :icon="element.block.icon"
              :iconStyle="element.block.iconStyle"
              @openMenu="openTagMenu(element)"
              @addBlock="addBlockHandler"
              @updateList="updateListHandler"
              @updateHTML="updateHTMLHandler"
              @deleteList="deleteListHandler"
              @deleteBlock="deleteBlockHandler($event, element)"
              @tagUpdate="updateTag"
              ref="editBlock"
            />
            <div id="eachCommentCount" v-if="element.comments !== ''">
              <div class="d-flex">
                <i class="fas fa-comment comment-icon"></i>
                <div class="comment-cnt">{{ element.comments.length }}</div>
              </div>
            </div>
          </div>
        </template>
      </draggable>
    </template>
    <template v-slot:comment>
      <div v-for="item in blocks" :key="item">
        <div v-if="item.comments !== ''" class="each-comment-box">
          <EachComment :content="item" :isEachComment="isEachComment" :pageKey="'newNote'" :id="item.id" ref="eachCommentRef" @showSideBox="showSideBox"></EachComment>
        </div>
      </div>
    </template>
  </wEditorContainer>
</template>

<script>
import { watch, provide, ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import wEditorContainer from "@/components/w-editor/w-editor-container.vue";
import Utils from "@/components/cmm/Utils.js";
import VariableContent, { basic_block } from "@/Content.js";
import eitableBlock from "@/components/w-editor/text-editor/editable-block.vue";
import wOptEditor from "@/components/w-editor/w-editor-addon.vue";
import draggable from "vuedraggable";
import EditorOption from "@/components/w-editor/text-editor/block-functions.vue";
import Comment from "@/components/comment/commentView.vue";
import EachComment from "@/components/comment/eachCommentView.vue";
import WeditorTag from "@/components/w-editor/w-editor-tag.vue";
import Emoji from "@/components/cmm/Emoji.vue";
import { getNoteService, getNoteCmmtService, saveBlockService } from "@/components/w-editor/w-editor-service.js";
import { blockStore } from "@/store/blockStore.js";

function showIcons(id, i) {
  const iconBox = document.getElementsByClassName("icons");
  iconBox.forEach((each, i) => {
    if (each.id == id) {
      each.className = "d-flex icons visible";
    }
  });
}

function hideIcons(id, opt) {
  const iconBox = document.getElementsByClassName("icons");
  iconBox.forEach((each, i) => {
    if (each.id == id) {
      each.className = "d-flex icons invisible";
    }
  });
}

export default {
  name: "w-editor",
  props: {
    hot_list: Boolean,
    note_uid: ref(""),
    pre_note_uid: ref(""),
    testVal: String,
  },
  setup(props) {
    const store = blockStore();
    const route = useRoute();
    let title = ref("");
    let blockBox = reactive([]);
    let noteComments = reactive([]);
    let noteTags = reactive([]);
    let openInputComment = ref(false);

    // 로컬 스토리지에 저장된 노트가 있을 경우 db에 저장해 줌
   // store.getLocalStorage()

    // 해당노트를 불러옴
    const getNote = async (note_uid) => {
      let arr = await getNoteService(note_uid);
      blockBox.splice(0);
      let obj = JSON.parse(arr.content);
      obj.length ? obj.filter((each) => blockBox.push(each)) : blockBox.push(obj);
      title.value = arr.title;
      getNoteCmmt(note_uid);
    };
    // 코멘트를 불러옴
    const getNoteCmmt = async (note_uid) => {
      let res = await getNoteCmmtService(note_uid);
      noteComments.splice(0);
      res.length ? res.filter((each) => noteComments.push(each)) : (noteComments = res);
      noteComments.length !== 0 ? (openInputComment = true) : (openInputComment = false);
    };
    // 블럭 저장
    const saveBlock = async (note_uid, title, blockBox) => {
      const res = await saveBlockService(note_uid, title.value, blockBox);
    };

    // 노트간 이동시 파람 변경을 감지해서 노트를 불러옴
    watch(
      () => props.note_uid,
      () => {
        saveBlock(props.pre_note_uid, title, blockBox);
        getNote(props.note_uid);
        store.resetData();
      }
    );
    // 첫 노트 이동시 해당노트를 불러옴
    getNote(props.note_uid);

    // 다른 경로로 이동시 블럭 저장
    watch(
      () => route.path,
      (to, from) => {
        if (to != from) {
          saveBlock(props.note_uid, title, blockBox);
          store.resetData();
        }
      }
    );

    const updateBlocks = (item) => {
      blockBox = item;
    };

    const updateCommentBlocks = (id, item) => {
      blockBox.forEach((each) => {
        if (each.id === id) {
          if (item === "") {
            each.comments = "";
          } else {
            each.comments.push(item);
          }
        }
      });
    };

    const updateCmmt = (comments) => {
      noteComments.splice(0);
      comments.filter((each) => noteComments.push(each));
    };

    //창을 닫을 때, 새로고침 될 때 블럭저장
    window.addEventListener("beforeunload", (event) => {
      event.preventDefault();
      saveBlock(props.note_uid, title, blockBox);
    });

    watch(blockBox, () => {
      console.log("block 값이 바뀔 때 마다 실행되는 함수");
      console.log(blockBox);

      store.setNotes(props.note_uid, title, blockBox);
    });

    console.log("blockBox");
    console.log(blockBox);

    provide("note_uid", props.note_uid);
    provide("blocks", blockBox);
    provide("noteComments", noteComments);
    provide("openInputComment", openInputComment);
    provide("updateCmmt", updateCmmt);
    provide("updateBlocks", updateBlocks);

    provide("updateCommentBlocks", updateCommentBlocks);

    return {
      blocks: blockBox,
      tags: noteTags,
      title,
      openInputComment,
      noteComments,
    };
  },
  components: {
    Utils,
    wEditorContainer,
    eitableBlock,
    wOptEditor,
    draggable,
    EditorOption,
    Comment,
    EachComment,
    WeditorTag,
    Emoji,
  },
  data() {
    return {
      currentId: "",
      positionId: "",
      menuOpen: false,
      noteTitle: "제목없음",
      titleComments: "",
      isSideComment: false,
      titleOpt: true,
      tagOption: true,
      showPageTag: false,
      isEachComment: false,
      editor_type_opt: VariableContent.EDITOR_TYPE_OPT,
      editor_tag_opt: VariableContent.EDITOR_TAG_OPT,
      fontColor: null,
      backgroundColor: null,
      showEmoji: false,
      isEditorVisible: "hidden",
      emoji: null,
    };
  },
  methods: {
    updateInputTitle(e) {
      this.title = e.target.value;
    },
    // 이모지 옵션 오픈
    inputEmoji(emoji, id) {
      this.blocks.forEach((each, i) => {
        if (each.id == id) {
          each.block.html += emoji;
          this.emoji = emoji;
          return;
        }
      });
    },
    emojiClose() {
      this.showEmoji = false;
    },
    // 이미지 저장
    saveImageHandler(id, url, imageNm) {
      this.blocks.forEach((each, i) => {
        if (each.id == id) {
          each.image.url = url;
          each.image.imageNm = imageNm;
        }
      });
    },
    //페이지 태그 입력 오픈
    openPageTag() {
      this.showPageTag = true;
    },
    hidePageTag() {
      this.showPageTag = false;
    },
    dragEvent(e) {
      //드래그 이벤트가 발생했을때 바뀐 블럭을 불러와서 오더를 다시 지정해줌
      this.setOrder();
    },
    setOrder() {
      this.blocks.forEach((each, i) => {
        each.order = i;
      });
    },
    getNewId() {
      const uid = new Utils();
      return uid.getUid();
    },
    // comment 유무에 따라 페이지 레이아웃 변경
    showSideBox() {
      let commentCnt = 0;
      this.blocks.forEach((each, i) => {
        if (each.comments !== "") {
          commentCnt + 1;
        }
      });
      setTimeout(() => {
        commentCnt === 0 ? (this.isSideComment = false) : (this.isSideComment = true);
      }, 100);
    },
    openComment() {
      //comment 입력창을 보여줌
      this.openInputComment = true;
    },
    closeInputComment() {
      //comment 입력창을 닫음
      this.openInputComment = false;
    },
    showTitleOpt() {
      this.tagOption = false;
      //페이지comment 확인 후 입력 옵션을 보여줌
      var isInputBox = this.$refs.comment.isInputBox();
      var isComment = this.$refs.comment.comments.length;

      if (isComment !== 0 || isInputBox === true) {
        this.openInputComment = true;
        this.titleOpt = true;
      } else {
        this.titleOpt = false;
      }
    },
    hideTitleOpt() {
      this.tagOption = true;
      this.titleOpt = true;
    },
    showIcon(i) {
      // 각 행에 마우스 오버시에 옵션 아이콘을 보여줌
      showIcons(i);
    },
    hideIcon(i) {
      hideIcons(i);
    },
    //block functions menu 오픈
    showOption(positionId) {
      this.positionId = positionId;
    },
    hideOption() {
      this.positionId = "";
    },
    updateTag(item, id) {
      // 변경된 태그 업데이트
      if (this.editor_type_opt.includes(item.tag)) {
        this.blocks.forEach((each, i) => {
          if (each.id == id) {
            each.block.tag = item.tag;
            each.block.editTag = item.tag;
            each.block.editTagId = this.getNewId();
            return;
          }
        });
      } else if (this.editor_tag_opt.includes(item.tag)) {
        this.blocks.forEach((each, i) => {
          if (each.id == id) {
            item.tag === "color" ? (each.block.color = item.colorLabel) : (each.block.background = item.colorLabel);
            return;
          }
        });
      } else if (item.tag === "list" || item.tag === "number-list") {
        this.blocks.forEach((each, i) => {
          if (each.id == id) {
            each.block.icon = item.icon;
            each.block.iconStyle = item.iconStyle;
            return;
          }
        });
      } else if (item.tag === "emoji") {
        this.currentId = id;
        this.blocks.forEach((each, i) => {
          if (each.id === id) {
            this.showEmoji = true;
            return;
          }
        });
      } else {
        this.blocks.forEach((each, i) => {
          if (each.id === id) {
            each.block.tag = item.tag;
            return;
          }
        });
      }
    },
    /**
     * 아이콘 클릭 옵션 삭제, 복제, 코멘트
     */
    optionSelect(item, id) {
      if (item.id == "delete") {
        this.deleteBlockHandler(id);
      } else if (item.id == "copy") {
        this.copyBlockHandler(id);
      } else if (item.id == "comment") {
        this.isEachComment = true;
        this.isSideComment = true;
        this.blocks.forEach((each, i) => {
          if (each.id == id) {
            each.comments = [];
          }
        });
      }
      this.positionId = "";
    },
    addBlockHandler(currentBlock) {
      let basicBlock = basic_block;
      let targetIdx = 1;

      this.blocks.forEach((each, idx) => {
        if (each.id === currentBlock.id) {
          targetIdx = idx + 1;
          return;
        }
      });
      this.blocks.splice(targetIdx, 0, basicBlock());
      this.blocks = this.blocks;
      this.setOrder();
    },

    // 해당 block 삭제
    deleteBlockHandler(id) {
      let targetIdx = 0;
      this.blocks.forEach((each, idx) => {
        if (each.id === id) {
          targetIdx = idx;
          return;
        }
      });
      if (this.blocks.length !== 1) {
        this.blocks.splice(targetIdx, 1);
      }
      this.setOrder();
    },
    // 해당 block 복제
    copyBlockHandler(id) {
      let targetIdx = 0;
      let copyBlock = [];
      this.blocks.forEach((each, idx) => {
        if (each.id === id) {
          var item = null;
          if (each.block.editTagItem) {
            item = {
              column: each.block.editTagItem.column,
              comments: each.block.editTagItem.comments,
              style: each.block.editTagItem.style,
              width: each.block.editTagItem.width,
              data: each.block.editTagItem.data,
            };
          }
          copyBlock = {
            block: {
              background: each.block.background,
              color: each.block.color,
              editTag: each.block.editTag,
              editTagId: each.block.editTagId,
              editTagItem: item,
              html: each.block.html,
              tag: each.block.tag,
              positionId: this.getNewId(),
            },
            id: this.getNewId(),
            comments: each.comments,
            image: { url: each.image.url, imageNm: each.image.imageNm },
          };
          targetIdx = idx + 1;
          this.blocks.splice(targetIdx, 0, copyBlock);

          return;
        }
      });
      this.setOrder();
    },
    updateListHandler(icon, iconStyle, id) {
      this.blocks.forEach((each) => {
        if (each.id === id) {
          each.block.icon = icon;
          each.block.iconStyle = iconStyle;
        }
      });
    },
    deleteListHandler(id) {
      this.blocks.forEach((each) => {
        if (each.id === id) {
          console.log("list icon del");
          each.block.icon = "";
          each.block.iconStyle = "";
        }
      });
    },
    updateHTMLHandler(curBlock) {
      this.blocks.forEach((each) => {
        if (each.id === curBlock.id) {
          each.block.html = curBlock.innerHTML;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.emoji-picker {
  position: absolute;
}

.page-option {
  &-tag,
  &-comment {
    font-size: 13px;
    padding: 2px 5px;
    color: rgb(148, 147, 147);
    &:hover {
      border-radius: 5px;
      background: rgb(235, 235, 235);
    }
  }
}
.each-comment-box {
  min-width: 250px;
  border: 1px solid rgb(202, 202, 202);
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
}

.icons {
  height: 30px;
}

.icon {
  color: rgb(158, 158, 158);
  padding: 5px;
  line-height: 1.3;
  &:hover {
    cursor: pointer;
    background: rgb(226, 225, 225);
    border-radius: 5px;
  }
}

.comment-icon {
  color: rgba(226, 137, 21, 0.7);
  line-height: 2;
}
.comment-cnt {
  font-size: 13px;
  margin-left: 3px;
  color: gray;
  line-height: 2.5;
}
.page-title {
  border: none;
  outline: none;
  width: 100%;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
