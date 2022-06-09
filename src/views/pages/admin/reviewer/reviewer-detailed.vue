<template>
  <content title="Детальная" isBack @clickBack="clickBack">{{ id }} </content>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { REVIEWER } from "@/router/routerNames";
@Options({
  // emits: ["goToAdmin"],
})
export default class ReviewerDetailed extends Vue {
  id: number = null;
  created() {
    console.log(this.$route.params.id);
    this.id = Number(this.$route.params.id);
  }
  clickBack() {
    this.$router.push({ name: REVIEWER });
  }
}
</script>
<style scoped >
</style>
