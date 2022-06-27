<template>
  <div>
    <ui-loading :loading="isLoading" />
    <ui-table-filter :filter="filter" @change="onChangeFilter">
      <slot name="filter"></slot>
    </ui-table-filter>
    <ui-table :items="items" :templateColumns="templateColumns">
      <template #header>
        <ui-table-header-item v-for="item in columns" :key="item">
          {{ item }}
        </ui-table-header-item>
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
import UiPaginationComponent from "./ui-pagination.vue";
import PageModel from "@/api/plugins/models/Page/PageModel";
import FilterModel from "@/models/Filter/FilterModel"
//onFilterChanged
interface IPaginationResponse {
  page:PageModel,
  items: Object[];
  count: number;
}
@Options({
  name: "content-table-test",
  components: {
    UiTableFilter,
    UiPaginationComponent,
  },
})
export default class ContentTableComponent extends Vue {
  @Ref("pagination") pagination: UiPagination;

  @Prop({ type: Object, default: null, required: false }) filter: FilterModel<any>
  @Prop({ type: Function, required: true }) getDataFunc: (
    filter?: FilterModel<any>
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
    const filter = this.filter;
    this.isLoading = true;
    try {
      filter.page = {
        skip: this.pageSize * (this.currentPage - 1),
        take: this.pageSize,
      };
      const res = await this.getDataFunc(filter);
      const items =
        this.mapFunction == null
          ? res.items
          : (res.items || []).map(this.mapFunction);
      this.items = items;
      this.count = res.count;
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
