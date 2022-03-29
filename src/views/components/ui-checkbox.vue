<template>
  <div
    class="ui-checkbox"
    @click="onClick"
    :class="{ disabled: disabled, checked: innerChecked }"
  >
    <div class="checkbox">
      <slot name="checked" v-if="innerChecked">
        <div class="check"/>
      </slot>
      <slot name="unchecked" v-else/>
    </div>
    <slot></slot>
    <!-- слот для чекед другого -->
  </div>
</template>

<script lang="ts">
import { Options, Prop, Vue, Watch } from "vue-property-decorator";
@Options({
  name: "ui-checkbox",
  emits: ["update:modelValue"],
})
export default class UiCheckBoxComponent extends Vue {
  @Prop({ type: Boolean }) modelValue: boolean;
  @Prop({ type: Boolean, default: false }) disabled: boolean;
  innerChecked: boolean = false;
  @Watch("modelValue")
  onModelValueChanged() {
    this.innerChecked = this.modelValue;
  }
  @Watch("innerChecked")
  onInnerCheckedChanged() {
    this.$emit("update:modelValue", this.innerChecked);
  }
  created() {
    this.innerChecked = this.modelValue;
  }
  onClick() {
    if (this.disabled) {
      return;
    }
    this.innerChecked = !this.innerChecked;
  }
}
</script>

<style lang="less">
@uiCheckboxBgColor: #fff;
@uiCheckboxIconColor: #23a4a2;
@uiCheckboxColorLabel: #7a7878;
@uiCheckboxBorderSquareColor: black;
// @iconCheckSrc: "~@assets/img/icon/checkbox.svg";

.ui-checkbox {
  display: flex;
  align-items: center;
  margin-right: 1em;
  cursor: pointer;
  color: @uiCheckboxColorLabel;
  user-select: none;
  color: #4f5e74;
  height: 58px;
  &.disabled {
    opacity: 0.6;
    filter: alpha(opacity=60);
    cursor: not-allowed;
    background-color: greenyellow;
  }
  .checkbox {
    // border: 1px solid @uiCheckboxBorderSquareColor;
    border-radius: 4px;
    background: @uiCheckboxBgColor;
    border: 1px solid #d0d9de;
    min-height: 24px;
    min-width: 24px;
    height: 24px;
    width: 24px;
    margin-right: 11px;
    margin-top: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    .check {
      width: 100%;
      height: 100%;
    }
  }
  &.checked {
    .checkbox {
      border: 0px;
      .check {
        border-radius: 4px;
        // background: url(@iconCheckSrc) no-repeat center center #71b92f;
      }
    }
  }
}
</style>
