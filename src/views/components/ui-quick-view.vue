<template>
  <div class="quick-view">
    <div class="quick-view-header">
      <div class="quick-view-title pointer" @click="goToHome">
        <!-- <img src="@assets/img/arrow-left.svg" alt="arrow-left" /> -->
        <div class="qv-title">{{ titleText }}</div>
      </div>
      <button class="quick-view-btn" @click="goToHome">
        <!-- <img src="@assets/img/x.svg" alt="x" /> -->
        <div class="ml-2">Закрыть</div>
      </button>
    </div>
    <div class="quick-view-body">
      <slot name="table" />
    </div>
    <div class="quick-view-btn-success">
      <slot name="btn" />
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";

@Options({ name: "quick-view", emits: ["goToHome"] })
export default class UiQuickViewComponent extends Vue {
  @Prop({ type: String, default: "title" }) titleText: string;
  @Prop({ type: Boolean }) isActive: boolean;
  clickOutside() {}
  goToHome() {
    if (!this.isActive) this.$emit("goToHome");
  }
}
</script>
<style lang="less" scoped>
.quick-view {
  width: 100%;
  z-index: 1000;
  height: 100%;
  display: flex;
  flex-direction: column;
  .quick-view-header {
    background-color: #ebecf2;
    display: flex;
    justify-content: space-between;
    padding: 20px 75px 20px 50px;
    width: 100%;
    .quick-view-title {
      display: flex;
      width: 80%;
      align-items: center;
      margin-right: 10px;
      .qv-title {
        color: #4f5e74;
        margin-left: 10px;
        font-weight: bold;
        font-size: 18px;
      }
    }
    .quick-view-btn {
      display: flex;
      align-items: center;
      background-color: #fff;
      font-weight: 500;
      font-size: 12px;
      color: #8797af;
      border: 1px solid #d0d9de;
      border-radius: 8px;
      padding: 0px 10px;
      height: 32px;
      min-width: 120px;
    }
  }
  .quick-view-btn-success {
    padding: 50px 0px 20px 50px;
  }
  .quick-view-body {
    background-color: #fff;
    padding: 20px 50px;
    flex-grow: 1;
    width: 100%;
  }
}
@media (max-width: 900px) {
  .quick-view-header {
    padding: 20px 45px 20px 20px !important;
  }
}
@media (max-width: 700px) {
  .quick-view-header {
    flex-wrap: wrap;
  }
  .quick-view-btn {
    margin-top: 20px;
  }
}
</style>
