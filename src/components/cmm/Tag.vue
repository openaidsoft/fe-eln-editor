<template>
  <div class="tag-input overflow-auto" @change="countTag">
    <div v-for="(tag, index) in tags" :key="tag" class="tag-input__tag">
      <span @click="removeTag(index)">x</span>
      {{ tag }}
    </div>
    <input type="text" placeholder="Enter a Tag" class="tag-input__text" :disabled="maxlength ? '' : disabled" @keyup.enter="inputTag" @keydown.delete="removeLastTag" />
  </div>
</template>
<script>
export default {
  name: "Tag",
  props: { value: Array },
  data() {
    return {
      tags: [],
      maxlength: false,
    };
  },
  created() {
    if (this.value) {
      this.tags = this.value;
    }
    document.getElementsByClassName("tag-input__text").focus;
  },
  methods: {
    inputTag(event) {
      event.preventDefault();
      var val = event.target.value.trim();
      if (val.length > 0) {
        event.target.value = "";
        this.tags.push(val);
        event.preventDefault();
        this.$emit("inputTags", this.tags);
      }
    },
    removeTag(index) {
      console.log(index);
      this.tags.splice(index, 1);
    },
    countTag(event) {
      var val = event.target.value.trim();
    },
    removeLastTag(event) {
      if (event.target.value.length === 0) {
        this.removeTag(this.tags.length - 1);
      }
    },
  },
};
</script>
<style scoped lang="scss">
.tag-input {
  width: 100%;
  border: 1px solid rgb(222, 222, 222);
  border-radius: 8px;
  font-size: 0.8em;
  height: 100px;
  background: white;
  box-sizing: border-box;
  padding: 0 10px;
}

.tag-input__tag {
  height: 25px;
  float: left;
  margin-right: 10px;
  background-color: #f8a062;
  margin-top: 10px;
  line-height: 25px;
  padding: 0 10px;
  border-radius: 5px;
  color: white;
}

.tag-input__tag > span {
  cursor: pointer;
  opacity: 0.75;

  &:hover {
    color: gray;
  }
}

.tag-input__text {
  border: none;
  outline: none;
  font-size: 0.9em;
  line-height: 50px;
  background: none;
}
</style>
