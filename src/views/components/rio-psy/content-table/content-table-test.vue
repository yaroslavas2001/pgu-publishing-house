<template>
  <div>
    <ui-loading :loading="isLoading" />
    <ui-table-filter :filter="filter" @change="onChangeFilter">
      <slot name="filter"></slot>
    </ui-table-filter>
    <ui-table :items="items" :templateColumns="templateColumns">
      <template #header>
        <ui-table-header-item v-for="item in columns" :key="item">{{
          item
        }}</ui-table-header-item>
      </template>
      <template #body="data">
        <slot v-bind="data.item"></slot>
      </template>
    </ui-table>
    <ui-pagination-component
      :size="pageSize"
      :count="count"
      @onChange="onPaginationChanged"
      ref="pagination"
    />
  </div>
</template>
<script lang="ts">
import { Options, Vue, Ref, Prop } from "vue-property-decorator";
import UiTableFilter from "@/views/components/ui-table/ui-table-filter.vue";
// import IFilter from "@models/interfaces/IFilter";
import UiPagination from "@views/components/ui-table/ui-pagination.vue";
import UiPaginationComponent from "./ui-pagination.vue"
//onFilterChanged
interface IPaginationResponse {
  Items: Object[];
  Count: number;
}
interface IFilter {
    toServerFilter(): Object;
}
@Options({
  name: "content-table",
  components: {
    UiTableFilter,UiPaginationComponent
  },
})
export default class ContentTableComponent extends Vue {
  @Ref("pagination") pagination: UiPagination;

  @Prop({ type: Object, default: null, required: false }) filter: IFilter;
  @Prop({ type: Function, required: true }) getDataFunc: (
    filter?: Object
  ) => Promise<IPaginationResponse>;
  @Prop({ type: Function }) mapFunction: (fromObj: Object) => Object;
  @Prop({ type: Array, required: true }) columns: string[];
  @Prop({ type: String, required: true }) templateColumns: string;
  isLoading = false;
  items: Object[] = [];
  count: number = 0;
  currentPage: number = 1;
  pageSize = 10;
  async created() {
    await this.fetchData();
  }
  async onChangeFilter() {
    this.currentPage = 1;
    await this.fetchData();
    this.pagination.reset();
  }
  async fetchData() {
    const filter = this.filter || {};
    // const filter = this.filter.toServerFilter();
    // после того как добавим метод приведем к toServerFilter
    this.isLoading = true;
    try {
      //console.log("filter: ", filter);
      const pag = {
        Skip: this.pageSize * (this.currentPage - 1),
        Take: this.pageSize,
      };
      Object.assign(filter, pag);
      const res = await this.getDataFunc(filter);
      const items =
        this.mapFunction == null
          ? res.Items
          : (res.Items || []).map(this.mapFunction);
      this.items = items;
      this.count = res.Count;
    } catch (e) {
      throw e;
    } finally {
      this.isLoading = false;
      // this.pagination.reset();
    }
  }
  async onPaginationChanged(data: number) {
    this.currentPage = data;
    await this.fetchData();
  }
}
</script>
<style scoped>
/* */
</style>
