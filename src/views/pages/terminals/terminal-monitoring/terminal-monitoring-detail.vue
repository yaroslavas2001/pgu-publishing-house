<template>
  <div class="mcw">
    <div class="center">
      <div class="block w-70">
        <div class="block-title"><b> Мониторинг терминалов</b></div>
        <div class="block-body">
          <div class="panel-body row">
            <div class="form-log">
              <table>
                <tr>
                  <th>Точка</th>
                  <td>
                    {{ PointOfSales }}
                  </td>
                </tr>
                <tr>
                  <th>Магазин</th>
                  <td>{{ ShopName }}</td>
                </tr>
                <tr>
                  <th>Субагент</th>
                  <td>{{ EnterpriseName }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="block w-70">
        <page-template>
          <template #header>
            <div class="table-title">
              История состояний c
              <span>{{ $filterService.formatDate(FromDatSstateHistory) }}</span>
              по
              <span>{{ $filterService.formatDate(ToDatSstateHistory) }}</span>
            </div>
            <ui-datetime-range-picker
              @inputRage="onInputRangeSstateHistory"
              v-model:fromDate="FromDatSstateHistory"
              v-model:toDate="ToDatSstateHistory"
            />
          </template>
          <template #body>
            <p>
              Обязательн отображаются 5 последний состояний. Более раниие
              отображаются только при существенных именениях состояния.
              Отображаются не более 50 состояний не более чем за 30 дней от
              последнего состояния.
            </p>
            <div class="table">
              <content-table
                templateColumns="35px 30px 1fr 1fr 1fr 1fr 1fr 1fr"
                :getDataFunc="StateHistory"
                :filter="StateFilter"
                ref="contentTableStateHistory"
                :showPaginationOutside="false"
              >
                <template #header>
                  <ui-table-header-item class="table-search">
                  </ui-table-header-item>
                  <ui-table-header-item class="table-rate">
                  </ui-table-header-item>
                  <ui-table-header-item> Дата</ui-table-header-item>
                  <ui-table-header-item> Купюрник</ui-table-header-item>
                  <ui-table-header-item>
                    Не принято купрюр (%)
                  </ui-table-header-item>
                  <ui-table-header-item>
                    Диспенсер верхняя кассета
                  </ui-table-header-item>
                  <ui-table-header-item>
                    Диспенсер нижняя кассета
                  </ui-table-header-item>
                  <ui-table-header-item> Состояние</ui-table-header-item>
                </template>
                <template #default="data">
                  <ui-table-body-item class="img_center pointer">
                    <ui-title-info>
                      <img src="@assets/img/table/search.svg" alt="search" />
                      <template #hidden>
                        <table class="hidden__table">
                          <tr>
                            <th>Субагент:</th>
                            <td>
                              {{ data.PointOfSales.Shop.Enterprise.Name }}
                            </td>
                          </tr>
                          <tr>
                            <th>Код точки:</th>
                            <td>{{ data.PointOfSales.ShopPosCode }}</td>
                          </tr>
                          <tr>
                            <th>Адрес точки:</th>
                            <td>{{ data.PointOfSales.CalculatedAddress }}</td>
                          </tr>
                          <tr>
                            <th>Свободное место (Mb): C:</th>
                            <td>
                              {{ data.DiskFreeSpaces[0].volume }}
                              <strong>D: </strong>
                              {{ data.DiskFreeSpaces[0].Value }}
                            </td>
                          </tr>
                          <tr>
                            <th>Запуск N4App:</th>
                            <td>
                              {{ $filterService.formatDateAll(data.LastStart) }}
                            </td>
                          </tr>
                        </table>
                      </template>
                    </ui-title-info>
                  </ui-table-body-item>
                  <ui-table-body-item class="pointer">
                    <ui-title-info>
                      {{ data.PointOfSales.Rssi }}

                      <template #hidden>
                        <div class="red" v-if="data.PointOfSales.Rssi < -105">
                          слабый(GSM)
                        </div>
                        <div
                          v-if="
                            data.PointOfSales.Rssi < -85 &&
                            data.PointOfSales.Rssi > -105
                          "
                        >
                          средний (GSM)
                        </div>
                        <div class="green" v-if="data.PointOfSales.Rssi > -85">
                          сильный(GSM)
                        </div>
                        <div class="green" v-if="data.PointOfSales.Rssi >= 0">
                          (WIFI)
                        </div>
                      </template>
                    </ui-title-info>
                  </ui-table-body-item>
                  <ui-table-body-item>
                    {{ $filterService.formatDateAll(data.Date) }}
                  </ui-table-body-item>
                  <ui-table-body-item>
                    {{ data.CashinnerState }}
                  </ui-table-body-item>
                  <ui-table-body-item>
                    {{ data.RejectPercent }}
                  </ui-table-body-item>
                  <ui-table-body-item>
                    {{ data.DispencerCashOut1 }}
                  </ui-table-body-item>
                  <ui-table-body-item>
                    {{ data.DispencerCashOut2 }}
                  </ui-table-body-item>
                  <ui-table-body-item>
                    {{ data.CalculatedState }}
                  </ui-table-body-item>
                </template>
              </content-table>
            </div>
          </template>
          <template #footer>
            <div class="row">
              <div class="col-9">
                <button
                  class="btn btn-success mr-1"
                  @click="SearchStatusHistory"
                >
                  Установить фильтр
                </button>
              </div>
              <div class="col-3 text-right">
                <button class="btn btn-default pr-3" @click="newFunctional">
                  Выгрузить в excel
                </button>
              </div>
            </div>
          </template>
        </page-template>
      </div>
      <div class="block w-70">
        <page-template>
          <template #header>
            <div class="table-title">
              История платежей к
              <span>{{ $filterService.formatDate(DatePaymentsHistory) }}</span>
            </div>
            <ui-one-datatime-picker
              v-model="DatePaymentsHistory"
              dateFormat="DD.MM.YYYY"
              :isShowClock="false"
            />
          </template>
          <template #body>
            <p>
              Показаны последние 10 запросов от точки, если среди них нет
              подтвержденных, то последний подтвержденный найден и выделен
              жирным шрифтом.
            </p>
            <div class="table">
              <content-table
                templateColumns="1fr 1fr 1fr 1fr 1fr 1fr 1fr"
                :getDataFunc="PaymentsHistory"
                :filter="PaymentsHistoryFilter"
                ref="contentTablePaymentsHistory"
                :showPaginationOutside="false"
              >
                <template #header>
                  <ui-table-header-item>ID</ui-table-header-item>
                  <ui-table-header-item> Дата на точке</ui-table-header-item>
                  <ui-table-header-item>Телефон</ui-table-header-item>
                  <ui-table-header-item>Сумма</ui-table-header-item>
                  <ui-table-header-item> Оператор</ui-table-header-item>
                  <ui-table-header-item> Код ошибки</ui-table-header-item>
                  <ui-table-header-item> Статус платежа</ui-table-header-item>
                </template>
                <template #default="data">
                  <ui-table-body-item :class="GetLocedClasses(data)">
                    {{ data.Id }}
                  </ui-table-body-item>
                  <ui-table-body-item :class="GetLocedClasses(data)">
                    {{ $filterService.formatDateAll(data.TransactionDate) }}
                  </ui-table-body-item>
                  <ui-table-body-item :class="GetLocedClasses(data)">
                    {{ data.Phone }}
                  </ui-table-body-item>
                  <ui-table-body-item :class="GetLocedClasses(data)">
                    {{ data.Summa }}
                  </ui-table-body-item>
                  <ui-table-body-item :class="GetLocedClasses(data)">
                    {{ data.Operator.Name }}
                  </ui-table-body-item>
                  <ui-table-body-item :class="GetLocedClasses(data)">
                    {{ data.RequestErrorDescription }}
                  </ui-table-body-item>
                  <ui-table-body-item :class="GetLocedClasses(data)">
                    {{ data.StatusName }}
                  </ui-table-body-item>
                </template>
              </content-table>
            </div>
          </template>
          <template #footer>
            <div class="row">
              <div class="col-9">
                <button
                  class="btn btn-success mr-1"
                  @click="SearchPaymentsHistory"
                >
                  Установить фильтр
                </button>
              </div>
              <div class="col-3 text-right">
                <button class="btn btn-default pr-3" @click="newFunctional">
                  Выгрузить в excel
                </button>
              </div>
            </div>
          </template>
        </page-template>
      </div>
      <div class="block w-70">
        <div class="block-title">Ответственный за терминал</div>
        <div class="block-body">
          <div class="panel-body row">
            <div class="form-log">
              <table>
                <tr>
                  <th>ФИО, email</th>
                  <td>
                    {{ ResponsibleModel.FullName + ResponsibleModel.Email }}
                  </td>
                </tr>
                <tr>
                  <th>Катеория</th>
                  <td>{{ ResponsibleModel.UserType.Name }}</td>
                </tr>
                <tr>
                  <th>Телефон</th>
                  <td>{{ ResponsibleModel.Phone }}</td>
                </tr>
                <tr>
                  <th>Примечание</th>
                  <td>{{ ResponsibleModel.Notes }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="block w-70">
        <page-template>
          <template #header>
            <div class="table-title">История статусов</div>
          </template>
          <template #body>
            <p>
              Отображаются все статусы точек с текущим серийным нормером
              терминала
            </p>
            <div class="table">
              <content-table
                templateColumns="1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
                :getDataFunc="StatusHistory"
                :filter="StatusHistoryFilter"
                :showPaginationOutside="false"
              >
                <template #header>
                  <ui-table-header-item>ID</ui-table-header-item>
                  <ui-table-header-item> Сер. №</ui-table-header-item>
                  <ui-table-header-item>Дата изм.</ui-table-header-item>
                  <ui-table-header-item>Статус</ui-table-header-item>
                  <ui-table-header-item> Тех. состояние</ui-table-header-item>
                  <ui-table-header-item>Субагент</ui-table-header-item>
                  <ui-table-header-item> Магазин</ui-table-header-item>
                  <ui-table-header-item> Адрес</ui-table-header-item>
                </template>
                <template #default="data">
                  <ui-table-body-item>
                    {{ data.Id }}
                  </ui-table-body-item>
                  <ui-table-body-item>
                    {{ data.Serial }}
                  </ui-table-body-item>
                  <ui-table-body-item>
                    {{ data.UpdateDate }}
                  </ui-table-body-item>
                  <ui-table-body-item>
                    {{ data.StateDescr }}
                  </ui-table-body-item>
                  <ui-table-body-item
                    >{{ data.TerminalStateComment }}
                  </ui-table-body-item>
                  <ui-table-body-item>
                    {{ data.Enterprise }}
                  </ui-table-body-item>
                  <ui-table-body-item>
                    {{ data.ShopCode }}
                  </ui-table-body-item>
                  <ui-table-body-item>
                    {{ data.Adress }}
                  </ui-table-body-item>
                </template>
              </content-table>
            </div>
          </template>
          <template #footer>
            <div class="row">
              <div class="col-3 text-right">
                <button class="btn btn-default pr-3" @click="newFunctional">
                  Выгрузить в excel
                </button>
              </div>
            </div>
          </template>
        </page-template>
      </div>
      <button class="btn btn-success" @click="GoToHome">К таблице</button>
    </div>
  </div>
</template>
<script lang="ts">
import ContentTableComponent from "@/views/components/content-table.vue";
import { Options, Vue, Prop } from "vue-property-decorator";
import { TERMINALMONITORINGTERMINALDETAIL } from "@/router/routerNames";
import ShopMapper from "@/maper-service/ShopDetailMaper";
import ShopDetailMapper from "@/api/dataSource/api/plugins/models/mapModel/shop/ShopDetailMaperModel";
import moment from "moment";
import GetListRequest from "@/api/dataSource/api/plugins/models/getListRequest";
import StateHistoryListRequest from "@/api/dataSource/api/plugins/models/controllersModels/pointOfSalesMonitoring/StateHistory/StateHistoryListRequest";
import PaymentsHistoryListRequest from "@/api/dataSource/api/plugins/models/controllersModels/pointOfSalesMonitoring/PaymentsHistory/PaymentsHistoryListRequest";
import ResponsibleModel from "@/models/class/responsible";
import StatusHistoryListReuest from "@/api/dataSource/api/plugins/models/controllersModels/pointOfSalesMonitoring/StatusHistory/StatusHistoryListReuest";
@Options({
  components: { ShopDetailMapper, ShopMapper },
  name: "TerminalDetailsPageComponent",
})
export default class TerminalDetailsPageComponent extends Vue {
  @Prop({ type: String }) id?: string;
  ResponsibleModel = new ResponsibleModel();
  contentTableStateHistory!: ContentTableComponent;
  contentTablePaymentsHistory!: ContentTableComponent;
  TerminalPage = TERMINALMONITORINGTERMINALDETAIL;
  TerminalDetails: ShopDetailMapper = new ShopDetailMapper();
  StateFilter: GetListRequest<StateHistoryListRequest> = {
    _page: 1,
    _perPage: 10,
    _filters: {
      Id: Number(this.id),
    },
  };
  StatusHistoryFilter: GetListRequest<StatusHistoryListReuest> = {
    _page: 1,
    _perPage: 10,
    _filters: {
      Id: Number(this.id),
    },
  };
  PaymentsHistoryFilter: GetListRequest<PaymentsHistoryListRequest> = {
    _page: 1,
    _perPage: 10,
    _filters: {
      ShopPosCode: "",
    },
  };
  PointOfSales: string = null;
  EnterpriseName: string = null;
  ShopName: string = null;
  CalculatedAddress: string = null;
  fromDate: Date = moment(
    moment(new Date()).format("YYYY-MM-DD 00:00")
  ).toDate();
  FromDatSstateHistory: Date = moment(
    moment(new Date().setDate(new Date().getDate() - 14)).format(
      "YYYY-MM-DD 00:00"
    )
  ).toDate();
  ToDatSstateHistory: Date = moment(
    moment(new Date()).format("YYYY-MM-DD 00:00")
  ).toDate();
  DatePaymentsHistory: Date = moment(
    moment(new Date().setDate(new Date().getDate() - 14)).format(
      "YYYY-MM-DD 00:00"
    )
  ).toDate();
  async created() {
    let res = await this.$api.PointOfSalesMonitoringService.GetResponsibleUsers(
      {
        _filters: {
          Id: Number(this.id),
        },
      }
    );
    if (res.Response.Items[0]) this.ResponsibleModel = res.Response.Items[0];
    let res2 = await this.$api.PointOfSalesMonitoringService.GetStateHistory(
      this.StateFilter
    );
    this.PointOfSales = res2.Response.Items[0].PointOfSales.ShopPosCode;
    this.EnterpriseName =
      res2.Response.Items[0].PointOfSales.Shop.Enterprise.Name;
    this.ShopName = res2.Response.Items[0].PointOfSales.Shop.Name;
    this.CalculatedAddress =
      res2.Response.Items[0].PointOfSales.CalculatedAddress;
    this.PaymentsHistoryFilter._filters.ShopPosCode = this.PointOfSales;
  }
  async mounted() {
    this.contentTableStateHistory = this.$refs
      .contentTableStateHistory as ContentTableComponent;
    this.contentTablePaymentsHistory = this.$refs
      .contentTablePaymentsHistory as ContentTableComponent;
  }
  //StateHistory
  async StateHistory() {
    return await this.$api.PointOfSalesMonitoringService.GetStateHistory(
      this.StateFilter
    );
  }
  SearchStatusHistory() {
    this.StateFilter._filters = {
      Id: Number(this.id),
      DateStart: this.FromDatSstateHistory.getTimeSet(),
      DateEnd: this.ToDatSstateHistory.getTimeSet(),
    };
    this.contentTableStateHistory = this.$refs
      .contentTableStateHistory as ContentTableComponent;
    if (this.contentTableStateHistory) {
      this.contentTableStateHistory.onChangeFilter();
    }
  }
  onInputRangeSstateHistory(data: any) {
    this.FromDatSstateHistory = data.firstData;
    this.ToDatSstateHistory = data.SecondData;
  }
  async PaymentsHistory() {
    return await this.$api.PointOfSalesMonitoringService.GetPaymentsHistory(
      this.PaymentsHistoryFilter
    );
  }
  SearchPaymentsHistory() {
    this.PaymentsHistoryFilter._filters.DateStart =
      this.DatePaymentsHistory.getTimeSet();
    this.contentTablePaymentsHistory = this.$refs
      .contentTablePaymentsHistory as ContentTableComponent;
    if (this.contentTablePaymentsHistory) {
      this.contentTablePaymentsHistory.onChangeFilter();
    }
  }
  async StatusHistory() {
    return await this.$api.PointOfSalesMonitoringService.GetStatusHistory({
      _filters: {
        Id: Number(this.id),
      },
    });
  }
  GoToHome() {
    //кнопка "к таблице"
    this.$router.push({ name: TERMINALMONITORINGTERMINALDETAIL });
  }
  newFunctional() {
    alert("Данный функционал пока не доступен");
  }
  async GetEnterprise() {
    const res = await this.$api.EnterpriseService.getList({});
    return res.Response.Items.map((x) => {
      return { Id: x.Id, Name: x.Name };
    });
  }
  async GetSybAgent(search?: string) {
    return await this.$api.EnterpriseService.getList({
      _filters: { Name: search },
      _page: 1,
      _perPage: 6,
    });
  }
  async GetAgent(search?: string) {
    return await this.$api.UserService.GetUsersList({
      _filters: { Name: search, GroupName: "ShopAgent" },
      _page: 1,
      _perPage: 6,
    });
  }
  async GetRepresantative(search?: string) {
    return await this.$api.UserService.GetUsersList({
      _filters: { Name: search, GroupName: "ShopRepresantative" },
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
<style lang="less">
.requiredSelect > .current-block > .current {
  border: 1px solid red !important;
}
.required > input {
  border-color: red !important;
}
.wrong {
  color: red;
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
.table {
  background: white;
  width: 100%;
  // padding: 10px 50px 30px 50px;
  margin-top: 20px;
  border-radius: 8px;
}
.img_center {
  display: flex;
  justify-content: center !important;
}
.table-search,
.table-rate {
  height: 100% !important;
  width: 100% !important;
}
.btn-default {
  font-size: 12px;
  padding: 12px 25px;
}
</style>
