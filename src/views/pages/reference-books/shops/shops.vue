<template>
  <div class="mcw">
    <div class="center">
      <div class="block w-70">
        <page-template>
          <template #header>
            <div class="table-title"><b> Фильтр магазинов </b></div>
          </template>
          <template #body>
            <div class="col-7 pl-0">
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
                <ui-label-input
                  nameLabel="Код"
                  placeholder="Введите код"
                  v-model="code"
                  id="code"
                  class="mb-2"
                />
              </div>
              <div class="form-group">
                <label for="GetSybAgent">Субагент</label>
                <ui-autocomplete
                  v-model="EnterpriseId"
                  id="GetSybAgent"
                  keyField="Id"
                  valueField="Name"
                  noUndefined="true"
                  :SearchAsyncFunc="GetSybAgent"
                  defaultText="(все)"
                  class="mb-2"
                />
              </div>
              <div class="form-group">
                <ui-label-input
                  nameLabel="Наименование"
                  placeholder="Введите наименование"
                  v-model="Name"
                  id="Name"
                />
              </div>
            </div>
          </template>
          <template #footer>
            <div class="row">
              <div class="col-6">
                <button class="btn btn-success" @click="createShop">
                  Cоздать магазин
                </button>
              </div>
              <div class="col-6 text-right">
                <button class="btn btn-default" @click="searchShop">
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
            templateColumns="min-content min-content 1fr 1fr 1fr 1fr"
            :getDataFunc="getShopsAsync"
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
                sortName="Code"
                :filter="filter"
                @onSort="onSort"
              >
                Код
              </run-pay-ui-header>
              <run-pay-ui-header
                sortName="Name"
                :filter="filter"
                @onSort="onSort"
              >
                Наименование
              </run-pay-ui-header>
              <ui-table-header-item>Субагент</ui-table-header-item>
              <ui-table-header-item>Тип взаиморасчета</ui-table-header-item>
            </template>
            <template #default="data">
              <ui-table-body-item
                class="pointer"
                :class="GetLocedClasses(data)"
              >
                <router-link
                  :to="{ name: ShopDetail, params: { id: data.Id } }"
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
                {{ data.Code }}
              </ui-table-body-item>
              <ui-table-body-item
                class="pointer"
                :class="GetLocedClasses(data)"
                @click="ShowDetail(data)"
              >
                {{ data.Name }}
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
                <div v-if="data.BillingType == 0">Кредитный</div>
                <div v-if="data.BillingType == 1">Авансовый</div>
              </ui-table-body-item>
            </template>
          </content-table>
        </div>
      </div>
    </div>
    <transition name="fade" appear>
      <div class="ui-quick-view uiQuickView" v-if="showDetail">
        <ui-quick-view-shop-component
          v-model="ShopForQuickView"
          @hideDetail="hideDetail"
          v-click-outside="onBlur"
          @edit="editShop"
          @duplicate="duplicateShop"
          @delete="deleteShop"
          :wrongText="wrongText"
        />
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import ShopListRequest from "@/api/dataSource/api/plugins/models/controllersModels/shops/ShopListRequest";
import GetListRequest from "@/api/dataSource/api/plugins/models/getListRequest";
import ContentTableComponent from "@/views/components/content-table.vue";
import { Options, Vue } from "vue-property-decorator";
import { SHOPSDETAIL, SHOPSCREATE } from "@/router/routerNames";
import UiQuickViewShopComponent from "@/views/pages/reference-books/shops/ui-quick-view-shop.vue";
import ShopDetailItem from "@/api/dataSource/api/plugins/models/controllersModels/shops/ShopDetailItem";
import ShopDetailMapper from "@/api/dataSource/api/plugins/models/mapModel/shop/ShopDetailMaperModel";
import ShopMapper from "@/maper-service/ShopDetailMaper";
@Options({
  components: { UiQuickViewShopComponent },
  name: "ShopsPageComponent",
})
export default class ShopsPageComponent extends Vue {
  contentTable!: ContentTableComponent;
  ShopDetail = SHOPSDETAIL;
  id: number = null;
  code: string = null;
  Name: string = null;
  EnterpriseId: number = null;
  getShopsAsync: Function = null;
  filter: GetListRequest<ShopListRequest> = {
    _page: 1,
    _perPage: 10,
  };
  testSortName = "";
  wrongText: string = null;
  shopDetailItem: ShopDetailItem = {};
  ShopForQuickView: ShopDetailMapper;
  SybAgent: number = null;
  showDetail: boolean = false;
  testClick: boolean = false;
  async deleteShop(id: number) {
    var dialog = await this.$dialog.confirm(
      "Вы действительно хотите удалить магазин " +
        this.ShopForQuickView.Name +
        " ?"
    );
    if (dialog) {
      let res = await this.$api.ShopService.delete(Number(id));
      if (!res.IsSuccess) this.wrongText = res.ErrorInfo.title;
      else {
        this.hideDetail();
        if (this.contentTable) this.contentTable.fetchData();
      }
    }
  }
  duplicateShop(id: number) {
    this.$router.push({
      name: SHOPSDETAIL,
      params: { id: id },
      query: { duubl: "true" },
    });
  }
  editShop(id: number) {
    this.$router.push({ name: SHOPSDETAIL, params: { id: id } });
  }
  async created() {
    this.getShopsAsync = this.getList;
  }
  mounted() {
    this.contentTable = this.$refs.contentTable as ContentTableComponent;
  }
  async getList() {
    return await this.$api.ShopService.getList(this.filter);
  }
  async ShowDetail(data: ShopDetailItem) {
    let res = await this.$api.ShopService.getOne(data.Id);
    this.ShopForQuickView = ShopMapper.fromServerModel(res.Response);
    if (!this.showDetail) {
      this.wrongText = "";
      this.showDetail = true;
    }
    let self = this;
    setTimeout(function () {
      if (self.showDetail) self.testClick = true;
    }, 3);
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
  GetLocedClasses(data: any) {
    return {
      locked: data.State == 2,
    };
  }
  createShop() {
    this.$router.push({ name: SHOPSCREATE });
  }
  searchShop() {
    this.filter._filters = {
      Id: this.$filterService.СheckNull(this.id),
      Code: this.$filterService.СheckNullString(this.code),
      Name: this.$filterService.СheckNullString(this.Name),
      EnterpriseId: this.$filterService.СheckNull(this.EnterpriseId),
    };
    if (this.contentTable) this.contentTable.onChangeFilter();
  }
  onSort() {
    if (this.contentTable) this.contentTable.onChangeFilter();
  }
  async GetSybAgent(search?: string) {
    //получение по search субагентов
    return await this.$api.EnterpriseService.getList({
      _filters: { Name: search },
      _page: 1,
      _perPage: 6,
    });
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
