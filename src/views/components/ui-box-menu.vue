<template>
  <div class="ui-box-menu" :class="[getPosition(), { shadow: shadow }]">
    <slot></slot>
  </div>
</template>

<script lang="ts">
//import { ResponseModel } from "@dataSource/models/responseModels.ts";
import { Options, Vue, Prop, Watch } from "vue-property-decorator";
@Options({
  props: {
    position: String,
    shadow: Boolean,
  },
  name:"UiBoxMenuComponent"
})
export default class UiBoxMenuComponent extends Vue {
  @Prop({ default: "", type: String }) position: string; // left centre right

  @Prop({ default: false, type: Boolean }) shadow: boolean; // left centre right
  // position: string = "";
  // shadow: boolean = false;
  getPosition(): string {
    if (this.position == "left") return "left";
    if (this.position == "right") return "right";
    if (this.position == "centre") return "centre";
    // return "centre";
  }
}
</script>

<style lang="less" scoped>
@UiBoxMenuBgColor: #21324f;
@UiBoxMenuBorderColor: #263958;
@UiBoxMenuShadowColor: #101825;
.ui-box-menu {
  background-color: @UiBoxMenuBgColor;
  border: 1px solid @UiBoxMenuBorderColor;
  min-width: 188px;
  position: absolute;
  top: 75px !important;
  right: 0px;
  z-index: 5000;
  &.shadow {
    box-shadow: 0 0 5px @UiBoxMenuShadowColor; /* Параметры тени */
  }
  // top:15px;
  &.left:after {
    display: block;
    left: 5%;
  }
  &.right:after {
    display: block;
    right: 5%;
  }
  &.centre:after {
    display: block;
    left: 50%;
  }
  &:after {
    content: "▲";
    display: none;
    color: #CDCEDF;
    position: absolute;
    text-shadow: 0 -2px 3px rgba(15, 23, 37, 0.7);
    font-size: 24px;
    // top: -21px;
    // box-shadow: 0 0 5px #2639574b;
  }
}
</style>
