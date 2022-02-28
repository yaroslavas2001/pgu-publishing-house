<template>
  <div class="ui-tabs">
    <div class="header-tabs" :class="{ gaphOn: gaphOn, right: right }">
      <slot name="back" />
      <div
        class="header-item"
        :style="{
          'padding-left': titlePadding + 'px',
          'padding-right': titlePadding + 'px',
        }"
        v-for="(tab, index) in this.tabs"
        :key="index"
        @click="selectTab(tab)"
        :class="{
          isActive: tab.hash == tabsProvider.activeTabHash,
        }"
      >
        <slot name="header" :data="tab">
          {{ tab.title }}
        </slot>
      </div>
    </div>
    <div :class="[fluid ? 'container-fluid' : 'container-fluid']">
      <slot> </slot>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options, Prop, Provide } from "vue-property-decorator";
import UITabItemComponent from "@views/components/ui-tabs/ui-tabs-item.vue";
import TabsProvider, { TabInfo } from "./tabsProvider";
@Options({
  emits: ["select"],
})
export default class UITabsComponent extends Vue {
  @Prop({ default: true, type: Boolean }) gaphOn!: Boolean;
  @Prop({ default: null, type: Boolean }) right: Boolean;
  @Prop({ default: 15, type: Number }) titlePadding: Number;
  @Prop({ default: false }) fluid: boolean;
  @Provide({ to: "tabsProvider" }) tabsProvider = new TabsProvider();
  get tabs(): TabInfo[] {
    return this.tabsProvider.tabs || [];
  }
  selectTab(tab: TabInfo) {
    if (this.tabsProvider.trySelectTab(tab)) {
      this.$emit("select", tab);
    }
  }
}
</script>
<style lang="less" scoped>
@uiTabsHeaderBorderBottom: 2px #394e72 solid;
@uiTabsBgColor: #ffffff;
@uiTabsHeaderColor: #586174;
@uiTabsActiveColor: red;
@uiTabsActivegaphOnBorderBottom: 2px solid red;
@uiTabsDisableColor: red;
.ui-tabs {
  display: block;
  background-color: @uiTabsBgColor;
  padding: 17px 19px 0px 19px;
  .header-tabs {
    display: flex;
    align-items: center;
    text-align: center;
    border-bottom: 2px solid #f0f0f0;
    &.gaphOn {
      //  border-bottom: @uiTabsHeaderBorderBottom;
      // color:red;
    }
    &.right {
      justify-content: flex-end;
    }
  }
  .header-item {
    cursor: pointer;
    text-align: center;
    bottom: -2px;
    position: relative;
    color: @uiTabsHeaderColor;
    font-size: 16px;
    line-height: 19px;
    background-color: #fff;
    // border-bottom: 2px solid #f0f0f0;
    padding-right: 35px !important;
    padding-bottom: 8px;
  }
  .isActive {
    font-weight: bold;
    border-bottom: 2px solid #bcff3c;
    &.gaphOn {
      // color:red;
      // border-bottom: @uiTabsActivegaphOnBorderBottom;
    }
  }
  .isDisabled {
    color: @uiTabsDisableColor;
    cursor: not-allowed;
  }
}
</style>