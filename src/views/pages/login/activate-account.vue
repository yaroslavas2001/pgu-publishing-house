<template>
  <div class="login__fon">activete</div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { FORGOTPESSWORD, LOGIN, ADMIN,USER } from "@/router/routerNames";
import Cookies from "js-cookie";
import AuthService from "@/api/plugins/services/AuthService";
import UserRole from "@/Enum/UserRole";

@Options({})
export default class ActivateAccount extends Vue {
  username = "";
  password = "";
  email: string = "";
  confirmPassword: string = "";
  firstName: string = "";
  lastName: string = "";
  SureName: string = "";
  errorMessage: string = "";
  wrong: boolean = false;
  isshowEye = false;
  async created() {
    // console.log(this.$route.params.key);
    let keyUser: string = this.$route.params.key as string;
    let res = await this.$api.AuthService.activateUser(keyUser);
    if (res.isSuccess) {
      Cookies.set(AuthService.AdminAuthTokenName, res.data.token);
      this.$store.state.UserRole = UserRole.User;
      this.$router.push({ name: USER });
    }
    // console.log("res", res);
  }
  goToHome() {
    this.$router.push({ name: LOGIN });
  }
  async enterPage() {
    let res = this.$api.AuthService.createUser({
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      firstName: this.firstName,
      lastName: this.lastName,
    sureName: this.SureName,
    });

    //найти регулярное выражение для телефона, почитать про директивы
    // if (this.username.length == 0 || this.password.length == 0) {
    //   this.errorMessage = "Пароль или телефон не введен";
    //   this.wrong = true;
    // }
    // if (this.username.length > 0 && this.password.length > 0) {
    //   let res = await this.$api.AuthService.login({
    //     email: this.username,
    //     password: this.password,
    //   });
    //   if (res.isSuccess) {
    //     this.$router.push({ name: ENTERPRISES });
    //     this.$store.state.CurrentUser = this.username;
    //     // console.log("res",res);
    //   } else {
    //     this.wrong = true;
    //     this.errorMessage = res.errorMessage;
    //   }
    // }
  }

  forgot() {
    this.$router.push({ name: FORGOTPESSWORD });
  }

  ShowPassword() {
    var x = document.getElementById("password") as HTMLInputElement;
    if (x.type === "password") {
      this.isshowEye = true;
      x.type = "text";
    } else {
      x.type = "password";
      this.isshowEye = false;
    }
  }
}
</script>
<style scoped >
</style>