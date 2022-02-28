<template>
  <div
    class="ui-list-view-item"
    @mouseover="mouseover"
    @mouseleave="mouseleave"
    @click="click(item)"
    @dragover.prevent
    @dragstart="dragStart"
    @drop.stop="dragDrop"
    @dragend="dragEnd"
    :class="currentClass()"
  >
    <template v-if="isDefault()">
      <slot name="default" v-bind="item.Value">
        <div class="default">{{title}}</div>
      </slot>
    </template>

    <!-- если слот default задан а остальные нет, то остальные слоты не проверять -->
    <template v-if="isSelected()">
      <slot v-if="item.Selected" name="selected" v-bind="item.Value">
        <div class="selected">{{title}}</div>
      </slot>
    </template>
    <template v-if="isHover()">
      <slot v-if="hovered" name="hover" v-bind="item.Value">
        <div class="hover">{{title}}</div>
      </slot>
    </template>
    <template v-if="isDisabled()">
      <slot v-if="item.Disabled" name="disabled" v-bind="item.Value">
        <div class="disabled">{{title}}</div>
      </slot>
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import ListViewItem from "./listviewitem";

@Component({
  name: "ui-list-view-item"
})
export default class UIListViewItem extends Vue {
  @Prop({ default: null, type: String })     title!: String;
  // параметры
  @Prop({ default: null, type: Object })      item!: ListViewItem<any>;
  @Prop({ default: false, type: Boolean })   multi!: Boolean;
  @Prop({ default: "box", type: String })  typeView: String;
  @Prop({ default: true, type: Boolean }) selected!: Boolean;
  @Prop({ default: true, type: Boolean })  hovered!: Boolean;
  @Prop({ default: true, type: Boolean }) disabled!: Boolean;
  @Prop({ default: true, type: Boolean }) selectAccess!: Boolean;

  innerTypeView = this.typeView;
  hover: boolean = false;


  // методы
  created(){

  }

  mouseover() {
    if (this.hovered) this.hover = true;
  }
  mouseleave() {
    if (this.hovered) this.hover = false;
  }
  click(value: any) {
    if (!this.item.Disabled && this.selectAccess) {
      this.item.Selected = !this.item.Selected;
      this.$emit("select", this.item);
    }
  }
  isHover() {
    // debugger
    return this.hover && !this.isDisabled() 
  }
  isSelected() {
    return (
      !this.isHover() && this.item.Selected 
    );
  }
  isDisabled() {
    return this.item.Disabled 
  }
  isDefault() {
    
    return !this.isHover() && !this.isSelected() 
  }
  currentClass(){
    if (this.hover) return "hover"
    if (this.item.Selected) return "selected"
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
  &.hover {
    background-color: @uiListViewItemHoverBgColor;
    cursor: pointer;
  }
  &.disabled {
    color: @uiListViewItemDisabledBgColor;
    cursor: not-allowed;
  }
}
</style>