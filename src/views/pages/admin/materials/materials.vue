<template>
  <content title="Материалы">
    <content-table-test
      :columns="columns"
      :filter="filter"
      templateColumns="1fr 1fr 1fr 1fr 1fr"
      :getDataFunc="getUsersAsync"
      ref="contentTable"
    >
      <template #default="data">
        <ui-table-body-item>{{ data.name }}</ui-table-body-item>
        <ui-table-body-item>
          {{ data.autors }}
        </ui-table-body-item>
        <ui-table-body-item>
          {{ data.type }}
        </ui-table-body-item>
         <ui-table-body-item>
          {{ data.status }}
        </ui-table-body-item>
        <ui-table-body-item class="pointer" @click="toAddress(data.id)">
          <info />
        </ui-table-body-item>
      </template>
    </content-table-test>
  </content>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { DETAILEDADMIN } from "@/router/routerNames";
import GetPublicationRequestModel from "@/api/plugins/models/Publication/GetPublicationRequestModel";
import FilterModel from "@/models/Filter/FilterModel";
interface IPaginationResponse {
  Items: Object[];
  Count: number;
}
@Options({
  // emits: ["goToAdmin"],
})
export default class Materials extends Vue {
  filter: GetPublicationRequestModel = new GetPublicationRequestModel();

  columns = ["Название", "Ключевые слова", "Тип издания","Статус", "Детальная"];
  created() {
    this.filter = new GetPublicationRequestModel();
    this.filter.status = 0;
  }
  async getUsersAsync(filter: FilterModel<any>) {
    this.filter.page = filter.page;
    this.filter.search = filter.search;
    this.filter.status = 0;
    console.log("filter", this.filter);
    let res = await this.$api.PublicationService.Get(this.filter);
    return res.data;
  }
  toAddress(id: number) {
    console.log("id", id);
    this.$router.push({
      name: DETAILEDADMIN,
      params: { id: id },
    });
  }

}
</script>
<style scoped >
</style>