<template>
  <div v-if="openInputComment">
    <div v-for="item in comments" :key="item">
      <div @mouseover="showDel(item.pageCommentId, $event)" @mouseleave="hideDel" class="row">
        <div class="row col-2">
          <i class="fas fa-user col-1 comment-icon"></i>
          <p class="col comment-userId">{{ item.usr_uid }}</p>
        </div>
        <p class="col-7 comment-content">{{ item.content }}</p>
        <p class="col-3 comment-date">
          {{ item.updt_dttm }}
          <i class="fas fa-minus-circle comment-del" v-if="this.selectedComment !== '' && this.selectedComment == item.pageCommentId ? true : false" @click="delPageComment(item.comment_seq)"></i>
        </p>
      </div>
    </div>
    <CommentInput @updatePageComment="updatePageComment" @isCheckComment="isCheckComment" :option="pageKey" ref="input"></CommentInput>
  </div>
</template>

<script>
import CommentInput from "@/components/comment/commentInput.vue";
import Utils from "@/components/cmm/Utils.js";
import VariableContent from "@/Content.js";

export default {
  name: "commentView",
  props: { openInputComment: Boolean },
  inject: ["note_uid", "noteComments", "updateCmmt"],
  components: {
    CommentInput,
  },
  data() {
    return {
      comments: [],
      openDel: false,
      openViewComment: false,
      pageKey: "page",
      selectedComment: "",
    };
  },
  created() {
    if (this.noteComments !== undefined) {
      this.comments = this.noteComments;
    }
  },
  methods: {
    updatePageComment(comment) {
      const uid = new Utils();
      const date = uid.getTime();
      const userId = "sooah";
      // this.axios
      //   .post(`${VariableContent.URL}/cmmt`, {
      //     note_uid: this.note_uid,
      //     regDttm: date,
      //     updtDttm: date,
      //     userId: userId,
      //     content: comment,
      //   })
      //   .then((res) => {
      //     this.axios.get(`${VariableContent.URL}/cmmt/${this.note_uid}`).then((response) => {
      //       this.updateCmmt(response.data);
      //       this.comments = response.data;
      //     });
      //   });
      this.updateCmmt([]);
      this.comments = [];
    },
    isCheckComment() {
      if (this.comments.length === 0) {
        this.$emit("closeInputComment");
      }
    },
    isInputBox() {
      return this.openInputComment;
    },
    showDel(id, e) {
      this.comments.forEach((each, i) => {
        if (each.pageCommentId == id) {
          this.selectedComment = id;
        }
      });
    },
    hideDel() {
      this.selectedComment = "";
    },
    delPageComment(id) {
      this.axios.delete(`${VariableContent.URL}/cmmt/del/${this.note_uid}/${id}`).then((res) => {
        this.axios.get(`${VariableContent.URL}/cmmt/${this.note_uid}`).then((response) => {
          this.updateCmmt(response.data);
          this.comments = response.data;
          console.log(this.comments);
          response.data.length === 0 ? (this.openInputComment = false) : (this.openInputComment = true);
        });
      });
    },
  },
};
</script>
<style>
.commentViewBox {
  background: rgb(245, 245, 245);
  border-radius: 5px;
  padding: 10px;
}

.comment-date {
  font-size: 12px;
  color: gray;
}

.comment-content {
  font-size: 14px;
}

.comment-del:hover {
  cursor: pointer;
}

.comment-icon {
  line-height: 1.5;
}
</style>
