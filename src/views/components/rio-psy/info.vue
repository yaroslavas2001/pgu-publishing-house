<template>
  <div class="info" />
</template>
<script lang="ts">
import { Options, Prop, Vue, Watch } from "vue-property-decorator";

@Options<Info>({
  name: "info",
})
export default class Info extends Vue {}
</script>
<style lang="less" scoped>
.info {
  background: url("../../../assets/img/icons8-info.svg") center no-repeat;
  background-size: 100% 100vh;
  height: 20px;
  width: 20px;
}
.info:hover,
.info:active,
.info:focus {
  background: url("../../../assets/img/icons8-info.gif") center no-repeat;
  background-size: 20px;
}
</style>