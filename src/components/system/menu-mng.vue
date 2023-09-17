<template>
  <div class="menu-mng">
    <div class="menu-mng-list">
      <div class="menu-mng-list-titleBox d-flex justify-content-between">
        <p class="code-mng-list-title">메뉴 리스트</p>
        <button type="button" class="addMenu" @click="addMenu()">메뉴추가</button>
      </div>
      <div class="menu-mng-group-list" v-for="(menu, menu_idx) in sidebar_menus" :key="menu_idx">
        <div class="menu-mng-group-item" :class="{ active: selected_menu === menu_idx ? true : false }" @click="showChildren(menu, menu_idx)">
          <i class="fas fa-caret-right menu-mng-group-icon"></i>
          <a href="#"> {{ menu.title }} </a>
        </div>
        <div v-if="childrenIdx.includes(menu_idx) && isChildren">
          <div class="menu-mng-children-list" v-for="(chMenu, children_idx) in menu.children" :key="children_idx">
            <div
              class="menu-mng-children-item"
              :class="{ active: selected_menu === menu_idx && selected_children_menu === children_idx ? true : false }"
              @click="showChildrenDetail(chMenu, children_idx)"
            >
              <i class="fas fa-caret-right menu-mng-group-icon"></i>
              <a href="#">
                {{ chMenu.title }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="menu-mng-detail">
      <div class="menu-mng-detail-title">메뉴 상세</div>
      <div class="menu-mng-detail-list form-group row">
        <label for="menu-detail" class="menu-mng-detail-label col-sm-2">메뉴명</label>
        <input type="text" id="menu-detail" name="menu-detail" class="menu-mng-detail-input col-sm-9" v-model="menu_detail_title" :readonly="setInput" />
      </div>
      <div class="menu-mng-detail-list row">
        <label for="menu-url" class="menu-mng-detail-label col-2">메뉴 url </label>
        <input type="text" id="menu-url" name="menu-url" class="menu-mng-detail-input col-9" v-model="menu_detail_url" :readonly="setInput" />
      </div>
      <div class="menu-mng-detail-list row">
        <label for="menu-order" class="menu-mng-detail-label col-2">순번 </label>
        <input type="text" id="menu-order" name="menu-order" class="menu-mng-detail-input col-9" v-model="menu_detail_order" :readonly="setInput" />
      </div>
      <div class="menu-mng-detail-list row">
        <label for="menu-use" class="menu-mng-detail-label col-2">사용유무 </label>
        <input type="text" id="menu-use" name="menu-use" class="menu-mng-detail-input col-9" v-model="menu_detail_use" :readonly="setInput" />
      </div>
      <div class="menu-mng-button text-center">
        <button type="button" class="menu-mng-button-each" @click="addMenu()">하위메뉴추가</button>
        <button type="button" class="menu-mng-button-each" @click="editMenu">수정</button>
        <button type="submit" class="menu-mng-button-each" @click="saveMenu(menu_id, selected_children_menu)">저장</button>
      </div>
    </div>
  </div>
</template>
<script>
import SidebarMenuService from "@/services/sidebar-menu.service.js";
import SidebarMenu from "@/components/sidebar/SidebarMenu.vue";

function getinputBox() {
  const inputBox = document.getElementById("menu-detail");
  inputBox.focus();
}

export default {
  name: "menu-mng",
  components: {},
  setup() {
    const sidebar_menus = SidebarMenu;

    return { sidebar_menus };
  },
  data() {
    return {
      fixMenu: [],
      isChildren: false,
      selected_menu: null,
      selected_children_menu: null,
      childrenIdx: [],
      menu_detail_title: null,
      menu_detail_url: null,
      menu_detail_order: null,
      menu_detail_use: null,
      menu_id: null,
      setInput: true,
    };
  },
  methods: {
    showChildren(menu, i) {
      this.childrenIdx = [];
      if (this.menu_detail_title === menu.title) {
        this.isChildren = !this.isChildren;
      } else {
        this.isChildren = true;
      }
      if (menu.children.length !== 0) {
        this.childrenIdx.push(i);
      }
      this.selected_menu = i;
      this.selected_children_menu = "";
      this.menu_detail_url = menu.path;
      this.menu_detail_title = menu.title;
      this.menu_detail_order = "1";
      this.menu_detail_use = "사용";
      this.menu_id = menu.id;
      this.setInput = true;
    },
    showChildrenDetail(menu, i) {
      this.selected_children_menu = i;
      this.menu_detail_url = menu.path;
      this.menu_detail_title = menu.title;
      this.menu_detail_order = "1";
      this.menu_detail_use = "사용";
      this.menu_id = menu.id;
      this.setInput = true;
    },
    addMenu(menu_opt) {
      this.menu_opt = menu_opt;
      this.menu_detail_title = null;
      this.menu_detail_url = null;
      this.menu_detail_order = null;
      this.menu_detail_use = null;
      this.setInput = false;
      getinputBox();
    },
    editMenu() {
      this.setInput = false;
      getinputBox();
    },
    saveMenu(id, index) {
      let saveObject = null;
      if (id) {
        SidebarMenuService.getOneMenu(id).then((res) => {
          SidebarMenuService.saveChildrenMenu(id, res, this.menu_detail_title, this.menu_detail_url).then((res) => {
            saveObject = res.children;
            this.updateMenu(saveObject);
          });
        });
      } else {
        SidebarMenuService.saveMenu(this.menu_detail_title, this.menu_detail_url).then((res) => {
          SidebarMenu.push(res);
        });
      }
    },
    updateMenu(saveObject) {
      SidebarMenuService.getMenu().then((res) => {
        SidebarMenu[index].children = saveObject;
      });
    },
  },
};
</script>

<style lang="scss">
.addMenu {
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

.menu-mng {
  display: flex;
  &-list {
    width: 25%;
    min-width: 230px;
    padding: 15px;
    border: 1px solid #c5c9c8;
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
    margin-bottom: 10px;
  }

  &-detail {
    width: 100%;
    min-width: 550px;
    min-height: 260px;
    max-height: 260px;
    padding: 15px 20px;
    border: 1px solid #c5c9c8;
    background: #f9f9f9;
    border-radius: 8px;
    font-size: 14px;
    color: rgb(110, 110, 110);

    &-title {
      color: rgb(0, 0, 0);
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    &-list {
      margin-bottom: 8px;
      padding-left: 8px;
    }

    & input {
      font-size: 13px;
      color: rgb(110, 110, 110);
      padding: 5px;
      border: 1px solid #a8b7c2;
      border-radius: 5px;
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
      font-size: 12px;
      color: gray;
      margin-right: 8px;
    }

    &-item {
      & i {
        font-size: 14px;
        color: rgb(110, 110, 110);
      }
      & a {
        font-size: 14px;
        color: rgb(110, 110, 110);
        text-decoration: none;
      }

      &.active {
        color: #2265f6;
        font-weight: 600;
        & i {
          transform: rotate(90deg);
          color: #2265f6;
        }

        & a {
          text-decoration: none;
          color: #2265f6;
          font-weight: 600;
        }
      }
    }
  }

  &-children {
    &-list {
      color: gray;
      font-size: 13px;
      margin-left: 15px;
      margin-bottom: 5px;
    }
    &-item {
      & i {
        color: rgb(110, 110, 110);
      }
      & a {
        color: rgb(110, 110, 110);
        text-decoration: none;
      }

      &.active {
        & i {
          color: #2265f6;
        }

        & a {
          text-decoration: none;
          color: #2265f6;
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
