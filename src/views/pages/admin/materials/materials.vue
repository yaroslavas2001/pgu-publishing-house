<template>
  <content title="Материалы">
    <content-table-test
      :columns="columns"
      :filter="filterCity"
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
interface IPaginationResponse {
  Items: Object[];
  Count: number;
}
@Options({
  // emits: ["goToAdmin"],
})
export default class Materials extends Vue {
  test: IPaginationResponse = {
    Items: [
      {
        id: 1,
        name: "Название",
        autors: "Авторы",
        type: "Тип издания",
        status:0
      },
    ],
    Count: 10,
  };
  columns = ["Название", "Авторы", "Тип издания","Статус", "Детальная"];
  filterCity: any = {
    search: "",
  };
  getUsersAsync: Function = null;

  created() {
    this.getUsersAsync = this.testF;
  }
  toAddress(id: number) {
    console.log("id", id);
    this.$router.push({
      name: DETAILEDADMIN,
      params: { id: id },
    });
  }
  async testF() {
    return await this.test;
  }
}
</script>
<style scoped >
</style>