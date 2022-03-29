<template>
  <div class="login__fon"></div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import {
  FORGOTPESSWORD,
  ENTERPRISES,
  REGISTRATION,
} from "@/router/routerNames";
@Options({
  // emits: ["goToAdmin"],
})
export default class Admin extends Vue {}
</script>
<style scoped >
</style>