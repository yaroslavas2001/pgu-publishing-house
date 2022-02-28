<template>
  <div
    class="ui-list-view-item"
    @click="click(item)"
    @dragover.prevent
    @dragstart="dragStart"
    @drop.stop="dragDrop"
    @dragend="dragEnd"
    :class="currentClass()"
  >
    <slot name="item" :item="item">
      <div :class="[{ disabled: disabled }]">
        {{ item.Value.name }}
      </div>
    </slot>
  </div>
</template>
<script lang="ts">
// import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Options, Vue } from "vue-class-component";
import ListViewItem from "@views/components/ListViewItem";
import DefaultModel from "@views/components/component-models/default-model"
@Options({
  components: {
    DefaultModel,
    ListViewItem,
  },
  props: {
    title: String,
    item: ListViewItem,
    multi: Boolean,
    typeView: String,
    // selected: Boolean,
    // hovered: Boolean,
    disabled: Boolean,
    selectAccess: Boolean,
  },
})
export default class UIListViewItem extends Vue {
  title: string = "";
  item: ListViewItem<DefaultModel> = null;
  multi: boolean = false;
  typeView: string = "box";
  // selected: Boolean = true;
  // hovered: boolean = true;
  disabled: boolean = true;
  selectAccess: boolean = true;
  // @Prop({ default: null, type: String }) title!: String;
  // // параметры
  // @Prop({ default: null, type: Object }) item!: ListViewItem<any>;
  // @Prop({ default: false, type: Boolean }) multi!: Boolean;
  // @Prop({ default: "box", type: String }) typeView: String;
  // @Prop({ default: true, type: Boolean }) selected!: Boolean;
  // @Prop({ default: true, type: Boolean }) hovered!: Boolean;
  // @Prop({ default: true, type: Boolean }) disabled!: Boolean;
  // @Prop({ default: true, type: Boolean }) selectAccess!: Boolean;

  innerTypeView = this.typeView;
  hover: boolean = false;
  created() {
    // console.log(`this.item`, this.item);
  }
  // mouseover() {
  //   if (this.hovered) this.hover = true;
  // }
  // mouseleave() {
  //   if (this.hovered) this.hover = false;
  // }
  click(value: ListViewItem<DefaultModel>) {
    if (!this.item.Disabled) {
      //&& this.selectAccess
      this.item.Selected = !this.item.Selected;
      this.$emit("select", this.item);
    }
  }
  // isHover() {
  //   const rez = this.hover && !this.isDisabled();
  //   console.log(`rez isHover`, rez);
  //   return rez;
  // }
  // isSelected() {
  //   return !this.isHover() && this.item.Selected;
  // }
  // isDisabled() {
  //   return this.item.Disabled;
  // }
  // isDefault() {
  //   const result = !this.isHover() && !this.isSelected();
  //   console.log(`result isDefault listItem`, result);
  //   return result;
  // }
  currentClass() {
    if (this.item.Selected) return "selected";
  }
  dragStart(value: DragEvent) {
    if (this.item.Disabled) {
      return;
    }
    value.dataTransfer.effectAllowed = "move";
    value.dataTransfer.setData(
      "application/x-javascript",
      JSON.stringify(this.item)
    );
    this.$emit("itemDragStart", this.item, value);
  }

  dragEnd(value: any) {
    this.$emit("itemdropend", this.item, value);
  }
  dragDrop(value: any) {
    value.preventDefault();
    this.$emit("itemdrop", this.item, value);
  }
}
</script>
<style lang="less" scoped>
@uiListViewItemSelectedBgColor: #1b283f;
@uiListViewItemHoverBgColor: #354c74;
@uiListViewItemDisabledBgColor: gray;
.ui-list-view.box {
  .ui-list-view-item {
    width: 160px;
    margin: 0 15px;
    div {
      padding: 0;
    }
  }
}
.ui-list-view.line {
  .ui-list-view-item {
    margin-bottom: 2px;
    div {
      padding: 0;
    }
  }
}
.ui-list-view-item {
  min-height: 2.5em;
  display: flex;
  align-items: center;
  padding: 5px 15px;
  div {
    cursor: pointer;
  }
  &.selected {
    background-color: @uiListViewItemSelectedBgColor;
    cursor: pointer;
  }
  &:hover {
    background-color: @uiListViewItemHoverBgColor;
    cursor: pointer;
  }
  &.disabled {
    color: @uiListViewItemDisabledBgColor;
    cursor: not-allowed;
  }
}
</style>