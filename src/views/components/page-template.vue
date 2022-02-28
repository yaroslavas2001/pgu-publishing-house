<template>
  <div class="page-template">
    <div class="page-template-header">
      <slot name="header"></slot>
    </div>
    <div class="page-template-body">
      <slot name="body" />
    </div>
    <div class="page-template-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";

@Options({name:"page-template"})
export default class PageTemplate extends Vue {
  // @Prop({ type: Boolean, default: false }) showBack: boolean;
  // routerBack() {
  //   this.$router.back();
  // }
}
</script>
<style lang="less" scoped>
.page-template {
  background: white;
  width: 100%;
  // padding: 0 26px 30px 30px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  .page-template-header {
    background: #ebecf2;
    display: flex;
    justify-content: space-between;
    padding: 20px 50px;
    align-items: center;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  .page-template-body {
    padding: 30px 50px;
  }
  .page-template-footer {
    border-top: 1px solid #DFE7EB;
    padding: 30px 50px 25px 50px;
  }
}
// .routerBack {
//   margin-right: 10px;
// }
</style>
