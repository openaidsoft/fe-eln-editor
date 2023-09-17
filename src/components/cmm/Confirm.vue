<template>
  <Modal :width="'400px'">
    <template v-slot:body>
      <div>
        {{ message }}
      </div>
    </template>
    <template v-slot:footer>
      <Button @click="this.$emit('confirm')">확인</Button>
      <Button @click="this.$emit('cancel')">취소</Button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/cmm/Modal.vue";

export default {
  name: "Confirm",
  props: {
    message: String,
  },
  components: {
    Modal,
  },
  data() {},
  methods: {},
};
</script>

<style></style>
