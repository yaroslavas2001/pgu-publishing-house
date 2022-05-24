<template>
  <div class="main-page">
    <div class="main-page-block">
      <div class="main-page-text">Издательство ПГУ им. Т.Г. Шевченко</div>
      <div class="main-page-sub-text">
        Немного информации о издательстве, можно сделать что-то типа ссылки на
        историю...
      </div>
      <btn title="Калькуляция" @click="goToCal" class="btn-cal"/>
      <btn title="Вход" @click="goToLogin" />
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { LOGIN, CALCULATION } from "@/router/routerNames";
@Options({})
export default class MainPage extends Vue {
  goToLogin() {
    this.$router.push({ name: LOGIN });
  }
  goToCal() {
    this.$router.push({ name: CALCULATION });
  }
}
</script>
<style scoped lang="less" >
.main-page {
  background: url("./../../../assets/img/close-up-hands-holding-open-book-small.jpg")
    center no-repeat;
  background-size: 100% 100vh;
  height: 100vh;
  position: relative;
  .main-page-block {
    position: absolute;
    top: 25%;
    left: 100px;
    max-width: 550px;
    display: flex;
    flex-direction: column;
    .main-page-text {
      font-size: 60px;
      margin-bottom: 10px;
    }
    .main-page-sub-text {
      max-width: 400px;
      margin-bottom: 25px;
    }
  }
}
.btn-cal{
  margin-bottom: 10px;
}
</style>