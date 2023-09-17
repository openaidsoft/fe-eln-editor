<template>
  <LineChart :chartData="testData"></LineChart>
  <PieChart :chartData="pieData"></PieChart>
</template>

<script>
import { defineComponent, ref } from "vue";
import { LineChart, PieChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default defineComponent({
  name: "project",
  components: {
    LineChart,
    PieChart,
  },
  props: {},
  setup() {
    const date = ref(new Date());

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

    const pieData = {
      labels: ["대기", "진행", "완료"],
      datasets: [
        {
          data: [2, 5, 49],
          backgroundColor: ["#77CEFF", "#0079AF", "#123E6B"],
        },
      ],
    };

    const tagData = ["nature", "research", "jsme", "genome-research", "derma", "cosmetics", "nature", "research", "jsme"];

    return {
      date,
      testData,
      pieData,
      tagData,
    };
  },
  data() {
    return {};
  },
  mounted() {},
});
</script>
<style></style>
