<template>
  <div>
    Express Test
    <table>
      <tr v-for="item in users" :key="item">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      users: [],
    };
  },
  created() {
    //api calling
    axios.get("http://localhost:3000/menus/api").then((resp) => {
      console.log("resp");
      console.log(resp);
      this.users = resp.data;
    });
  },
};
</script>
