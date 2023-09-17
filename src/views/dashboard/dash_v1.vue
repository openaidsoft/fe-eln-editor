<template>
  <div>
    <v-1></v-1>
  </div>
</template>

<script>
import v1 from "@/components/dashboard/v1.vue";
// utils
import Utils from "@/components/cmm/Utils.js";

export default {
  components: {
    v1,
  },
  name: "dash_v1",
  data() {
    return {
      id: 0,
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
