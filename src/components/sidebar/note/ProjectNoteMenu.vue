<script>
import { reactive } from "vue";
import axios from "axios";

let sidebar_pjt_menus = reactive([]);

function getProjectMenu() {
  axios.get("http://localhost:3000/note/pjt").then((res) => {
    res.data.forEach((each) => {
      each.title = [];
      each.note_uid = [];
      axios.get(`http://localhost:3000/note/pjt/${each.pjt_uid}`).then((res) => {
        res.data.forEach((r) => {
          each.title.push(r.title);
          each.note_uid.push(r.note_uid);
        });
      });
      sidebar_pjt_menus.push(each);
    });
  });
  return sidebar_pjt_menus;
}

export default getProjectMenu();
</script>
