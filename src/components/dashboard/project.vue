<template>
  <div class="dash-first-box">
    <div class="">
      <div class="card border-0 mb-3 overflow-hidden bg-gray-300 text-white">
        <div class="dash-card-header text-gray-500">
          <b>진행상황별 프로젝트</b>
          <span class="ms-2">
            <i class="fa fa-info-circle"></i>
          </span>
        </div>
        <div class="dash-first-box-card-body">
          <div class="mb-3 text-gray-800">
            <div class="row">
              <div class="col-md-4 text-truncate">
                <table class="table dash-project-table">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">제목</th>
                      <th scope="col">작성자</th>
                      <th scope="col">작성일</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="active">
                      <th scope="row">1</th>
                      <td>친환경소재 연구개발 1</td>
                      <td>Jacob</td>
                      <td>2022/01/02</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>친환경소재 연구개발 2</td>
                      <td>Mark</td>
                      <td>2022/03/20</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>친환경소재 연구개발 3</td>
                      <td>Larry</td>
                      <td>2022/05/19</td>
                    </tr>
                    <tr>
                      <th scope="row">4</th>
                      <td>친환경소재 연구개발 4</td>
                      <td>Larry</td>
                      <td>2022/05/19</td>
                    </tr>
                    <tr>
                      <th scope="row">5</th>
                      <td>친환경소재 연구개발 5</td>
                      <td>Larry</td>
                      <td>2022/05/19</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-md-8" style="padding: 8px">
                <div class="project-process-box">
                  <simple-flow @processData="showProcessData"></simple-flow>
                  <div class="project-process-detail">
                    <table class="table table-sm project-process-table">
                      <colgroup>
                        <col width="20%" />
                        <col width="20%" />
                        <col width="60%" />
                      </colgroup>
                      <thead>
                        <th scope="col" class="border-right border-white">제목</th>
                        <th scope="col" class="border-right border-white">기한</th>
                        <th scope="col">노트</th>
                      </thead>
                      <tbody>
                        <!-- <td height="45" class="d-flex align-items-center justify-content-center"> -->
                        <td height="45" class="border-right border-white">
                          <div class="process-data">{{ process_data ? process_data.header : "프로세스를 선택하세요" }}</div>
                        </td>
                        <td height="45" class="border-right border-white">
                          <div class="process-data">{{ process_data ? process_data.dueDate : "프로세스를 선택하세요" }}</div>
                        </td>
                        <td height="45">
                          <table class="project-process-detail-note table table-sm">
                            <colgroup>
                              <col width="33%" />
                              <col width="33%" />
                              <col width="33%" />
                            </colgroup>
                            <thead>
                              <th scope="col" class="border-right border-white">작성중</th>
                              <th scope="col" class="border-right border-white">검토중</th>
                              <th scope="col">완료</th>
                            </thead>
                            <tbody>
                              <td>1</td>
                              <td>2</td>
                              <td>0</td>
                            </tbody>
                          </table>
                        </td>
                      </tbody>
                    </table>
                    <!-- <div class="project-process col-sm-3">
                      <label class="project-process-label">제목 </label>
                      <div class="project-process-title">{{ process_data ? process_data.header : "" }}</div>
                    </div>
                    <div class="project-process col-sm-3">
                      <label class="project-process-label">기한 </label>
                      <div class="project-process-dueDate">{{ process_data ? process_data.dueDate : "" }}</div>
                    </div>
                    <div class="project-process col-sm-6">
                      <label class="project-process-label">노트 </label>
                      <div class="project-process-note">{{ process_data ? process_data.dueDate : "" }}</div> -->
                    <!-- <div class="project-process-note row text-center">
                        <div class="col-sm-4">
                          <span>작성중</span>
                          <div>2건</div>
                        </div>
                        <div class="col-sm-4">
                          <span>검토중</span>
                          <div>2건</div>
                        </div>
                        <div class="col-sm-4">
                          <span>완료</span>
                          <div>2건</div>
                        </div>
                      </div>
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { LineChart, PieChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import SimpleFlow from "@/components/gojs/simple-flow.vue";

Chart.register(...registerables);

export default defineComponent({
  name: "project",
  components: {
    LineChart,
    PieChart,
    SimpleFlow,
  },
  data() {
    return {
      process_data: null,
    };
  },
  methods: {
    showProcessData(data) {
      this.process_data = data;
    },
  },
});
</script>

<style lang="scss">
.dash-project-table {
  & tr {
    &:hover {
      cursor: pointer;
    }
  }
  & .active {
    font-weight: bold;
    color: blue;
  }
}

.dash-first-box {
  height: 280px;
  margin-bottom: 20px;

  &-card-body {
    height: 230px;
    padding: 0px 20px 20px 20px;
    background: #e6e7eb;

    & table {
      text-align: center;
      & > thead {
        background: transparent;
        color: black;
        & th {
          padding-bottom: 5px;
          font-size: 14px;
        }
      }

      & > tbody {
        background: transparent;
        & tr {
          border-bottom: 1px solid white;
        }
      }
    }
  }
}

.project-process {
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 3px;

  &-box {
    padding-top: 10px;
    padding-left: 15px;
    border-left: 2px solid rgb(255, 255, 255);
  }

  &-detail {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;

    & table {
      & thead {
        background: gray;
        color: white;
        & th {
          //  border-right: 1px solid white;
        }
      }
      & td {
        height: 50px;
        text-align: center;
        &.process-data {
          display: flex;
          align-items: center;
        }
      }
      & tbody {
        background: rgb(238, 238, 238);

        & table {
          margin-bottom: 0px;
          & thead {
            color: gray;
            background: transparent;
          }
          & td {
            height: 25px;
          }
        }
      }
    }
  }

  &-label {
    margin-right: 5px;
  }
}

.project-process-table {
  & thead {
    background: gray;
    color: white;
  }
}
</style>
