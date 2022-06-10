<template>
  <content title="Детальная автора" isBack @clickBack="clickBack">
    {{ id }}
  </content>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { AUTHORSGROUP } from "@/router/routerNames";
@Options({
  // emits: ["goToAdmin"],
})
export default class AuthorsDetailed extends Vue {
  id: number = null;
  created() {
    console.log(this.$route.params.id);
    this.id = Number(this.$route.params.id);
  }
  clickBack() {
    this.$router.push({ name: AUTHORSGROUP });
  }
}
</script>
<style scoped >
</style>