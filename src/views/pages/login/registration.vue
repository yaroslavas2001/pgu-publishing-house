<template>
  <modal-block title="Регистрация" @clickBack="goToHome">
    <form class="form">
      <label-input
        nameLabel="Email"
        placeholder="Введите email..."
        v-model="email"
      />
      <label-input
        nameLabel="Пароль"
        placeholder="Введите пароль"
        v-model="password"
      />
      <label-input
        nameLabel="Подтвердите пароль"
        placeholder="Введите пароль второй раз"
        v-model="confirmPassword"
      />
      <label-input
        nameLabel="Имя"
        placeholder="Введите Ваше имя"
        v-model="firstName"
      />
      <label-input
        nameLabel="Фамилия"
        placeholder="Введите Вашу фамилию"
        v-model="lastName"
      />
      <label-input
        nameLabel="Отчество"
        placeholder="Введите Ваше отчество"
        v-model="fatherName"
      />
    </form>
    <div class="btn-block">
      <btn isSmall @click="enterPage" title="Регистрация" class="btn-reg" />

      <!-- <label class="wrong-lable" for="username" v-if="wrong">
        {{ errorMessage }}
      </label> -->
    </div>
  </modal-block>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { FORGOTPESSWORD, LOGIN } from "@/router/routerNames";
@Options({
  emits: ["goToAdmin"],
})
export default class RegistrationPage extends Vue {
  username = "";
  password = "";
  email: string = "";
  confirmPassword: string = "";
  firstName: string = "";
  lastName: string = "";
  fatherName: string = "";
  errorMessage: string = "";
  wrong: boolean = false;
  isshowEye = false;
  goToHome() {
    this.$router.push({ name: LOGIN });
  }
  async enterPage() {
    console.log(
      "username",
      this.username,
      "password",
      this.password,
      "email",
      this.email
    );
    console.log("api", this.$api);
    // return
    let res = await this.$api.AuthService.createUser({
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      firstName: this.firstName,
      lastName: this.lastName,
      fatherName: this.fatherName,
    });
    console.log("res", res);
    if (res.isSuccess) {
      this.$router.push({});
    }
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
  goToAdmin() {
    // this.$router.push({ name: this.Users });
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
.btn-block {
  display: flex;
  justify-content: space-between;
  margin-top: 9px;
}
</style>