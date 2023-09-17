<template>
  <div class="file-upload">
    <input @change="previewFile" multiple accept="" type="file" id="file" class="inputfile" ref="selectFile" />
    <img v-if="previewImgUrl" :src="previewImgUrl" />
    <button type="submit" :disabled="isUploading">Upload</button>
    <img :src="this.blobimage" />
  </div>
</template>

<script>
export default {
  name: "FormValidation",
  components: {},
  data() {
    return {
      selectFile: null, // 파일 객체
      previewImgUrl: null, // 미리보기 이미지 URL
      image: null, //이미지 가상 URL
      blobimage: null,
    };
  },
  mounted() {
    console.log("iamge");
    this.getImage();
  },
  methods: {
    previewFile(e) {
      if (0 < this.$refs.selectFile.files.length) {
        this.selectFile = this.$refs.selectFile.files[0];
        let fileExt = this.selectFile.name.substring(this.selectFile.name.lastIndexOf(".") + 1);
        fileExt = fileExt.toLowerCase();
        reader.readAsDataURL(this.selectFile);
        // 이미지 확장자 체크, 1메가 바이트 이하 인지 체크
        if (["jpeg", "png", "gif", "bmp"].includes(fileExt) && this.selectFile.size <= 1048576) {
          var reader = new FileReader();
          reader.onload = (e) => {
            this.previewImgUrl = window.URL.createObjectURL(this.selectFile);
            // this.saveImage(this.previewImgUrl, this.selectFile.name);
          };
          reader.readAsDataURL(this.selectFile);
        } else if (this.selectFile.size <= 1048576) {
          // 이미지외 파일
          this.previewImgUrl = null;
        } else {
          alert("파일을 다시 선택해 주세요.");
          this.selectFile = null;
          this.previewImgUrl = null;
        }
      } else {
        // 파일을 선택하지 않았을때
        this.selectFile = null;
        this.previewImgUrl = null;
      }

      this.getImage();
    },
    getImage() {
      console.log("getimage");
      return this.axios
        .get("http://localhost:3005/files/2", {})
        .then((res) => {
          this.blobimage = res.data.image.url;
          this.response = res;
          this.isUploading = false;
        })
        .catch((error) => {
          this.response = error;
          this.isUploading = false;
        });
    },
    async saveImage(url, filename) {
      return this.axios
        .post("http://localhost:3005/files", {
          image: { url: url, name: filename },
        })
        .then((res) => {
          console.log(res);
          this.response = res;
          this.isUploading = false;
        })
        .catch((error) => {
          this.response = error;
          this.isUploading = false;
        });
    },
  },
};
</script>

<style scoped>
.upload-image {
  width: 400px;
  height: 400px;
}
</style>
