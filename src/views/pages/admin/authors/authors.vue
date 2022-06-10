<template>
  <content title="Авторы">
    <content-table-test
      :columns="columns"
      :filter="filterCity"
      templateColumns="1fr 1fr 1fr 1fr 1fr"
      :getDataFunc="getUsersAsync"
      ref="contentTable"
    >
      <template #default="data">
        <ui-table-body-item>{{ data.firstName }}</ui-table-body-item>
        <ui-table-body-item>
          {{ data.lastName }}
        </ui-table-body-item>
        <ui-table-body-item>
          {{ data.email }}
        </ui-table-body-item>
          <ui-table-body-item>
          {{ data.department }}
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
import { AUTHOR } from "@/router/routerNames";
interface IPaginationResponse {
  Items: Object[];
  Count: number;
}
@Options({
  // emits: ["goToAdmin"],
})
export default class Authors extends Vue {
  test: IPaginationResponse = {
    Items: [
      {
        id: 1,
        firstName: "Иван",
        lastName: "Сычов",
        email: "test@mail.ru",
        department:"123"
      },
    ],
    Count: 10,
  };
  columns = ["Имя", "Фамилия", "Почта", "Кафедра","Детальная"];
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
      name: AUTHOR,
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