<template>
  <content title="Детальная материала" isBack @clickBack="clickBack">{{ id }} </content>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { ADMINMATERIALS } from "@/router/routerNames";
@Options({
  // emits: ["goToAdmin"],
})
export default class MaterialDetailed extends Vue {
    id: number = null;
  created() {
    console.log(this.$route.params.id);
    this.id = Number(this.$route.params.id);
  }
  clickBack() {
    this.$router.push({ name: ADMINMATERIALS });
  }
}
</script>
<style scoped >

</style>