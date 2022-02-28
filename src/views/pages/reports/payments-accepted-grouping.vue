<template>
  <div class="mcw">
    <div class="center">
      <div class="block w-70">
        <page-template>
          <template #header>
            <div class="table-title mr-3">
              <b> Формирование отчета принятого платежа с группировкой</b> с
              <span>
                {{
                  $filterService.formatDate(
                    SearchPaymentsAcceptedGrouping.fromDate
                  )
                }}
              </span>
              до
              <span>
                {{
                  $filterService.formatDate(
                    SearchPaymentsAcceptedGrouping.toDate
                  )
                }}
              </span>
            </div>
            <ui-datetime-range-picker
              @inputRage="onInputRange"
              v-model:fromDate="SearchPaymentsAcceptedGrouping.fromDate"
              v-model:toDate="SearchPaymentsAcceptedGrouping.toDate"
            />
          </template>
          <template #body>
            <div class="row">
              <div class="col-7">
                <div class="form-group">
                  <label for="Enterprise">Субагент</label>
                  <ui-autocomplete
                    v-model="SearchPaymentsAcceptedGrouping.EnterpriseId"
                    class="mb-2"
                    id="Enterprise"
                    keyField="Id"
                    valueField="Name"
                    noUndefined="true"
                    :SearchAsyncFunc="GetSybAgent"
                    defaultText="(все)"
                  />
                </div>

                <div class="form-group">
                  <label for="Shop">Договор</label>
                  <ui-autocomplete
                    v-model="SearchPaymentsAcceptedGrouping.ContractId"
                    class="mb-2"
                    id="Shop"
                    keyField="Id"
                    valueField="Name"
                    noUndefined="true"
                    :SearchAsyncFunc="GetСontract"
                    defaultText="(все)"
                  />
                </div>
                <div class="form-group">
                  <label for="Enterprise">Регион</label>
                  <ui-autocomplete
                    v-model="SearchPaymentsAcceptedGrouping.RegionId"
                    class="mb-2"
                    id="Region"
                    keyField="Id"
                    valueField="Name"
                    noUndefined="true"
                    :SearchAsyncFunc="GetRegion"
                    defaultText="(все)"
                  />
                </div>

                <div class="form-group">
                  <label for="ShopId">Магазины</label>
                  <ui-autocomplete
                    v-model="SearchPaymentsAcceptedGrouping.ShopId"
                    class="mb-2"
                    id="ShopId"
                    keyField="Id"
                    valueField="Name"
                    noUndefined="true"
                    :SearchAsyncFunc="GetShops"
                    defaultText="(все)"
                  />
                </div>
                <div
                  class="form-group"
                  v-if="SearchPaymentsAcceptedGrouping.ShopId == null"
                >
                  <ui-label-input
                    nameLabel="Код точки"
                    placeholder="Введите код"
                    v-model="SearchPaymentsAcceptedGrouping.PosCode"
                    id="Point"
                    class="mb-2"
                  />
                </div>
                <div
                  class="form-group"
                  v-if="SearchPaymentsAcceptedGrouping.ShopId != null"
                >
                  <label for="Point">Код точки</label>
                  <ui-autocomplete
                    v-model="SearchPaymentsAcceptedGrouping.PosCode"
                    class="mb-2"
                    v-if="SearchPaymentsAcceptedGrouping.ShopId != null"
                    keyField="Id"
                    valueField="Name"
                    noUndefined="true"
                    :SearchAsyncFunc="GetPoint"
                    defaultText="(все)"
                    id="Point"
                  />
                </div>
                <div class="form-group">
                  <ui-select-label
                    :items="PaymentStatus"
                    keyField="Id"
                    valueField="Name"
                    v-model="SearchPaymentsAcceptedGrouping.StatusId"
                    class="mb-2"
                    defaultText="(все)"
                    label="Статус платежа"
                  />
                </div>
                <div class="form-group">
                  <label for="OperatorId">Оператор</label>
                  <ui-autocomplete
                    v-model="SearchPaymentsAcceptedGrouping.OperatorId"
                    class="mb-2"
                    id="OperatorId"
                    keyField="Id"
                    valueField="Name"
                    noUndefined="true"
                    :SearchAsyncFunc="GetOperators"
                    defaultText="(все)"
                  />
                </div>
                <div class="form-group">
                  <ui-select-label
                    :items="PosPaymentType"
                    keyField="Id"
                    valueField="NAME"
                    v-model="SearchPaymentsAcceptedGrouping.PaymentTypeId"
                    class="mb-2"
                    defaultText="(все)"
                    label="Тип оплаты"
                  />
                </div>
              </div>
              <div class="col-5">
                <ui-checkbox
                  v-model="
                    SearchPaymentsAcceptedGrouping.ExcludeCanceledPayments
                  "
                >
                  Исключать отмененные и нулевые платежи
                </ui-checkbox>

                <ui-checkbox
                  v-model="SearchPaymentsAcceptedGrouping.GroupByShop"
                >
                  Группировка по магазинам
                </ui-checkbox>

                <ui-checkbox
                  v-model="SearchPaymentsAcceptedGrouping.GroupByPos"
                >
                  Группировка по точкам
                </ui-checkbox>

                <ui-checkbox
                  v-model="SearchPaymentsAcceptedGrouping.GroupByOperator"
                >
                  Группировка по операторам
                </ui-checkbox>

                <ui-checkbox
                  v-model="SearchPaymentsAcceptedGrouping.GroupByEnterprise"
                >
                  Группировка по субагентам
                </ui-checkbox>
              </div>
            </div>
          </template>
          <template #footer>
            <div class="row">
              <div class="col-6">
                <button class="btn btn-success mb-2 mr-2" @click="showTable">
                  Создать отчет
                </button>
                <button class="btn btn-info mb-2" @click="newFunctional">
                  Создать отчет в excele
                </button>
              </div>
              <div class="col-6 text-right">
                <button class="btn btn-default mb-2" @click="ClearForm">
                  очистить форму
                </button>
              </div>
            </div>
          </template>
        </page-template>
      </div>
      <div id="scroll"></div>
      <div class="table" v-if="ShowTable">
        <content-table
          templateColumns="1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
          :getDataFunc="Table"
          :filter="filter"
          ref="contentTable"
        >
          <template #header>
            <!-- <ui-table-header-item></ui-table-header-item> -->
            <ui-table-header-item>ID</ui-table-header-item>
            <ui-table-header-item> Дата на точке</ui-table-header-item>
            <ui-table-header-item>Магазин</ui-table-header-item>
            <ui-table-header-item>Точка</ui-table-header-item>
            <ui-table-header-item>Субагент</ui-table-header-item>
            <ui-table-header-item>Оператор</ui-table-header-item>
            <ui-table-header-item>Количество платежей</ui-table-header-item>
            <ui-table-header-item>
              Принято от плательщиков, валюта
            </ui-table-header-item>
            <ui-table-header-item>
              Сумма платежа Оператору, валюта
            </ui-table-header-item>
            <ui-table-header-item>Возн. Субагента, %</ui-table-header-item>
            <ui-table-header-item>Возн. Суб-та, валюта</ui-table-header-item>
            <ui-table-header-item>
              Доп. комиссия Субагента, валюта
            </ui-table-header-item>
            <ui-table-header-item>Доход Субагента, валюта</ui-table-header-item>
            <ui-table-header-item>
              Доп. комиссия Paymaster, валюта
            </ui-table-header-item>
          </template>
          <template #default="data">
            <!-- <ui-table-body-item class="pointer" :class="GetLocedClasses(data)">
            </ui-table-body-item> -->
            <ui-table-body-item :class="GetLocedClasses(data)">
              {{ data.ID }}
            </ui-table-body-item>
            <ui-table-body-item :class="GetLocedClasses(data)">
              {{ $filterService.formatDate(data.TRAN_DATE_DAY) }}
            </ui-table-body-item>
            <ui-table-body-item :class="GetLocedClasses(data)">
              {{ data.SHOP_NAME }}
            </ui-table-body-item>
            <ui-table-body-item :class="GetLocedClasses(data)">
              {{ data.POS_CODE }}
            </ui-table-body-item>
            <ui-table-body-item :class="GetLocedClasses(data)">
              {{ data.ENTERPRISE_NAME }}
            </ui-table-body-item>
            <ui-table-body-item :class="GetLocedClasses(data)">
              {{ data.OPERATOR_NAME }}
            </ui-table-body-item>
            <ui-table-body-item :class="GetLocedClasses(data)">
              {{ data.QUANTITY }}
            </ui-table-body-item>
            <ui-table-body-item :class="GetLocedClasses(data)">
              {{ data.FULL_SUMMA }}
            </ui-table-body-item>
            <ui-table-body-item :class="GetLocedClasses(data)">
              {{ data.SUMMA_OP }}
            </ui-table-body-item>
            <ui-table-body-item :class="GetLocedClasses(data)">
              {{ data.COMMISSION }}
            </ui-table-body-item>
                <ui-table-body-item :class="GetLocedClasses(data)">
              {{ data.SUMMA_COMMISSION }}
            </ui-table-body-item>
            <ui-table-body-item :class="GetLocedClasses(data)">
              {{ data.SumComExter }}
            </ui-table-body-item>
            <ui-table-body-item :class="GetLocedClasses(data)">
              {{ data.SumCom }}
            </ui-table-body-item>
            <ui-table-body-item :class="GetLocedClasses(data)">
              {{ data.SUMMA_COMMISSION_NETTO }}
            </ui-table-body-item>
          </template>
        </content-table>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import PaymentStatus from "@/dictionary-servise/PaymentStatus";
import GetListRequest from "@/api/dataSource/api/plugins/models/getListRequest";
import ReportListRequest from "@/api/dataSource/api/plugins/models/controllersModels/reports/ReportListRequest";
import SearchPaymentsAcceptedGrouping from "@/models/class/search-for-payments-accepted-grouping";
import ContentTableComponent from "@/views/components/content-table.vue";
@Options({
  components: {},
  name: "PaymentsAcceptedGroupingPageComponent",
})
export default class PaymentsAcceptedGroupingPageComponent extends Vue {
  SearchPaymentsAcceptedGrouping = new SearchPaymentsAcceptedGrouping();
  contentTable!: ContentTableComponent;
  filter: GetListRequest<ReportListRequest> = {
    _page: 1,
    _perPage: 10,
  };
  PaymentStatus = PaymentStatus;
  PosType: Array<any> = [];
  PosPaymentType: Array<any> = [];
  ShowTable: boolean = false;
  async created() {
    this.PosType = await this.$initService.state.GetPosType();
    this.PosPaymentType = await this.$initService.state.GetPosPaymentType();
  }
  async mounted() {
    this.contentTable = this.$refs.contentTable as ContentTableComponent;
  }
  newFunctional() {
    alert("Данный функционал пока не доступен");
  }
  ClearForm() {
    this.SearchPaymentsAcceptedGrouping = new SearchPaymentsAcceptedGrouping();
  }
  async showTable() {
    //переменная флаг для показа таблицы
    this.searchReport();
    this.ShowTable = true;
    this.contentTable = this.$refs.contentTable as ContentTableComponent;
    if (this.contentTable) {
      this.searchReport();
      this.contentTable.onChangeFilter();
    }
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    // let element = document.getElementById("scroll").clientWidth;
    // this.$filterService.ScrollToElement(element);
  }
  async Table() {
    return await this.$api.ReportService.getList(this.filter);
  }
  searchReport() {
    this.filter._filters = {
      EnterpriseId: this.$filterService.СheckNull(
        this.SearchPaymentsAcceptedGrouping.EnterpriseId
      ),
      ContractId: this.$filterService.СheckNull(
        this.SearchPaymentsAcceptedGrouping.ContractId
      ),
      RegionId: this.$filterService.СheckNull(
        this.SearchPaymentsAcceptedGrouping.RegionId
      ),
      ShopId: this.$filterService.СheckNull(
        this.SearchPaymentsAcceptedGrouping.ShopId
      ),
      PosCode: this.$filterService.СheckNull(
        this.SearchPaymentsAcceptedGrouping.PosCode
      ),
      StatusId: this.SearchPaymentsAcceptedGrouping.StatusId,
      GroupByShop: this.SearchPaymentsAcceptedGrouping.GroupByShop,
      GroupByPos: this.SearchPaymentsAcceptedGrouping.GroupByPos,
      GroupByOperator: this.SearchPaymentsAcceptedGrouping.GroupByOperator,
      GroupByEnterprise: this.SearchPaymentsAcceptedGrouping.GroupByEnterprise,
      ExcludeCanceledPayments:
        this.SearchPaymentsAcceptedGrouping.ExcludeCanceledPayments,
      ReportType: "ReportGroupedPayments",
      DateStart: this.SearchPaymentsAcceptedGrouping.fromDate.getTimeSet(),
      DateEnd: this.SearchPaymentsAcceptedGrouping.toDate.getTimeSet(),
      PaymentTypeId: this.$filterService.СheckNull(
        this.SearchPaymentsAcceptedGrouping.PaymentTypeId
      ),
    };
  }
  async onInputRange(value: any) {
    this.SearchPaymentsAcceptedGrouping.fromDate = value.firstData;
    this.SearchPaymentsAcceptedGrouping.toDate = value.SecondData;
  }
  async GetSybAgent(search?: string) {
    return await this.$api.EnterpriseService.getList({
      _filters: { Name: search },
      _page: 1,
      _perPage: 6,
    });
  }
  async GetOperators(search?: string) {
    return await this.$api.OperatorService.getList({
      _filters: {
        Name: search,
        EnterpriseId: this.SearchPaymentsAcceptedGrouping.EnterpriseId,
      },
      _page: 1,
      _perPage: 6,
    });
  }
  async GetСontract(search?: number) {
    return await this.$api.ContractService.getList({
      _filters: {
        ContractNumber: search,
        EnterpriseId: this.SearchPaymentsAcceptedGrouping.EnterpriseId,
      },
      _page: 1,
      _perPage: 6,
    });
  }
  async GetRegion(search?: string) {
    return await this.$api.PointOfSalesService.GetRegionsList({
      _filters: { Name: search },
      _page: 1,
      _perPage: 6,
    });
  }

  async GetShops(search?: string) {
    return await this.$api.ShopService.getList({
      _filters: {
        Name: search,
        EnterpriseId: this.SearchPaymentsAcceptedGrouping.EnterpriseId,
      },
      _page: 1,
      _perPage: 6,
    });
  }
  async GetPoint(search?: string) {
    return await this.$api.PointOfSalesService.getList({
      _filters: { ShopId: this.SearchPaymentsAcceptedGrouping.ShopId },
      _page: 1,
      _perPage: 6,
    });
  }
  GetLocedClasses(data: any) {
    return {
      locked: data.State == 2,
    };
  }
}
</script>
<style scoped>
.one-select {
  margin-top: 19px;
}
.table {
  background: white;
  width: 100%;
  padding: 30px 50px;
  margin-top: 20px;
  border-radius: 8px;
}
.locked {
  background: #e0ffd1 !important;
}
.ui-quick-view {
  display: none;
}
.uiQuickView {
  margin-top: 125px;
  display: block;
  position: fixed;
  width: 50%;
  top: 0px;
  right: 0px;
  box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0.5);
  bottom: 0px;
  overflow-y: auto;
  background: #fff;
}
.fade-enter-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter-from,
.fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
