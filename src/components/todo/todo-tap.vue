<template>
  <div>
    <div class="todo-container">
      <div class="todo-list shadow">
        <ul>
          <li><i class="far fa-star me-2" style="color: #959515"></i>중요작업</li>
          <li><i class="fas fa-calendar-day me-2" style="color: blue"></i>오늘 할 일</li>
          <li><i class="far fa-calendar-check me-2" style="color: darkgray"></i>작업</li>
          <li><i class="fas fa-briefcase me-2" style="color: orange"></i>할당된작업</li>
          <li class="project-note">
            <div class="d-flex">
              <i class="fas fa-project-diagram me-2" style="color: red"></i>
              <b-accordion>
                <b-accordion-item title="프로젝트별 작업" visible>
                  <ul v-for="each in project_list" :key="each">
                    <li>{{ each.title }}</li>
                  </ul>
                </b-accordion-item>
              </b-accordion>
            </div>
          </li>
          <hr />
          <div v-for="item in addedTodolist" :key="item" class="todo-added-list">
            <ul>
              <li><i class="fas fa-bars"></i> {{ item }}</li>
            </ul>
          </div>

          <div v-if="isInputBox" class="todo-list-input-box d-flex mt-1">
            <i class="fas fa-bars me-2"></i>
            <input id="todo-list-input" class="todo-list-input" type="text" v-model="newtodoList" @keydown.enter="inputTodoList" placeholder="새 목록" />
          </div>
          <div class="add-todo-list mt-4">
            <button @click="addTodoList"><i class="fas fa-plus"></i>새 목록 추가</button>
          </div>
        </ul>
      </div>
      <div class="">
        <div class="todo-contents shadow">
          <todolist @selectTodo="selectTodo"></todolist>
        </div>
      </div>
      <TodoOption @onClose="slideClose" :show="isTodoOpen" :offcanvasEnd="isEndPosition" :todo_title="todoTitle"></TodoOption>
    </div>
  </div>
</template>
<script>
import todolist from "@/components/todo/todolist.vue";
import TodoOption from "@/components/todo/todo-option.vue";
import SidebarMenuService from "@/services/sidebar-menu.service.js";

export default {
  name: "todo-tap",
  components: {
    todolist,
    TodoOption,
  },
  data() {
    return {
      project_list: [],
      addedTodolist: [],
      newtodoList: "",
      isInputBox: false,
      todoTitle: "",
      isTodoOpen: false,
      isEndPosition: "",
    };
  },
  mounted() {
    SidebarMenuService.getProjectMenu().then((res) => {
      this.project_list = res;
      console.log(res);
    });
  },
  methods: {
    addTodoList() {
      this.isInputBox = true;
      setTimeout(() => {
        const inputBox = document.getElementById("todo-list-input");
        inputBox.focus();
      }, 100);
    },
    inputTodoList() {
      this.addedTodolist.push(this.newtodoList);
      this.isInputBox = false;
    },

    selectTodo(item) {
      console.log(item);
      console.log(item.content);
      this.todoTitle = item.content;
      this.isTodoOpen = true;
    },
    slideClose() {
      this.isTodoOpen = false;
    },
  },
};
</script>

<style lang="scss">
.todo {
  &-container {
    width: 100%;
    & i {
      color: gray;
    }
  }

  &-list {
    float: left;
    min-width: 250px;
    max-width: 300px;
    width: 25%;
    height: 100%;
    padding: 20px 30px;
    border: 1px solid #e9e9e9;
    background: #f5f5f5;
    border-radius: 10px;

    &-input {
      width: 100%;
      font-size: 14px;
      padding: 5px;
      border: 1px solid rgb(205, 205, 205);
      border-radius: 8px;

      &:focus {
        border: 2px solid rgb(174, 174, 174);
      }
    }

    & .project-note {
      & i {
        line-height: 1.8;
      }
    }
    & ul {
      padding-left: 0px;
    }

    & li {
      list-style: none;
      font-size: 14px;
      font-weight: 500;
      padding: 10px;
      color: grey;
      &:hover {
        cursor: pointer;
      }

      & .accordion-item {
        background: transparent;
        border: none;
      }

      & .accordion-body {
        height: 300px;
        padding-left: 0px;
        overflow-y: scroll;

        & ul {
          padding: 0px;
          & li {
            padding-top: 0px;
            padding-left: 0px;
          }
        }

        &::-webkit-scrollbar {
          width: 9px;
        }
        &::-webkit-scrollbar-thumb {
          background-color: #b0b0b0;
          border-radius: 10px;
          background-clip: padding-box;
          border: 2px solid transparent;
        }
        &::-webkit-scrollbar-track {
          background-color: rgb(222, 222, 222);
          border-radius: 10px;
          box-shadow: inset 0px 0px 5px white;
        }
      }
      & .accordion-button {
        font-size: 14px;
        color: gray;
        background: transparent;
        padding: 3px;
        border: 0px;
      }
    }
  }

  &-added-list {
    & ul {
      padding-left: 0px;
    }

    & li {
      list-style: none;
      font-size: 14px;
      font-weight: 500;
      padding: 10px;
      color: grey;
      &:hover {
        cursor: pointer;
      }
    }
  }

  &-contents {
    float: left;
    width: 75%;
    margin-left: 20px;
    margin-right: 20px;
    padding: 20px 30px;
    background: #faf8e6;
    border-radius: 10px;
  }
}

.add-todo-list {
  & button {
    font-size: 14px;
    border: none;
    color: gray;
    background: transparent;

    & i {
      margin-right: 8px;
    }
  }
}

.todo-list-input-box {
  & i {
    line-height: 2;
  }
}

@media screen and (max-width: 765px) {
  .todo-list {
    margin: 0;
  }
  .todo-contents {
    margin: 0;
  }
}
</style>
