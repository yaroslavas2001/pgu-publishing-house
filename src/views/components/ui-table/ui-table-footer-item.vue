<template>
  <div class="ui-table-footer-item">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

export default class UiTableFooterItemComponent extends Vue {}
</script>

<style lang="less">
.ui-table-footer-item {
  display: flex;
}
</style>