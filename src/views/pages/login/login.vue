<template>
  <modal-block title="Вход" @clickBack="goToMainPage">
    <form class="form">
      <label-input
        nameLabel="Email"
        placeholder="Введите email..."
        v-model="username"
      />
      <label-input
        nameLabel="Пароль"
        placeholder="Введите пароль"
        v-model="password"
      />
    </form>

    <div class="btn-block">
      <btn isSmall @click="enterPage" title="Войти" />
      <!-- <button class="btn-text" @click="goToAdmin">admin</button> -->
      <!-- <button class="btn-text" @click="goToUser">user</button> -->
      <div class="btn-block-right">
        <btn isSmall @click="registration" title="Регистрация" class="mb-5" />
        <!-- <button class="btn-text" @click="forgot">Забыли пароль</button> -->
      </div>
    </div>
  </modal-block>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import {
  FORGOTPESSWORD,
  REGISTRATION,
  ADMIN,
  USER,
  INDEX,
} from "@/router/routerNames";
import UserRole from "../../../Enum/UserRole";
@Options({})
export default class LoginPageComponent extends Vue {
  username = "";
  password = "";
  errorMessage: string = "";
  wrong: boolean = false;
  isshowEye = false;
  // если админ, то на страницу админа, если пользователь то на пользователя
  async enterPage() {
    console.log("username", this.username, "password", this.password);
    //найти регулярное выражение для телефона, почитать про директивы
    if (this.username.length == 0 || this.password.length == 0) {
      this.errorMessage = "Пароль или телефон не введен";
      this.wrong = true;
    }
    if (this.username.length > 0 && this.password.length > 0) {
      let res = await this.$api.AuthService.login({
        email: this.username,
        password: this.password,
      });
      if (res.isSuccess) {
        this.$store.state.UserRole = res.data.role;
        this.$store.state.UserId = res.data.id;
        if (res.data.role == UserRole.Admin) this.$router.push({ name: ADMIN });
        else if (res.data.role == UserRole.User)
          this.$router.push({ name: USER });
      } else {
        this.wrong = true;
        this.errorMessage = res.errorMessage;
      }
    }
  }

  registration() {
    this.$router.push({ name: REGISTRATION });
  }
  forgot() {
    this.$router.push({ name: FORGOTPESSWORD });
  }
  goToAdmin() {
    this.$store.state.UserRole = UserRole.Admin;
    this.$router.push({ name: ADMIN });
  }
  goToUser() {
    this.$store.state.UserRole = UserRole.User;
    this.$router.push({ name: USER });
  }
  goToMainPage() {
    this.$router.push({ name: INDEX });
  }
}
</script>
<style scoped lang="less" >
.btn-block {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  .btn-block-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
}
</style>