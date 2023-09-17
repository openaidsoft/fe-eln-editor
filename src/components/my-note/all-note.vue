<template>
  <div class="search-box bg-light p-3 mb-2 border rounded">
    <b-form>
      <div class="col-11">
        <div class="row">
          <div class="col-sm-6">
            <b-form-group :label="`${$t('table_header.noteNm')} :`" label-for="nested-street" label-cols-sm="3" label-align-sm="end" label-size="sm" class="mv-1">
              <b-form-input id="nested-street" name="noteNm" size="sm"></b-form-input>
            </b-form-group>
          </div>
          <div class="col-sm-6">
            <b-form-group :label="`${$t('table_header.projectNm')} :`" label-for="nested-city" label-cols-sm="3" label-align-sm="end" label-size="sm">
              <b-form-input id="nested-city" name="projectNm" size="sm"></b-form-input>
            </b-form-group>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-6">
            <b-form-group :label="`${$t('table_header.shareYn')} :`" label-for="nested-city" label-cols-sm="3" label-align-sm="end" label-size="sm">
              <b-form-select v-model="ex1Selected" size="sm">
                <b-form-select-option name="share-yn" value="Y">Y</b-form-select-option>
                <b-form-select-option name="share-yn" value="N">N</b-form-select-option>
              </b-form-select>
            </b-form-group>
          </div>
          <div class="col-sm-6">
            <b-form-group :label="`${$t('table_header.noteStatus')} :`" label-for="nested-city" label-cols-sm="3" label-align-sm="end" label-size="sm">
              <b-form-select v-model="ex1Selected" size="sm">
                <b-form-select-option name="noteStatus" value="작성중">작성중</b-form-select-option>
                <b-form-select-option name="noteStatus" value="검토중">검토중</b-form-select-option>
                <b-form-select-option name="noteStatus" value="검토완료">검토완료</b-form-select-option>
              </b-form-select>
            </b-form-group>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <Button>저장</Button>
        <Button>초기화</Button>
      </div>
    </b-form>
  </div>

  <div class="d-flex justify-content-start pb-1">
    <Button @click="cellDelete">삭제</Button>
  </div>

  <div v-show="showProject" class="projectList">
    <ag-grid-vue
      style="width: 100%; height: 100%"
      class="ag-theme-balham"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :gridOptions="gridOptions"
      pagination="true"
      paginationPageSize="10"
      domLayout="autoHeight"
      rowSelection="multiple"
      @grid-ready="onGridReady"
    >
    </ag-grid-vue>
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue3";
import axios from "axios";
import VariableContent from "@/Content.js";

export default {
  name: "note-list",
  data() {
    return {
      id: "",
      columnDefs: null,
      rowData: null,
      gridApi: null,
      columnApi: null,
      gridOptions: null,
      pageOption: null,
      showProject: true,
      showModal: false,
      list: null,
    };
  },
  props: {
    noteOpt: String,
  },
  components: {
    AgGridVue,
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
    this.getList();
  },
  mounted() {
    this.columnDefs = [
      { checkboxSelection: true, width: "40px" },
      { headerName: this.$t("table_header.id"), field: "note_uid", flex: 3, sortable: true, cellClass: "grid-cell-centered", hide: true },
      {
        headerName: this.$t("table_header.noteLV"),
        field: "grd_cd",
        flex: 2,
        sortable: true,
        cellClass: "grid-cell-centered",
        cellRenderer: (params) => {
          // if (params.data.noteLV === "1Lv") {
          //   var Lv = '<span style="background:#bababa; padding:2px 4px; border-radius:5px; color:#4d4d4d; font-weight:bold; font-size:10px;">' + params.data.noteLV + "</span>";
          // } else if (params.data.noteLV === "2Lv") {
          //   var Lv = '<span style="background:#ff9c32; padding:2px 4px; border-radius:5px; color:#4d4d4d; font-weight:bold;font-size:10px;">' + params.data.noteLV + "</span>";
          // } else if (params.data.noteLV === "3Lv") {
          //   var Lv = '<span style="background:#81d0e3; padding:2px 4px; border-radius:5px;color:#4d4d4d; font-weight:bold; font-size:10px;">' + params.data.noteLV + "</span>";
          // } else {
          //   var Lv = '<span style="background:#d6e468; padding:2px 4px; border-radius:5px;color:#4d4d4d; font-weight:bold;font-size:10px;">' + params.data.noteLV + "</span>";
          // }
          // return Lv;
        },
      },
      {
        headerName: this.$t("table_header.shareYn"),
        field: "share_yn",
        flex: 2,
        sortable: true,
        cellClass: "grid-cell-centered",
        cellRenderer: (params) => {
          if (params.data.shareYn === "Y") {
            var share = '<i class="fas fa-users" style="color:#0055f8"></i>';
          } else {
            var share = '<i class="fas fa-users"  style="color:#a7a7a7"></i>';
          }
          return share;
        },
      },
      {
        headerName: this.$t("table_header.projectNo"),
        field: "pjt_uid",
        flex: 3,
        cellClass: "grid-cell-centered",
        // TODO : 프로젝트 명
        cellRenderer: (params) => {
          return params.data.pjt_uid;
        },
      },
      {
        headerName: this.$t("table_header.noteNm"),
        field: "title",
        flex: 4,
        cellClass: "grid-cell-centered",
        cellRenderer: (params) => {
          const title = '<a href="#" style="text-decoration:none; color:black;">' + params.value + "</a>";
          return title;
        },
        onCellClicked: (params, e) => {
          const id = params.data.note_uid;
          this.$router.push({ path: `/note/${id}` });
        },
      },
      {
        headerName: this.$t("table_header.noteStatus"),
        field: "st_cd",
        flex: 2,
        cellClass: "grid-cell-centered",
        cellRenderer: (params) => {
          if (params.value === "NS01") {
            var status = '<i class="fas fa-edit me-1"  style="color:grey"></i>작성중';
          } else if (params.value === "NS02") {
            var status = '<i class="fas fa-spinner me-1" style="color:red"></i>작성완료';
          } else if (params.value === "NS03") {
            var status = '<i class="fas fa-spinner me-1" style="color:blue"></i>검토중';
          } else {
            var status = '<i class="fas fa-check-circle me-1" style="color:green"></i>검토완료';
          }
          return status;
        },
      },
      { headerName: this.$t("table_header.createdDate"), field: "reg_dttm", sortable: true, flex: 2, cellClass: "grid-cell-centered" },
      { headerName: this.$t("table_header.lastRevisionDate"), field: "updt_dttm", sortable: true, flex: 2, cellClass: "grid-cell-centered" },
    ];
  },
  methods: {
    getList(opt) {
      axios.get(`${VariableContent.URL}/note`).then(
        (response) => {
          let noteList = [];
          response.data.forEach((each) => {
            if (opt === "my") {
              // 세션 아이디와 작성자 아이디가 같은 리스트를 반환
            //  const usr_id = this.$session.get("usr_id");
             // if (each.ownr_uid === usr_id) {
                noteList.push(each);
             // }
            } else if (opt === "shared") {
              if (each.shared_yn === "Y") {
                noteList.push(each);
              }
            } else {
              noteList.push(each);
            }
          });
          this.rowData = noteList;
        },
        (error) => {
          console.log(error.response.data.message);
        }
      );
    },
    // TODO :: project명을 가져옴
    // getPjtNm(pjt_uid) {
    //   if (pjt_uid) {
    //     axios.get(`${VariableContent.URL}/project/nm/${pjt_uid}`).then((r) => {
    //       pjt_uid = r.data[0].pjt_nm;
    //     });
    //   }
    // },
    onGridReady(params) {
      this.gridApi = params.api;
      this.columnApi = params.columnApi;
    },
    getSelectedRows() {
      const selectedNodes = this.gridApi.getSelectedNodes();
      const selectedData = selectedNodes.map((node) => node.data);
    },
    addProject() {
      //this.gridApi.applyTransaction({ add: [{}] }); // 아래에 row 1줄 추가
      this.$router.push("inputForm");
    },
    cellDelete() {
      const selectedRows = this.gridApi.getSelectedRows();
      const noteUid = `${selectedRows[0].note_uid}`;
      this.axios.delete(`${VariableContent.URL}/note/del/${noteUid}`).then((res) => {
        this.axios.get(`${VariableContent.URL}/note`).then((res) => {
          this.rowData = res.data;
        });
      });
    },
    changeListView() {
      this.showProject = false;
    },
    changeCardView() {
      this.showProject = true;
    },
  },
  watch: {
    noteOpt: {
      handler() {
        this.getList(this.noteOpt);
      },
    },
  },
};
</script>
<script lang="scss"></script>
