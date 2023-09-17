<template>
  <Modal v-if="showTemplateOpt" @close="showTemplateOpt = Modal" :width="'800px'">
    <template v-slot:header class="template-opt-header">
      <h3>Template Option</h3>
      <div class="d-flex">
        <input type="text" class="template-opt-header-input" />
        <button type="button" class="template-opt-btn">검색</button>
      </div>
    </template>
    <template v-slot:body>
      <div style="font-size: 10px; color: red; margin-bottom: 10px" class="text-start">템플릿을 이용해서 빠르게 노트를 작성할 수 있습니다.</div>
      <!-- vueperslides 적용 -->
      <vueper-slides :slide-ratio="1 / 4" :slide-content-outside="contentPosition" :visible-slides="3" :dragging-distance="70" :gap="3" class="no-shadow">
        <vueper-slide v-for="(item, i) in template_option_list" :key="i">
          <template #content>
            <form class="template-opt-card-form">
              <div class="each-card-box" v-for="(item, i) in template_option_list" :key="i">
                <div class="card">
                  <div class="card-header">
                    <h5 class="template-opt-card-title">{{ item.title }}</h5>
                  </div>
                  <div class="card-body">
                    <p class="template-opt-card-text">{{ item.template_info }}</p>
                    <div class="d-flex">
                      <button class="template-opt-select-btn" style="margin-right: 8px" @click="this.$router.push({ path: '/template/sample1' })">현재페이지에 생성</button>
                      <button class="template-opt-select-btn" @click="this.$router.push({ path: '/template/sample2' })">새 페이지에 생성</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </template>
        </vueper-slide>
      </vueper-slides>
    </template>
    <template v-slot:footer>
      <button class="template-opt-btn" @click="save()">생성</button>
      <button class="template-opt-btn" @click="close()">닫기</button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/cmm/Modal.vue";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default {
  name: "template-list",
  props: {
    showTemplateOpt: String,
  },
  components: {
    Modal,
    VueperSlides,
    VueperSlide,
  },
  data() {
    return {
      template_option_list: [
        {
          title: "엑셀 템플릿",
          template_info: "This is some text within a card body.",
        },
        {
          title: "엑셀 템플릿",
          template_info: "This is some text within a card body.",
        },
        {
          title: "엑셀 템플릿",
          template_info: "This is some text within a card body.",
        },
        {
          title: "엑셀 템플릿",
          template_info: "This is some text within a card body.",
        },
        {
          title: "엑셀 템플릿",
          template_info: "This is some text within a card body.",
        },
        {
          title: "엑셀 템플릿",
          template_info: "This is some text within a card body..",
        },
        {
          title: "엑셀 템플릿",
          template_info: "This is some text within a card body..",
        },
      ],
    };
  },
  methods: {
    close() {
      this.$emit("closeTemplateOpt");
    },
  },
};
</script>

<style lang="scss">
.card-header {
  background-color: rgb(103 166 176 / 30%);
}
.template-opt {
  &-header-input {
    width: 280px;
    padding: 5px 15px;
    height: 32px;
    background: #f2f3f4;
    border-color: #f2f3f4;
    font-size: 0.875rem;
    border-radius: 15px;
  }
  &-card {
    &-title {
      font-size: 16px;
      margin-bottom: 0;
      margin-top: 10px;
    }
    &-text {
      font-size: 14px;
    }
  }

  &-btn {
    font-size: 13px;
    font-weight: 600;
    color: gray;
    border: none;
    border-radius: 8px;
    background: #dadada;
    margin-left: 10px;
    padding: 5px 10px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
    &:hover {
      background: #2265f6;
      color: white;
    }
  }

  &-select-btn {
    font-size: 11px;
    font-weight: 600;
    color: gray;
    border: none;
    border-radius: 8px;
    background: #dadada;
    padding: 5px 5px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
    &:hover {
      background: #2265f6;
      color: white;
      cursor: pointer;
    }
  }

  &-card-move-btn {
    font-size: 22px;
    color: #9ea09f;
    padding: 90px 5px 5px;
    border-radius: 8px;

    &:hover {
      background: #dfe0e1;
      color: #2265f6;
      cursor: pointer;
    }
  }
}

.card-box {
  overflow-x: hidden;

  & .card {
    width: 200px;
    min-width: 200px;
    border: none;
    background: #f3f3f3;
    box-shadow: 3px 3px 3px rgb(188 188 188 / 30%);
  }

  & .each-card-box {
    padding: 8px;
  }
}
.card-body {
  padding: 14px;
}
</style>
