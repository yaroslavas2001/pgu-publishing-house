<template>
  <div
    :tabindex="disabled ? -1 : 0"
    @focus="onGetFocus"
    @blur="onBlur"
    @click="toggle"
    ref="root"
    class="ui-toggle-switcher"
    :class="[{ disabled: disabled, checked: yesValue === modelValue }, type]"
  >
    <div class="slider"></div>
  </div>
</template>
<script lang="ts">
import { Options, Prop, Vue, Watch } from "vue-property-decorator";
const rounded = "rounded";
const rectangle = "rectangle";
@Options<ToggleSwitcherComponent>({
  name: "toggle-switcher",
  emits: ["update:modelValue"],
})
export default class ToggleSwitcherComponent extends Vue {
  @Prop({
    type: [Boolean, String, Number, Number, Date, Object, Array],
    default: true,
  })
  yesValue: any;
  @Prop({
    type: [Boolean, String, Number, Number, Date, Object, Array],
    default: false,
  })
  noValue: any;
  @Prop({ type: Boolean, default: false }) disabled: boolean;
  @Prop({
    type: [Boolean, String, Number, Number, Date, Object, Array],
    default: false,
  })
  modelValue: any;
  @Prop({ type: Boolean }) state: Boolean;
  @Prop({
    default: rounded,
    validator: (x: string) => {
      return x == rounded || x == rectangle;
    },
  })
  type: string;
  hasFocus = false;
  async toggle() {
    if (this.disabled) {
      return;
    }
    const res = this.modelValue == this.yesValue ? this.noValue : this.yesValue;
    this.$emit("update:modelValue", res);
    // if (res) {
    //   var res1 = await this.$dialog.confirm(
    //     "Вы действительно хотите разблокировать пользователя ?"
    //   );
    //   if (res1) {
    //     await this.$emit("update:modelValue", res);
    //   }
    // } else {
    //   var res2 = await this.$dialog.confirm(
    //     "Вы действительно хотите заблокировать пользователя ?"
    //   );
    //   if (res2) {
    //     await this.$emit("update:modelValue", res);
    //   }
    // }
  }
  mounted() {
    document.addEventListener("keydown", this.onKeyDown.bind(this));
  }
  beforeDestroy() {
    document.removeEventListener("keydown", this.onKeyDown.bind(this));
  }
  onGetFocus() {
    this.hasFocus = true;
  }
  onBlur() {
    this.hasFocus = false;
  }
  onKeyDown(ev: KeyboardEvent) {
    if (!this.hasFocus) {
      return;
    }
    var key = ev.key.toLowerCase();
    if (key == "enter") {
      return this.toggle();
    }
  }
}
</script>
<style lang="less" scoped>
@uiToggleSwitcherBorder: none;
@uiToggleSwitcherHeight: 1em;
@uiToggleSwitcherWidth: 2em;
@uiToggleSwitcherSliderHeight: 1em;
@uiToggleSwitcherSliderWidth: 1em;
@uiToggleSwitcherSliderDisabledBgColor: #062634;
@uiToggleSwitcherSliderNoBgColor: #7a7878;
@uiToggleSwitcherSliderYesBgColor: #062634;
@uiToggleSwitcherDisabledBgColor: #e1e1e1;
@uiToggleSwitcherYesBgColor: #e1e1e1;
@uiToggleSwitcherNoBgColor: #e1e1e1;
@uiToggleSwitcherTransitionTime: 0.4s;

.ui-toggle-switcher {
  outline: none;
  display: inline-block;
  height: 1em;
  width: 2em;
  cursor: pointer;
  position: relative;
  user-select: none;
  // margin-left: 50px;
  background-color: @uiToggleSwitcherNoBgColor;
  transition: @uiToggleSwitcherTransitionTime;
  border: @uiToggleSwitcherBorder;
  &.checked {
    background-color: @uiToggleSwitcherYesBgColor;
    .slider {
      left: calc(
        @uiToggleSwitcherWidth - @uiToggleSwitcherSliderWidth -
          (@uiToggleSwitcherHeight - @uiToggleSwitcherSliderHeight) / 2
      );
      background-color: @uiToggleSwitcherSliderYesBgColor;
    }
  }
  &.disabled {
    cursor: not-allowed;
    background-color: @uiToggleSwitcherDisabledBgColor;
    .slider {
      background-color: @uiToggleSwitcherSliderDisabledBgColor;
    }
  }
  .slider {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: calc((@uiToggleSwitcherHeight - @uiToggleSwitcherSliderHeight) / 2);
    background-color: @uiToggleSwitcherSliderNoBgColor;
    height: @uiToggleSwitcherSliderHeight;
    width: @uiToggleSwitcherSliderWidth;
    transition: @uiToggleSwitcherTransitionTime;
  }
  &.rounded {
    border-radius: calc(@uiToggleSwitcherHeight / 2);
    .slider {
      border-radius: 50%;
    }
  }
}
</style>