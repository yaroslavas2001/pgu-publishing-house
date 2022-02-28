<template>
  <div class="login__fon">
    <div class="login">
      <div class="login__block">
        <page-template>
          <template #header> <div class="error-code">404</div> </template>
          <template #body>
            <div class="error-title">Страница не найден</div>
            <div class="error-text mt-3">
              Кажется что то пошло не так! Страниа, которую вы запрашиваете не
              найдена
            </div>
          </template>
          <template #footer>
            <button class="btn-enter" @click="enterPage">На главную</button>
          </template>
        </page-template>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { LOGIN } from "@/router/routerNames";
@Options({
  emits: ["goToAdmin"],
})
export default class ErrorPageComponent extends Vue {
  async enterPage() {
    this.$router.push({ name: LOGIN });
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
.error-code {
  font-size: 64px;
  font-weight: bold;
  line-height: 120%;
  color: #0e357e;
}
.page-template-header {
  padding: 40px 30px !important;
}
.page-template-footer {
  padding: 32px 31px !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  min-height: 321px;
  width: 623px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
}
.error-title {
  font-size: 34px;
  line-height: 120%;
  color: #0e357e;
  font-weight: bold;
}
.error-text {
  font-size: 19px;
  line-height: 120%;
  color: #0e357e;
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
</style>