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
        <slot name="header" v-if="!columns" />
      </template>
      <template #body="data">
        <slot v-bind="data.item" v-bind:index="data.index"/>
      </template>
    </ui-table>
    <ui-pagination
      :size="pageSize"
      :count="count"
      @onChange="onPaginationChanged"
      class="mt-4"
      ref="pagination"
      v-if="showPagination && showPaginationOutside"
    />
    <div v-if="wrong" class="wrong">{{ wrongText }}</div>
  </div>
</template>
<script lang="ts">
import { Options, Vue, Ref, Prop } from "vue-property-decorator";
import UiTableFilter from "@/views/components/ui-table/ui-table-filter.vue";
import UiPagination from "@views/components/ui-table/ui-pagination.vue";
import GetListRequest from "@/api/plugins/models/getListRequest";
import HttpResponseResult from "@/api/plugins/models/httpResponseResult";
import ContentTableModel from "@views/components/rio-psy/content-table/ContentTableModel"
@Options({
  name: "content-table",
  components: {
    UiTableFilter,
  },
})
export default class ContentTableComponent extends Vue {
  @Ref("pagination") pagination: UiPagination;

  @Prop({ type: Object, default: null, required: false })
  filter: GetListRequest<any>; //IFilter;
  @Prop({ type: Function, required: true }) getDataFunc: (
    filter?: Object
  ) => Promise<HttpResponseResult<any>>;
  @Prop({ type: Function }) mapFunction: (fromObj: Object) => Object;
  @Prop({ type: Array }) columns: string[];
  @Prop({ type: String, required: true }) templateColumns: string;
  // @Prop({ type: Number, default: 10 }) pageSize: number;
  @Prop({ type: Boolean, default: true }) showPaginationOutside: boolean;
  pageSize: number = 10;
  isLoading = false;
  items: Object[] = [];
  count: number = 0;
  currentPage: number = 1;
  wrong: boolean = false;
  wrongText: string = "";
  showPagination: boolean = true;
  async created() {
    await this.fetchData();
  }
  async onChangeFilter() {
    // console.log('onChangeFilter');
    this.currentPage = 1;
    await this.fetchData();
    console.log("ietm", this.items);

    if (
      this.items !== null &&
      this.items.length != 0 &&
      this.showPaginationOutside &&
      this.showPagination
    ) {
      console.log("ietm", this.items);
      this.pagination.reset();
    }
  }
  async fetchData() {
    let filter = this.filter || {};
    this.isLoading = true;
    this.pageSize = this.filter._perPage;
    try {
      this.filter._page = this.currentPage;
      await this.getDataFunc(filter)
        .then((res:any) => {
          const items =
            this.mapFunction == null
              ? res.Response.Items
              : (res.Response?.Items || []).map(this.mapFunction);
          this.items = items;
          this.count = res.Response.Count;
          if (this.items != null) {
            if (this.items.length == 0) {
              this.showPagination = false;
            } else this.showPagination = true;
          } else this.showPagination = true;
          if (this.items == null) {
            this.showPagination = false;
            this.wrong = true;
            this.wrongText = res.StatusText;
            return;
          } else this.wrong = false;
        })
        .catch((res) => {
          if (!res.IsSuccess) {
            console.error(res);
            return;
          }
        })
        .finally(() => {});
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
.wrong {
  color: red;
  padding-top: 20px;
}
</style>
