<template>
  <content title="Рецензенты">
    <template #header>
      <btn isSmall @click="addReviewer" title="Добавить рецензента" />
    </template>
    <content-table-test
      :columns="columns"
      :filter="filter"
      templateColumns="1fr 1fr 1fr 1fr"
      :getDataFunc="getUsersAsync"
      ref="contentTable"
    >
      <template #default="data">
        <ui-table-body-item>{{ data.lastName }}</ui-table-body-item>
        <ui-table-body-item>
          {{ data.firstName }}
        </ui-table-body-item>
        <ui-table-body-item>
          {{ data.sureName }}
        </ui-table-body-item>
        <ui-table-body-item>
          {{ data.email ? data.email : "-" }}
        </ui-table-body-item>
      </template>
    </content-table-test>
  </content>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { REVIEWERDETAILED } from "@/router/routerNames";
import GetReviewerRequestModel from "@/api/plugins/models/Reviewer/GetReviewerRequestModel";
import FilterModel from "@/models/Filter/FilterModel";
@Options({})
export default class Reviewer extends Vue {
  columns = ["Фамилия", "Имя", "Отчество", "Почта"];
  filter: GetReviewerRequestModel = new GetReviewerRequestModel();
  created() {
    this.filter = new GetReviewerRequestModel();
    this.filter.page = {
      skip: 0,
      take: 10,
    };
  }
  async getUsersAsync(filter: FilterModel<any>) {
    this.filter.page = filter.page;
    return (await this.$api.ReviewerService.Get(this.filter)).data;
  }
  addReviewer() {
    this.$router.push({ name: REVIEWERDETAILED });
  }
}
</script>
<style scoped >
</style>