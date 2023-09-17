<template>
  <div class="code-mng">
    <div class="code-mng-list">
      <div class="code-mng-list-titleBox d-flex justify-content-between">
        <p class="code-mng-list-title">코드 리스트</p>
        <button type="button" class="addCode" @click="addCode">코드추가</button>
      </div>
      <div class="code-mng-group-list" v-for="(code, code_idx) in codes" :key="code_idx">
        <div class="code-mng-group-item" :class="{ active: selected_code === code_idx ? true : false }">
          <i class="fas fa-caret-right code-mng-group-icon"></i>
          <a href="#" @click="showChildren(code, code_idx)"> {{ code.codeNm }} </a>
        </div>
        <div v-if="childrenIdx.includes(code_idx) && isChildren">
          <div class="code-mng-children-list" v-for="(chcode, children_idx) in code.childrenCode" :key="children_idx">
            <div
              class="code-mng-children-item"
              :class="{ active: selected_code === code_idx && selected_children_code === children_idx ? true : false }"
              @click="showChildrenDetail(chcode, children_idx)"
            >
              <i class="fas fa-caret-right code-mng-group-icon"></i>
              <a href="#">{{ chcode.codeNm }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="code-mng-detail">
      <div class="code-mng-detail-title">코드 상세</div>
      <div class="code-mng-detail-list row">
        <label for="code-order" class="code-mng-detail-label col-2">코드번호 </label>
        <input type="text" id="code-order" class="code-mng-detail-input col-9" :value="code_detail_no" :readonly="code_detail_no" />
      </div>
      <div class="code-mng-detail-list row">
        <label for="code-detail" class="code-mng-detail-label code-mng-detail-required col-2">코드명 </label>
        <input type="text" id="code-detail" class="code-mng-detail-input col-9" :value="code_detail_nm" :readonly="code_detail_nm" />
      </div>
      <div class="code-mng-detail-list row">
        <label for="code-url" class="code-mng-detail-label col-2">코드상세</label>
        <input type="text" id="code-url" class="code-mng-detail-input col-9" :value="code_detail_info" :readonly="code_detail_info" />
      </div>
      <div class="code-mng-button text-center">
        <button type="button" class="menu-mng-button-each" @click="addCode()">코드메뉴추가</button>
        <button type="button" class="code-mng-button-each">수정</button>
        <button type="button" class="code-mng-button-each">저장</button>
      </div>
    </div>
  </div>
</template>

<script>
import CodeService from "@/services/code.service.js";

export default {
  name: "code-mng",
  props: {},
  components: {
    CodeService,
  },
  created() {
    CodeService.getCode().then((res, i) => {
      console.log(res);
      this.codes = res;
    });
  },
  data() {
    return {
      codes: null,
      isChildren: false,
      childrenIdx: [],
      code_detail_title: null,
      code_detail_no: null,
      code_detail_info: null,
      selected_code: null,
      selected_children_code: null,
    };
  },
  methods: {
    showChildren(code, i) {
      this.childrenIdx = [];
      this.isChildren = !this.isChildren;
      if (code.childrenCode.length !== 0) {
        this.childrenIdx.push(i);
      }
      this.selected_code = i;
      this.selected_children_code = "";
      this.code_detail_no = code.code;
      this.code_detail_nm = code.codeNm;
      this.code_detail_info = code.codeDetail;
    },
    showChildrenDetail(code, i) {
      this.selected_children_code = i;
      this.code_detail_no = code.code;
      this.code_detail_nm = code.codeNm;
      this.code_detail_info = code.codeDetail;
    },
    addCode() {
      this.code_detail_no = null;
      this.code_detail_nm = null;
      this.code_detail_info = null;
    },
  },
};
</script>

<style lang="scss">
.addCode {
  font-size: 12px;
  border: none;
  border-radius: 8px;
  background: #dadada;
  margin-left: 20px;
  padding: 3px 10px;
  line-height: -1;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);

  &:hover {
    background: #2265f6;
    color: white;
  }
}

.code-mng {
  display: flex;
  &-list {
    width: 25%;
    min-width: 230px;
    padding: 15px;
    border: 1px solid #adb3b1;
    background: #f9f9f9;
    border-radius: 8px;
    margin-right: 20px;
    max-width: 300px;
  }

  &-list-titleBox {
    margin-bottom: 10px;
  }

  &-list-title {
    font-size: 16px;
    font-weight: bold;
    margin-top: 0px;
    margin-bottom: 0px;
  }

  &-detail {
    width: 100%;
    min-width: 550px;
    min-height: 220px;
    max-height: 220px;
    padding: 10px 20px;
    border: 1px solid #adb3b1;
    background: #f9f9f9;
    border-radius: 8px;
    font-size: 14px;
    color: rgb(110, 110, 110);

    &-title {
      color: rgb(0, 0, 0);
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 15px;
    }

    &-list {
      margin-bottom: 8px;
      padding-left: 15px;
    }

    & input {
      font-size: 13px;
      color: rgb(110, 110, 110);
      padding: 5px;
      border: 1px solid #b8c3c0;
      border-radius: 5px;
      &:focus {
        border: 2px solid rgb(179, 215, 253) e;
      }
    }

    &-label {
      width: 100px;
    }
  }

  &-group {
    &-list {
      margin-left: 10px;
      margin-bottom: 8px;
    }

    &-icon {
      font-size: 14px;
      color: gray;
      margin-right: 8px;
    }

    &-item {
      & a {
        color: rgb(110, 110, 110);
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
      }
      &.active {
        & i {
          transform: rotate(90deg);
          color: #2265f6;
        }

        & a {
          color: rgb(110, 110, 110);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          color: #2265f6;
          font-weight: 600;
        }
      }
    }
  }

  &-children {
    &-list {
      color: gray;
      font-size: 12px;
      margin-left: 15px;
      margin-bottom: 5px;
    }
    &-item {
      text-decoration: none;
      font-size: 13px;
      & a {
        color: rgb(110, 110, 110);
        text-decoration: none;
        font-size: 13px;
      }
      &.active {
        & i {
          color: #2265f6;
        }
        & a {
          color: #2265f6;
          text-decoration: none;
        }
      }
    }
  }

  &-button {
    margin-top: 10px;

    &-each {
      font-size: 13px;
      border: none;
      border-radius: 8px;
      background: #dadada;
      margin-left: 10px;
      padding: 5px 10px;
      line-height: -1;
      box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);

      &:hover {
        background: rgb(39, 174, 170);
      }
    }
  }
}
</style>
