<template>
  <router-view></router-view>
  <div class="mb-2 d-flex row justify-content-between">
    <div class="col-md-6">
      <form action="" method="POST" name="search">
        <div class="project-group text-start">
          <input type="text" class="project-search" placeholder="검색어를 입력하세요" />
          <button type="submit" class="btn project-search-btn"><i class="fa fa-search"></i></button>
        </div>
      </form>
    </div>
    <div class="d-flex pjt-button-box row col-md-6">
      <div class="col-sm-8">
        <Button @click="edit()">수정</Button>
        <Button @click="del()">삭제</Button>
        <Button @click="moveToAchving()">move to achive</Button>
      </div>
      <div class="col-sm-4 text-end">
        <Button @click="addProject()" title="add project"><i class="fas fa-plus"></i></Button>
        <Button @click="changeListView()" title="type of card"><i class="fas fa-grip-vertical"></i></Button>
        <Button @click="changeCardView()" title="type of list"><i class="fas fa-list"></i></Button>
      </div>
    </div>
    <ConfirmAlert v-if="isConfirm" :message="message" @cancel="cancel" @confirm="confirm"></ConfirmAlert>
  </div>
  <div v-show="showProject" class="projectList">
    <ag-grid-vue
      style="width: 100%; height: 100%"
      class="ag-theme-balham"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :gridOptions="gridOptions"
      pagination="true"
      paginationPageSize="5"
      domLayout="autoHeight"
      rowSelection="multiple"
      @grid-ready="onGridReady"
    >
    </ag-grid-vue>
  </div>
  <!-- 카드형 목록 -->
  <div v-show="!showProject" class="card-container">
    <div v-for="(item, idx) in rowData" :key="idx" class="card-list">
      <div class="card">
        <div class="card-header">
          <div class="d-flex justify-content-between">
            <h6 class="card-title">{{ item.pjt_nm }}</h6>
            <div class="achive">achive</div>
          </div>
        </div>
        <div class="card-body">
          <div class="card-contents">
            <p class="card-text"><strong>ProjectNo : </strong>{{ item.pjt_uid }}</p>
            <p class="card-text"><strong>Leader : </strong>{{ item.pjt_leader }}</p>
            <div class="card-text">
              <div v-if="item.tag_nm !== null">
                <strong>Tag : </strong>
                <div v-for="tag in item.tag_nm" :key="tag" class="cardTag">
                  <span class="tagCnt badge">{{ tag }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="text-end">
            <a href="#" class="card-end" @click="moveDiagram(idx)">
              <i class="fas fa-angle-double-right"></i>
              Go Detail</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <pjtEdit @onClose="slideClose" :show="isPjtSlide" :offcanvasEnd="isEndPosition" :data="pjtData" @editPjt="editPjt"></pjtEdit>
</template>

<script>
import { AgGridVue } from "ag-grid-vue3";
import ProjectProcess from "@/components/project/process.vue";
import MyResearchService from "@/services/myResearch.service.js";
import Utils from "@/components/cmm/Utils.js";
import VariableContent from "@/Content.js";
import pjtEdit from "@/components/project/edit.vue";
import ConfirmAlert from "@/components/cmm/Confirm.vue";

export default {
  name: "project-list",
  data() {
    return {
      columnDefs: null,
      rowData: null,
      gridApi: null,
      columnApi: null,
      gridOptions: null,
      showProject: true,
      isPjtSlide: false,
      isEndPosition: false,
      pjtData: null,
      pjtUid: null,
      isConfirm: false,
      message: null,
    };
  },
  components: {
    ProjectProcess,
    MyResearchService,
    AgGridVue,
    pjtEdit,
    ConfirmAlert,
  },
  beforeMount() {
    this.gridOptions = {
      columnTypes: {
        numberType: {
          cellClass: "cell-right",
          valueFormatter: (params) => {
            return Number(params.value).toLocaleString();
          },
        },
      },
    };
  },
  created() {
    // composition api로 하려했으나 ag-grid에 값이  들어가지 않음
    this.getList();

    this.columnDefs = [
      { checkboxSelection: true, width: "40px" },
      { headerName: this.$t("table_header.id"), field: "pjt_seq", flex: 3, sortable: true, cellClass: "grid-cell-centered", hide: true },
      {
        headerName: this.$t("table_header.new_note"),
        width: "100px",
        cellClass: "grid-cell-centered",
        align: "center",
        cellRenderer: () => {
          var note = "";
          note =
            '<a href="#"><i class="fas fa-plus add-project-note-btn" style="border:1px solid gray;padding: 3px; border-radius: 5px;color:gray;margin-right:5px;" title="해당 프로젝트의 새로운 노트 생성"></i></a>';
          return note;
        },
        onCellClicked: (params, e) => {
          this.isConfirm = true;
          this.message = "새 노트를 작성하시겠습니까? ";
          this.pjtUid = params.data.pjt_uid;
        },
      },
      { headerName: this.$t("table_header.regNo"), field: "pjt_uid", flex: 3, sortable: true, cellClass: "grid-cell-centered" },
      { headerName: this.$t("table_header.year"), field: "year", flex: 3, cellClass: "grid-cell-centered" },
      {
        headerName: this.$t("table_header.title"),
        field: "pjt_nm",
        filter: true,
        flex: 8,
        cellClass: "grid-cell-centered",
        cellRenderer: (params) => {
          var note = "";
          const title = '<a href="#" style="text-decoration:none; color:black; width:100%; margin-right:5px;">' + params.value + "</a>";
          if (params.data.note !== null && params.data.note !== "" && params.data.note !== undefined) {
            note = '<a href="#"><i class="fas fa-file-alt project-note-btn" style="color:#a0a0a0; font-size:15px; padding:3px; "></i></a>' + params.data.note.length;
          }
          return title;
        },
        onCellClicked: (params, e) => {
          const id = params.rowIndex;
          this.$router.push({
            name: "프로젝트 프로세스",
            params: {
              name: "projectId",
              projectId: this.rowData[id].pjt_seq,
              title: this.rowData[id].pjt_nm,
              regNo: this.rowData[id].pjt_uid,
              tag: this.rowData[id].tag_nm,
              leader: this.rowData[id].pjt_leader,
            },
          });
        },
      },
      { headerName: this.$t("table_header.leader"), field: "pjt_leader", flex: 3, cellClass: "grid-cell-centered" },
      {
        headerName: this.$t("table_header.tag"),
        field: "tag",
        flex: 4,
        align: "center",
        cellRenderer: (params) => {
          let tag = "";
          if (params.data.tag_nm !== null && params.data.tag_nm.length > 1) {
            for (var i = 0; i < params.data.tag_nm.length; i++) {
              tag += '<span class="tag-element badge px-1" style="background:#f8a062; border-radius:5px;">' + params.data.tag_nm[i] + "</span> ";
            }
          } else {
            if (params.data.tag_nm !== null) {
              tag += '<span class="tag-element badge px-1" style=" background:#f8a062; border-radius:5px;">' + params.data.tag_nm[0] + "</span> ";
            }
          }
          return tag;
        },
      },
    ];
  },
  methods: {
    cancel() {
      this.isConfirm = false;
    },
    confirm() {
      this.$router.push({ name: "newNote", params: { part: "pjt", id: this.pjtUid } });
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.columnApi = params.columnApi;
    },
    getList() {
      this.axios.get(`${VariableContent.URL}/project`).then((response) => {
        response.data.length ? (this.rowData = response.data) : (this.rowData = null);
        this.rowData.forEach((each) => {
          if (each.tag_nm.length > 1) {
            each.tag_nm = each.tag_nm.split(",");
          } else {
            each.tag_nm = null;
          }
        });
      });
    },
    addProject() {
      this.$router.push("inputForm");
    },
    moveToAchving() {
      const uid = new Utils();
      const newDate = uid.getTime();
      const selectedRows = this.gridApi.getSelectedRows();

      this.axios
        .patch(`${VariableContent.URL}/project/${selectedRows[0].pjt_uid}`, {
          date: newDate,
        })
        .then((response) => {
          console.log(response);
          this.getList();
        });
    },
    changeListView() {
      this.showProject = false;
    },
    changeCardView() {
      this.showProject = true;
    },
    edit() {
      const selectedRows = this.gridApi.getSelectedRows();
      if (selectedRows.length > 1) {
        alert("수정은 하나씩만 가능합니다. 선택한 프로젝트를 확인해주세요.");
        return;
      } else if (selectedRows.length === 0) {
        alert("수정하실 프로젝트를 선택해주세요.");
        return;
      }
      this.isPjtSlide = true;
      this.isEndPosition = true;
      this.pjtData = selectedRows[0];
    },
    editPjt(pjt_uid, title, leader, tags) {
      const uid = new Utils();
      this.axios
        .post(`${VariableContent.URL}/project/${pjt_uid}`, {
          pjt_nm: title,
          pjt_leader: leader,
          updtDttm: uid.getTime(),
        })
        .then((r) => {
          let tag_nm = "";
          tags.forEach((each, i) => {
            i === tags.length - 1 ? (tag_nm += each) : (tag_nm += each + ",");
          });
          this.axios
            .post(`${VariableContent.URL}/pjtTag/${pjt_uid}`, {
              tag_nm: tag_nm,
            })
            .then((r) => {
              alert("수정되었습니다.");
              this.getList();
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    slideClose() {
      this.isPjtSlide = false;
    },
    del() {},
  },
};
</script>

<style scoped lang="scss">
.add-project-note-btn:hover {
  background: gray;
}

.pjt-button-box {
  margin-top: 10px;
}

.table_style {
  width: 90%;
  position: relative;
  padding-top: 10px;
}

.table_style ul {
  clear: left;
  margin: 0;
  padding: 0;
  list-style-type: none;
  cursor: pointer;
}

.table_style ul.header li {
  font-weight: bold;
  text-align: center;
  border-top: 1px solid #000;
}

.table_style ul li {
  float: left;
  margin: 0;
  padding: 2px 1px;
  border-bottom: 1px solid #000;
}

.icon {
  font-size: 14px;
  color: #50586c;
}

.card {
  width: 280px;
  height: 180px;

  &-list {
    display: inline-block;
    margin-right: 25px;
    margin-bottom: 40px;
  }

  &-header {
    padding: 18px 20px 13px 20px;

    & .achive {
      color: gray;
      font-size: 12px;
      line-height: 1.2;
      text-decoration: none;
      padding: 2px 5px 2px 5px;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background: rgb(119, 119, 119);
        color: white;
      }
    }
  }

  &-contents {
    margin-bottom: 10px;
  }

  &-title {
    margin: 0;
    font-size: 15px;
  }

  &-body {
    padding-top: 20px;
    padding-bottom: 15px;
  }

  &-text {
    margin-bottom: 5px;
    font-size: 12px;
  }

  &-end {
    color: gray;
    font-size: 13px;
    padding: 5px;
    border-radius: 5px;

    &:hover {
      background: 2265f6;
    }
  }
}

.card .cardTag,
.cardTag > div {
  display: inline;
  margin-right: 3px;
}

.tagCnt {
  background: #f8a062;
}
</style>
