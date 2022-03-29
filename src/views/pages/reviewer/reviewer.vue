<template>
  <div class="login__fon"></div>
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
</style>