<script>
import { reactive } from "vue";
import axios from "axios";

let sidebar_note_menus = reactive([]);
function getNoteMenu() {
  axios.get("http://localhost:3000/note/only").then((res) => {
    res.data.forEach((each) => {
      sidebar_note_menus.push(each);
    });
  });
  return sidebar_note_menus;
}
export default getNoteMenu();
</script>
