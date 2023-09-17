<template>
  <div class="menu">
    <div class="menu-profile">
      <!-- <div class="menu-profile-cover with-shadow"></div> -->
      <div class="d-flex">
        <div class="menu-profile-image">
          <img src="/images/pengsoo.png" />
        </div>
        <div class="menu-profile-info">
          <div class="d-flex align-items-center">
            <!-- <div class="flex-grow-1">{{ usr_id }}</div> -->
            <div class="flex-grow-1">Sooah Yang</div>
          </div>
          <small>Lead Developer</small>
        </div>
      </div>
      <div class="text-end">
        <a href="#" class="logout-btn" @click="logout">logout</a>
      </div>
      <hr style="margin: 8px 0px 15px 0px; color: gray" />
      <div>
        <div class="menu-item">
          <a href="javascript:;" class="menu-option">
            <div class="menu-icon"><i class="fa fa-cog"></i></div>
            <div class="menu-text">Settings</div>
          </a>
        </div>
        <div class="menu-item">
          <a href="javascript:;" class="menu-option">
            <div class="menu-icon"><i class="fa fa-pencil-alt"></i></div>
            <div class="menu-text">Send Feedback</div>
          </a>
        </div>
        <div class="menu-item pb-5px">
          <a href="javascript:;" class="menu-option">
            <div class="menu-icon"><i class="fa fa-question-circle"></i></div>
            <div class="menu-text">Helps</div>
          </a>
        </div>
      </div>
    </div>
    <div class="menu-divider m-0"></div>
  </div>
</template>

<script>
import AppOptions from "@/config/AppOptions.vue";

export default {
  name: "SidebarNavProfile",
  data() {
    return {
      stat: "",
      appOptions: AppOptions,
      usr_id: null,
    };
  },
  created() {
   // this.usr_id = this.$session.get("usr_id");
  },
  methods: {
    logout() {
      // this.$session.destroy();
      // this.usr_id = this.$session.get("usr_id");
      // // console.log(this.usr_id);
      // this.$router.push("/");
    },
    expand: function () {
      this.stat = this.stat == "expand" ? "collapse" : "expand";
    },
  },
};
</script>

<style>
.logout-btn {
  text-decoration: none;
  font-size: 12px;
}
</style>
