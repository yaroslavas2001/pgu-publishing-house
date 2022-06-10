<template>
  <content title="Детальная нового материала" isBack @clickBack="clickBack">{{ id }} </content>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import {  NEWMATERIALADMIN } from "@/router/routerNames";
@Options({
  // emits: ["goToAdmin"],
})
export default class NewMaterialDetailed extends Vue {
  id: number = null;
  created() {
    console.log(this.$route.params.id);
    this.id = Number(this.$route.params.id);
  }
  clickBack() {
    this.$router.push({ name: NEWMATERIALADMIN });
  }
}
</script>
<style scoped >
</style>