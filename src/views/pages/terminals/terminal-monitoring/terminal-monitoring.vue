<template>
  <div class="mcw">
    <div class="center">
      <div class="block w-70">
        <page-template>
          <template #header>
            <div class="table-title">
              <b> Мониторинг терминалов к </b>
              <span>
                {{ $filterService.formatDateAll(SearchTerminal.fromDate) }}
              </span>
            </div>
            <ui-one-datatime-picker
              v-model="SearchTerminal.fromDate"
              @update:modelValue="OnSelectDate"
            />
          </template>
          <template #body>
            <div class="row row-50">
              <div class="col-6">
                <div class="form-group">
                  <label for="Enterprise">Субагент</label>
                  <ui-autocomplete
                    v-model="SearchTerminal.EnterpriseId"
                    class="mb-2"
                    id="Enterprise"
                    keyField="Id"
                    valueField="Name"
                    noUndefined="true"
                    :SearchAsyncFunc="GetSybAgent"
                    defaultText="(все)"
                  />
                  <!-- @update:modelValue="OnSelectSpecialization" -->
                </div>
                <div class="form-group">
                  <label for="Enterprise">Магазины</label>
                  <ui-autocomplete
                    v-model="SearchTerminal.ShopId"
                    class="mb-2"
                    id="Enterprise"
                    keyField="Id"
                    valueField="Name"
                    noUndefined="true"
                    :SearchAsyncFunc="GetShops"
                    defaultText="(все)"
                  />
                  <!--@update:modelValue="OnSelectSpecialization" -->
                </div>
                <div class="form-group" v-if="SearchTerminal.ShopId == null">
                  <ui-label-input
                    nameLabel="Код точки"
                    placeholder="Введите код"
                    v-model="SearchTerminal.PosCode"
                    id="Point"
                  />
                </div>
                <div class="form-group" v-if="SearchTerminal.ShopId != null">
                  <label for="Point">Код точки</label>
                  <ui-autocomplete
                    v-model="SearchTerminal.PosCode"
                    class="mb-2"
                    v-if="SearchTerminal.ShopId != null"
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
                    v-model="SearchTerminal.PosTypeId"
                    class="mb-2"
                    defaultText="(все)"
                    label="Тип терминала"
                  />
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <ui-select-label
                    :items="PointOfSalesMonitoringStatus"
                    keyField="Id"
                    valueField="Name"
                    v-model="SearchTerminal.StateId"
                    class="mb-2"
                    defaultText="(все)"
                    label="Состояние"
                  />
                </div>
                <div class="form-group">
                  <ui-select-label
                    :items="PointOfSalesMonitoringPosStateId"
                    keyField="Id"
                    valueField="Name"
                    v-model="SearchTerminal.PosStateId"
                    class="mb-2"
                    defaultText="(все)"
                    label="Статус точки"
                    noUndefined="true"
                    required
                  />
                </div>
                <div class="form-group">
                  <ui-select-label
                    :items="kioskСonditionItems"
                    keyField="Id"
                    valueField="Name"
                    v-model="SearchTerminal.TerminalStatusId"
                    class="mb-2"
                    defaultText="(все)"
                    label="Статус терминала"
                  />
                </div>
              </div>
            </div>
          </template>
          <template #footer>
            <div class="row">
              <div class="col-6">
                <button class="btn btn-success" @click="showTable">
                  Установить фильтр
                </button>
              </div>
              <div class="col-6 text-right">
                <button class="btn btn-default" @click="Today">
                  Текущее время
                </button>
              </div>
            </div>
          </template>
        </page-template>
      </div>
      <div id="scroll"></div>
      <div class="table" v-if="ShowTable">
        <content-table
          templateColumns="min-content 30px 30px 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
          :getDataFunc="Table"
          :filter="filter"
          ref="contentTable"
        >
          <template #header>
            <ui-table-header-item></ui-table-header-item>
            <ui-table-header-item class="table-search"> </ui-table-header-item>
            <ui-table-header-item class="table-rate"> </ui-table-header-item>

            <run-pay-ui-header
              sortName="EnterpriseName"
              :filter="filter"
              @onSort="onSort"
              >Субагент</run-pay-ui-header
            >
            <run-pay-ui-header
              sortName="ShopName"
              :filter="filter"
              @onSort="onSort"
              >Магазин</run-pay-ui-header
            >
            <run-pay-ui-header
              sortName="ShopPosCode"
              :filter="filter"
              @onSort="onSort"
              >Код точки</run-pay-ui-header
            >
            <!-- <run-pay-ui-header
              sortName="CalcStateId"
              :filter="filter"
              @onSort="onSort"
              >Состояния
              </run-pay-ui-header> -->
            <ui-table-header-item> Состояния</ui-table-header-item>
            <!-- <run-pay-ui-header
              sortName="Balance"
              :filter="filter"
              @onSort="onSort"
              >Баланс
              </run-pay-ui-header> -->
            <ui-table-header-item> Баланс</ui-table-header-item>
            <!-- <run-pay-ui-header
              sortName="PrinterState"
              :filter="filter"
              @onSort="onSort"
              >Принтер
              </run-pay-ui-header> -->
            <ui-table-header-item> Принтер</ui-table-header-item>
            <!-- <run-pay-ui-header
              sortName="CashinerState"
              :filter="filter"
              @onSort="onSort"
              >Купюрник</run-pay-ui-header
            > -->
            <ui-table-header-item> Купюрник</ui-table-header-item>
          </template>
          <template #default="data">
            <ui-table-body-item class="pointer">
              <router-link
                :to="{ name: DetailTerminal, params: { id: data.Id } }"
              >
                [...]
              </router-link>
              <!-- [...]  @click="newFunction"-->
            </ui-table-body-item>
            <ui-table-body-item class="img_center pointer pr-1 pl-1">
              <ui-title-info>
                <img src="@assets/img/table/search.svg" alt="search" />

                <template #hidden>
                  <table class="hidden__table">
                    <tr>
                      <th>Субагент:</th>
                      <td>{{ data.PointOfSales.Shop.Enterprise.Name }}</td>
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
            <ui-table-body-item @click="ShowDetail(data)" class="pointer">
              {{ data.PointOfSales.Shop.Enterprise.Name }}
            </ui-table-body-item>
            <ui-table-body-item @click="ShowDetail(data)" class="pointer">
              {{ data.PointOfSales.Shop.Name }}
            </ui-table-body-item>
            <ui-table-body-item @click="ShowDetail(data)" class="pointer">
              {{ data.PointOfSales.ShopPosCode }}
            </ui-table-body-item>
            <ui-table-body-item @click="ShowDetail(data)" class="pointer">
              {{ data.Balance }}
            </ui-table-body-item>
            <ui-table-body-item @click="ShowDetail(data)" class="pointer">
            </ui-table-body-item>
            <ui-table-body-item @click="ShowDetail(data)" class="pointer">
            </ui-table-body-item>
            <ui-table-body-item @click="ShowDetail(data)" class="pointer">
              {{ data.CashinnerState }}
            </ui-table-body-item>
          </template>
        </content-table>
      </div>
      <transition name="fade" appear>
        <div class="ui-quick-view uiQuickView" v-if="showDetail">
          <ui-quick-view-terminal-component
            v-model="TerminalForQuickView"
            @hideDetail="hideDetail"
            v-click-outside="onBlur"
          />
        </div>
      </transition>
    </div>
  </div>
</template>
<script lang="ts">
import PointOfSalesMonitoringListRequest from "@/api/dataSource/api/plugins/models/controllersModels/pointOfSalesMonitoring/PointOfSalesMonitoringListRequest";
import GetListRequest from "@/api/dataSource/api/plugins/models/getListRequest";
import ContentTableComponent from "@/views/components/content-table.vue";
import { TERMINALMONITORINGTERMINALDETAIL } from "@/router/routerNames";
import moment from "moment";
import SearchTerminal from "@/models/class/search-terminal";
import UiQuickViewTerminalComponent from "@/views/pages/terminals/terminal-monitoring/ui-quick-view-terminal.vue";
import { Options, Vue } from "vue-property-decorator";
import PointOfSalesMonitoringStatus from "@/dictionary-servise/PointOfSalesMonitoringStatus";
import PointOfSalesMonitoringPosStateId from "@/dictionary-servise/PointOfSalesMonitoringPosStateId";
import "@/extensions/getDateWithoutTime";
import PointOfSalesMonitoringListItem from "@/api/dataSource/api/plugins/models/controllersModels/pointOfSalesMonitoring/PointOfSalesMonitoringListItem";

@Options({
  components: { UiQuickViewTerminalComponent },
  name: "TerminalMonitoringPageComponent",
})
export default class TerminalMonitoringPageComponent extends Vue {
  SearchTerminal = new SearchTerminal();
  PosType: Array<any> = [];
  PointOfSalesMonitoringPosStateId = PointOfSalesMonitoringPosStateId;
  PointOfSalesMonitoringStatus = PointOfSalesMonitoringStatus;
  contentTable!: ContentTableComponent;
  DetailTerminal = TERMINALMONITORINGTERMINALDETAIL;
  kioskСonditionItems: Array<any> = [];
  showDetail: boolean = false;
  testClick: boolean = false;
  TerminalForQuickView: PointOfSalesMonitoringListItem;
  ShowTable: boolean = false;
  filter: GetListRequest<PointOfSalesMonitoringListRequest> = {
    _page: 1,
    _perPage: 10,
  };
  async created() {
    this.PosType = await this.$initService.state.GetPosType();
    this.kioskСonditionItems = (
      await this.$api.PointOfSalesService.GetTechStateList()
    ).Response;
  }
  mounted() {
    this.contentTable = this.$refs.contentTable as ContentTableComponent;
  }
  async ShowDetail(data: PointOfSalesMonitoringListItem) {
    this.TerminalForQuickView = data;
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
  Today() {
    this.SearchTerminal.fromDate = moment(
      moment(new Date()).format("YYYY-MM-DD 00:00")
    ).toDate();
  }
  searchTerminal() {
    this.filter._filters = {
      EnterpriseId: this.$filterService.СheckNull(
        this.SearchTerminal.EnterpriseId
      ),
      ShopId: this.$filterService.СheckNull(this.SearchTerminal.ShopId),
      PosTypeId: this.$filterService.СheckNull(this.SearchTerminal.PosTypeId),
      StateId: this.$filterService.СheckNull(this.SearchTerminal.StateId),
      PosStateId: this.SearchTerminal.PosStateId,
      TerminalStatusId: this.$filterService.СheckNull(
        this.SearchTerminal.TerminalStatusId
      ),
      DateStart: this.SearchTerminal.fromDate.getTimeSet(),
    };
  }
  onSort() {
    console.log("filter", this.contentTable);

    if (this.contentTable) this.contentTable.onChangeFilter();
  }
  async Table() {
    return await this.$api.PointOfSalesMonitoringService.getList(this.filter);
  }
  async showTable() {
    //переменная флаг для показа таблицы
    this.searchTerminal();
    this.ShowTable = true;
    this.contentTable = this.$refs.contentTable as ContentTableComponent;
    setTimeout(
      () =>
        (this.contentTable = this.$refs.contentTable as ContentTableComponent),
      300
    );
    if (this.contentTable) {
      this.searchTerminal();
      this.contentTable.onChangeFilter();
    }
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    // let element = document.getElementById("scroll").clientWidth;
    // this.$filterService.ScrollToElement(element);
  }
  OnSelectDate(data: Date) {
    this.SearchTerminal.fromDate = data;
  }
  async getList() {
    return await this.$api.PointOfSalesMonitoringService.getList(this.filter);
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
    if (this.SearchTerminal.ShopId !== null)
      return await this.$api.PointOfSalesService.getList({
        _filters: {
          ShopId: this.SearchTerminal.ShopId,
          ShopPosCodeList:
            search != null && search.length > 0 ? [search] : undefined,
        },
        _page: 1,
        _perPage: 6,
      });
  }
  // newFunction(){
  //   alert("Детальная терминалов находится в разработке");
  // }
}
</script>
<style scoped lang="less">
.table-search,
.table-rate {
  height: 100%;
  width: 100%;
}
.img_center {
  display: flex;
  justify-content: center !important;
}
.hidden__table {
  width: auto !important;
  tr {
    th {
      line-height: 0px;
    }
    td {
      line-height: 0px;
      border: 0px !important;
      padding: 0;
    }
  }
}
.table {
  background: white;
  width: 100%;
  padding: 10px 50px 30px 50px;
  margin-top: 20px;
  border-radius: 8px;
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
