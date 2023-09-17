<template>
  <div class="projectBox">
    <table class="table text-center">
      <colgroup>
        <col width="20%" />
        <col width="10%" />
        <col width="30%" />
        <col width="15%" />
        <col width="25%" />
      </colgroup>
      <thead class="">
        <tr>
          <th scope="col">연구번호</th>
          <th scope="col">연도</th>
          <th scope="col">연구 과제명</th>
          <th scope="col">리더</th>
          <th scope="col">태그</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ regNo }}</td>
          <td>{{ year }}</td>
          <td>{{ title }}</td>
          <td>{{ leader }}</td>
          <td id="tag">
            <div v-for="item in tag" :key="item" class="d-inline">
              <span class="rounded px-1 mx-1 badge">{{ item }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <FlowDiagram></FlowDiagram>
  </div>
</template>

<script>
import FlowDiagram from "@/components/gojs/flow.vue";

export default {
  name: "project-process",
  props: {
    projectId: String,
    title: String,
    year: String,
    leader: String,
    regNo: String,
    tag: String,
  },
  components: {
    FlowDiagram,
  },
  created() {
    if (this.pjt_tag === "" || this.pjt_tag === null || this.pjt_tag === undefined) {
      this.pjt_tag = "";
    } else {
      this.pjt_tag = this.tag.split(",");
    }
  },
  data() {
    return {
      pjt_tag: "",
    };
  },
};
</script>

<style>
.projectBox {
  border-bottom: 1px solid gray;
  margin-bottom: 15px;
}

thead {
  background: #dfe2e4;
  color: gray;
  font-weight: 500;
  font-size: 15px;
}
tbody {
  background: white;
  font-size: 13px;
}
#tag span {
  background: #f8a062;
}
</style>
