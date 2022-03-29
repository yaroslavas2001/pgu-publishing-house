<template>
  <div class="login__fon">
    <div class="login">
      <div class="login__block">
        <page-template>
          <template #header>Забыли пароль?</template>
          <template #body>
            <div class="">
              <label for="phone">Логин</label>
              <input
                type="text"
                placeholder="Введите логин"
                v-model="phone"
                @keypress.enter="enterPage"
                class="phone-login"
                id="phone"
                :class="{
                  wrong: wrong,
                }"
              />
            </div>
            <label for="password" class="mt-3">Пароль</label>
            <div
              class="password-input"
              :class="{
                wrong: wrong,
              }"
            >
              <input
                type="password"
                placeholder="Введите пароль"
                v-model="password"
                @keypress.enter="enterPage"
                class="password"
                id="password"
              />
              <div class="search eye-password" @click="ShowPassword">
                <!-- <img v-if="isshowEye" src="~@assets/img/eye.png" alt="eye" /> -->
                <!-- <img v-else src="~@assets/img/eye-off.png" alt="eye-off" /> -->
              </div>
            </div>

            <div class="forgot__password">
              <button class="forgot" @click="forgot">Забыли пароль?</button>
            </div>
          </template>
          <template #footer>
            <button class="btn-enter" @click="enterPage">Войти</button>
            <label class="wrong-lable" for="phone" v-if="wrong">
              {{ errorMessage }}
            </label>
            <!-- <button class="btn-add" @click="enterPage">регистрация</button> -->
          </template>
        </page-template>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
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

  forgot() {
    this.$router.push({ name: "forgot-password" });
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
<style scoped>
body {
  padding: 0px !important;
}
.page-template-body {
  display: flex;
  flex-direction: column;
  padding: 32px 31px !important;
}
.page-template-header {
  font-weight: bold;
  font-size: 24px;
  line-height: 120%;
  color: #0e357e;
  padding: 40px 30px !important;
}
.page-template-footer {
  padding: 32px 31px !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn-enter {
  padding: 12px 32px;
  background: #71b92f;
  border-radius: 8px;
  border: 0px;
  color: #ffffff;
  font-weight: 800;
  font-size: 14px;
  line-height: 150%;
  text-transform: uppercase;
}
.btn-add {
  padding: 11px 31px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #8797af;
  color: #8797af;
  font-weight: 800;
  font-size: 14px;
  line-height: 150%;
  text-transform: uppercase;
}
.login__input__block {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.wrong-lable {
  margin: 0;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  color: #d25338;
}
.wrong {
  border: 1px solid #d25338 !important;
  box-sizing: border-box;
  box-shadow: 0px 0px 15px rgba(210, 83, 56, 0.45);
}

.login__fon {
  background: #faf9f9;
  background-size: cover;
  height: 100vh;
}
.login {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 40px rgba(186, 193, 200, 0.2);
  margin-top: -125px;
}

.login__block {
  min-height: 421px;
  width: 623px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
}

.btn-enter:hover,
.btn-enter:focus,
.btn-enter:active {
  outline: none;
}
.forgot {
  border: 0;
  background: #ffffff;
  color: #71b92f;
  margin-top: 10px;
  font-size: 16px;
  line-height: 140%;
  cursor: pointer;
}
.forgot__password {
  display: flex;
  justify-content: flex-end;
}
.phone-login {
  border: 1px solid #d0d9de;
  background: #f3f4fa;
  font-size: 12px;
  height: 48px;
  width: 100%;
  color: #8797af;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 8px 12px;
  outline: none;
}
.password {
  border-top: 1px solid #d0d9de;
  border-left: 1px solid #d0d9de;
  border-bottom: 1px solid #d0d9de;
  border-right: 0px;
  background: #f3f4fa;
  font-size: 12px;
  width: 100%;
  height: 48px;
  color: #8797af;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 8px 12px;
  outline: none;
}
.password-input {
  display: flex;
}
.eye-password {
  cursor: pointer;
  background: #f3f4fa;
  height: 48px;
  padding: 12px 15px;
  border-top: 1px solid #d0d9de;
  border-right: 1px solid #d0d9de;
  border-bottom: 1px solid #d0d9de;
}
.ui-label-input .input {
  min-width: 310px;
  height: 48px !important;
}
</style>