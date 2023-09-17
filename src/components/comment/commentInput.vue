<template>
  <div class="mt-3">
    <div class="d-flex justify-content-between">
      <div>
        <i class="far fa-comment-dots icons" style="margin-right: 5px"> </i>
      </div>
      <div class="base-inputBox d-flex" :class="{ showInputBox: showInputBox }" v-click-outside="onClickOutside">
        <input
          type="text"
          id="InputComment"
          placeholder="코멘트 추가"
          v-model="comment"
          @click="selectedInput"
          @mouseover="focusInput"
          @mouseleave="unfocusInput"
          @keyup.enter="onKeyDownHandler"
          maxlength="50"
        />
        <i class="fas fa-share commentSendBtn icons" type="button" contenteditable style="color: #2f75b8" @click="addComment"></i>
      </div>
    </div>
  </div>
  <div class="divideLine" v-if="contentKey ? false : true"></div>
</template>

<script>
import vClickOutside from "click-outside-vue3";

export default {
  name: "comment",
  props: {
    id: String,
    option: String,
  },
  components: {
    vClickOutside,
  },
  setup() {},
  data() {
    return {
      commentBlock: {
        id: "",
        userId: "",
        date: "",
        content: "",
      },
      previousKey: "",
      comment: "",
      param: "",
      selectInput: "",
      showInputBox: "",
    };
  },
  computed: {},
  methods: {
    onClickOutside() {
      this.showInputBox = false;
      this.$emit("isCheckComment", this.id);
    },
    focusInput() {
      this.selectInput = true;
    },
    unfocusInput() {
      this.selectInput = false;
    },
    selectedInput() {
      this.showInputBox = true;
    },
    addComment() {
      if (this.option == "page") {
        this.$emit("updatePageComment", this.comment);
      } else {
        this.$emit("updateComment", this.id, this.comment);
      }
      this.comment = "";
    },
    onKeyDownHandler(e) {
      if (e.key == "Enter") {
        if (this.previousKey !== "Shift") {
          e.preventDefault();
          this.addComment();
        }
      }
      this.previousKey = e.key;
    },
  },
};
</script>

<style lang="scss">
.commentSendBtn {
  visibility: hidden;
}

.base-inputBox {
  width: 100%;
}

#InputComment {
  border: none;
  outline: none;
  width: 95%;
  font-size: 13px;
}

.commentSendBtn:hover {
  font-size: 1.25rem;
}

.divideLine {
  border-bottom: 0.5px solid #cfcfcf;
  margin-top: 5px;
  margin-bottom: 5px;
}

.icons {
  line-height: 2;
}

.selectInput {
  background: rgb(241, 241, 241);
  border-radius: 5px;
  padding: 5px;
}
.showInputBox {
  outline: 3px solid rgba(90, 150, 187, 0.4);
  border-radius: 5px;
  padding-left: 5px;
  .commentSendBtn {
    visibility: visible;
  }
}
</style>
