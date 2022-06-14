<template>
  <content title="Мои материалы">
    <content-table-test
      :columns="columns"
      :filter="filterCity"
      templateColumns="1fr 1fr 1fr 100px"
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
          {{ data.autors }}
        </ui-table-body-item>
        <ui-table-body-item>
          {{ status(data.status) }}
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
interface IPaginationResponse {
  Items: Object[];
  Count: number;
}
@Options({
  // emits: ["goToAdmin"],
})
export default class UserMaterials extends Vue {
  test: IPaginationResponse = {
    Items: [
      {
        id: 1,
        name: "Методология разработки",
        status: 2,
        autors: [],
      },
      {
        id: 2,
        name: "Разработка контента",
        status: 3,
        autors: [],
      },
      {
        id: 3,
        name: "Основы програмирования",
        status: 1,
        autors: [],
      },
    
    ],
    Count: 10,
  };
  columns = ["Название", "Авторы", "Статус", "Детальная"];
  filterCity: any = {
    search: "",
    city: "",
    street: "",
    house: "",
  };
  isMainPage: boolean;
  getUsersAsync: Function = null;
  selectListCity = ["Город", "Москва", "Перьмь", "Владивосток"];
  selectListHouse = ["Дом", "Дом 1", "Дом 2", "Дом 3", "Дом 4"];
  selectListStreet = [
    "Улица",
    "ул. Карала-Маркса",
    "ул. Карала-Маркса1",
    "ул. Карала-Маркса2",
    "ул. Карала-Маркса3",
  ];
  status(status):string{
    return  status==1?"На проверке у рецензиата":"На печать"
  }
  created() {
    this.getUsersAsync = this.testF;
    // console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRrr")
  }
  toAddress(id: number) {
    console.log("id", id);
    this.$router.push({
      name: DETAILEDUSER,
      params: { id: id },
    });
  }
  async testF() {
    return await this.test;
  }
}
</script>
<style scoped  lang="less">
</style>