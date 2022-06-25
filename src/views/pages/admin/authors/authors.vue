<template>
  <content title="Авторы">
    <content-table-test
      :columns="columns"
      :filter="filter"
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
import FilterModel from "@/models/Filter/FilterModel";
import GetReviewerRequestModel from "@/api/plugins/models/Reviewer/GetReviewerRequestModel";
import SearchModel from "@/api/plugins/models/Search/SearchModel";
interface IPaginationResponse {
  Items: Object[];
  Count: number;
}
@Options({
  // emits: ["goToAdmin"],
})
export default class Authors extends Vue {
  async getUsersAsync(filter: FilterModel<any>) {
    console.log("filter",filter)
    this.filter.page = filter.page;
    this.filter.search=filter.search
    console.log("filter",this.filter)
    let res = await this.$api.AuthorService.Search(this.filter);
    return res.data;
  }
  filter: SearchModel = new SearchModel();
  columns = ["Имя", "Фамилия", "Почта", "Кафедра","Детальная"];
  
  created() {
     this.filter = new SearchModel();
    this.filter.page = {
      skip: 0,
      take: 10,
    };
  }
  toAddress(id: number) {
    console.log("id", id);
    this.$router.push({
      name: AUTHOR,
      params: { id: id },
    });
  }
}
</script>
<style scoped >
</style>