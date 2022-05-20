<template>
  <div>
    <router-link :to="{ name: LOGIN }">Вход</router-link>
    <button @click="goToCal">Калькуляция</button>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { LOGIN,CALCULATION } from "@/router/routerNames";
@Options({
  // emits: ["goToAdmin"],
})
export default class MainPage extends Vue {
  LOGIN = LOGIN;
  goToCal() {
    this.$router.push({name:CALCULATION})
  }
}
</script>
<style scoped >
</style>