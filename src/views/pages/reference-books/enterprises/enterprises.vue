<template>
  <div class="mcw">
    <div class="center" id="center">
      <div class="block w-70">
        <page-template>
          <template #header>
            <div class="table-title"><b> Фильтр предприятий</b></div>
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
                <button class="btn btn-success" @click="createEnterprise">
                  Cоздать предприятие
                </button>
              </div>
              <div class="col-6 text-right">
                <button class="btn btn-default" @click="searchEnterprise">
                  Установить фильтр
                </button>
              </div>
            </div>
          </template>
        </page-template>
      </div>
      <div class="block w-70">
        <div class="block-body">
          <!-- 1fr -->
          <content-table
            templateColumns="min-content min-content 1fr 1fr 1fr 1fr 1fr 1fr"
            :getDataFunc="getEnterpriseAsync"
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
                sortName="Name"
                :filter="filter"
                @onSort="onSort"
              >
                Наименование
              </run-pay-ui-header>

              <ui-table-header-item>Юридическое лицо</ui-table-header-item>
              <ui-table-header-item>Тип взаиморасчета</ui-table-header-item>
              <ui-table-header-item>ИНН</ui-table-header-item>
              <ui-table-header-item>
                Способ удержания вознаграждения
              </ui-table-header-item>
              <ui-table-header-item>Плательщик НДС</ui-table-header-item>
            </template>
            <template #default="data">
              <ui-table-body-item
                class="pointer"
                :class="GetLocedClasses(data)"
              >
                <router-link
                  :to="{ name: enterprisesDetail, params: { id: data.Id } }"
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
                {{ data.Name }}
              </ui-table-body-item>
              <ui-table-body-item
                class="pointer"
                :class="GetLocedClasses(data)"
                @click="ShowDetail(data)"
              >
                {{ data.FullName }}
              </ui-table-body-item>
              <ui-table-body-item
                class="pointer"
                :class="GetLocedClasses(data)"
                @click="ShowDetail(data)"
              >
                <div v-if="data.BillingType == 0">Кредитный</div>
                <div v-if="data.BillingType == 1">Авансовый</div>
              </ui-table-body-item>
              <ui-table-body-item
                class="pointer"
                :class="GetLocedClasses(data)"
                @click="ShowDetail(data)"
              >
                {{ data.Inn }}
              </ui-table-body-item>
              <ui-table-body-item
                class="pointer"
                :class="GetLocedClasses(data)"
                @click="ShowDetail(data)"
              >
                {{ GetFullPayment(data.FullPayment) }}
              </ui-table-body-item>
              <ui-table-body-item
                class="pointer"
                :class="GetLocedClasses(data)"
                @click="ShowDetail(data)"
              >
                {{ data.IsNdsPayer }}
              </ui-table-body-item>
            </template>
          </content-table>
        </div>
      </div>
    </div>
    <transition name="fade" appear>
      <div class="ui-quick-view uiQuickView" v-if="showDetail">
        <ui-quick-view-enterprises-component
          v-model="enterpriseForQuickView"
          @hideDetail="hideDetail"
          v-click-outside="onBlur"
          @edit="editEnterprises"
          @duplicate="duplicateEnterprises"
          @delete="deleteEnterprises"
          :wrongText="wrongText"
        />
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import EnterpriseListRequest from "@/api/dataSource/api/plugins/models/controllersModels/enterprises/EnterpriseListRequest";
import GetListRequest from "@/api/dataSource/api/plugins/models/getListRequest";
import ContentTableComponent from "@/views/components/content-table.vue";
import IPaginationResponse from "@/views/components/interface/IPaginationResponse";
import { Options, Vue } from "vue-property-decorator";
import { ENTERPRISESDETAIL, ENTERPRISESCREATE } from "@/router/routerNames";
import UiQuickViewEnterprisesComponent from "@/views/pages/reference-books/enterprises/ui-quick-view-enterprises.vue";
import EnterpriseDetailMaper from "@/api/dataSource/api/plugins/models/mapModel/enterprises/EnterpriseDetailMapper";
import EnterpriseMapper from "@/maper-service/EnterpriseDetailMaper";
import "@/extensions/getDateWithoutTime";
import FullPayment from "@/dictionary-servise/FullPayment";


@Options({
  components: { UiQuickViewEnterprisesComponent },
  name: "EnterprisesPageComponent",
})
export default class EnterprisesPageComponent extends Vue {
  contentTable!: ContentTableComponent;
  enterprisesDetail = ENTERPRISESDETAIL;
  enterpriseForQuickView: EnterpriseDetailMaper;
  id: number = null;
  code: string = null;
  Name: string = null;
  showDetail: boolean = false;
  testClick: boolean = false;
  wrongText: string = null;
  filter: GetListRequest<EnterpriseListRequest> = {
    _page: 1,
    _perPage: 10,
  };
  async created() {}
  mounted() {
    this.contentTable = this.$refs.contentTable as ContentTableComponent;
  }
  editEnterprises(id: number) {
    this.$router.push({ name: this.enterprisesDetail, params: { id: id } });
    // отправить на деьальную
  }
  async deleteEnterprises(id: number) {
    //вывести ответ по удалению в окно
    var dialog = await this.$dialog.confirm(
      "Вы действительно хотите удалить предприятие " +
        this.enterpriseForQuickView.Name +
        " ?"
    );
    if (dialog) {
      let res = await this.$api.EnterpriseService.delete(Number(id));
      if (!res.IsSuccess) this.wrongText = res.ErrorInfo.title;
      else{
        this.hideDetail()
        if (this.contentTable) this.contentTable.fetchData();
      }
    }
  }
  async duplicateEnterprises(id: number) {
    this.$router.push({
      name: this.enterprisesDetail,
      params: { id: id },
      query: { duubl: "true" },
    });
    //продублировать и открыть в редактировании
  }
  async ShowDetail(data: EnterpriseDetailMaper) {
    let res = await this.$api.EnterpriseService.getOne(data.Id);
    this.enterpriseForQuickView = EnterpriseMapper.fromServerModel(
      res.Response
    );
    if (!this.showDetail) {
      this.wrongText = "";
      this.showDetail = true;
    }
    let self = this;
    setTimeout(function () {
      if (self.showDetail) self.testClick = true;
    }, 30);
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
  async getEnterpriseAsync() {
    return await this.$api.EnterpriseService.getList(this.filter);
  }
  async onSortGetList(data: any) {
    let res = await this.$api.ShopService.getList({
      _sortField: data.sortName,
      _sortDir: data.sortType,
    });
    var response: IPaginationResponse = {
      Items: res.Response.Items,
      Count: res.Response.Count,
    };
    return response;
  }
  createEnterprise() {
    this.$router.push({ name: ENTERPRISESCREATE });
  }
  searchEnterprise() {
    this.filter._filters = {
      Id: this.$filterService.СheckNull(this.id), //.ChecNumber(),
      Code: this.$filterService.СheckNullString(this.code),
      Name: this.$filterService.СheckNullString(this.Name),
    };
    if (this.contentTable) this.contentTable.onChangeFilter();
  }
  async onSort(data: any) {
    if (this.contentTable) this.contentTable.onChangeFilter();
  }
  GetLocedClasses(data: any) {
    return {
      locked: data.State == 2,
    };
  }
   GetFullPayment(item: number) {
    return FullPayment.find((el)=>el.Id==item).Name
  }
}
</script>
<style scoped lang="less">
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
