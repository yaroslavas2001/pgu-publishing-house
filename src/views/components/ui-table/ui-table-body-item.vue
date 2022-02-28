<template>
  <div
    class="ui-table-body-item"
    @click="ClickRow"
    :class="[
      {
        sele: selectInner,
        'border-left': borderLeft,
        'border-right': borderRight,
        borderY: borderY,
      },
    ]"
  >
    <slot> </slot>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options<UiTableBodyItemComponent>({
  col: { type: Number, default: 0 },
  row: { type: Number, default: 0 },
  sele: { type: Boolean, default: false },
  borderLeft: { default: false },
  borderRight: { default: false },
  borderY: { default: false },
})
export default class UiTableBodyItemComponent extends Vue {
  readonly col = 0;
  readonly row = 0;
  readonly sele = false;
  readonly borderLeft = false;
  readonly borderRight = false;
  readonly borderY = false;
  selectInner = this.sele;
  ClickRow() {
    this.$emit("changeCol", this.row, this.col);
  }
}
</script>

<style lang="less" scoped>
@uiTableBodyItemBgColor: #f0f0f0;
@uiTableBodyItemBorderSize: 1px;
@uiTableBodyItemBorderColor: rgba(0, 0, 0, 0.1);
@uiTableBodyItemBorderRadius: 6px;
@uiTableBodyBoxShadowColor: rgba(0, 0, 0, 0.1);
@uiTableBodyBoxShadowSize: 14px;

.ui-table-body-item {
  display: flex;
  justify-content: space-between;
}
.border-left {
  border-left: @uiTableBodyItemBorderSize solid @uiTableBodyItemBorderColor;
  border-radius: @uiTableBodyItemBorderRadius 0 0 @uiTableBodyItemBorderRadius;
  box-shadow: -@uiTableBodyBoxShadowSize 0px @uiTableBodyBoxShadowSize -@uiTableBodyBoxShadowSize
    @uiTableBodyBoxShadowColor;
}
.border-right {
  border-right: @uiTableBodyItemBorderSize solid @uiTableBodyItemBorderColor;
  border-radius: 0 @uiTableBodyItemBorderRadius @uiTableBodyItemBorderRadius 0;
  box-shadow: @uiTableBodyBoxShadowSize 0px @uiTableBodyBoxShadowSize -@uiTableBodyBoxShadowSize
    @uiTableBodyBoxShadowColor;
}
.borderY {
  border-top: @uiTableBodyItemBorderSize solid @uiTableBodyItemBorderColor;
  border-bottom: @uiTableBodyItemBorderSize solid @uiTableBodyItemBorderColor;
  box-shadow: 0px -@uiTableBodyBoxShadowSize @uiTableBodyBoxShadowSize -@uiTableBodyBoxShadowSize
    @uiTableBodyBoxShadowColor;
}
.sele {
  background: lightblue;
}

</style>