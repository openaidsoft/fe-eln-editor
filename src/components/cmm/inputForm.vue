<template>
  <div class="project-input-box">
    <Form methods="get" @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
      <div>
        <label for="projectTitle" class="d-flex align-items-center py-0">Title</label>
        <Field type="text" name="title" class="form-control fs-13px h-45px" id="projectTitle" placeholder="Title" :class="{ 'is-invalid': errors.title }" />
        <div class="invalid-feedback">{{ errors.title }}</div>
      </div>
      <div class="mb-2">
        <label for="leader" class="d-flex align-items-center py-0">Leader</label>
        <Field type="text" name="leader" class="form-control fs-13px h-45px" id="leader" placeholder="leader" :class="{ 'is-invalid': errors.leader }" />
        <div class="invalid-feedback">{{ errors.leader }}</div>
      </div>
      <div class="mb-2">
        <label for="projectDescription" class="d-flex align-items-center py-0">Description</label>
        <Field type="text" name="description" class="form-control fs-13px h-45px" id="projectDescription" placeholder="Description" :class="{ 'is-invalid': errors.description }" />
        <div class="invalid-feedback">{{ errors.description }}</div>
      </div>
      <div class="mb-2">
        <Tag></Tag>
      </div>

      <ImageUpload></ImageUpload>
      <div class="project-input-button-box">
        <button class="project-input-button" type="submit" @click="onclick">저장</button>
      </div>
    </Form>
  </div>
</template>

<script>
import { UploadMedia } from "/node_modules/vue-media-upload";
import { Form, Field } from "vee-validate";
import Tag from "@/components/cmm/Tag.vue";
import ImageUpload from "@/components/cmm/imageUpload.vue";
import * as Yup from "yup";

export default {
  name: "inputForm",
  components: {
    UploadMedia,
    ImageUpload,
    Form,
    Field,
    Tag,
  },
  data() {
    const schema = Yup.object().shape({
      title: Yup.string().required("Title is required").email("Email is invalid"),
      leader: Yup.string().min(6, "Leader must be at least 6 characters").required("Leader is required"),
      // acceptTerms: Yup.string().required("Accept Ts & Cs is required"),
    });
    return {
      error: "", //if it is not null it will apply the error styling and show the error message.
      server: "http://localhost:3001/images", //the api that will temporary save the image.
      media: [], //the added images
    };
  },
  methods: {
    Media(value) {
      this.media = value;
    },
  },
};
</script>

<style lang="scss">
.project-input {
  &-box {
    border: 1px solid rgb(209, 209, 209);
    border-radius: 5px;
    padding: 40px 20px 40px 20px;
    width: 60%;
    margin: 0px auto;
    margin-bottom: 50px;
  }

  &-button-box {
    text-align: right;
    margin-top: 15px;
  }

  &-button {
    margin-top: 10px;
    border: 0px;
    padding: 2px 10px 2px 10px;
    background: #e6e6e6;
    border-radius: 8px;
  }
}
</style>
