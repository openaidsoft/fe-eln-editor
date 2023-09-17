<template>
  <h1>{{ msg }}</h1>
  <ag-grid-vue style="width: 100%; height: 500px" class="ag-theme-balham" :columnDefs="columnDefs" :rowData="rowData" @cell-clicked="onCellClicked" domLayout="autoHeight"> </ag-grid-vue>
</template>

<script>
import SampleService from "@/services/sample.service";
import { AgGridVue } from "ag-grid-vue3";

export default {
  name: "SampleList",
  components: {
    AgGridVue,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      list: new Array(),
      columnDefs: null,
      rowData: null,
    };
  },
  emits: ["onDetail"],
  mounted() {
    //When this component is mounted
    SampleService.getList().then(
      (response) => {
        this.list = response;

        this.columnDefs = [
          { headerName: this.$t("table_header.id"), field: "id", width: "100px", cellClass: "grid-cell-centered" },
          { headerName: this.$t("table_header.title"), field: "title", filter: true, width: "400px" },
          { headerName: this.$t("table_header.user_id"), field: "userId", width: "100px", align: "center" },
        ];
        this.rowData = response;
      },
      (error) => {
        console.log(error.response.data.message);
        // this.content = error.response.data.message
      }
    );
  },
  /* begin of Methods */
  methods: {
    onDetail(id) {
      this.$emit("onDetail", id);
    },
    onCellClicked(e) {
      this.$emit("onDetail", e.node.data.id);
      console.log(e.node.data);
    },
  },
  /* end of Methods */
  beforeCreate() {
    // console.log("beforeCreate")
  },
  created() {
    // console.log("created")
  },
  beforeMount() {
    // console.log("beforeMount")
  },
  beforeUpdate() {
    // console.log("beforeUpdate")
  },
  updated() {
    // console.log("updated")
  },
  unmount() {
    // console.log("unmount")
  },
}; // End of Class
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
