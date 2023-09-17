<template>
  <div class="dd-btn-group">
    <li @click="toggleMenu()" class="dd-dropdown-toggle" v-if="selectedOption.name !== undefined">
      <template v-if="selectedOption.hasIcon">
        <span :class="selectedOption.icon"></span>
      </template>
      {{ selectedOption.name }}
      <span class="caret"></span>
    </li>

    <li @click="toggleMenu()" class="dd-dropdown-toggle dd-dropdown-toggle-placeholder" v-if="selectedOption.name === undefined">
      {{ placeholderText }}
      <span class="dd-caret"></span>
    </li>

    <ul class="dd-dropdown-menu" v-if="showMenu">
      <li v-for="(option, idx) in options" :key="idx">
        <a href="javascript:void(0)" @click="updateOption(option)">
          <template v-if="option.hasIcon">
            <span :class="option.icon"></span>
          </template>
          {{ option.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DropDown",
  props: {
    options: {
      type: [Array, Object],
    },
    selected: {},
    placeholder: [String],
    closeOnOutsideClick: {
      type: [Boolean],
      default: true,
    },
  },
  methods: {
    updateOption(option) {
      this.selectedOption = option;
      this.showMenu = false;
      this.$emit("updateOption", this.selectedOption);
    },
    toggleMenu() {
      console.log("toggleMeny");
      this.showMenu = !this.showMenu;
    },
    clickHandler(event) {
      const { target } = event;
      const { $el } = this;

      if (!$el.contains(target)) {
        this.showMenu = false;
      }
    },
  },
  mounted() {
    this.selectedOption = this.selected;
    if (this.placeholder) {
      this.placeholderText = this.placeholder;
    }

    if (this.closeOnOutsideClick) {
      document.addEventListener("click", this.clickHandler);
    }
  },
  unmounted() {
    document.removeEventListener("click", this.clickHandler);
  },
  data() {
    return {
      selectedOption: {
        name: "",
        value: "",
        hasIcon: false,
        icon: "",
      },
      showMenu: false,
      placeholderText: "Please select an item",
    };
  },
};
</script>

<style scoped>
.dd-btn-group {
  min-width: 80px;
  height: 40px;
  position: relative;
  margin: 10px 1px;
  display: inline-block;
  vertical-align: middle;
}

.dd-btn-group a:hover {
  text-decoration: none;
}

.dd-dropdown-toggle {
  color: #636b6f;
  min-width: 80px;
  padding: 10px 20px 5px 10px;
  text-transform: none;
  font-weight: 300;
  margin-bottom: 7px;
  border: 0;
  background-image: linear-gradient(#009688, #009688), linear-gradient(#d2d2d2, #d2d2d2);
  background-size: 0 2px, 100% 1px;
  background-repeat: no-repeat;
  background-position: center bottom, center calc(100% - 1px);
  background-color: transparent;
  transition: background 0s ease-out;
  float: none;
  box-shadow: none;
  border-radius: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.dd-dropdown-toggle:hover {
  /* / background: #e1e1e1; */
  color: rgb(68, 149, 254);
  cursor: pointer;
}

.dd-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  float: left;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  list-style: none;
  font-size: 14px;
  text-align: left;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  background-clip: padding-box;
}

.dd-dropdown-menu > li > a {
  padding: 10px 10px;
  display: block;
  clear: both;
  font-weight: normal;
  line-height: 1.6;
  color: #333333;
  white-space: nowrap;
  text-decoration: none;
}

.dd-dropdown-menu > li > a:hover {
  background: #efefef;
  color: #409fcb;
}

.dd-dropdown-menu > li {
  overflow: hidden;
  width: 100%;
  position: relative;
  margin: 0;
}

.dd-caret {
  width: 0;
  position: absolute;
  top: 19px;
  height: 0;
  margin-left: -24px;
  vertical-align: middle;
  border-top: 4px dashed;
  border-top: 4px solid \9;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  right: 10px;
}

li {
  list-style: none;
}
</style>
