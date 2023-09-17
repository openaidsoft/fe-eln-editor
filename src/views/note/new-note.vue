<script>
import { getNoteSeq, setNoteService } from "@/components/w-editor/w-editor-service.js";
import { useRoute } from "vue-router";

export default {
  name: "newNote",
  setup() {},
  mounted() {
    const R = useRoute();

    const pjt_uid = R.params && R.params.part === "pjt" ? R.params.id : null;
    const tempContent = R.params && R.params.part === "template" ? R.params.content : null;
   // const usr_id = this.$session.get("usr_id");
    const usr_id = "sooah1004";

    const getSeq = async () => {
      // const id = await getNoteSeq();
      const id = 1;
      // setNoteService(id, pjt_uid, usr_id, tempContent).then(async () => {
      //   this.$router.push({ path: `/note/${id}` });
      // });
      this.$router.push({ path: `/note/${id}` });
    };
    getSeq();
  },
};
</script>
