<template>
  <div class="ui-tab-item" v-if="isActive">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { warn } from "@vue/runtime-core";
import { Options, Vue, Prop, Watch, Inject } from "vue-property-decorator";
import TabsProvider, { TabInfo } from "./tabsProvider";
import UITabsComponent from "./ui-tabs.vue";

@Options({
  name: "ui-tab-item"
})
export default class UITabItemComponent extends Vue {
  @Prop({ default: null, type: String, required: true }) title!: string;
  @Prop({ default: false, type: Boolean }) isDisabled!: boolean;
  @Inject({from: 'tabsProvider'}) tabsProvider: TabsProvider;
  tabInfo: TabInfo = null;
  get isActive(): boolean {
    return this.tabInfo.hash == this.tabsProvider.activeTabHash;
  }
  @Watch('isDisabled')
  @Watch('title')
  onPropsChanged() {
    this.tabInfo.isDisabled = this.isDisabled;
    this.tabInfo.title = this.title;
  }
  created() {
    this.tabInfo = new TabInfo({
      title: this.title,
      isDisabled: this.isDisabled,
      index: this.tabsProvider.tabs.length
    });
  }
  beforeMount () {
    this.tabsProvider.addTab(this.tabInfo)
  }
}
</script>
<style lang="less" scoped>
.ui-tab-item {
   padding: 1em 0;
   
  // background-color: white;
  // border: 1px solid #3e71bb;
}
</style>