<template>
  <div class="mcw">
    <div class="center">
      <div class="block w-70">
        <page-template>
          <template #header>
            <div class="table-title">Редактирование магазинов</div>
          </template>
          <template #body>
            <div class="col-7">
              <div class="form-group">
                <ui-label-input
                  nameLabel="ID"
                  placeholder="Введите ID"
                  v-model="id"
                  id="id"
                />
              </div>
              <div class="form-group">
                <ui-label-input
                  nameLabel="Код"
                  placeholder="Введите код"
                  v-model="code"
                  id="code"
                />
              </div>
              <div class="form-group">
                <ui-select-label
                  :items="test"
                  keyField="id"
                  valueField="name"
                  v-model="testId"
                  
                  defaultText="Субагент"
                  label="Субагент"
                />
              </div>
              <div class="form-group">
                <ui-select-label
                  :items="test"
                  keyField="id"
                  valueField="name"
                  v-model="testId"
                  
                  defaultText="Наименование"
                  label="Наименование"
                />
              </div>
              <div class="form-group">
                <ui-select-label
                  :items="test"
                  keyField="id"
                  valueField="name"
                  v-model="testId"
                  
                  defaultText="Кассовое ПО"
                  label="Кассовое ПО"
                />
              </div>
            </div>
          </template>
          <template #footer>
            <div class="row">
              <div class="col-6">
                <button class="btn btn-success">Cоздать отчет</button>
              </div>
              <div class="col-6 text-right">
                <button class="btn btn-default">Установить фильтр</button>
              </div>
            </div>
          </template>
        </page-template>
      </div>
      <div class="block w-70">
        <div class="block-body">
          <content-table
            templateColumns="min-content min-content 1fr 1fr 110px 1fr 1fr"
            :getDataFunc="getContractAsync"
            :filter="filter"
            ref="contentTable"
          >
            <template #header>
              <ui-table-header-item></ui-table-header-item>
              <ui-table-header-item
                defaultSort="desc"
                iconAsc="table-ord-asc red"
                @onSort="onSort"
                iconDesk="table-ord-desk"
                sortName="Id"
                :activeText="activeSortName"
              >
                ID
              </ui-table-header-item>
              <ui-table-header-item
                defaultSort="desc"
                iconAsc="table-ord-asc"
                @onSort="onSort"
                iconDesk="table-ord-desk"
                sortName="Code"
                :activeText="activeSortName"
              >
                Код
              </ui-table-header-item>
              <ui-table-header-item
                defaultSort="desc"
                iconAsc="table-ord-asc"
                @onSort="onSort"
                iconDesk="table-ord-desk"
                sortName="Name"
                :activeText="activeSortName"
              >
                Наименование
              </ui-table-header-item>
              <ui-table-header-item>Субагент</ui-table-header-item>
              <ui-table-header-item>Кассовое ПО</ui-table-header-item>
              <ui-table-header-item>Тип взаиморасчета</ui-table-header-item>
            </template>
            <template #default="data">
              <ui-table-body-item class="pointer">[...]</ui-table-body-item>
              <ui-table-body-item>{{ data.Id }}</ui-table-body-item>
              <ui-table-body-item>{{ data.Code }}</ui-table-body-item>
              <ui-table-body-item>{{ data.Name }}</ui-table-body-item>
              <ui-table-body-item>
                {{ data.FullName }}
              </ui-table-body-item>
              <ui-table-body-item>
                {{ data.CassaSoft }}
              </ui-table-body-item>
              <ui-table-body-item>
                <div v-if="data.BillingType == 0">Кредитный</div>
                <div v-if="data.BillingType == 1">Авансовый</div>
              </ui-table-body-item>
            </template>
          </content-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import ContractListRequest from "@/api/dataSource/api/plugins/models/controllersModels/contracts/ContractListRequest";
import GetListRequest from "@/api/dataSource/api/plugins/models/getListRequest";
import ContentTableComponent from "@/views/components/content-table.vue";
import { Options, Vue } from "vue-property-decorator";
@Options({
  components: {},
})
export default class ShopsPageComponent extends Vue {
  contentTable!: ContentTableComponent;
  id = null;
  code = null;
  test = [
    { id: 0, name: "Paymaster1" },
    { id: 1, name: "Paymaster2" },
    { id: 2, name: "Paymaster3" },
  ];
  numbeRecords = [
    { id: 0, name: "10" },
    { id: 1, name: "20" },
    { id: 2, name: "30" },
    { id: 3, name: "40" },
    { id: 4, name: "50" },
  ];
  testId = 1;
  numbeRecordsId = 4;
  getContractAsync: Function = null;
  filter: GetListRequest<ContractListRequest> = {
    _page: 1,
    _perPage: 10,
  };
  async created() {
    this.getContractAsync = this.getList;
  }
  async getList() {
    let res = await this.$api.ContractService.getList(this.filter);
    return res.Response;
  }
  mounted() {
    this.contentTable = this.$refs.contentTable as ContentTableComponent;
  }
  testSortName = "";
  activeSortName = "";
  click = 0;
  async onSort(data: any) {
    if (this.testSortName !== data.sortName && this.click > 2) {
      this.testSortName = data.sortName;
      this.activeSortName = data.sortName;
    }
    this.click += 1;
    this.filter._sortField = data.sortName;
    this.filter._sortDir = data.sortType;
    if (this.contentTable) this.contentTable.onChangeFilter();
  }
}
</script>
<style scoped>
</style>
