<template>
  <div class="login__fon">
    На почту было отправлено подтверждение акаунта, перейдите пожалуйста по
    ссылке
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { FORGOTPESSWORD, LOGIN, ADMIN } from "@/router/routerNames";
import Cookies from "js-cookie";
import AuthService from "@/api/plugins/services/authService";
import UserRole from "@/Enum/UserRole";

@Options({
  emits: ["goToAdmin"],
})
export default class ActivateAccountInfo extends Vue {}
</script>
<style scoped >
</style>