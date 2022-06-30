<template>
  <modal-block title="Благодарности" :isBask="false">
    <div>Отправка рецензии прошла успешно, спасибо за рецензию.</div>
  </modal-block>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";

@Options({})
export default class ReviewerGratitude extends Vue {}
</script>
<style scoped >
</style>