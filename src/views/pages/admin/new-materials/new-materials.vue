<template>
  <content title="Новые материалы">
    <content-table-test
      :columns="columns"
      :filter="filter"
      templateColumns="1fr 1fr 1fr 1fr"
      :getDataFunc="getUsersAsync"
      ref="contentTable"
    >
      <template #default="data">
        <ui-table-body-item>{{ data.name }}</ui-table-body-item>
        <ui-table-body-item>
          {{ data.tags }}
        </ui-table-body-item>
        <ui-table-body-item>
          {{  $store.state.getType(data.type) }}
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
import { DETAILEDNEWMATERIALADMIN } from "@/router/routerNames";
import FilterModel from "@/models/Filter/FilterModel";
import GetPublicationRequestModel from "@/api/plugins/models/Publication/GetPublicationRequestModel";
import MaterialType from "@/common/MaterialType";
@Options({})
export default class NewMaterials extends Vue {
  filter: GetPublicationRequestModel = new GetPublicationRequestModel();
  columns = ["Название", "Ключевые слова", "Тип материала", "Детальная"];
  MaterialType = MaterialType;
  created() {
    this.filter = new GetPublicationRequestModel();
    this.filter.status = 0;
  }
  async getUsersAsync(filter: FilterModel<any>) {
    this.filter.page = filter.page;
    this.filter.search = filter.search;
    this.filter.status = 0;
    let res = await this.$api.PublicationService.Get(this.$store.state.Parse(this.filter));
    return res.data;
  }
  toAddress(id: number) {
    console.log("id", id);
    this.$router.push({
      name: DETAILEDNEWMATERIALADMIN,
      params: { id: id },
    });
  }
}
</script>
<style scoped >
</style>