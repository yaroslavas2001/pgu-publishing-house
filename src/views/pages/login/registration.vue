<template>
  <modal-block title="Регистрация" @clickBack="goToHome">
    <form class="form">
      <label-input
        nameLabel="Email"
        placeholder="Введите email..."
        v-model="authRegister.email"
      />
      <label-input
        nameLabel="Пароль"
        placeholder="Введите пароль"
        v-model="authRegister.password"
      />
      <label-input
        nameLabel="Подтвердите пароль"
        placeholder="Введите пароль второй раз"
        v-model="authRegister.confirmPassword"
      />
      <label-input
        nameLabel="Имя"
        placeholder="Введите Ваше имя"
        v-model="authRegister.firstName"
      />
      <label-input
        nameLabel="Фамилия"
        placeholder="Введите Вашу фамилию"
        v-model="authRegister.lastName"
      />
      <label-input
        nameLabel="Отчество"
        placeholder="Введите Ваше отчество"
        v-model="authRegister.sureName"
      />
    </form>
    <div class="btn-block">
      <btn isSmall @click="registration" title="Регистрация" class="btn-reg" />
      <label class="wrong-lable" for="username" v-if="wrong">
        {{ errorMessage }}
      </label>
    </div>
  </modal-block>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { ACTIVATEACCOUNTINFO, LOGIN } from "@/router/routerNames";
import AuthRegister from "@/api/plugins/models/Auth/AuthRegister";
@Options({})
export default class RegistrationPage extends Vue {
  authRegister: AuthRegister = new AuthRegister();
  errorMessage: string = "";
  wrong: boolean = false;
  goToHome() {
    this.$router.push({ name: LOGIN });
  }
  async registration() {
    let res = await this.$api.AuthService.createUser(this.authRegister);
    if (res.isSuccess) {
      this.wrong = false;
      this.$router.push({ name: ACTIVATEACCOUNTINFO });
    } else {
      this.wrong = true;
      this.errorMessage = res.errorMessage;
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