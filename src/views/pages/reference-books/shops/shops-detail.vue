<template>
  <div class="mcw">
    <div class="center">
      <div class="block w-70" v-if="endCreated">
        <page-template>
          <template #header>
            <div class="table-title" v-if="id !== undefined && !duplication">
              <b> Редактирование магазина</b>
            </div>
            <div class="table-title" v-else><b> Создание магазина</b></div>
          </template>
          <template #body>
            <div class="form-block">
              <div class="row row-50">
                <div class="col-6">
                  <div class="form-group">
                    <ui-label-input
                      class="editing"
                      nameLabel="Код"
                      placeholder="Введите код"
                      v-model="shopModelItem.Code"
                      id="Code"
                      required
                    />
                    <!--   :class="{
                        required: shopModelItem.Code.length == 0,
                      }" -->
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      class="editing"
                      required
                      nameLabel="Наименование"
                      placeholder="AeroPremierTur"
                      v-model="shopModelItem.Name"
                      id="Name"
                    />
                    <!--    :class="{
                        required: shopModelItem.Name.length == 0,
                      }" -->
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      class="editing"
                      required
                      nameLabel="Полное наименование"
                      placeholder="AeroPremierTur"
                      v-model="shopModelItem.FullName"
                      id="FullName"
                    />
                    <!--     :class="{
                        required: shopModelItem.FullName.length == 0,
                      }" -->
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="Enterprise" class="row">
                      Субагент <label class="label-wrong"> *</label>
                    </label>
                    <ui-autocomplete
                      v-model="EnterpriseId"
                      v-if="
                        ((EnterpriseId || EnterpriseId == undefined) &&
                          id !== undefined) ||
                        ((EnterpriseId || EnterpriseId == null) &&
                          id == undefined)
                      "
                      class="ui-select"
                      id="Enterprise"
                      keyField="Id"
                      valueField="Name"
                      :SearchAsyncFunc="GetSybAgent"
                    />
                    <!--     :class="{
                        requiredSelect: EnterpriseId == undefined,
                      }" -->
                  </div>
                  <div class="form-group">
                    <label for="AgentId">Агент</label>
                    <ui-autocomplete
                      v-model="AgentId"
                      class="ui-select"
                      id="AgentId"
                      keyField="Id"
                      valueField="Name"
                      noUndefined="true"
                      :SearchAsyncFunc="GetAgent"
                      defaultText="(все)"
                      v-if="
                        ((AgentId || AgentId == undefined) &&
                          id !== undefined) ||
                        ((AgentId || AgentId == undefined) && id == undefined)
                      "
                      :class="{
                        requiredSelect: shopModelItem.BillingType == undefined,
                      }"
                    />
                  </div>
                  <div class="form-group">
                    <label for="RepresantativeId">Региональный менеджер</label>
                    <ui-autocomplete
                      v-model="RepresantativeId"
                      class="ui-select"
                      id="RepresantativeId"
                      keyField="Id"
                      valueField="Name"
                      noUndefined="true"
                      :SearchAsyncFunc="GetRepresantative"
                      defaultText="(все)"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="form-block">
              <div class="row row-50">
                <div class="col-6">
                  <div class="form-group">
                    <ui-label-input
                      class="editing"
                      nameLabel="Торговая марка"
                      placeholder=""
                      v-model="shopModelItem.BrendName"
                      id="BrendName"
                    />
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      class="editing"
                      nameLabel="Адрес"
                      placeholder=""
                      v-model="shopModelItem.Address"
                      id="Address"
                    />
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      class="editing"
                      nameLabel="Контактный телефон"
                      placeholder="+37369669922"
                      v-model="shopModelItem.Phone"
                      id="Phone"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <ui-label-input
                      class="editing"
                      nameLabel="Факс"
                      placeholder=""
                      v-model="shopModelItem.Fax"
                      id="Fax"
                    />
                  </div>
                  <div class="form-group">
                    <ui-select-label
                      :items="SettlementTypes"
                      keyField="Id"
                      valueField="Name"
                      v-model="shopModelItem.BillingType"
                      class="ui-select"
                      noUndefined="true"
                      label="Тип взаиморасчета"
                      required
                    />
                    <!--     :class="{
                        requiredSelect: shopModelItem.BillingType == undefined,
                      }" -->
                  </div>
                  <div class="form-group">
                    <label for="Notes">Примечание</label>
                    <textarea
                      class="form-control"
                      name=""
                      v-model="shopModelItem.Notes"
                      id="Notes"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row" v-if="id !== undefined">
              <div class="col-6">
                <div class="form-log">
                  <table v-if="shopModelItem.Editor">
                    <tr>
                      <th>Кем редактирован</th>
                      <td>{{ shopModelItem.Editor.FullName }}</td>
                    </tr>
                    <tr>
                      <th>Дата добавления</th>
                      <td>
                        {{
                          $filterService.formatDateAll(shopModelItem.DateAdd)
                        }}
                      </td>
                    </tr>
                    <tr>
                      <th>Когда редактирован</th>
                      <td>
                        {{
                          $filterService.formatDateAll(shopModelItem.DateChange)
                        }}
                      </td>
                    </tr>
                    <tr>
                      <th>ID</th>
                      <td>{{ shopModelItem.Editor.Id }}</td>
                    </tr>
                    <tr>
                      <th>Состояние</th>
                      <td>{{ StateText }}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            <div v-if="wrong" class="wrong">{{ wrongText }}</div>
          </template>
          <template #footer>
            <div class="row">
              <div class="col-9">
                <button
                  class="btn btn-success mr-1"
                  @click="SaveShop"
                  v-if="id !== undefined && !duplication"
                >
                  Сохранить
                </button>
                <button class="btn btn-success mr-1" @click="AddShop" v-else>
                  Сохранить
                </button>
                <!-- <button
                  class="btn btn-success mr-1"
                  @click="DaeleteShop"
                  v-if="id !== undefined"
                >
                  Удалить
                </button>
                <button class="btn btn-success mr-1" @click="GoToHome" v-else>
                  Удалить
                </button> -->
                <!-- <button
                  class="btn btn-success"
                  @click="duplicateShop"
                  v-if="!duplication && id !== undefined"
                >
                  Дублировать
                </button> -->
                <button class="btn btn-success" @click="GoToHome">
                  Отмена
                </button>
              </div>
              <div class="col-3 text-right">
                <router-link class="btn btn-default" :to="{ name: Shop }">
                  К таблице
                </router-link>
              </div>
            </div>
          </template>
        </page-template>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import ContentTableComponent from "@/views/components/content-table.vue";
import { Options, Vue, Prop } from "vue-property-decorator";
import { SHOPS } from "@/router/routerNames";
import HttpResponseResult from "@/api/dataSource/api/plugins/models/httpResponseResult";
import SettlementType from "@/dictionary-servise/SettlementType";
import ShopDetailItem from "@/api/dataSource/api/plugins/models/controllersModels/shops/ShopDetailItem";
import ShopMapper from "@/maper-service/ShopDetailMaper";
import ShopDetailMapper from "@/api/dataSource/api/plugins/models/mapModel/shop/ShopDetailMaperModel";
import State from "@/dictionary-servise/State";

@Options({
  components: { ShopDetailMapper, ShopMapper, State },
  name: "ShopDetailsPageComponent",
})
export default class ShopDetailsPageComponent extends Vue {
  @Prop({ type: String, required: false }) id?: string;
  contentTable!: ContentTableComponent;
  Shop = SHOPS;
  shopModel: HttpResponseResult<ShopDetailItem>;
  shopModelItem: ShopDetailMapper = new ShopDetailMapper();
  Enterprise: any = this.GetEnterprise;
  SettlementTypes = SettlementType;
  endCreated: boolean = false;
  state = State;
  StateText: string = "";
  EnterpriseId: any = null;
  AgentId: any = null;
  wrong: boolean = false;
  wrongText: string = "";
  RepresantativeId: any = null;
  duplication: boolean = false;

  async created() {
    if (this.id) {
      this.LoadCreate();
    }
    this.endCreated = true;
  }
  async LoadCreate() {
    //загруска деталей магазина и заполнение всех доп плей
    this.shopModel = await this.$api.ShopService.getOne(Number(this.id));
    this.shopModelItem = ShopMapper.fromServerModel(this.shopModel.Response);
    this.StateText = this.state.find(
      (el) => el.Id == this.shopModelItem.State
    ).Name;
    if (this.shopModelItem.Enterprise != null) {
      if (this.shopModelItem.Enterprise?.Id !== undefined) {
        let Enterprise = await this.$api.EnterpriseService.getOne(
          this.shopModelItem.Enterprise.Id
        );
        this.EnterpriseId = Enterprise.Response;
      }
    }
    if (this.shopModelItem.Agent != null) {
      if (this.shopModelItem.Agent?.Id !== undefined) {
        this.AgentId = {
          Id: this.shopModelItem.Agent.Id,
          Name: this.shopModelItem.Agent.FullName,
        };
      }
    }
    if (this.$route.query.duubl == "true") {
      this.duplication = true;
      this.shopModelItem.Id = undefined;
      this.shopModelItem.Id = undefined;
      this.EnterpriseId = undefined;
    }
    this.RepresantativeId = this.shopModelItem.Represantative.Id;
  }
  GoToHome() {
    //кнопка "к таблице"
    this.$router.push({ name: this.Shop });
  }
  // async DaeleteShop() {
  //   var dialog = await this.$dialog.confirm(
  //     "Вы действительно хотите удалить магазин " +
  //       this.shopModelItem.Name +
  //       " ?"
  //   );
  //   if (dialog) {
  //     let res = await this.$api.ShopService.delete(Number(this.id));
  //     if (res.IsSuccess) this.$router.push({ name: this.Shop });
  //     else {
  //       this.wrong = true;
  //       this.wrongText = res.ErrorInfo.title;
  //     }
  //   }
  // }
  // async duplicateShop() {
  //   //дублирование магазина
  //   if (!this.FieldValidation(this.shopModelItem)) {
  //     return;
  //   }
  //   this.fieldСheck();
  //   let res = await this.$api.ShopService.update(
  //     Number(this.id),
  //     this.shopModelItem
  //   );
  //   if (res.IsSuccess) {
  //     this.duplication = true;
  //     this.shopModelItem.Id = undefined;
  //     this.EnterpriseId = undefined;
  //     window.scrollTo({ top: 0, behavior: "smooth" });
  //   } else {
  //     this.wrong = true;
  //     this.wrongText = res.ErrorInfo.title;
  //   }
  // }
  async GetEnterprise() {
    const res = await this.$api.EnterpriseService.getList({});
    return res.Response.Items.map((x) => {
      return { Id: x.Id, Name: x.Name };
    });
  }
  async AddShop() {
    if (!this.FieldValidation(this.shopModelItem)) {
      return;
    }
    this.fieldСheck();
    let res = await this.$api.ShopService.create(this.shopModelItem);
    if (res.IsSuccess) {
      this.$router.push({ name: SHOPS });
    } else {
      this.wrong;
      this.wrongText = res.ErrorInfo.traceId;
    }
  }
  FieldValidation(shopModelItem: ShopDetailMapper) {
    //валидация всех полей предприятия
    this.wrong = true;
    this.wrongText = "";

    if (
      shopModelItem.Name == undefined ||
      shopModelItem.Name.length == 0 ||
      shopModelItem.FullName == undefined ||
      shopModelItem.FullName.length == 0
    ) {
      this.wrongText = "Заполните обязательные поля";
    }
    if (shopModelItem.BillingType == null) {
      this.wrongText = "Выберите тип взаиморасчета";
    }
    if (shopModelItem.Code.length > 5 || shopModelItem.Code.length <= 0) {
      this.wrongText = "Мaксимальная длина кода '5', минимальная '1'";
    }
    if (this.EnterpriseId == null) {
      this.wrongText = "Выберите субагента";
    }
    if (this.wrongText != "") return false;
    this.wrong = false;
    return true;
  }
  fieldСheck() {
    if (this.AgentId != null) {
      if (typeof this.AgentId != "number")
        this.shopModelItem.Agent.Id = this.AgentId.Id;
      else this.shopModelItem.Agent.Id = this.AgentId;
    } else this.shopModelItem.Agent = null;
    if (this.RepresantativeId == null) this.shopModelItem.Represantative = null;
    else this.shopModelItem.Represantative.Id = this.RepresantativeId;
    if (this.EnterpriseId == null) this.shopModelItem.Enterprise = null;
    else this.shopModelItem.Enterprise.Id = this.EnterpriseId;
  }
  async SaveShop() {
    if (!this.FieldValidation(this.shopModelItem)) {
      return;
    }
    this.fieldСheck();
    let res = await this.$api.ShopService.update(
      Number(this.id),
      this.shopModelItem
    );
    if (res.IsSuccess) {
      this.$router.push({ name: SHOPS });
    } else {
      this.wrong = true;
      this.wrongText = res.ErrorInfo.title;
    }
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
}
</script>
<style >
</style>
