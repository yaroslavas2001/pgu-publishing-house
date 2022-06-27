<template>
  <modal-block title="Информация об активации" :isBask="false">
    <div class="text mb-10">
      На Вашу почту было отправлено письмо, подтверждение акаунта произойдет при
      переходе по ссылке в письме.
    </div>
  </modal-block>
</template>
<script lang="ts">
import {  Vue } from "vue-property-decorator";

export default class ActivateAccountInfo extends Vue {}
</script>
<style scoped >
.text{
  max-width: 300px;
}
</style>