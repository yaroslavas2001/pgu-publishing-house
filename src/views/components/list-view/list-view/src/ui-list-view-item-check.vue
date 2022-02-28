<template>
  <!-- <ui-list-view-item :item="item" @select="onSelect" :class="getSlot"> -->
  <ui-checkbox  :icon="'icon-success'" :checked="item.Selected" :disabled="item.Disabled">
    <slot name="default" v-bind="item.Value">{{item.Value}}</slot>
  </ui-checkbox>

  <!-- </ui-list-view-item> -->
</template>
<script lang="ts">
import { Options, Vue, Prop, Watch } from "vue-property-decorator";
// import ListViewItem from "./listviewitem";

@Options({
  name: "ui-list-view-item-check"
})
export default class UIListViewItemCheckComponent extends Vue {
  // параметры
  @Prop({ default: null, type: Object })
  // item!: ListViewItem<any>;

  onSelect(value: any) {
    this.$emit("select", value);
  }
  // getSlot() {
  //   console.log("getSlot", this.$slots);
  //   return "hh";
  // }
}
</script>
<style lang="less" scoped >
.ui-list-view-item {
  height: 3em;
  display: flex;
  align-self: center;
}
</style>