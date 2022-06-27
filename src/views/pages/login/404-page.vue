<template>
  <modal-block title="Страница не найдена" :isBask="false">
    <div class="error-title mb-10">404</div>
    <div class="error-text mb-10">
      Кажется что то пошло не так! <br />Страниа, которую вы запрашиваете не
      найдена
    </div>
    <btn isSmall @click="enterPage" title="Вернуться на глувную" class="mb-5" />
  </modal-block>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { INDEX } from "@/router/routerNames";
@Options({})
export default class ErrorPageComponent extends Vue {
  async enterPage() {
    this.$router.push({ name: INDEX });
  }
}
</script>
<style scoped>
.error-title {
  font-size: 40px;
  color: #cd8458;
  font-weight: bold;
  line-height: 120%;
  font-family: "Open Sans", sans-serif;
  display: flex;
  justify-content: center;
}
.error-text {
  max-width: 300px;
}
</style>