<template>
  <button @click="addInput">Add input</button>
  <div v-for="(input, index) in inputs" :key="input">
    <JExcel v-model="inputs[index]"></JExcel>
  </div>

  <!-- TODO: showdom에 포커스가 있는 상태에서 외부 요소를 클릭해도 포커스 아웃되지 않음  -->
  <div id="sampleCode" style="margin-top: 20px">
    <h5>SampleCode</h5>
    <p></p>
    <textarea type="text" style="height: 100px; width: 1000px" value='<div v-for="input in inputs" :key="input"><jsme :id="id" :width="500" :height="300" :options="reaction"></jsme></div>'>
    </textarea>
  </div>
</template>

<script>
import JExcel from "@/components/excel/jexcel.vue";

export default {
  name: "v1",
  components: {
    JExcel,
  },
  data() {
    return {
      inputs: [],
    };
  },
  methods: {
    addInput() {
      this.inputs.push(this.inputs.length + 1);
    },
  },
  computed: {
    buttonText() {
      return this.showInput ? "Hide input" : "Show input";
    },
  },
};
</script>
