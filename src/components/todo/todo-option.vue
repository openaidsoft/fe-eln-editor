<template>
  <off-canvas :style="{ background: '#faf8e6' }">
    <template v-slot:header>
      <h4>todoList-option</h4>
    </template>
    <template v-slot:body>
      <b-card-group deck class="todo-opt">
        <b-card no-body :header="todo_title" class="todo-opt-title">
          <b-list-group flush class="todo-opt-list">
            <b-list-group-item href="#">
              <i class="fas fa-plus"></i>단계추가
              <div class="form-group">
                <input type="text" class="input-control" />
                <button class="add-step-btn"><i class="fas fa-paper-plane"></i></button>
              </div>
            </b-list-group-item>
            <b-list-group-item href="#">
              <i class="fas fa-calendar-alt"></i>기한입력
              <Datepicker v-model="date" ref="calender" multiDates :enableTimePicker="false" class="main_calender" />
            </b-list-group-item>
            <b-list-group-item href="#"
              ><i class="fas fa-sticky-note"></i>메모추가
              <div>
                <textarea></textarea></div
            ></b-list-group-item>
            <b-list-group-item href="#"><i class="fas fa-share-alt"></i>할당대상</b-list-group-item>
          </b-list-group>
        </b-card>
      </b-card-group>
    </template>
  </off-canvas>
</template>
<script>
import offCanvas, { OffCanvasConst } from "@/components/cmm/offCanvas.vue";
export default {
  name: "todo-option",
  props: {
    id: String,
    todo_title: String,
  },
  components: {
    offCanvas,
    OffCanvasConst,
  },
  updated() {
    console.log(this.todo_title);
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss">
.todo-opt {
  & .card-header {
    font-weight: bold;
    padding: 10px 20px;
  }

  &-list {
    font-size: 15px;
    list-style: none;
    margin-bottom: 20px;

    &:hover {
      cursor: pointer;
    }

    & textarea,
    input {
      width: 100%;
      border: 1px solid #d9d9d9;
      border-radius: 5px;
      padding: 5px;
    }

    & i {
      margin-right: 10px;
    }

    & .form-group {
      position: relative;
      & .add-step-btn {
        line-height: 2;
        position: absolute;
        right: 0;
        border: none;
        background: transparent;
      }
    }
  }
}
</style>
