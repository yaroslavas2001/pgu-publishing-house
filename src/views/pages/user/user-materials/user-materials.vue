<template>
  <content title="Мои материалы">
    <content-table-test
      :columns="columns"
      :filter="filter"
      templateColumns="1fr 1fr 1fr 1fr 1fr 100px"
      :getDataFunc="getUsersAsync"
      ref="contentTable"
    >
      <template #filter>
        <!-- <ui-select :items="selectListCity" v-model="filterCity.city" />
        <ui-select :items="selectListStreet" v-model="filterCity.street" />
        <ui-select :items="selectListHouse" v-model="filterCity.house" /> -->
      </template>
      <template #default="data">
        <ui-table-body-item>{{ data.name }}</ui-table-body-item>
        <ui-table-body-item>
          {{ data.tags }}
        </ui-table-body-item>
        <ui-table-body-item>
          {{ data.udc }}
        </ui-table-body-item>
        <ui-table-body-item>
          {{ $store.state.getType(data.type) }}
        </ui-table-body-item>
        <ui-table-body-item>
          {{  getStatus(data.status) }}
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
import { DETAILEDUSER } from "@/router/routerNames";
import GetPublicationRequestModel from "@/api/plugins/models/Publication/GetPublicationRequestModel";
import FilterModel from "@/models/Filter/FilterModel";
import PublicationStatus from "@/common/PublicationStatus";

@Options({})
export default class UserMaterials extends Vue {
  columns = ["Название", "Ключевые слова", "УДК", "Тип", "Статус", "Детальная"];
  filter: GetPublicationRequestModel = new GetPublicationRequestModel();
  created() {
    this.filter = new GetPublicationRequestModel();
  }
  async getUsersAsync(filter: FilterModel<any>) {
    this.filter = {
      userId: this.$store.state.UserId,
      page: filter.page,
      search:filter.search
    };
    let res = await this.$api.PublicationService.Get(this.$store.state.Parse(this.filter));
    return res.data;
  }

  toAddress(id: number) {
    console.log("id", id);
    this.$router.push({
      name: DETAILEDUSER,
      params: { id: id },
    });
  }
    getStatus(id: number): string {
    if (id!=undefined && id!=null)
      return PublicationStatus.find((el) => el.Id == id).Name;
  }
}
</script>
<style scoped  lang="less">
</style>