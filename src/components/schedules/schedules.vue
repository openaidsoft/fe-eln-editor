<template>
  <Calendar :height="'800'"></Calendar>
</template>

<script>
import Calendar from "@/components/cmm/Calendar.vue";

export default {
  name: "schedules",
  components: {
    Calendar,
  },
};
</script>
