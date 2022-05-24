<template>
  <modal-block title="Смена пароля" @clickBack="goToLogin">
    <form class="form">
      <label-input
        nameLabel="Email"
        placeholder="Введите email..."
        v-model="phone"
      />
    </form>
        <div class="btn-block">

    <btn isSmall @click="enterPage" title="Сменить пароль" />
    </div>
  </modal-block>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { LOGIN } from "@/router/routerNames";

@Options({
  emits: ["goToAdmin"],
})
export default class ForgotPasswordPageComponent extends Vue {
  phone = "";
  password = "";
  errorMessage: string = "";
  wrong: boolean = false;
  isshowEye = false;

  async enterPage() {
    //найти регулярное выражение для телефона, почитать про директивы
    if (this.phone.length == 0 || this.password.length == 0) {
      this.errorMessage = "Пароль или телефон не введен";
      this.wrong = true;
    }
    if (this.phone.length > 0 && this.password.length > 0) {
      let res = await this.$api.AuthService.login({
        email: this.phone,
        password: this.password,
      });
      // if (res.isSuccess) this.$router.push({ name: this.Users });
      // else {
      //   this.wrong = true;
      //   this.errorMessage = res.errorMessage;
      // }
    }
  }

  goToLogin() {
    this.$router.push({ name: LOGIN });
  }
}
</script>
<style scoped>
.btn-block{
  display: flex;
  justify-content: space-between;
  margin-top: 9px;
}
</style>