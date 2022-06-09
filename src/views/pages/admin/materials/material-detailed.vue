<template>
  <div class="articles__block">articles</div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { FORGOTPESSWORD, REGISTRATION } from "@/router/routerNames";
@Options({
  // emits: ["goToAdmin"],
})
export default class MaterialDetailed extends Vue {}
</script>
<style scoped >
.articles__block{
   /* background-color: rgb(66, 93, 209); */
  height: 500px;
  width: 500px;
}
</style>