<template>
  <div class="ui-list-view" @dragover.prevent @drop="dargDrop">
    <template v-for="(item, index) in innerItems">
      <ui-list-view-item
        :draggable="isDrageble && !item.Disabled"
        :key="index"
        :item="item"
        :title="item.Value.ToString()"
        @itemdrop="itemDragDrop"
        @itemDragStart="itemDragStart"
        @itemdropend="itemDropEnd"
        @select="onSelect"
        :class="{underline:underline}"
        :style="itemStyle">
        
        <template #default>
          <slot name="default" :item="item" :select="onSelect"></slot>
        </template>
        <template #selected>
          <slot name="selected" :item="item" :select="onSelect"></slot>
        </template>
        <template #hover>
           <slot name="hover" :item="item" :select="onSelect"></slot>
        </template>
      </ui-list-view-item>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import ListViewItem from "./listviewitem";

@Component({
  name: "ui-list-view"
})
export default class UiListView extends Vue {
  @Prop({ default: () => {}, type: Array })       Items!: Array<ListViewItem<any>>;
  @Prop({ default: false, type: Boolean })  multiselect!: boolean;
  @Prop({ default: false, type: Boolean })   isDrageble!: boolean;
  @Prop({ default: false, type: Boolean })    underline!: boolean; 
  @Prop({ default: () => {}, type: Function })  fromJSON: Function;
  @Prop({ default: "", type: String })        itemStyle!: String;

  innerItems: Array<ListViewItem<any>> = new Array<ListViewItem<any>>();

  innerElement = false;

  created() {
    this.innerItems = this.Items;
    
  }

  @Watch("Items")
  changeItems() {
    this.innerItems = this.Items;
  }
  onSelect(value: ListViewItem<any>) {
    if (!this.multiselect) {
      this.Items.forEach(
        item => (item.Selected = item.Value.Equal(value.Value))
      );
    }
    this.$emit("select", value);
  }

  itemDragDrop(item: any, ev: any) {
    this.innerElement = true;
    var obj = JSON.parse(ev.dataTransfer.getData("application/x-javascript"));
    var itemDrag = new ListViewItem(
      this.fromJSON(obj),
      obj.Disabled,
      obj.Selected
    );
    this.$emit('onDrag', itemDrag);
    var findeItem = this.getIndexItem(itemDrag);
    var result = this.getIndexItem(item);
    if (findeItem != -1) {
      this.innerItems.splice(findeItem, 1);
      this.innerItems.splice(result, 0, itemDrag);
    } else if (result != -1) {
      this.innerItems.splice(result, 0, itemDrag);
    }
  }
  getIndexItem(item: any) {
    var el = -1;
    for (let index = 0; index < this.innerItems.length; index++) {
      if (this.innerItems[index].Value.id == (item.Value.id)) {
        el = index;
        break;
      }
    }
    return el;
  }
  dargDrop(ev: any) {
    this.$emit("dragDrop")
    this.innerElement = true;
    var obj = JSON.parse(ev.dataTransfer.getData("application/x-javascript"));
    var item = new ListViewItem(this.fromJSON(obj), obj.Disabled, obj.Selected);

    var findeItem = this.innerItems.find(item1 =>
      item1.Value.Equal(item.Value)
    );
    var findeItemIndex = this.getIndexItem(item);
    if (findeItem == -1) {
      this.innerItems.splice(this.innerItems.length, 0, item);
    } else {
      var result = this.getIndexItem(item);
     if (result != -1) this.innerItems.splice(result, 1); 
      this.innerItems.splice(this.innerItems.length, 0, item);
    }
    // if (findeItem == undefined) {
    //   this.innerItems.splice(this.innerItems.length, 0, item);
    // } else {
    //   var result = this.getIndexItem(item);
    //  if (result != -1) this.innerItems.splice(result, 1); 
    //   this.innerItems.splice(this.innerItems.length, 0, item);
    // }
  }
  itemDragStart(item: any, ev: DragEvent) {
    this.innerElement = false;
    this.$emit("dragStart", item)
  }
  itemDropEnd(item: any, ev: DragEvent) {
    if (ev.dataTransfer.dropEffect != "none")
      if(!this.innerElement) {
        this.$emit("dragEnd", item)
      } else {
        this.$emit("dragEndCurrentList", item);
      }
      // if (!this.innerElement)
      //   this.innerItems.splice(this.innerItems.indexOf(item), 1);
      this.innerElement = false;
    }
  
}
</script>

<style lang="less" scoped>
.ui-list-view {
  min-height: 2rem;
  cursor: pointer;
  height: 100%;
  .ui-list-view-item {
    &.underline {
      border-block-end: #394e72 solid 1px;
    }
    &.underline:nth-last-of-type(1) {
      border-block-end: none;
    }
    .swing {
      opacity: 0;
      transform: rotateY(-90deg);
      transition: all 0.5s cubic-bezier(0.36, -0.64, 0.34, 1.76);
    }
  }
  .header {
    display: flex;
    justify-self: right;
  }
  .activ {
    color: white;
  }
}
</style>


