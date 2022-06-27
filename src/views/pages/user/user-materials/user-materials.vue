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
          {{ getType(data.type) }}
        </ui-table-body-item>
        <ui-table-body-item>
          {{ getStatus(data.status) }}
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
import MaterialType from "@/common/MaterialType";
import PublicationStatus from "@/common/PublicationStatus";
interface IPaginationResponse {
  Items: Object[];
  Count: number;
}
@Options({
  // emits: ["goToAdmin"],
})
export default class UserMaterials extends Vue {
  columns = ["Название", "Ключевые слова", "УДК", "Тип", "Статус", "Детальная"];
  filter: GetPublicationRequestModel = new GetPublicationRequestModel();
  MaterialType = MaterialType;
  PublicationStatus=PublicationStatus
  created() {
    this.filter = new GetPublicationRequestModel();

    // console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRrr")
  }
  async getUsersAsync(filter: FilterModel<any>) {
    this.filter = {
      userId: this.$store.state.UserId,
      page: filter.page,
      search:filter.search
    };
    let test: GetPublicationRequestModel = JSON.parse(
      JSON.stringify(this.filter)
    );
    console.log("test", test);
    let res = await this.$api.PublicationService.Get(test);
    return res.data;
  }

  // status(status): string {
  //   return status == 1 ? "На проверке у рецензиата" : "На печать";
  // }
  getType(id: number): string {
    return this.MaterialType.find((el) => el.Id == id).Name;
  }
   getStatus(id: number): string {
    return this.PublicationStatus.find((el) => el.Id == id).Name;
  }
  toAddress(id: number) {
    console.log("id", id);
    this.$router.push({
      name: DETAILEDUSER,
      params: { id: id },
    });
  }
}
</script>
<style scoped  lang="less">
</style>