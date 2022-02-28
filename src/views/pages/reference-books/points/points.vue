<template>
  <div class="mcw">
    <div class="center">
      <div class="block w-70">
        <page-template>
          <template #header>
            <div class="table-title"><b> Точки приема платежей </b></div>
          </template>
          <template #body>
            <div class="row row-50">
              <div class="col-6">
                <div class="form-group">
                  <label for="Enterprise">Субагент</label>
                  <ui-autocomplete
                    v-model="EnterpriseId"
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
                  <label for="Enterprise">Магазин</label>
                  <ui-autocomplete
                    v-model="ShopId"
                    class="mb-2"
                    id="Enterprise"
                    keyField="Id"
                    valueField="Name"
                    noUndefined="true"
                    :SearchAsyncFunc="GetShops"
                    defaultText="(все)"
                  />
                </div>
                <div class="form-group">
                  <ui-label-input
                    nameLabel="Код точки в магазине"
                    placeholder="Введите код точки в магазине"
                    v-model="pointCodeStore"
                    id="pointCodeStore"
                  />
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <ui-label-input
                    nameLabel="ID"
                    placeholder="Введите ID"
                    v-model="id"
                    id="id"
                    type="number"
                    class="mb-2"
                  />
                </div>
                <div class="form-group">
                  <label for="Region">Регион</label>
                  <ui-autocomplete
                    v-model="RegionId"
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
                  <ui-select-label
                    :items="kioskСonditionItems"
                    keyField="Id"
                    valueField="Name"
                    v-model="TerminalStateId"
                    class="mb-2"
                    label="Статус терминала"
                  />
                </div>
              </div>
            </div>
          </template>
          <template #footer>
            <div class="row">
              <div class="col-3">
                <button class="btn btn-success mr-3 mb-3" @click="createPoint">
                  Cоздать точку
                </button>
              </div>
              <div class="col-5">
                <button class="btn btn-info mb-3">
                  Экспорт конфигурации точек
                </button>
                <button class="btn btn-info">импорт конфигурации точек</button>
              </div>
              <div class="col-4 text-right">
                <button class="btn btn-default mb-3" @click="searchPoits">
                  Установить фильтр
                </button>
              </div>
            </div>
          </template>
        </page-template>
      </div>
      <div class="block w-70">
        <div class="block-body">
          <content-table
            templateColumns="min-content min-content 1fr 1fr 110px 1fr"
            :getDataFunc="getPointsAsync"
            :filter="filter"
            ref="contentTable"
          >
            <template #header>
              <ui-table-header-item></ui-table-header-item>
              <run-pay-ui-header
                sortName="Id"
                :filter="filter"
                @onSort="onSort"
              >
                ID
              </run-pay-ui-header>
              <run-pay-ui-header
                sortName="ShopPosCode"
                :filter="filter"
                @onSort="onSort"
              >
                Код точки в магазине
              </run-pay-ui-header>
              <run-pay-ui-header
                sortName="Shop.enterprise_id"
                :filter="filter"
                @onSort="onSort"
              >
                Субагент
              </run-pay-ui-header>
              <run-pay-ui-header
                sortName="ShopId"
                :filter="filter"
                @onSort="onSort"
              >
                Магазин
              </run-pay-ui-header>
              <run-pay-ui-header
                sortName="Address"
                :filter="filter"
                @onSort="onSort"
              >
                Адрес
              </run-pay-ui-header>
            </template>
            <template #default="data">
              <ui-table-body-item
                class="pointer"
                :class="GetLocedClasses(data)"
              >
                <router-link
                  :to="{ name: PointDetail, params: { id: data.Id } }"
                >
                  <ui-title-info>
                    [...]

                    <template #hidden>
                      <div>Подробнее Id:{{ data.Id }}</div>
                    </template>
                  </ui-title-info>
                </router-link>
              </ui-table-body-item>
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
                {{ data.ShopPosCode }}
              </ui-table-body-item>
              <ui-table-body-item
                class="pointer"
                :class="GetLocedClasses(data)"
                @click="ShowDetail(data)"
              >
                {{ data.Shop.Enterprise.Name }}
              </ui-table-body-item>
              <ui-table-body-item
                class="pointer"
                :class="GetLocedClasses(data)"
                @click="ShowDetail(data)"
              >
                {{ data.Shop.Name }}
              </ui-table-body-item>
              <ui-table-body-item
                class="pointer"
                :class="GetLocedClasses(data)"
                @click="ShowDetail(data)"
              >
                {{ data.CalculatedAddress }}
              </ui-table-body-item>
            </template>
          </content-table>
        </div>
      </div>
    </div>
    <transition name="fade" appear>
      <div class="ui-quick-view uiQuickView" v-if="showDetail">
        <ui-quick-view-point-component
          v-model="pointDetailItem"
          @hideDetail="hideDetail"
          v-click-outside="onBlur"
          @edit="editPoint"
          @duplicate="duplicatePoint"
          @delete="deletePoint"
          :wrongText="wrongText"
        />
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import PointListRequest from "@/api/dataSource/api/plugins/models/controllersModels/points/PointListRequest";
import GetListRequest from "@/api/dataSource/api/plugins/models/getListRequest";
import ContentTableComponent from "@/views/components/content-table.vue";
import { Options, Vue } from "vue-property-decorator";
import { POINTSDETAIL, POINTSCREATE } from "@/router/routerNames";
import UiQuickViewPointComponent from "@/views/pages/reference-books/points/ui-quick-view-point.vue";
import PointDetailMaperModel from "@/api/dataSource/api/plugins/models/mapModel/points/PointDetailMaperModel";
import PointMapper from "@/maper-service/PointDetailMaper";
@Options({
  components: { UiQuickViewPointComponent },
  name: "PointsPageComponent",
})
export default class PointsPageComponent extends Vue {
  pointCodeStore: string = "";
  TerminalStateId: number = null;
  kioskСonditionItems: Array<any> = [];
  PointDetail = POINTSDETAIL;
  id: number = null;
  EnterpriseId: number = null;
  contentTable!: ContentTableComponent;
  getPointsAsync: Function = this.getList;
  filter: GetListRequest<PointListRequest> = {
    _page: 1,
    _perPage: 10,
  };
  wrongText: string = null;

  pointDetailItem: PointDetailMaperModel = null;
  ShopId: number = null;
  showDetail: boolean = false;
  testClick: boolean = false;
  RegionId: number = null;
  editPoint(id: number) {
    this.$router.push({ name: this.PointDetail, params: { id: id } });
  }
  duplicatePoint(id: number) {
    this.$router.push({
      name: this.PointDetail,
      params: { id: id },
      query: { duubl: "true" },
    });
  }
  async deletePoint(id: number) {
    //вывести ответ по удалению в окно
    var dialog = await this.$dialog.confirm(
      "Вы действительно хотите удалить точку " +
        this.pointDetailItem.Name +
        " ?"
    );
    if (dialog) {
      let res = await this.$api.PointOfSalesService.delete(Number(id));
      if (!res.IsSuccess) this.wrongText = res.ErrorInfo.title;
      else {
        this.hideDetail();
        if (this.contentTable) this.contentTable.fetchData();
      }
    }
  }
  async created() {
    this.kioskСonditionItems = await this.$initService.state.GetTechStateList();
  }
  mounted() {
    this.contentTable = this.$refs.contentTable as ContentTableComponent;
  }
  async ShowDetail(data: any) {
    let res = await this.$api.PointOfSalesService.getOne(data.Id);
    this.pointDetailItem = PointMapper.fromServerModel(res.Response);
    if (!this.showDetail) {
      this.wrongText = "";
      this.showDetail = true;
    }
    let self = this;
    setTimeout(function () {
      if (self.showDetail) self.testClick = true;
    }, 300);
  }
  hideDetail() {
    this.showDetail = false;
  }
  onBlur() {
    // if (this.testClick) {
    //   this.testClick = false;
    //   this.showDetail = false;
    // }
  }
  async getList() {
    return await this.$api.PointOfSalesService.getList(this.filter);
  }
  createPoint() {
    this.$router.push({ name: POINTSCREATE });
  }
  async onSort() {
    if (this.contentTable) this.contentTable.onChangeFilter();
  }
  searchPoits() {
    this.filter._filters = {
      ShopId: this.$filterService.СheckNull(this.ShopId),
      EnterpriseId: this.$filterService.СheckNull(this.EnterpriseId),
      RegionId: this.$filterService.СheckNull(this.RegionId),
      ShopPosCodeList:
        this.pointCodeStore == null || this.pointCodeStore.length == 0
          ? undefined
          : [this.pointCodeStore],
      IdList: this.id == null ? undefined : [this.id],
      TerminalStateId: this.$filterService.СheckNull(this.TerminalStateId),
    };
    if (this.contentTable) this.contentTable.onChangeFilter();
  }
  async GetShops(search?: string) {
    return await this.$api.ShopService.getList({
      _filters: { Name: search },
      _page: 1,
      _perPage: 6,
    });
  }
  async GetSybAgent(search?: string) {
    return await this.$api.EnterpriseService.getList({
      _filters: { Name: search },
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
  GetLocedClasses(data: any) {
    return {
      locked: data.State == 2,
    };
  }
}
</script>
<style scoped>
.locked {
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
