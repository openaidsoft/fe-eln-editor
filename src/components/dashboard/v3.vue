<template>
  <router-view></router-view>
  <div class="mb-2 d-flex justify-content-end">
    <div v-show="showProject">
      <button @click="cellDelete()" class="btn btn-sm menu-btn achive" style="margin-right: 10px">move to achive</button>
    </div>
    <div class="text-right">
      <button @click="addProject()" class="btn btn-sm menu-btn" style="" title="add project"><i class="fas fa-plus project-menu-icon"></i></button>
      <button @click="changeListView()" class="btn btn-sm menu-btn" style="" title="type of card"><i class="fas fa-grip-vertical project-menu-icon"></i></button>
      <button @click="changeCardView()" class="btn btn-sm menu-btn" style="" title="type of list"><i class="fas fa-list project-menu-icon"></i></button>
    </div>
  </div>

  <div v-show="showProject" class="projectList">
    <ag-grid-vue
      style="width: 100%; height: 500px"
      class="ag-theme-balham"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :gridOptions="gridOptions"
      pagination="true"
      paginationPageSize="5"
      domLayout="autoHeight"
      rowSelection="multiple"
      @grid-ready="onGridReady"
      @cell-clicked="onCellClicked"
    >
    </ag-grid-vue>
  </div>
  <!-- 카드형 목록 -->
  <div v-show="!showProject" class="card-container">
    <div v-for="(item, idx) in rowData" :key="idx" class="card-list">
      <div class="card">
        <div class="card-header">
          <div class="d-flex justify-content-between">
            <h6 class="card-title">{{ item.title }}</h6>
            <div class="achive">achive</div>
          </div>
        </div>
        <div class="card-body">
          <div class="card-contents">
            <p class="card-text"><strong>ProjectNo : </strong>{{ item.regNo }}</p>
            <p class="card-text"><strong>Leader : </strong>{{ item.leader }}</p>
            <div class="card-text">
              <strong>Tag : </strong>
              <div v-for="tag in item.tag" :key="tag" class="cardTag">
                <div v-if="{ tag }">
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

 
</template>

<script>
import MyResearchService from "@/services/myResearch.service.js";
import { AgGridVue } from "ag-grid-vue3";

export default {
  name: "v3",
  data() {
    return {
      columnDefs: null,
      rowData: null,
      gridApi: null,
      columnApi: null,
      gridOptions: null,
      pageOption: null,
      showProject: true,
      showModal: false,
      id: "",
    };
  },
  components: {
    MyResearchService,
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
  mounted() {
    MyResearchService.getList().then(
      (response) => {
        this.columnDefs = [
          { checkboxSelection: true, width: "40px" },
          { headerName: "id", field: "id", width: "100px", sortable: true, cellClass: "grid-cell-centered", hide: true },
          { headerName: "ID", field: "regNo", width: "100px", sortable: true, cellClass: "grid-cell-centered" },
          { headerName: "Year", field: "year", width: "100px", cellClass: "grid-cell-centered" },
          { headerName: "Title", field: "title", filter: true, width: "400px", cellClass: "grid-cell-centered" },
          { headerName: "Reader", field: "leader", width: "100px", cellClass: "grid-cell-centered" },
          {
            headerName: "Tag",
            field: "tag",
            width: "400px",
            align: " center",
            cellRenderer: (params) => {
              var tag = "";
              if (params.value !== null && params.value[0].length > 1) {
                var tags = params.valueFormatted.split(",");
                for (var i = 0; i < tags.length; i++) {
                  tag += '<span class="tag-element badge px-1" style="background:#f8a062; border-radius:5px;">' + tags[i] + "</span> ";
                }
              } else {
                if (params.value[0].length == 0) {
                  tag = "";
                } else {
                  tag += '<span class="tag-element badge px-1" style=" background:#f8a062; border-radius:5px;">' + params.value + "</span> ";
                }
              }
              return tag;
            },
          },
        ];
        this.rowData = response;
      },
      (error) => {
        console.log(error.response.data.message);
      }
    );
  },
  methods: {
    getList() {
      MyResearchService.getList().then((response) => {
        this.rowData = response;
      });
    },
    moveDiagram(id) {
      console.log("이동데이터" + this.rowData[id].id);
      this.$router.push({
        name: "연구과제",
        params: {
          name: "projectId",
          projectid: this.rowData[id].id,
          title: this.rowData[id].title,
          year: this.rowData[id].year,
          regNo: this.rowData[id].regNo,
          tag: this.rowData[id].tag,
          leader: this.rowData[id].leader,
        },
      });
    },
    onCellClicked(e) {
      this.id = e.rowIndex;
      this.moveDiagram(this.id);
    },
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
      const id = `${selectedRows[0].id}`;
      const year = `${selectedRows[0].year}`;
      const title = `${selectedRows[0].title}`;
      const tag = `${selectedRows[0].tag}`;
      const regNo = `${selectedRows[0].regNo}`;
      const leader = `${selectedRows[0].leader}`;
      MyResearchService.moveAchive(year, title, tag, regNo, leader).then((response) => {
        MyResearchService.deleteProject(id).then((response) => {
          this.gridApi.applyTransaction({ remove: selectedRows });
          this.getList();
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
};
</script>

<style scoped lang="scss">
.menu-btn {
  padding: 0;
  &.achive {
    background: #f5f7f7;
    padding: 7px 10px 7px 10px;
    border: 1px solid rgb(202, 202, 202);
    font-weight: 500;
    border-radius: 8px;
    text-decoration: none;

    &:hover {
      text-decoration: none;
      background: rgb(255, 255, 255);
      cursor: pointer;
    }
  }
}

.project-menu-icon {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid rgb(209, 209, 209);
  background: #f5f7f7;
  &:hover {
    background: rgb(255, 255, 255);
    cursor: pointer;
  }
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

a:hover {
  background-color: #2265f6;
  color: white;
}
a:hover > .icon {
  color: white;
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
