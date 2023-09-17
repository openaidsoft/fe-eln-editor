<template>
  <!-- <Button @click="saveJexcelData">엑셀내용 저장</Button> -->
  <div class="wrapper-jexcel d-flex">
    <div :id="id" class="spreadsheet" ref="spreadsheet" @keydown="anyKey"></div>
    <div class="d-flex align-items-center" @mouseover="showAddColumnBtn" @mouseleave="hideAddColumnBtn" style="width: 50px" :style="{ height: jexcelContainerHeight - 8 + 'px' }">
      <button class="insertRow-btn" v-if="openAddColumnBtn" @click="jExcelObj.insertColumn(), updateColumn()"><i class="fas fa-plus"></i></button>
    </div>
  </div>

  <div class="d-flex justify-content-center" @mouseover="showAddRowBtn" @mouseleave="hideAddRowBtn" style="height: 50px" :style="{ width: jexcelContainerWidth - 5 + 'px' }">
    <button class="insertColumn-btn" v-if="openAddRowBtn" @click="jExcelObj.insertRow(), updateRow()" style="height: 30px"><i class="fas fa-plus"></i></button>
  </div>
</template>

<script>
export default {
  name: "jexcel",
  props: {
    id: String,
    editTagItem: Object,
    excelData: Array,
    excelColumn: Array,
    template: String,
  },
  inject: ["blocks", "updateBlocks"],
  data() {
    return {
      JexcelObj: null,
      jexcelWidth: null,
      jexcelContainerWidth: null,
      jexcelContainerHeight: null,
      openAddColumnBtn: false,
      openAddRowBtn: false,
      jExcelOptions: null,
    };
  },
  created() {
    let exColumn = null;
    let exWidth = null;
    let style = null;
    let comments = null;
    if (this.editTagItem) {
      exColumn = this.editTagItem.column;
      exWidth = this.editTagItem.width;
      style = this.editTagItem.style;
      comments = this.editTagItem.comments;
    }
    const container = document.getElementsByClassName("jexcel_container");
    const jexcelEvent = ["onchange", "onchangestyle", "oncomments", "oninsertcolumn", "oninsertrow", "ondeletecolumn", "ondeleterow", "onchangepage", "onresizecolumn", "onresizerow"];

    setTimeout(() => {
      this.jExcelOptions = {
        minDimensions: [10, 10],
        allowComments: true,
        about: false,
        // sorting: true,
        filters: true,
        data: exColumn !== null ? exColumn : "",
        colWidths: exWidth !== null ? exWidth : { defaultColWidth: 50 },
        onevent: (event) => {
          // jexcel에서 일어나는 모든 이벤트 감지 그 중에 eventNm 해당하는 이벤트 발생시 this.change실행
          if (jexcelEvent.includes(event)) {
            this.change();
          }
        },
        toolbar: [
          {
            type: "i",
            content: "undo",
            onclick: function () {
              container[0].jexcel.undo();
            },
          },
          {
            type: "i",
            content: "redo",
            onclick: function () {
              container[0].jexcel.redo();
            },
          },
          {
            type: "i",
            content: "save",
            onclick: function () {
              container[0].jexcel.download();
            },
          },
          {
            type: "select",
            k: "font-family",
            v: ["Arial", "Verdana"],
          },
          {
            type: "select",
            k: "font-size",
            v: ["9px", "10px", "11px", "12px", "13px", "14px", "15px", "16px", "17px", "18px", "19px", "20px"],
          },
          {
            type: "i",
            content: "format_align_left",
            k: "text-align",
            v: "left",
          },
          {
            type: "i",
            content: "format_align_center",
            k: "text-align",
            v: "center",
          },
          {
            type: "i",
            content: "format_align_right",
            k: "text-align",
            v: "right",
          },
          {
            type: "i",
            content: "format_bold",
            k: "font-weight",
            v: "bold",
          },
          {
            type: "color",
            content: "format_color_text",
            k: "color",
          },
          {
            type: "color",
            content: "format_color_fill",
            k: "background-color",
          },
        ],
      };
      this.jExcelObj = jexcel(this.$refs["spreadsheet"], this.jExcelOptions);
      Object.assign(this, this.jExcelObj);
      this.jexcelContainerWidth = this.jExcelObj.el.clientWidth;
      this.jexcelContainerHeight = this.jExcelObj.el.clientHeight;
      // console.log(this.jExcelObj);
      // console.log(this.jExcelObj.getConfig());
      if (style) {
        this.setStyle(style);
      }
      // this.setComments("E1", "commentsssss");
    }, 500);
  },
  methods: {
    /**
     * excel의 값이 변경될 때마다 변경내용을 blocks에 반영
     */
    change() {
      let target = this.blocks.filter((r) => r.block.editTagId === this.id)[0];
      const eachWidth = [];
      this.jExcelObj.getWidth().forEach((eachWid) => eachWidth.push(eachWid)); // excel의 각column의 width를 저장
      const data = this.jExcelObj.getJson(); // excel의 값을 json형태로 불러옴
      const style = this.jExcelObj.getStyle();
      let comments = this.jExcelObj.getComments();
      console.log(comments);
      // console.log(comments == {});
      // if (Object.keys(comments)) {
      //   console.log(Object.keys(comments));
      // }
      // let commentsarr = comments.split(",");
      // TODO: getConfig도 있음.. 다른 옵션도 저장이 필요한지 확인필요xx. , comments 저장
      const editTagItem = { editTagItem: { column: data, width: eachWidth, style: style, comments: comments } };
      target.block = { ...target.block, ...editTagItem };
      this.updateBlocks(this.blocks);
    },
    updateColumn() {
      this.jexcelContainerWidth = this.jExcelObj.el.clientWidth;
    },
    updateRow() {
      this.jexcelContainerHeight = this.jExcelObj.el.clientHeight;
    },
    showAddRowBtn() {
      this.openAddRowBtn = true;
    },
    hideAddRowBtn() {
      this.openAddRowBtn = false;
    },
    showAddColumnBtn() {
      this.openAddColumnBtn = true;
    },
    hideAddColumnBtn() {
      this.openAddColumnBtn = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper-jexcel {
  padding-right: 50px;
}
.insertRow-btn {
  height: 100%;
  border: none;
  border-radius: 8px;
  text-align: center;
}
.insertColumn-btn {
  width: 100%;
  border: none;
  border-radius: 8px;
  text-align: center;
}
</style>
