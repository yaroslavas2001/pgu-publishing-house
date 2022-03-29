<template>
  <div
    class="ui-table-header-item"
    v-bind:style="styleCustom"
    @click="sortExecute"
    v-bind:class="{ 'cursor-pointer': !!sortName }"
  >
    <div>
      <slot> </slot>
    </div>
    <div class="" v-if="sortType != null">
      <div
        v-if="sortType == 1"
        :class="[{ activeSort: sortType == 1 && activeText }, iconAsc]"
      ></div>
      <div
        v-if="sortType == 0"
        :class="[{ activeSort: sortType == 0 && activeText }, iconDesk]"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
// import ShopListRequest from "@/api/plugins/models/controllersModels/shops/ShopListRequest";
import GetListRequest from "@/api/plugins/models/getListRequest";
import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

@Options<UiTableHeaderItemComponent>({
  props: {
    styleCustom: Object,
    sortName: { default: null, type: String },
    defaultSort: { default: null, type: String },
    iconAsc: { default: "asc", type: String },
    iconDesk: { default: "desc", type: String },
  },
  watch: {},
  emits: ["onSort"],
  name:'UiTableHeaderItemComponent'
})
export default class UiTableHeaderItemComponent extends Vue {
  @Prop({ type: Object }) filter: GetListRequest<any>;
  readonly styleCustom: Object = {};
  readonly sortName: string = "";
  readonly defaultSort: String = "";
  // activeText: string = "";
  sortType =
    this.defaultSort === null ? null : this.defaultSort === "asc" ? 0 : 1;
  get activeText(): string {
    if (this.sortName === this.filter._sortField) return this.sortName;
    else return "";
  }
  created() {
    this.sortType =
      this.defaultSort === null ? null : this.defaultSort === "asc" ? 0 : 1;
  }
  sortExecute(value = true) {
    if (!this.sortName) return;
    if (this.sortType === null && !value) return;
    if (this.sortType === null) this.sortType = 0;
    else if (this.sortType === 0) this.sortType = 1;
    else if (this.sortType === 1) this.sortType = 0;

    if (this.sortType == 1) this.filter._sortDir = "ASC";
    if (this.sortType == 0) this.filter._sortDir = "DESC";
    this.filter._sortField = this.sortName;
    this.$emit("onSort");    
  }
}
</script>

<style lang="less" >
@uiTableHeaderItem: #5197e9;
.activeSort {
  background-color: #71b92f;
}
.ui-table-header-item {
  padding-right: 5px;
  // padding-bottom: 1px;
  .icon-cartex-admin-sort-up,
  .icon-cartex-admin-sort-down {
    font-size: 6px;
    cursor: pointer;
    &.active {
      &::before {
        color: @uiTableHeaderItem;
      }
    }
  }
}
.cursor-pointer {
  cursor: pointer;
}

.asc {
  border: 3px solid transparent;
  border-bottom: 7px solid lightblue;
}
.desc {
  border: 3px solid transparent;
  border-top: 7px solid lightblue;
}
.active {
  &.asc {
    border: 3px solid transparent;
    border-bottom: 7px solid #556a71;
  }
  &.desc {
    border: 3px solid transparent;
    border-top: 7px solid #556a71;
  }
}
</style>