<template>
  <button @click="addInput">JSME input</button>
  <div v-for="input in inputs" :key="input">
    <jsme :id="id" :width="500" :height="300" :options="OPT_FULL_SCREEN"></jsme>
  </div>
  <div id="sampleCode">
    <h5>SampleCode</h5>
    <p>
      id는 jsme가 만들어지는 elemen id 값으로 hashvalue로 처리,<br />
      options : 'reaction', 'fullScreenIcon' ( 둘중 하나 혹은 둘다 )
    </p>
    <textarea type="text" style="height: 100px; width: 1000px" value='<div v-for="input in inputs" :key="input"><jsme :id="id" :width="500" :height="300" :options="reaction"></jsme></div>'>
    </textarea>
  </div>
</template>

<script>
// JSME
import jsme from "@/components/jsme/jsme.vue";

// utils
import Utils from "@/components/cmm/Utils.js";

export default {
  name: "jsmeView",
  components: {
    jsme,
  },
  setup() {
    const OPT_REACTION = "reaction";
    const OPT_FULL_SCREEN = "fullScreenIcon";
    return {
      OPT_REACTION,
      OPT_FULL_SCREEN,
    };
  },
  data() {
    return {
      id: 0,
      // options: "reaction",
      inputs: [],
    };
  },
  created() {},
  methods: {
    addInput() {
      const utils = new Utils();
      this.id = utils.randomGenerator();
      this.inputs.push(this.inputs.length + 1);
    },
  },
};
</script>
