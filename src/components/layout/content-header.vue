<template>
  <div class="content-header d-flex justify-content-between">
    <div class="content-header-title">{{ content_title }}</div>
    <div class="content-header-menu-root">{{ this.root }}</div>
  </div>
  <div class="content-header-border"></div>
  <router-view></router-view>
</template>
<script>
export default {
  name: "content-header",
  mounted() {
    this.getTitle();
  },
  updated() {
    this.getTitle();
  },
  data() {
    return {
      root: "",
      content_title: null,
    };
  },
  methods: {
    getTitle() {
      this.content_title = this.$route.name;
      this.root = "";
      this.$route.matched.forEach((each, i) => {
        if (this.$route.matched.length - 1 === i) {
          this.root += each.name;
        } else {
          this.root += each.name + " > ";
        }
      });
    },
  },
};
</script>

<style lang="scss">
.content-header {
  color: #353d79;
  background: #f0f0f0;
  padding: 0 10px;
  border-radius: 5px;

  &-title {
    font-size: 22px;
    font-weight: 600;
    padding-top: 10px;
  }

  &-menu-root {
    font-size: 14px;
    padding-top: 10px;
    line-height: 3;
  }

  &-border {
    height: 2px;
    // background: linear-gradient(to right, pink, rgb(21, 21, 90));
    margin-bottom: 15px;
  }
}
</style>
