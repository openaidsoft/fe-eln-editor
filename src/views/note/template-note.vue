<script>
import { defineComponent } from "@vue/composition-api";
import { getNoteSeq, setNoteService } from "@/components/w-editor/w-editor-service.js";
import router from "@/route/router";

export default defineComponent({
  name: "templateNote",
  setup() {
    // TODO :  template 가져오는 부분이 필요함 template 테이블을 따로 생성
    const getSeq = async () => {
      const id = await getNoteSeq();
      setNoteService(id).then(async () => {
        router.push({ path: `/note/${id}` });
      });
    };
    getSeq();
  },
});
</script>
