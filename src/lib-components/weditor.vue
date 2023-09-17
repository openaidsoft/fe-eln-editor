<template>
  <div class="page">
    <template v-for="each of this.state.block" v-bind:key="each">
      {{ each }}
      <contenteditable
        :id="each.id"
        :tag="each.tag"
        :contenteditable="this.isEditable"
        :modelValue="each.html"
        :noNL="true"
        :noHTML="false"
        @update:modelValue="each.html = $event"
        @returned="this.enterPressed"
        @onTemplateMenu="this.onTemplateMenu"
      />
    </template>
  </div>
</template>

<script>
import { defineComponent } from "vue";

function uid() {
  // return Date.now().toString(36) + Math.random().toString(36).substr(2);
  // console.log('uid!!');
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
let BLOCK_TEMPLATE = { id: uid(), html: "", tag: "div" };

export default /*#__PURE__*/ defineComponent({
  name: "Weditor",
  data() {
    return {
      // initialBlock: {id: this.uid(), html: '', tag: 'div'},
      state: {
        block: [BLOCK_TEMPLATE],
      },
      message: "",
      isEditable: true,
    };
  },
  computed: {},
  methods: {
    enterPressed(o, $event) {
      // console.log('EnterPressed', o, $event);
      // console.log('state.block', this.state.block);
      let targetIdx = 1;
      this.state.block.forEach((r, idx) => {
        if (r.id === o.id) {
          targetIdx = idx + 1;
          return;
        }
      });
      this.state.block.splice(targetIdx, 0, this.getInitialBlock());
      // this.state.block.push(this.getInitialBlock());
      setTimeout(function () {
        // I'm not sure whether it's necessary. I would keep the timer as of now.
        $event.target.nextElementSibling.focus();
      }, 10);
    },
    onTemplateMenu() {
      console.log("onTemplateMenu");
      console.log(this.state);
    },
    onUpdateContent($event) {
      console.log($event);
    },
    getInitialBlock() {
      const obj = {};
      Object.assign(obj, BLOCK_TEMPLATE);
      obj.id = uid();
      return obj;
    },
  },
});
</script>

<style scoped>
.weditor-sample {
  display: block;
  width: 400px;
  margin: 25px auto;
  border: 1px solid #ccc;
  background: #eaeaea;
  text-align: center;
  padding: 25px;
}
.weditor-sample p {
  margin: 0 0 1em;
}
</style>
