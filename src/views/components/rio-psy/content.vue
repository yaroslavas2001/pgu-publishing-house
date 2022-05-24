<template>
  <div class="content-block">
    <div v-if="title" class="content-title">{{ title }}</div>
    <slot />
  </div>
</template>
<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";

@Options({
  name: "content",
})
export default class ContentComponent extends Vue {
  @Prop({ type: String, default: "" }) title: string;
}
</script>
<style lang="less" scoped>
.content-block {
  padding: 14px 26px;
  .content-title{
    font-size: 17px;
    padding-bottom: 12px ;
    font-weight: 600;
    border-bottom: 2px #F0F0F0 solid;
  }
}
</style>
