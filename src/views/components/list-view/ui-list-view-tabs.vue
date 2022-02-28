<template>
  <div class="ui-list-view-tabs" :class="innerTypeView">
    <ui-tabs @click="onChangeTabs" :gaphOn="false" :titlePadding="5">
      <ui-tab-item
        active
        prefix="<span style='font-size:20px' class='icon-grid'></span>"
      >
        <div class="box-content">
          <ui-list-view-item
            :selected="false"
            :hovered="false"
            :disabled="false"
            :selectAccess="selectAccess"
            v-for="(item, index) in Items"
            :key="index"
            :item="item"
            :title="item.Value.ToString()"
            :typeView="typeView"
          >
            <slot v-bind="{ item: item, type: innerTypeView }"></slot>
          </ui-list-view-item>
        </div>
      </ui-tab-item>

      <ui-tab-item
        prefix="<span style='font-size:20px' class='icon-ic_lines'></span>"
      >
        <ui-list-view-item
          :selected="false"
          :hovered="false"
          :disabled="false"
          :selectAccess="selectAccess"
          v-for="(item, index) in Items"
          :key="index"
          :item="item"
          :title="item.Value.ToString()"
          :typeView="typeView"
        >
          <slot v-bind="{ item: item, type: innerTypeView }"></slot>
        </ui-list-view-item>
      </ui-tab-item>
    </ui-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import ListViewItem from "./listviewitem";
import EnumTypeList from "./EnumTypeList";

@Component({
  name: "ui-list-view-tabs",
})
export default class UiListViewTabsComponent extends Vue {
  @Prop({ default: () => {}, type: Array }) Items!: Array<ListViewItem<any>>;
  @Prop({ default: false, type: Boolean }) multiselect!: boolean;
  @Prop({ default: EnumTypeList[1], type: String }) typeView: EnumTypeList;
  @Prop({ default: false, type: Boolean }) selectAccess!: boolean;

  innerTypeView = this.typeView;

  onSelect(value: ListViewItem<any>) {
    if (!this.multiselect) {
      this.Items.forEach(
        (item) => (item.Selected = item.Value.Equal(value.Value))
      );
    }
    this.$emit("select", value);
  }

  onChangeTabs(title: String, index: number) {
    switch (index) {
      case 0:
        this.changeView(EnumTypeList.box);
        break;
      default:
        this.changeView(EnumTypeList.line);
        break;
    }
  }

  changeView(val: number) {
    this.innerTypeView = EnumTypeList[val];
  }

  updated() {
    this.$children.forEach((item) => item.$on("select", this.onSelect));
  }
  mounted() {
    this.$children.forEach((item) => item.$on("select", this.onSelect));
  }
}
</script>

<style lang="less" scoped>
@uiListViewTabsActiveColor: white;
.ui-list-view-tabs {
  .header {
    display: flex;
    justify-self: right;
  }
  .activ {
    color: @uiListViewTabsActiveColor;
  }
  .box-content {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
  }
}
</style>
