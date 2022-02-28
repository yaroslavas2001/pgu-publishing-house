<template>
  <div class="mcw">
    <div class="center">
      <div class="block w-70">
        <page-template>
          <template #header>
            <div class="table-title mr-3">
              <b>Форимрование отчета по балансу за период</b> с
              <span>
                {{
                  $filterService.formatDate(SearchBalanceForThePeriod.fromDate)
                }}
              </span>
              до
              <span>
                {{
                  $filterService.formatDate(SearchBalanceForThePeriod.toDate)
                }}
              </span>
            </div>
            <ui-datetime-range-picker
              @inputRage="onInputRange"
              v-model:fromDate="SearchBalanceForThePeriod.fromDate"
              v-model:toDate="SearchBalanceForThePeriod.toDate"
            />
          </template>
          <template #body>
            <div class="row">
              <div class="col-7">
                <div class="form-group">
                  <label for="Enterprise" class="row ">Субагент <label class="label-wrong"> *</label> </label>
                  <ui-autocomplete
                    v-model="SearchBalanceForThePeriod.EnterpriseId"
                    class="mb-2"
                    id="Enterprise"
                    keyField="Id"
                    valueField="Name"
                    noUndefined="true"
                    :SearchAsyncFunc="GetSybAgent"
                    defaultText="(все)"
                  />
                  <!-- <div v-if="SearchBalanceForThePeriod.EnterpriseId == null"></div> -->
                </div>
                <!--   :class="{
                      requiredSelect:
                        SearchBalanceForThePeriod.EnterpriseId == null,
                    }"  -->
                <div class="form-group">
                  <label for="Shop">Договор</label>
                  <ui-autocomplete
                    v-model="SearchBalanceForThePeriod.ContractId"
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
                  <ui-select-label
                    :items="PosPaymentType"
                    keyField="Id"
                    valueField="NAME"
                    v-model="SearchBalanceForThePeriod.PaymentTypeId"
                    class="mb-2"
                    defaultText="(все)"
                    label="Тип оплаты"
                  />
                </div>
                <div class="form-group">
                  <ui-checkbox
                    v-model="SearchBalanceForThePeriod.IncludeExternalPayments"
                  >
                    Включать платежи возмещения
                  </ui-checkbox>
                </div>
                <div class="row">
                  <div class="form-group pointer green-text" @click="Thismonth">
                    Текущий месяц
                  </div>
                  <div class="form-group pointer green-text" @click="LastMonth">
                    Прошлый месяц
                  </div>
                </div>
                <div class="row">
                  <div class="form-group pointer green-text" @click="Yesterday">
                    Вчера
                  </div>
                  <div class="form-group pointer green-text" @click="Today">
                    Сегодня
                  </div>
                </div>

                <div v-if="wrong" class="wrong">{{ wrongText }}</div>
              </div>
              <div class="col-4">
                <div class="required-text">Выберите субагента</div>
              </div>
            </div>
          </template>
          <template #footer>
            <div class="row">
              <div class="col-6">
                <button class="btn btn-success mr-2 mb-2" @click="showTable">
                  Создать отчет
                </button>
                  <button class="btn btn-info  mb-2" @click="newFunctional">
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
          templateColumns="min-content 1fr 1fr 1fr 1fr"
          :getDataFunc="Table"
          :filter="filter"
          ref="contentTable"
        >
          <template #header>
            <ui-table-header-item>№</ui-table-header-item>
            <ui-table-header-item>Дата</ui-table-header-item>
            <ui-table-header-item> Платежи, сторона 2</ui-table-header-item>
            <ui-table-header-item>Принято, сторона 2</ui-table-header-item>
            <ui-table-header-item>Сальдо</ui-table-header-item>
          </template>
          <template #default="data">
            <ui-table-body-item :class="GetLocedClasses(data)">
              {{ data.index + 1 + (filter._page - 1) * filter._perPage }}
            </ui-table-body-item>
            <ui-table-body-item :class="GetLocedClasses(data)">
              {{ $filterService.formatDateAll(data.PAYMENT_DATE) }}
            </ui-table-body-item>
            <ui-table-body-item :class="GetLocedClasses(data)">
              {{ data.DEBIT }}
            </ui-table-body-item>
            <ui-table-body-item :class="GetLocedClasses(data)">
              {{ data.CREDIT }}
            </ui-table-body-item>
            <ui-table-body-item :class="GetLocedClasses(data)">
              {{ data.Saldo }}
            </ui-table-body-item>
          </template>
        </content-table>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import moment from "moment";
import { Options, Vue } from "vue-property-decorator";
import PaymentStatus from "@/dictionary-servise/PaymentStatus";
import GetListRequest from "@/api/dataSource/api/plugins/models/getListRequest";
import ReportListRequest from "@/api/dataSource/api/plugins/models/controllersModels/reports/ReportListRequest";
import SearchBalanceForThePeriod from "@/models/class/search-balance-for-the-period";
import ContentTableComponent from "@/views/components/content-table.vue";
@Options({
  components: {},
  name: "BalanceForThePeriodPageComponent",
})
export default class BalanceForThePeriodPageComponent extends Vue {
  SearchBalanceForThePeriod = new SearchBalanceForThePeriod();
  contentTable!: ContentTableComponent;
  filter: GetListRequest<ReportListRequest> = {
    _page: 1,
    _perPage: 30,
  };
  PaymentStatus = PaymentStatus;
  PosType: Array<any> = [];
  PosPaymentType: Array<any> = [];
  ShowTable: boolean = false;
  wrong: boolean = false;
  wrongText: string = "";
  num: Array<number> = [];
  currentPage: number = 1;
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
    this.SearchBalanceForThePeriod = new SearchBalanceForThePeriod();
  }
  async showTable() {
    if (this.SearchBalanceForThePeriod.EnterpriseId == null) {
      this.wrong = true;
      this.wrongText = "Выберите Субагента";
      return;
    } else this.wrong = false;

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
        this.SearchBalanceForThePeriod.EnterpriseId
      ),
      ContractId: this.SearchBalanceForThePeriod.ContractId, //this.$filterService.СheckNull(this.SearchBalanceForThePeriod.ContractId),
      IncludeExternalPayments:
        this.SearchBalanceForThePeriod.IncludeExternalPayments,
      ReportType: "Report17",
      DateStart: this.SearchBalanceForThePeriod.fromDate.getTimeSet(),
      DateEnd: this.SearchBalanceForThePeriod.toDate.getTimeSet(),
      PaymentTypeId: this.SearchBalanceForThePeriod.PaymentTypeId, //this.$filterService.СheckNull(
      //   this.SearchBalanceForThePeriod.PaymentTypeId
      // ),
    };
  }
  async onInputRange(value: any) {
    this.SearchBalanceForThePeriod.fromDate = value.firstData;
    this.SearchBalanceForThePeriod.toDate = value.SecondData;
  }
  async GetSybAgent(search?: string) {
    return await this.$api.EnterpriseService.getList({
      _filters: { Name: search },
      _page: 1,
      _perPage: 6,
    });
  }
  async GetСontract(search?: number) {
    return await this.$api.ContractService.getList({
      _filters: { ContractNumber: search },
      _page: 1,
      _perPage: 6,
    });
  }
  GetLocedClasses(data: any) {
    return {
      locked: data.State == 2,
    };
  }
  Thismonth() {
    this.SearchBalanceForThePeriod.fromDate = moment(
      moment(new Date().setDate(1)).format("YYYY-MM-01 00:00")
    ).toDate();
    this.SearchBalanceForThePeriod.toDate = moment(
      moment(new Date().setDate(new Date().getDate() + 1)).format(
        "YYYY-MM-DD 00:00"
      )
    ).toDate();
  }
  LastMonth() {
    this.SearchBalanceForThePeriod.fromDate = moment(
      moment(new Date().setMonth(new Date().getMonth() - 1, 1)).format(
        "YYYY-MM-01 00:00"
      )
    ).toDate();
    // let mon = moment(new Date().setDate(1)).toDate();
    this.SearchBalanceForThePeriod.toDate = moment(
      moment(new Date().setDate(1)).format("YYYY-MM-DD 00:00")
    ).toDate();
  }
  Today() {
    console.log("nem");
    this.SearchBalanceForThePeriod.fromDate = moment(
      moment(new Date()).format("YYYY-MM-DD 00:00")
    ).toDate();
    this.SearchBalanceForThePeriod.toDate = moment(
      moment(new Date().setDate(new Date().getDate() + 1)).format(
        "YYYY-MM-DD 00:00"
      )
    ).toDate();
  }
  Yesterday() {
    this.SearchBalanceForThePeriod.fromDate = moment(
      moment(new Date().setDate(new Date().getDate() - 1)).format(
        "YYYY-MM-DD 00:00"
      )
    ).toDate();
    this.SearchBalanceForThePeriod.toDate = moment(
      moment(new Date()).format("YYYY-MM-DD 00:00")
    ).toDate();
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
.green-text {
  color: #71b92f;
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
