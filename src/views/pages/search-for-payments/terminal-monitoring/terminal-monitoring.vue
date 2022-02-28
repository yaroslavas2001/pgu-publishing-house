<template>
  <div class="mcw">
    <div class="center">
      <div class="block w-70">
        <page-template>
          <template #header>
            <div class="table-title">
              <b> Поиск платежей</b> с
              <span>{{ $filterService.formatDate(Search.fromDate) }}</span> до
              <span>{{ $filterService.formatDate(Search.toDate) }}</span>
            </div>
            <ui-datetime-range-picker
              @inputRage="onInputRange"
              v-model:fromDate="Search.fromDate"
              v-model:toDate="Search.toDate"
            />
          </template>
          <template #body>
            <div class="row row-50">
              <div class="col-6">
                <div class="form-group">
                  <label for="Enterprise" class="row"
                    >Субагент <label class="label-wrong"> *</label></label
                  >
                  <ui-autocomplete
                    v-model="Search.EnterpriseId"
                    id="Enterprise"
                    keyField="Id"
                    valueField="Name"
                    noUndefined="true"
                    :SearchAsyncFunc="GetSybAgent"
                    defaultText="(все)"
                  />
                </div>
                <!--  :class="{
                      requiredSelect: Search.EnterpriseId == null,
                    }" -->
                <div class="form-group">
                  <label for="Shop">Магазин</label>
                  <ui-autocomplete
                    v-model="Search.ShopId"
                    id="Shop"
                    keyField="Id"
                    valueField="Name"
                    noUndefined="true"
                    :SearchAsyncFunc="GetShops"
                    defaultText="(все)"
                  />
                </div>
                <div class="form-group" v-if="Search.ShopId == null">
                  <ui-label-input
                    nameLabel="Код точки"
                    placeholder="Введите код"
                    v-model="Search.PosCode"
                    id="Point"
                  />
                </div>
                <div class="form-group" v-if="Search.ShopId != null">
                  <label for="Point">Код точки</label>
                  <ui-autocomplete
                    v-model="Search.PosCode"
                    v-if="Search.ShopId != null"
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
                    :items="PosType"
                    keyField="Id"
                    valueField="Name"
                    v-model="Search.PosTypeId"
                    defaultText="(все)"
                    label="Тип терминала"
                    required
                  />
                </div>
                <!--  :class="{
                      requiredSelect: Search.PosTypeId == null,
                    }"  -->
                <div class="form-group">
                  <ui-select-label
                    :items="PaymentStatus"
                    keyField="Id"
                    valueField="Name"
                    v-model="Search.StatusId"
                    defaultText="(все)"
                    label="Статус"
                  />
                </div>
                <div class="form-group">
                  <ui-select-label
                    :items="StatusDateType"
                    keyField="Id"
                    valueField="Name"
                    v-model="Search.StatusDateTypeId"
                    label="Искать по дате"
                    noUndefined="true"
                    required
                  />
                </div>
                <!--  :class="{
                      requiredSelect: Search.StatusDateTypeId == null,
                    }" -->
                <ui-checkbox v-model="Search.OnlyTranCopies">
                  Только ручные транзакции
                </ui-checkbox>
                <div class="form-group">
                  <label for="Point" class="row">
                    Шлюз <label class="label-wrong"> *</label>
                  </label>
                  <ui-autocomplete
                    v-model="Search.GatewayId"
                    keyField="Id"
                    valueField="Name"
                    noUndefined="true"
                    :SearchAsyncFunc="Gateway"
                    defaultText="(все)"
                    id="Point"
                  />
                </div>
                <!--   :class="{
                      requiredSelect: Search.GatewayId == null,
                    }" -->
                <br />
                <div class="row">
                  <div class="col-4">
                    <div class="form-group">
                      <ui-select-label
                        :items="NumbeRecords"
                        keyField="Id"
                        valueField="Name"
                        noUndefined="true"
                        v-model="filter._perPage"
                        label="Количество записей"
                      />
                    </div>
                  </div>
                </div>
                <div v-if="wrong" class="wrong">{{ wrongText }}</div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <ui-label-input
                    nameLabel="Номер телефона/счета"
                    placeholder="Введите номер телефона/счета"
                    v-model="Search.phoneNumber"
                    id="phoneNumber"
                  />
                </div>
                <div class="form-group">
                  <ui-label-input
                    nameLabel="ID в системе"
                    placeholder="Введите ID в системе"
                    v-model="Search.idInSystem"
                    id="idInSystem"
                    type="number"
                  />
                </div>
                <div class="form-group">
                  <ui-label-input
                    nameLabel="Дополнительные параметры"
                    placeholder="Введите дополнительные параметры"
                    v-model="Search.Note"
                    id="Note"
                  />
                </div>
                <div class="form-group">
                  <ui-label-input
                    nameLabel="ID в магазине (N4check)"
                    placeholder="Введите ID в магазине (N4check)"
                    v-model="Search.IdN4Check"
                    id="IdN4Check"
                    type="number"
                  />
                </div>
                <div class="form-group">
                  <ui-label-input
                    nameLabel="ID у оператора"
                    placeholder="Введите ID у оператора"
                    v-model="Search.IdOperator"
                    id="Operator"
                    type="number"
                  />
                </div>
                <div class="form-group">
                  <label for="OperatorId" class="row"
                    >Оператор <label class="label-wrong"> *</label></label
                  >
                  <ui-autocomplete
                    v-model="Search.OperatorId"
                    id="OperatorId"
                    keyField="Id"
                    valueField="Name"
                    noUndefined="true"
                    :SearchAsyncFunc="GetOperators"
                    defaultText="(все)"
                  />
                </div>
                <!--   :class="{
                      requiredSelect: Search.OperatorId == null,
                    }" -->
                <div class="form-group">
                  <ui-select-label
                    :items="PosPaymentType"
                    keyField="Id"
                    valueField="NAME"
                    v-model="Search.posPaymentType"
                    defaultText="(все)"
                    label="Тип оплаты"
                    required
                  />
                </div>
                <!--  :class="{
                      requiredSelect: Search.posPaymentType == null,
                    }" -->
                <div class="form-group">
                  <ui-label-input
                    nameLabel="Фискальный ID"
                    placeholder="Введите фискальный ID"
                    v-model="Search.IdFiscal"
                    id="IdFiscal"
                    type="number"
                  />
                </div>
              </div>
            </div>
          </template>
          <template #footer>
            <div class="row">
              <div class="col-6">
                <button class="btn btn-success" @click="showTable">
                  найти платежи
                </button>
              </div>
              <div class="col-6 text-right">
                <button class="btn btn-default" @click="ClearForm">
                  очистить форму
                </button>
              </div>
            </div>
          </template>
        </page-template>
      </div>
      <div id="scroll"></div>
      <div class="table" v-show="ShowTable">
        <content-table
          templateColumns="1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
          :getDataFunc="Table"
          :filter="filter"
          ref="contentTable"
        >
          <template #header>
            <ui-table-header-item>ID</ui-table-header-item>
            <ui-table-header-item> Дата на точке</ui-table-header-item>
            <ui-table-header-item>Телефон</ui-table-header-item>
            <ui-table-header-item>Сумма</ui-table-header-item>
            <ui-table-header-item>ID оператора</ui-table-header-item>
            <ui-table-header-item>Оператор</ui-table-header-item>
            <ui-table-header-item>Субагент</ui-table-header-item>
            <ui-table-header-item>Код точки</ui-table-header-item>
            <ui-table-header-item>Тип оплаты</ui-table-header-item>
            <ui-table-header-item>Код ошибки</ui-table-header-item>
            <ui-table-header-item>Статус платежа</ui-table-header-item>
            <ui-table-header-item>Фиск. ID</ui-table-header-item>
            <ui-table-header-item>Off.</ui-table-header-item>
            <ui-table-header-item>Копия</ui-table-header-item>
          </template>
          <template #default="data">
            <ui-table-body-item
              class="pointer"
              :class="GetLocedClasses(data)"
              @click="ShowDetail(data)"
            >
              {{ data.Id }}
            </ui-table-body-item>
            <ui-table-body-item
              class="pointer"
              :class="GetLocedClasses(data)"
              @click="ShowDetail(data)"
            >
              {{ $filterService.formatDateAll(data.TransactionDate) }}
            </ui-table-body-item>
            <ui-table-body-item
              class="pointer"
              :class="GetLocedClasses(data)"
              @click="ShowDetail(data)"
            >
              {{ data.Phone }}
            </ui-table-body-item>
            <ui-table-body-item
              class="pointer"
              :class="GetLocedClasses(data)"
              @click="ShowDetail(data)"
            >
              {{ data.Summa }}
            </ui-table-body-item>
            <ui-table-body-item
              class="pointer"
              :class="GetLocedClasses(data)"
              @click="ShowDetail(data)"
            >
              {{ data.BeepayId }}
            </ui-table-body-item>
            <ui-table-body-item
              class="pointer"
              :class="GetLocedClasses(data)"
              @click="ShowDetail(data)"
            >
              {{ data.OperatorName }}
            </ui-table-body-item>

            <ui-table-body-item
              class="pointer"
              :class="GetLocedClasses(data)"
              @click="ShowDetail(data)"
            >
              {{ data.Enterprise.Name }}
            </ui-table-body-item>
            <ui-table-body-item
              class="pointer"
              :class="GetLocedClasses(data)"
              @click="ShowDetail(data)"
            >
              <!-- нет в ответе -->
              {{ data.PosCode }}
            </ui-table-body-item>
            <ui-table-body-item
              class="pointer"
              :class="GetLocedClasses(data)"
              @click="ShowDetail(data)"
            >
              {{ data.PaymentTypeName }}
            </ui-table-body-item>
            <ui-table-body-item
              class="pointer"
              :class="GetLocedClasses(data)"
              @click="ShowDetail(data)"
            >
              {{ data.RequestErrorDescription }}
            </ui-table-body-item>
            <ui-table-body-item
              class="pointer"
              :class="GetLocedClasses(data)"
              @click="ShowDetail(data)"
            >
              {{ data.StatusName }}
            </ui-table-body-item>
            <ui-table-body-item
              class="pointer"
              :class="GetLocedClasses(data)"
              @click="ShowDetail(data)"
            >
              {{ data.FiscalId }}
            </ui-table-body-item>
            <ui-table-body-item
              class="pointer"
              :class="GetLocedClasses(data)"
              @click="ShowDetail(data)"
            >
              {{ data.IsOffline }}
            </ui-table-body-item>
            <ui-table-body-item
              class="pointer"
              :class="GetLocedClasses(data)"
              @click="ShowDetail(data)"
            >
              {{ data.IsTranCopy }}
            </ui-table-body-item>
          </template>
        </content-table>
      </div>
    </div>
    <transition name="fade" appear>
      <div class="ui-quick-view uiQuickView" v-if="showDetail">
        <ui-quick-view-payments-component
          v-model="PaymentForQuickView"
          @hideDetail="hideDetail"
          v-click-outside="onBlur"
        />
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import PaymentStatus from "@/dictionary-servise/PaymentStatus";
import NumbeRecords from "@/dictionary-servise/NumbeRecords";
import StatusDateType from "@/dictionary-servise/StatusDateType";
import GetListRequest from "@/api/dataSource/api/plugins/models/getListRequest";
import PaymentsListRequest from "@/api/dataSource/api/plugins/models/controllersModels/payments/PaymentsListRequest";
import Search from "@/models/class/search-for-payments";
import ContentTableComponent from "@/views/components/content-table.vue";
import PaymentsDetailItem from "@/api/dataSource/api/plugins/models/controllersModels/payments/PaymentsDetailItem";
import UiQuickViewPaymentsComponent from "@/views/pages/search-for-payments/terminal-monitoring/ui-quick-view-payments.vue";
@Options({
  components: { UiQuickViewPaymentsComponent },
  name: "TerminalMonitoringPageComponent",
})
export default class TerminalMonitoringPageComponent extends Vue {
  Search: Search = new Search();
  contentTable!: ContentTableComponent;
  filter: GetListRequest<PaymentsListRequest> = {
    _page: 1,
    _perPage: 50,
  };
  PaymentForQuickView: PaymentsDetailItem;
  PaymentStatus = PaymentStatus;
  NumbeRecords = NumbeRecords;
  StatusDateType = StatusDateType;
  PosType: Array<any> = [];
  PosPaymentType: Array<any> = [];
  ShowTable: boolean = false;
  showDetail: boolean = false;
  testClick: boolean = false;
  wrong: boolean = false;
  wrongText: string = "";

  async created() {
    //модель в Model class
    this.Search = new Search();
    this.PosType = await this.$initService.state.GetPosType();
    this.PosPaymentType = await this.$initService.state.GetPosPaymentType();
  }
  mounted() {
    this.contentTable = this.$refs.contentTable as ContentTableComponent;
  }
  async ShowDetail(data: PaymentsDetailItem) {
    this.PaymentForQuickView = data;
    if (!this.showDetail) this.showDetail = true;
    let self = this;
    setTimeout(function () {
      if (self.showDetail) self.testClick = true;
    }, 300);
  }
  hideDetail() {
    this.showDetail = false;
  }
  onBlur() {
    if (this.testClick) {
      this.testClick = false;
      this.showDetail = false;
    }
  }
  FieldValidation() {
    this.wrong = true;
    this.wrongText = "";
    // проверка на заполенные поля
    // if (this.Search.EnterpriseId == null) this.wrongText = "Выберите субагента";
    // if (this.Search.PosTypeId == null)
    //   this.wrongText = "Выберите тип терминалаа";
    // if (this.Search.GatewayId == null) this.wrongText = "Выберите шлюз";
    // if (this.Search.OperatorId == null) this.wrongText = "Выберите оператора";
    // if (this.Search.posPaymentType == null)
    //   this.wrongText = "Выберите тип оплаты";
    if (this.wrongText != "") return false;
    this.wrong = false;
    return true;
  }
  async onInputRange(value: any) {
    this.Search.fromDate = value.firstData;
    this.Search.toDate = value.SecondData;
  }
  ClearForm() {
    this.Search = new Search();
  }
  async showTable() {
    //переменная флаг для показа таблицы
    if (!this.FieldValidation()) {
      return;
    }
    // нужно доделать 2 нажатие кнопки
    this.searchPayments();
    this.ShowTable = true;
    this.contentTable = this.$refs.contentTable as ContentTableComponent;
    if (this.contentTable) {
      this.searchPayments();
      this.contentTable.onChangeFilter();
    }
    // console.log("document", document.body.offsetHeight);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    // let element = document.getElementById("scroll").clientWidth;
    // this.$filterService.ScrollToElement(element);
  }
  async Table() {
    return await this.$api.PaymentsService.getList(this.filter);
  }
  searchPayments() {
    this.filter._filters = {
      EnterpriseId: this.Search.EnterpriseId,
      PosTypeId: this.Search.PosTypeId,
      OperatorId: this.Search.OperatorId,
      PaymentTypeId: this.Search.posPaymentType,
      DateEnd: this.Search.toDate.getTimeSet(),
      DateStart: this.Search.fromDate.getTimeSet(),
      StatusDateTypeId: this.Search.StatusDateTypeId,
      StatusId: this.Search.StatusId,
      OnlyTranCopies: this.Search.OnlyTranCopies,
      Phone: this.$filterService.СheckNullString(this.Search.phoneNumber),
      Id: this.Search.idInSystem != null ? this.Search.idInSystem : undefined,
      Note: this.$filterService.СheckNullString(this.Search.Note),
      IdN4Check: this.Search.IdN4Check, //this.$filterService.СheckNull(this.Search.IdN4Check),
      IdOperator: this.Search.IdOperator, //this.$filterService.СheckNull(this.Search.IdOperator),
      IdFiscal: this.Search.IdFiscal, //this.$filterService.СheckNull(this.Search.IdFiscal),
      GatewayId: this.Search.GatewayId, // this.$filterService.СheckNull(this.Search.GatewayId),
      PosCode: this.Search.PosCode, //this.$filterService.СheckNull(this.Search.PosCode),
    };
  }

  async GetSybAgent(search?: string) {
    return await this.$api.EnterpriseService.getList({
      _filters: { Name: search },
      _page: 1,
      _perPage: 6,
    });
  }
  async GetShops(search?: string) {
    return await this.$api.ShopService.getList({
      _filters: { Name: search },
      _page: 1,
      _perPage: 6,
    });
  }
  async GetPoint(search?: string) {
    if (this.Search.ShopId !== null)
      return await this.$api.PointOfSalesService.getList({
        _filters: {
          ShopId: this.Search.ShopId,
          ShopPosCodeList:
            search != null && search.length > 0 ? [search] : undefined,
        },
        _page: 1,
        _perPage: 6,
      });
  }
  async GetOperators(search?: string) {
    return await this.$api.OperatorService.getList({
      _filters: { Name: search },
      _page: 1,
      _perPage: 6,
    });
  }
  async Gateway(search?: string) {
    return await this.$api.GetewayService.getList({
      _filters: { Name: search },
      _page: 1,
      _perPage: 6,
    });
  }
  GetLocedClasses(data: any) {
    return {
      green: data.Status == 7,
      red: data.Status == 10,
      yellow: data.Status == 5,
      black: data.Status == 103,
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
.yellow {
  background: #fffdc8 !important;
}
.red {
  background: #ffe7e5 !important;
}
.green {
  background: #e0ffd1 !important;
}
.black {
  background: #efefef !important;
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
