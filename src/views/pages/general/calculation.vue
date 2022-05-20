<template>
  <div>
    Калькуляция
    <button @click="goToMain">Вернуться на главную</button>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { MAINPAGE } from "@/router/routerNames";

@Options({
  emits: ["goToAdmin"],
})
export default class Calculation extends Vue {
  goToMain() {
    this.$router.push({name:MAINPAGE});
  }
}
</script>
<style scoped >
</style>