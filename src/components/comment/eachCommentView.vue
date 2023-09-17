<template>
  <div v-for="item in content.comments" :key="item">
    <div @mouseover="showDel(item.eachCommentId)" @mouseleave="hideDel" class="">
      <div class="d-flex justify-content-between">
        <div>
          <i class="fas fa-user each-comment-icon" style="margin-right: 3px"></i>
          <span class="each-comment-userId">{{ item.userId }}</span>
        </div>
        <div>
          <span class="col-7 each-comment-date"
            >{{ item.date }}
            <i
              class="fas fa-minus-circle each-comment-del"
              v-if="this.selectedComment !== '' && this.selectedComment == item.eachCommentId ? true : false"
              @click="delEachComment(item.eachCommentId)"
            ></i>
          </span>
        </div>
      </div>
      <p class="col-7 each-comment-content w-100">{{ item.comment }}</p>
    </div>
  </div>
  <CommentInput @commentlist="commitList" :id="this.content.id" @updateComment="updateComment"></CommentInput>
</template>

<script>
import CommentInput from "@/components/comment/commentInput.vue";
import Utils from "@/components/cmm/Utils.js";
export default {
  name: "eachCommentView",
  props: {
    content: Object,
  },
  components: {
    CommentInput,
  },
  data() {
    return {
      comments: [],
      openDel: false,
      openViewComment: false,
      selectedComment: "",
    };
  },
  inject: ["blocks", "updateBlocks", "updateCommentBlocks"],
  methods: {
    isInputBox() {
      return this.openInputCommend;
    },
    showDel(id) {
      this.content.comments.forEach((each, i) => {
        if (each.eachCommentId == id) {
          this.selectedComment = id;
        }
      });
    },
    hideDel() {
      this.selectedComment = "";
    },
    updateComment(id, comment) {
      const uid = new Utils();
      const inputcomment = {
        eachCommentId: uid.getUid(),
        date: uid.getTime(),
        userId: "sooah",
        comment: comment,
      };
      this.updateCommentBlocks(id, inputcomment);
    },
    delEachComment(id) {
      let targetIdx = 1;
      this.content.comments.forEach((r, idx) => {
        const commentsCnt = this.content.comments.length;
        if (r.eachCommentId === id) {
          targetIdx = idx;
          this.content.comments.splice(targetIdx, 1);
          if (commentsCnt === 1) {
            this.content.comments = "";
            this.updateCommentBlocks(this.id, "");
            this.$emit("showSideBox");
          }
          return;
        }
      });
    },
  },
};
</script>
<style>
.each-comment-icon {
  line-height: 2;
}
.each-comment-date {
  line-height: 3;
  font-size: 12px;
  color: gray;
}

.each-comment-content {
  font-size: 14px;
}

.each-comment-del:hover {
  cursor: pointer;
}
</style>
