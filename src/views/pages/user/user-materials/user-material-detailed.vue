<template>
  <content title="Детальная" isBack @clickBack="clickBack">{{ id }} </content>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { USERMATERIALS } from "@/router/routerNames";
import MaterialTableModel from "@/models/MaterialTableModel";
@Options({
  // emits: ["goToAdmin"],
})
export default class UserMaterialDetailed extends Vue {
  id: number = null;
  created() {
    console.log(this.$route.params.id);
    this.id = Number(this.$route.params.id);
  }
  clickBack() {
    this.$router.push({ name: USERMATERIALS });
  }
}
</script>
<style scoped  lang="less">
</style>