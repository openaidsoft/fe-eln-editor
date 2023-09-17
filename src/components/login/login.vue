<template>
  <div class="login login-v1">
    <div class="login-container">
      <div class="login-header">
        <div class="brand">
          <div class="d-flex align-items-center"><span class="logo"></span> <b>Cleve</b> Lab</div>
        </div>
        <div class="icon">
          <i class="fa fa-lock"></i>
        </div>
      </div>

      <!-- BEGIN login-body -->
      <div class="login-body">
        <!-- BEGIN login-content -->
        <div class="login-content fs-13px">
          <Form method="GET" @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
            <div class="form-floating mb-20px">
              <Field type="email" name="email" class="form-control fs-13px h-45px" id="emailAddress" placeholder="Email Address" :class="{ 'is-invalid': errors.email }" />
              <label for="emailAddress" class="d-flex align-items-center py-0">Email Address</label>
              <div class="invalid-feedback">{{ errors.email }}</div>
            </div>
            <div class="form-floating mb-20px">
              <Field type="password" class="form-control fs-13px h-45px" id="password" name="password" placeholder="Password" :class="{ 'is-invalid': errors.password }" />
              <label for="password" class="d-flex align-items-center py-0">Password</label>
              <div class="invalid-feedback">{{ errors.password }}</div>
            </div>
            <div class="form-check mb-20px">
              <Field class="form-check-input" type="checkbox" value="" id="rememberMe" name="RememberMe" />
              <label class="form-check-label" for="rememberMe"> Remember Me </label>
            </div>
            <div class="login-button-box">
              <button type="submit" class="login-button" @click="onclick">Login</button>
            </div>
          </Form>
        </div>
        <!-- END login-content -->
      </div>
      <!-- END login-body -->
    </div>
  </div>
</template>

<script>
import LoginService from "@/services/login.service.js";
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import VariableContent from "@/Content.js";

export default {
  name: "loginView",
  components: {
    LoginService,
    Field,
    Form,
  },
  data() {
    const schema = Yup.object().shape({
      email: Yup.string().required("Email is required").email("Email is invalid"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      // acceptTerms: Yup.string().required("Accept Ts & Cs is required"),
    });
    return {
      schema,
      loginResult: false,
    };
  },
  methods: {
    onSubmit(values) {
      this.schema.isValid(values).then((valid) => {
        if (valid) {
          const params = values;
          this.axios
            .get(`${VariableContent.URL}/login/${values.email}`, {
              params,
            })
            .then((res) => {
              if (res.data.length === 1) {
                this.$session.set("usr_id", res.data[0].id);
                this.$session.set("usr_cp_no", res.data[0].cp_no);
                this.$session.set("usr_email", res.data[0].email);
                this.$emit("loginResult", true);
              }
            })
            .catch((err) => {
              alert("아이디 혹은 비밀번호를 확인해주세요.");
              console.log(err);
            });
        } else {
        }
      });
    },
  },
};
</script>

<style lang="scss">
.login-button {
  width: 100%;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  background: #00acac;
  text-align: center;
  padding: 10px;
}

.brand {
  font-weight: 800;
}
</style>
