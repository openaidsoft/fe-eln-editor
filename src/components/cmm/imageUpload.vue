<template>
  <div class="image-container">
    <div class="file-upload-container" @dragover="onDragover" @drop="onDrop" v-if="imgUrl ? false : true">
      <div class="file-upload">
        <div class="text-center">
          <div class="mb-2">Drag & Drop here.</div>
          <div><button type="button" class="file-upload-btn" @click="onClick">파일 선택</button></div>
        </div>
      </div>
    </div>
    <!-- 파일 업로드 -->
    <input type="file" ref="fileInput" class="file-upload-input" @change="onFileChange" multiple />
    <!-- 업로드된 리스트 -->
    <div v-if="imgUrl" :id="id" class="image-box" @mouseover="showImageOptionIcon" @mouseleave="hideImageOptionIcon">
      <i class="fas fa-arrow-alt-circle-down image-download-icon" title="다운로드" style="position: absolute" :style="{ left: iconX + 'px', top: iconY + 'px', visibility: isDownloadIcon }"></i>
      <img class="image-frame" :src="imgUrl" ref="imageInfo" />
    </div>
  </div>
</template>

<script>
export default {
  name: "fileUpload",
  components: {},
  props: {
    imgUrl: String,
    id: String,
  },
  data() {
    return {
      selectFile: null, // 파일 객체
      previewImgUrl: null, // 미리보기 이미지 URL
      blobUrl: null, // 미리보기 이미지 URL
      showImageInputBox: true,
      iconX: null,
      iconY: null,
      isDownloadIcon: "hidden",
    };
  },

  methods: {
    showImageOptionIcon(e) {
      this.isDownloadIcon = "visible";
      this.iconY = e.srcElement.offsetTop;
      this.iconX = e.srcElement.offsetLeft + e.target.width - 30;
    },
    hideImageOptionIcon() {
      this.isDownloadIcon = "hidden";
    },
    onClick() {
      this.$refs.fileInput.click();
    },
    onDragover(event) {
      // 드롭을 허용하도록 preventDefault() 호출
      event.preventDefault();
    },
    onDrop(event) {
      // 기본 액션을 막음 (링크 열기같은 것들)
      event.preventDefault();
      const files = event.dataTransfer.files;
      this.previewFile(event, files);
    },
    onFileChange(event) {
      const files = event.target.files;
      this.previewFile(event, files);
    },
    // FileReader를 통해 파일을 읽어 thumbnail 영역의 src 값으로 셋팅
    previewFile(e, files) {
      if (files) {
        this.selectFile = files[0];
        let fileExt = this.selectFile.name.substring(this.selectFile.name.lastIndexOf(".") + 1);
        fileExt = fileExt.toLowerCase();
        console.log("this.selectFile.size :::" + this.selectFile.size);
        // 1M 이하 이미지만 업로드 가능
        if (["jpeg", "png", "gif", "bmp", "jpg"].includes(fileExt) && this.selectFile.size <= 1048576) {
          var reader = new FileReader();
          reader.onload = (e) => {
            this.previewImgUrl = e.target.result;
          };
          reader.readAsDataURL(files[0]);
          this.showImageInputBox = false;
          setTimeout(() => {
            console.log(this.previewImgUrl);
            this.$emit("uploadImage", this.previewImgUrl, this.selectFile.name);
          }, 100);
        } else if (this.selectFile.size <= 1048576) {
          this.previewImgUrl = null;
        } else {
          alert("파일을 다시 선택해 주세요.");
          this.selectFile = null;
          this.previewImgUrl = null;
        }
      } else {
        this.selectFile = null;
        this.previewImgUrl = null;
      }
    },
  },
};
</script>

<style lang="scss">
.image-container {
  min-height: 100px;
  margin: 0 auto;
}
.file-upload {
  // display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: gray;
  border: transparent;
  border-radius: 20px;
  cursor: pointer;
  &.dragged {
    border: 1px dashed powderblue;
    opacity: 0.6;
  }
  &-container {
    height: 100px;
    padding: 20px;
    margin: 0 auto;
    box-shadow: 0 0.625rem 1.25rem #0000001a;
    border-radius: 20px;
  }
  &-btn {
    background-color: #7ec6e2;
    color: white;
    font-size: 14px;
    margin-left: 0;
    margin-right: 0;
    border-radius: 5px;
    border: none;
    padding: 5px 10px 5px 10px;
  }
  &-input {
    display: none;
  }
  &-list {
    margin-top: 10px;
    width: 100%;
    &__item {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &__data {
        display: flex;
        align-items: center;
        &-thumbnail {
          margin-right: 10px;
          border-radius: 20px;
          width: 120px;
          height: 120px;
        }
      }
    }
  }
}
.image {
  &-frame {
    width: 250px;
    height: 250px;
    &:hover {
      border: 2px solid rgb(165, 194, 226, 0.4);
    }
  }
  &-download-icon {
    font-size: 18px;
    color: white;
    padding: 5px;
    margin: 8px 8px 0px 0px;
    background: gray;
    border-radius: 5px;
    z-index: 500;
    cursor: pointer;
  }
}
</style>
