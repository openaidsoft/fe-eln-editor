<template>
  <off-canvas :style="{ background: '#faf8e6' }">
    <template v-slot:header>
      <h4>todoList</h4>
    </template>
    <template v-slot:body>
      <todoList></todoList>
    </template>
  </off-canvas>
</template>

<script>
import todoList from "@/components/todo/todolist.vue";
import offCanvas from "@/components/cmm/offCanvas.vue";
export default {
  name: "todoSlideView",
  components: {
    todoList,
    offCanvas,
  },
  data() {
    return {};
  },
};
</script>
