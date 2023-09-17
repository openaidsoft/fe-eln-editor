<template>
  <div class="dashboardCalender">
    <Datepicker v-model="date" ref="calender" multiDates :enableTimePicker="false" class="main_calender" />
  </div>
  <div class="row">
    <div class="col-md-8">
      <div class="row">
        <div class="col-md-8">
          <recently-note></recently-note>
        </div>
        <div class="col-md-4">
          <div class="card border-0 text-truncate mb-3 bg-gray-800 text-white">
            <div class="dash-card-header text-gray-500">
              <span><i class="fas fa-star dash-card-header-icon"></i></span>
              <b class="mb-3 ms-2">나의 즐겨찾기 목록</b>
            </div>
            <div class="dash-first-box-card-body">
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">즐겨찾는 링크/페이지</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <span><i class="fas fa-star dash-card-header-icon"></i></span>
                    </th>
                    <td>친환경소재 연구개발 1</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <span><i class="fas fa-star dash-card-header-icon"></i></span>
                    </th>
                    <td>친환경소재 연구개발 2</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <span><i class="fas fa-star dash-card-header-icon"></i></span>
                    </th>
                    <td>친환경소재 연구개발 3</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <span><i class="fas fa-star dash-card-header-icon"></i></span>
                    </th>
                    <td>친환경소재 연구개발 4</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <span><i class="fas fa-star dash-card-header-icon"></i></span>
                    </th>
                    <td>친환경소재 연구개발 5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <project></project>
    </div>
    <div class="col-md-4">
      <div class="card border-0 text-truncate mb-3 bg-gray-800">
        <div class="dash-card-header text-gray-500">
          <span><i class="fas fa-file-alt dash-card-header-icon"></i></span>
          <b class="mb-3 ms-2">calendar</b>
        </div>
        <div class="dash-calendar-box-card-body">
          <Calendar :height="'600'"></Calendar>
        </div>
      </div>
    </div>
  </div>

  <div class="row dash-first-box">
    <div class="col-md-9">
      <myteam></myteam>
    </div>

    <!-- <div class="col-md-3">
      <div class="card border-0 mb-3 overflow-hidden bg-gray-300 text-white">
        <div class="dash-card-header text-gray-500">
          <b>월별 작업량</b>
          <span class="ms-2">
            <i class="fa fa-info-circle"></i>
          </span>
        </div>
        <div class="dash-first-box-card-body">
          <div class="row mt-3">
            <div class="text-gray-800">
              <div class="panel-body pe-1">
                <LineChart :chartData="testData" :styles="{ height: '200px' }" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <div class="col-md-3">
      <div class="card border-0 text-truncate mb-3 bg-gray-800 text-white">
        <div class="dash-card-header">
          <div class="text-gray-500">
            <span><i class="fas fa-tags dash-card-header-icon"></i></span>
            <b class="mb-3 ms-2">나의 태그</b>
          </div>
        </div>
        <div class="dash-first-box-card-body">
          <div class="tag-box">
            <div v-for="item in tagData" :key="item" class="each-tag-box">{{ item }},</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { LineChart, PieChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);
import Project from "@/components/dashboard/project.vue";
import Myteam from "@/components/dashboard/myteam.vue";
import RecentlyNote from "@/components/dashboard/recently-note.vue";
import Calendar from "@/components/cmm/Calendar.vue";

export default defineComponent({
  name: "v1",
  components: {
    LineChart,
    Myteam,
    Project,
    Calendar,
    RecentlyNote,
  },
  setup() {
    // const date = ref(new Date());
    const date = ["Mon Apr 18 2022 16:21:28 GMT+0900 (한국 표준시)", "Thr Apr 19 2022 16:21:28 GMT+0900 (한국 표준시)", "Wen Apr 20 2022 16:21:28 GMT+0900 (한국 표준시)"];
    const tagData = ["nature", "research", "jsme", "genome-research", "derma", "cosmetics", "nature", "research", "jsme"];
    const testData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jul", "Jan", "Aug", "Sep", "Ocb", "Nov", "Dec"],

      datasets: [
        {
          label: "프로젝트",
          data: [3, 1, 6, 0, 0, 2, 3, 0, 0, 1, 1, 1],
          fill: false,
          borderColor: "#4bc0c0",
        },
        {
          label: "노트",
          data: [2, 5, 6, 10, 5, 2, 10, 4, 7, 7, 1, 2],
          fill: false,
          borderColor: "#565656",
        },
      ],
    };

    return {
      date,
      tagData,
      testData,
    };
  },
  data() {
    return {};
  },
});
</script>

<style lang="scss">
.dashboardCalender {
  margin-bottom: 10px;
}

.visitor-img-icon {
  font-size: 50px;
  color: gray;
}

.dash-calendar-box-card-body {
  height: 100%;
}

.dash-second-box {
  height: 300px;
  margin-bottom: 20px;

  &-card-body {
    height: 250px;
    padding: 0px 20px 20px 20px;
    background: #192745 & table {
      color: rgb(194, 194, 194);
    }
  }
}

.dash-card-header-icon {
  color: yellow;
}

.tag-box {
  display: flex;
  flex-wrap: wrap;
}

.dash-card-header {
  padding: 10px;
  background: #192745;
}

.each-tag-box {
  font-size: 14px;
  color: black;
  padding: 3px 10px;
  margin-right: 8px;
  margin-bottom: 5px;
  border-radius: 0px 5px 5px 0px;

  &:hover {
    cursor: pointer;
    font-size: 16px;
  }
}
</style>
