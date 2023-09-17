<template>
  <div class="todo-heading d-flex mb-2">
    <input type="text" maxlength="100" class="w-100 inputTodo" placeholder="할 일 추가" v-model="inputTodo" @keyup.enter="addTodo" />
    <a href="#" @click="addTodo"><i class="fas fa-plus"></i></a>
  </div>
  <div class="panel panel-inverse inputPanel" data-sortable-id="index-8">
    <div class="panel-body p-0">
      <div class="todolist">
        <div class="todolist-item" v-for="(item, i) in todolist" :key="i">
          <div class="d-flex w-100">
            <div class="todolist-input">
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="todolist1" data-change="todolist" @click.prevent="done(i, item)" />
              </div>
            </div>
            <div class="d-flex w-100 justify-content-between">
              <label class="todolist-label" for="todolist1">{{ item.content }}</label>
              <i class="fas fa-edit todolist-option me-2 pt-2" @click="$emit('selectTodo', item)"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="mb-1">
    <button type="button" class="btn btn-sm DoneTodoBtn" @click="showDoneList">
      <i class="fas fa-angle-double-right="></i>완료됨 <b-badge variant="secondary">{{ donelist.length }}</b-badge>
    </button>
  </div>
  <div class="panel-body p-0 border rounded" v-if="isShowDoneList">
    <div class="todolist">
      <div class="todolist-item active" v-for="(item, i) in donelist" :key="i">
        <div class="d-flex">
          <div class="todolist-input">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="todolist1" data-change="todolist" @click.prevent="undone(i, item)" checked />
            </div>
          </div>
          <label class="todolist-label" for="todolist1">{{ item.content }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import todoService from "@/services/todo.service.js";

export default {
  name: "todolist",
  data() {
    return {
      name: "todolist",
      components: {
        todoService,
      },
      todolist: [],
      donelist: [],
      inputTodo: "",
      isTodo: false,
      isShowDoneList: false,
    };
  },
  mounted() {
    todoService
      .getTodoList()
      .then((response) => {
        this.todolist = response;
      })
      .catch((reason) => {
        console.log(reason);
      });
  },
  methods: {
    done(idx, content) {
      this.todolist.splice(idx, 1);
      this.donelist.push(content);
    },
    showDoneList() {
      this.isShowDoneList = !this.isShowDoneList;
    },
    undone(idx, todo) {
      this.donelist.splice(idx, 1);
      this.todolist.push(todo);
    },
    addTodo() {
      this.todolist.push({ id: this.todolist.length + 1, content: this.inputTodo });
      this.inputTodo = "";
      console.log(this.todolist);
      // todoService
      //   .postTodoList(this.inputTodo)
      //   .then((response) => {
      //     this.todolist.push(response);
      //   })
      //   .catch((reason) => {
      //     console.log(reason);
      //   });
    },
  },
};
</script>

<style scoped lang="scss">
.todo-heading {
  & a {
    padding-top: 3px;
    padding-left: 10px;
  }
  & i {
    padding: 5px;
    color: gray;
    font-size: 16px;
    margin-right: 10px;
  }
  & input {
    border-radius: 5px;
    border: 1px solid #dadada;
    padding: 5px 10px;
    font-size: 14px;
  }
}

.todolist {
  border: 1px solid #d8d8d8;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  &-option {
    &:hover {
      cursor: pointer;
      color: blue;
    }
  }
}

.DoneTodoBtn {
  background: #b6b6b6;
  color: rgb(255, 255, 255);
  padding-right: 10px;
}
.inputTodo {
  border-radius: 5px;
}

input::before {
  background: gray;
}
input:focus {
  outline: none;
}
</style>
