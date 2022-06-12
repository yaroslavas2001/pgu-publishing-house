<template>
  <div class="content-block">
    <div class="content-block-all">
      <div class="content-block-title">
        <img
          src="../../../assets/img/login-arrow-symbol-entering-back-into-a-square_icon-icons.com_73221.svg"
          alt="arrow-back"
          @click="$emit('clickBack')"
          class="pointer arrow-back"
          v-if="isBack"
        />
        <div v-if="title" class="content-title">{{ title }}</div>
      </div>
      <slot name='header' />
    </div>

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
  @Prop({ type: Boolean, default: false }) isBack: boolean;
}
</script>
<style lang="less" scoped>
.content-block {
  padding: 14px 26px;
  .content-block-all {
    display: flex;
    justify-content: space-between;
    .content-block-title {
      display: flex;
      text-align: center;
      padding-bottom: 12px;
      .arrow-back {
        margin-right: 10px;
      }
      .content-title {
        font-size: 17px;
        font-weight: 600;
        border-bottom: 2px #f0f0f0 solid;
      }
    }
  }
}
</style>
