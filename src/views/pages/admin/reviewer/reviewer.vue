<template>
  <div class="authors">Authors</div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import {
  FORGOTPESSWORD,
  REGISTRATION,
} from "@/router/routerNames";
@Options({
  // emits: ["goToAdmin"],
})
export default class Reviewer extends Vue {}
</script>
<style scoped >
.authors{
  background-color: rgb(146, 39, 39);
  height: 500px;
  width: 500px;
}
</style>