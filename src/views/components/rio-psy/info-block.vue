<template>
  <div class="info-block">
    <div class="title">{{ title }}</div>
    <div class="description" v-if="description">{{ description }}</div>
    <slot v-else/>
  </div>
</template>
<script lang="ts">
import { Options, Prop, Vue, Watch } from "vue-property-decorator";

@Options<InfoBlock>({
  name: "info-block",
})
export default class InfoBlock extends Vue {
  @Prop({ type: String, default: "" }) title: string;
  @Prop({ type: String, default: "" }) description: string;
}
</script>
<style lang="less" scoped>
.info-block {
  display: flex;
  flex-direction: column;
  .title {
    font-size: 16px;
    margin: 20px 0 10px 0;
    font-family: "Open Sans", sans-serif !important;
    font-weight: bold;
  }
  .description {
    font-family: "Open Sans", sans-serif !important;
    font-size: 14px;
  }
}
</style>