<template>
  <div class="formula-box flex-wrap">
    <mathlive-mathfield
      :id="id"
      class="formula-input-box"
      :class="{ 'formula-view': formulaView }"
      :options="{ smartFence: false }"
      v-model="latexContent"
      virtual-keyboard-mode="manual"
      virtual-keyboard-theme="apple"
      @input="inputFormula"
      @focus="focusHandler"
      @focusout="focusoutHandler"
    >
      {{ latexContent }}
    </mathlive-mathfield>
    <div v-if="isLatex">
      <textarea id="latex" v-model="latexContent"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: "formula",
  inject: ["blocks", "updateBlocks"],
  props: {
    id: String,
    editTagId: String,
    editTagItem: Object,
  },
  setup(props) {
    let latexContent = "";
    if (props.editTagItem) {
      latexContent = props.editTagItem.data;
    }
    return {
      latexContent,
    };
  },
  data() {
    return {
      isLatex: false,
      formulaView: false,
    };
  },
  methods: {
    inputFormula(e) {
      const mf = document.getElementById(this.id);
      this.saveData(mf); // input이 일어날 때마다 blocks에 반영
      this.latexContent = mf.value;
    },
    saveData(mf) {
      let target = this.blocks.filter((r) => r.block.editTagId === this.id)[0];
      const editTagItem = { editTagItem: { data: mf.value } };
      target.block = { ...target.block, ...editTagItem };
      this.updateBlocks(this.blocks);
    },
    /**
     * formula에 focus가 있을때, latex textarea가 보임
     */
    focusHandler() {
      this.isLatex = true;
      this.formulaView = false;
    },
    focusoutHandler() {
      this.isLatex = false;
      this.formulaView = true;
    },
  },
};
</script>

<style lang="scss">

.formula-box{
  background: #f1f1f1;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
}

.formula-input-box {
  width: 100%;
  margin-bottom: 5px;
  margin-top: 5px;
  &.formula-view {
    padding: 15px;
    border-radius: 5px;
  }
}

#latex {
  width: 100%;
  height: 100px;
  padding: 10px;
  box-sizing: border-box;
  border: solid 2px #84c2ff;
  background: rgb(227, 238, 255);
  border-radius: 5px;
  font-size: 16px;
  resize: both;
}

</style>
