<template>
  <div class="mcw">
    <div class="center">
      <div class="block w-70">
        <page-template>
          <template #header>
            <div class="table-title" v-if="id !== undefined && !duplication">
              <b> Редактирование точки</b>
            </div>
            <div class="table-title" v-else><b> Создание точки </b></div>
          </template>
          <template #body>
            <div class="row row-50">
              <div class="col-6">
                <div class="inner-form-block">
                  <div class="form-group">
                    <label for="EnterpriseId" class="row">
                      Субагент <label class="label-wrong"> *</label>
                    </label>
                    <ui-autocomplete
                      v-model="EnterpriseId"
                      v-if="
                        (EnterpriseId && id !== undefined) ||
                        ((EnterpriseId || EnterpriseId == null) &&
                          id == undefined)
                      "
                      class="ui-select"
                      id="EnterpriseId"
                      keyField="Id"
                      valueField="Name"
                      :SearchAsyncFunc="GetSybAgentEnterprise"
                      defaultText="Не выбрано"
                    />
                    <!--  :class="{
                        requiredSelect: EnterpriseId == null,
                      }" -->
                  </div>
                  <div class="form-group">
                    <label for="ShopId" class="row">
                      Магазины <label class="label-wrong"> *</label>
                    </label>
                    <ui-autocomplete
                      v-model="ShopId"
                      class="ui-select"
                      v-if="
                        (ShopId && id !== undefined) ||
                        ((ShopId || ShopId == null) && id == undefined)
                      "
                      id="ShopId"
                      keyField="Id"
                      valueField="Name"
                      :SearchAsyncFunc="GetShops"
                      defaultText="Не выбрано"
                    />
                    <!--   :class="{
                        requiredSelect: ShopId == undefined,
                      }" -->
                  </div>
                  <div class="form-group">
                    <ui-select-label
                      :items="PosType"
                      keyField="Id"
                      valueField="Name"
                      v-model="pointModelItem.Type.Id"
                      class="ui-select"
                      noUndefined="true"
                      label="Тип интерфейса точки"
                    />
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      class="editing"
                      nameLabel="Время работы (чч:мм-чч:мм)"
                      placeholder="чч:мм-чч:мм"
                      v-model="pointModelItem.BusinessHours"
                      id="BusinessHours"
                      required
                    />
                    <!--  :class="{
                        required: pointModelItem.BusinessHours.length == 0,
                      }" -->
                  </div>
                  <label for="week">Время работы (чч:мм-чч:мм)</label>
                  <div class="week" id="week">
                    <ui-checkbox v-model="saturday">Суббота</ui-checkbox>
                    <ui-checkbox v-model="sunday">Воскресенье</ui-checkbox>
                    <ui-checkbox v-model="monday">Понедельник</ui-checkbox>
                  </div>
                </div>
                <div class="inner-form-block">
                  <div class="form-group">
                    <ui-label-input
                      class="editing"
                      nameLabel="Сколько ждать alive от терминала (сек)"
                      placeholder="1200"
                      v-model="pointModelItem.N4AliveTimeout"
                      id="N4AliveTimeout"
                      type="number"
                    />
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      class="editing"
                      nameLabel="Суточный лимит"
                      placeholder="0"
                      v-model="pointModelItem.DayLimit"
                      id="DayLimit"
                      type="number"
                    />
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      class="editing"
                      nameLabel="Недельный лимит"
                      placeholder="0"
                      v-model="pointModelItem.WeekLimit"
                      id="WeekLimit"
                      type="number"
                    />
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      class="editing"
                      nameLabel="Месячный лимит"
                      placeholder="0"
                      v-model="pointModelItem.MonthLimit"
                      id="MonthLimit"
                      type="number"
                    />
                  </div>
                </div>
                <div class="inner-form-block">
                  <div class="form-group">
                    <ui-label-input
                      class="editing"
                      nameLabel="Юр. наименование"
                      placeholder=""
                      v-model="pointModelItem.JurAdress"
                      id="JurAdress"
                    />
                  </div>
                  <div class="form-group">
                    <ui-select-label
                      :items="appartment"
                      keyField="Id"
                      valueField="Name"
                      v-model="pointModelItem.Address.Apartment.Type.Id"
                      class="ui-select"
                      label="Место установки точки"
                    />
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      class="editing"
                      nameLabel="Куратор"
                      placeholder="Gorpin R."
                      v-model="pointModelItem.Shop.Enterprise.CuratorFio"
                      id="CuratorFio"
                    />
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      class="editing"
                      nameLabel="Реклама на верхних мониторах"
                      placeholder="Gorpin R."
                      v-model="pointModelItem.TopAdvertise"
                      id="TopAdvertise"
                    />
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      class="editing"
                      nameLabel="Почтовый индекс"
                      placeholder="060767777"
                      v-model="pointModelItem.Address.Zip"
                      id="Zip"
                    />
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      class="editing"
                      nameLabel="Долгота"
                      placeholder=""
                      v-model="pointModelItem.Longtitude"
                      id="Longtitude"
                    />
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      class="editing"
                      nameLabel="Широта"
                      placeholder=""
                      v-model="pointModelItem.Latitude"
                      id="Latitude"
                    />
                  </div>
                </div>
                <div class="inner-form-block">
                  <div class="form-group">
                    <ui-label-input
                      class="editing"
                      nameLabel="Серийный номер киоска"
                      placeholder=""
                      v-model="pointModelItem.SerialNum"
                      id="SerialNum"
                      type="number"
                    />
                  </div>
                  <div class="form-group">
                    <ui-readonly
                      id="SoftVersion"
                      nameLabel="Версия ПО"
                      :text="pointModelItem.SoftVersion"
                    />
                  </div>
                  <div class="form-group">
                    <ui-readonly
                      id="N4GWVersion"
                      nameLabel="Версия шлюза"
                      :text="pointModelItem.N4GWVersion"
                    />
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      class="editing"
                      nameLabel="Номер сим карты"
                      placeholder=""
                      v-model="pointModelItem.Mobile"
                      id="Mobile"
                    />
                  </div>
                  <div class="form-group">
                    <ui-select-label
                      :items="color"
                      keyField="Id"
                      valueField="Name"
                      v-model="ColorId"
                      class="ui-select"
                      label="Цвет"
                    />
                  </div>
                  <div class="form-group">
                    <ui-readonly
                      id="123"
                      nameLabel="Дата последнего обращения на сервер для получения запроса к киоску"
                      :text="
                        $filterService.formatDateAll(
                          pointModelItem.pos_LAST_N4UPLOAD_DATE
                        )
                      "
                    />
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="inner-form-block">
                  <div class="form-group">
                    <ui-select-label
                      :items="PosRegistrationState"
                      keyField="Id"
                      valueField="Name"
                      v-model="pointModelItem.RegistrationStatus"
                      class="ui-select"
                      label="Статус регистрации точки"
                    />
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      class="editing"
                      nameLabel="Код точки в магазине"
                      placeholder="N1P2624"
                      v-model="pointModelItem.ShopPosCode"
                      id="ShopPosCode"
                      required
                    />
                    <!--    :class="{
                        required: pointModelItem.ShopPosCode.length == 0,
                      }" -->
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      class="editing"
                      nameLabel="Код точки у оператора"
                      placeholder="N1P2624"
                      v-model="pointModelItem.BeepayPosCode"
                      id="BeepayPosCode"
                    />
                  </div>
                  <div class="form-group">
                    <ui-select-label
                      :items="paymentAcceptanceMode"
                      keyField="Id"
                      valueField="Name"
                      v-model="pointModelItem.Online"
                      class="ui-select"
                      noUndefined="true"
                      label="Режим приема платежей"
                    />
                  </div>
                  <div class="form-group">
                    <ui-select-label
                      :items="DeviceType"
                      keyField="Id"
                      valueField="Name"
                      v-model="pointModelItem.DeviceType.Id"
                      class="ui-select"
                      noUndefined="true"
                      label="Тип устройства приема платежей"
                      required
                    />
                    <!--    :class="{
                        requiredSelect:
                          pointModelItem.DeviceType.Id == undefined,
                      }" -->
                  </div>
                </div>
                <div class="inner-form-block">
                  <div class="form-group">
                    <label for="Enterprise" class="row">
                      Регион <label class="label-wrong"> *</label>
                    </label>
                    <ui-autocomplete
                      v-model="RegionId"
                      class="ui-select"
                      id="Region"
                      keyField="Id"
                      valueField="Name"
                      v-if="
                        (RegionId && id !== undefined) ||
                        ((RegionId || RegionId == null) && id == undefined)
                      "
                      :SearchAsyncFunc="GetSybAgent"
                      defaultText="Регион"
                    />
                    <!--     :class="{
                        requiredSelect: RegionId == undefined,
                      }" -->
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      class="editing"
                      nameLabel="Край"
                      placeholder="Край"
                      v-model="pointModelItem.Address.Territory"
                      id="Territory"
                    />
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      class="editing"
                      nameLabel="Район"
                      placeholder="Район"
                      v-model="pointModelItem.Address.District"
                      id="District"
                    />
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <div class="form-group">
                        <ui-select-label
                          :items="settlements"
                          keyField="Id"
                          valueField="Name"
                          v-model="SettlementId"
                          class="ui-select"
                          label="Населенный пункт"
                        />
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group">
                        <ui-label-input
                          class="editing mt-3"
                          nameLabel=""
                          placeholder=""
                          v-model="SettlementName"
                          id="Settlement"
                        />
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group">
                        <ui-select-label
                          :items="streetType"
                          keyField="Id"
                          valueField="Name"
                          v-model="StreetId"
                          class="ui-select"
                          label="Улица"
                        />
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group">
                        <ui-label-input
                          class="editing mt-3"
                          nameLabel=""
                          placeholder=""
                          v-model="StreetName"
                          id="Street"
                        />
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group">
                        <ui-select-label
                          :items="buildingType"
                          keyField="Id"
                          valueField="Name"
                          v-model="BuildingId"
                          class="ui-select"
                          label="Строение"
                        />
                      </div>
                    </div>
                    <div class="col-3">
                      <div class="form-group">
                        <ui-label-input
                          class="editing"
                          nameLabel="№"
                          placeholder=""
                          v-model="BuildingNumber"
                          id="Building"
                          type="number"
                        />
                      </div>
                    </div>
                    <div class="col-3">
                      <div class="form-group">
                        <ui-label-input
                          class="editing"
                          nameLabel="Буква/дробь/корпус"
                          placeholder=""
                          v-model="BuildingNumberAdditional"
                          id="NumberAdditional"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="inner-form-block">
                  <div class="form-group">
                    <label for="Notes">Примечание</label>
                    <textarea
                      class="form-control"
                      v-model="pointModelItem.Notes"
                      id="Notes"
                    />
                  </div>
                </div>
                <div class="inner-form-block">
                  <div class="form-group">
                    <ui-select-label
                      :items="kioskСonditionItems"
                      keyField="Id"
                      valueField="Name"
                      v-model="pointModelItem.TerminalState"
                      class="ui-select"
                      label="Состояние киоска"
                      noUndefined="true"
                    />
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      class="editing"
                      nameLabel="Максимальное количество купюр"
                      placeholder="0"
                      v-model="pointModelItem.BanknotesMaxCount"
                      id="BanknotesMaxCount"
                      type="number"
                    />
                  </div>
                  <ui-checkbox v-model="pointModelItem.DispenserUse">
                    Диспенсер
                  </ui-checkbox>
                  <div class="form-group">
                    <label for="TerminalStateComment">
                      Комментарий к техническому состоянию
                    </label>
                    <textarea
                      class="form-control"
                      v-model="pointModelItem.TerminalStateComment"
                      id="TerminalStateComment"
                    />
                  </div>
                  <div class="form-group">
                    <label for="TerminalPlaceComment1">
                      Описание расположения в магазине
                    </label>
                    <textarea
                      class="form-control"
                      v-model="pointModelItem.TerminalPlaceComment1"
                      id="TerminalPlaceComment1"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="h1" v-if="id !== undefined">Данные о киосках</div>
            <div class="row" v-if="id !== undefined">
              <div class="col-6">
                <div class="form-log">
                  <table>
                    <tr>
                      <th>Кем редактирован</th>
                      <td>
                        {{ pointModelItem.Editor.FullName }}
                      </td>
                    </tr>
                    <tr>
                      <th>Когда редактирован</th>
                      <td>
                        {{
                          $filterService.formatDateAll(
                            pointModelItem.Editor.DateChange
                          )
                        }}
                      </td>
                    </tr>
                    <tr>
                      <th>ID</th>
                      <td>
                        {{ pointModelItem.Editor.Id }}
                      </td>
                    </tr>
                    <tr>
                      <th>Состояние</th>
                      <td>
                        <div v-if="pointModelItem.Editor.State == -1">
                          не установлено
                        </div>
                        <div v-if="pointModelItem.Editor.State == 0">
                          удален
                        </div>
                        <div v-if="pointModelItem.Editor.State == 1">
                          активен
                        </div>
                        <div v-if="pointModelItem.Editor.State == 2">
                          блокирован
                        </div>
                      </td>
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
                  @click="SavePoint"
                  v-if="id !== undefined && !duplication"
                >
                  Сохранить
                </button>
                <button class="btn btn-success mr-1" @click="AddPoint" v-else>
                  Сохранить
                </button>
                <!-- <button
                  class="btn btn-success mr-1"
                  @click="DaeletePoint"
                  v-if="id !== undefined"
                >
                  Удалить
                </button>
                <button class="btn btn-success mr-1" @click="GoToHome" v-else>
                  Удалить
                </button> -->
                <!-- <button
                  class="btn btn-success"
                  @click="duplicatePoint"
                  v-if="!duplication && id !== undefined"
                >
                  Дублировать
                </button> -->
                <button class="btn btn-success" @click="GoToHome">
                  Отмена
                </button>
              </div>
              <div class="col-3 text-right">
                <router-link class="btn btn-default" :to="{ name: point }">
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
import { POINTS } from "@/router/routerNames";
import HttpResponseResult from "@/api/dataSource/api/plugins/models/httpResponseResult";
import SettlementType from "@/dictionary-servise/SettlementType";
import PosRegistrationState from "@/dictionary-servise/PosRegistrationState";
import PointDetailItem from "@/api/dataSource/api/plugins/models/controllersModels/points/PointDetailItem";
import State from "@/dictionary-servise/State";
import PaymentAcceptanceMode from "@/dictionary-servise/PaymentAcceptanceMode";
import PointMapper from "@/maper-service/PointDetailMaper";
import PointDetailMapper from "@/api/dataSource/api/plugins/models/mapModel/points/PointDetailMaperModel";
@Options({
  components: {},
  name: "PointDetailsPageComponent",
})
export default class PointDetailsPageComponent extends Vue {
  @Prop({ type: String }) id: string;
  contentTable!: ContentTableComponent;
  point = POINTS;
  paymentAcceptanceMode = PaymentAcceptanceMode;
  pointModel: HttpResponseResult<PointDetailItem>;
  pointModelItem: PointDetailMapper = new PointDetailMapper();
  Enterprise: any = this.GetEnterprise;
  duplication: boolean = false;
  wrong: boolean = false;
  wrongText: string = "";
  //списки
  SettlementTypes = SettlementType;
  PosRegistrationState = PosRegistrationState;
  state = State;
  kioskСonditionItems: Array<any> = [];
  settlements: Array<any> = [];
  streetType: Array<any> = [];
  buildingType: Array<any> = [];
  appartment: Array<any> = [];
  PosType: Array<any> = [];
  DeviceType: Array<any> = [];
  color: Array<any> = [];
  Weeks: Array<any> = [];
  //доп поля
  EnterpriseId: any = null;
  ShopId: any = null;
  RegionId: any = null;
  ColorId: number = null;
  saturday: boolean = false;
  sunday: boolean = false;
  monday: boolean = false;
  SettlementId: number = null;
  SettlementName: string = null;
  StreetId: number = null;
  StreetName: string = null;
  BuildingId: number = null;
  BuildingNumber: number = null;
  BuildingNumberAdditional: string = null;
  async created() {
    this.Loader();
    if (this.id) {
      this.LoadCreate();
    }
  }
  async Loader() {
    // подгрузка простых выпадающих списков из store
    this.settlements = await this.$initService.state.GetSettlementType();
    this.appartment = await this.$initService.state.GetSettlementType();
    this.streetType = await this.$initService.state.GetStreetType();
    this.buildingType = await this.$initService.state.GetBuildingType();
    this.color = await this.$initService.state.GetColor();
    this.kioskСonditionItems = await this.$initService.state.GetTechStateList();
    this.PosType = await this.$initService.state.GetPosType();
    this.DeviceType = await this.$initService.state.GetDeviceType();
  }
  async LoadCreate() {
    //загруска деталей точки и заполнение всех доп плей

    this.pointModel = await this.$api.PointOfSalesService.getOne(
      Number(this.id)
    );
    this.pointModelItem = PointMapper.fromServerModel(this.pointModel.Response);
    if (this.$route.query.duubl == "true") {
      this.duplication = true;
      this.pointModelItem.Id = undefined;
      this.pointModelItem.ShopPosCode = "";
    }
    if (this.pointModelItem.Color !== null)
      this.ColorId = this.pointModelItem.Color.Id;

    if (this.pointModelItem.Weekends != null) {
      for (var i = this.pointModelItem.Weekends.length - 1; i >= 0; --i) {
        if (this.pointModelItem.Weekends[i] == "monday") this.monday = true;
        if (this.pointModelItem.Weekends[i] == "sunday") this.sunday = true;
        if (this.pointModelItem.Weekends[i] == "saturday") this.saturday = true;
      }
    }

    if (this.pointModelItem.Shop.Enterprise != null) {
      if (this.pointModelItem.Shop.Enterprise?.Id !== undefined) {
        this.EnterpriseId = {
          Id: this.pointModelItem.Shop.Enterprise.Id,
          Name: this.pointModelItem.Shop.Enterprise.Name,
        };
      }
    }

    if (this.pointModelItem.Address.Region !== null) {
      this.RegionId = {
        Id: this.pointModelItem.Address.Region.Id,
        Name: this.pointModelItem.Address.Region.Name,
      };
    }
    if (this.pointModelItem.Shop != null) {
      if (this.pointModelItem.Shop?.Id !== undefined) {
        this.ShopId = {
          Id: this.pointModelItem.Shop.Id,
          Name: this.pointModelItem.Shop.Name,
        };
      }
    }
    if (this.pointModelItem.Address.Settlement) {
      this.SettlementId = this.pointModelItem.Address.Settlement.Type.Id;
      this.SettlementName = this.pointModelItem.Address.Settlement.Name;
    }
    if (this.pointModelItem.Address.Street) {
      this.StreetId = this.pointModelItem.Address.Street.Type.Id;
      this.StreetName = this.pointModelItem.Address.Street.Name;
    }
    if (this.pointModelItem.Address.Building) {
      this.BuildingId = this.pointModelItem.Address.Building.Type.Id;
      this.BuildingNumber = this.pointModelItem.Address.Building.Number;
      this.BuildingNumberAdditional =
        this.pointModelItem.Address.Building.NumberAdditional;
    }
  }

  async SavePoint() {
    // метод для сохранения точек
    if (!this.FieldValidation(this.pointModelItem)) {
      return;
    }
    this.FieldСheck();
    let res = await this.$api.PointOfSalesService.update(
      Number(this.id),
      this.pointModelItem
    );
    if (res.IsSuccess) {
      this.$router.push({ name: POINTS });
    } else {
      this.wrong = true;
      this.wrongText = res.ErrorInfo.title;
    }
  }
  GoToHome() {
    //кнопка "к таблице"
    this.$router.push({ name: POINTS });
  }
  // async duplicatePoint() {
  //   //проверить, сохранить, продублировать
  //   if (!this.FieldValidation(this.pointModelItem)) {
  //     return;
  //   }
  //   this.FieldСheck();
  //   let res = await this.$api.PointOfSalesService.update(
  //     Number(this.id),
  //     this.pointModelItem
  //   );
  //   if (res.IsSuccess) {
  //     this.duplication = true;
  //     this.pointModelItem.ShopPosCode = "";
  //     window.scrollTo({ top: 0, behavior: "smooth" });
  //   } else {
  //     this.wrong = true;
  //     this.wrongText = res.ErrorInfo.title;
  //   }
  // }

  // async DaeletePoint() {
  //   //метод для удаления точки
  //   var dialog = await this.$dialog.confirm(
  //     "Вы действительно хотите удалить точку " +
  //       this.pointModelItem.ShopPosCode +
  //       " ?"
  //   );
  //   if (dialog) {
  //     let res = await this.$api.PointOfSalesService.delete(Number(this.id));
  //     if (res.IsSuccess) this.$router.push({ name: POINTS });
  //     else {
  //       this.wrong = true;
  //       this.wrongText = res.ErrorInfo.title;
  //       return;
  //     }
  //   }
  // }

  async AddPoint() {
    //метод для создания точки
    if (!this.FieldValidation(this.pointModelItem)) {
      return;
    }
    this.FieldСheck();

    let res = await this.$api.PointOfSalesService.create(this.pointModelItem);
    if (res.IsSuccess) {
      this.$router.push({ name: POINTS });
    } else {
      this.wrong = true;
      this.wrongText = res.ErrorInfo.title;
    }
  }
  FieldСheck() {
    //сопоставление всех доп полей с моделю для отправки на сервер
    if (this.monday) this.Weeks.push("monday");
    if (this.sunday) this.Weeks.push("sunday");
    if (this.saturday) this.Weeks.push("saturday");
    this.pointModelItem.Weekends = this.Weeks;

    this.pointModelItem.Shop.Enterprise.Id = this.EnterpriseId;
    if (this.EnterpriseId != null) {
      if (typeof this.EnterpriseId != "number")
        this.pointModelItem.Shop.Enterprise.Id = this.EnterpriseId.Id;
      else this.pointModelItem.Shop.Enterprise.Id = this.EnterpriseId;
    }
    if (this.ShopId != null) {
      if (typeof this.ShopId != "number")
        this.pointModelItem.Shop.Id = this.ShopId.Id;
      else this.pointModelItem.Shop.Id = this.ShopId;
    }
    if (this.RegionId != null) {
      if (typeof this.RegionId != "number")
        this.pointModelItem.Address.Region.Id = this.RegionId.Id;
      else this.pointModelItem.Address.Region.Id = this.RegionId;
    } else this.pointModelItem.Address.Region = null;
    if (this.ColorId != null) this.pointModelItem.Color.Id = this.ColorId;
    if (this.SettlementId != null)
      this.pointModelItem.Address.Settlement.Type.Id = this.SettlementId;
    if (this.SettlementName != null)
      this.pointModelItem.Address.Settlement.Name = this.SettlementName;
    else this.pointModelItem.Address.Settlement = null;
    if (this.StreetId != null) {
      this.pointModelItem.Address.Street.Type.Id = this.StreetId;
      this.pointModelItem.Address.Street.Name = this.StreetName;
    } else this.pointModelItem.Address.Street = null;
    if (this.BuildingId) {
      this.pointModelItem.Address.Building.Type.Id = this.BuildingId;
      this.pointModelItem.Address.Building.Number = this.BuildingNumber;
      this.pointModelItem.Address.Building.NumberAdditional =
        this.BuildingNumberAdditional;
    } else this.pointModelItem.Address.Building = null;
  }
  FieldValidation(pointModelItem: PointDetailMapper) {
    //валидация всех полей точки
    this.wrong = true;
    this.wrongText = "";
    console.log("Сюда оно заходит");

    if (this.EnterpriseId == null) this.wrongText = "Выберите субагента";
    if (this.ShopId == null) this.wrongText = "Выберите магазин";
    if (this.RegionId == null) this.wrongText = " Выберите регион";
    if (pointModelItem.N4AliveTimeout > 2147483647)
      this.wrongText = "alive от терминала должен быть меньше 2,147,483,647";
    if (pointModelItem.BanknotesMaxCount > 2147483647)
      this.wrongText =
        "Максимальное количество купюр должено быть меньше 2,147,483,647";
    if (pointModelItem.BusinessHours.length == 0)
      this.wrongText = "Заоплните время работы";
    if (pointModelItem.ShopPosCode.length == 0)
      this.wrongText = "Заоплните код точки в магазине";
    if (pointModelItem.DeviceType.Id == null)
      this.wrongText = "Выбеите тип устройства приема платежей";

    let id = this.SettlementId; //  pointModelItem.Address.Settlement.Type.Id;
    let name = this.SettlementName; //pointModelItem.Address.Settlement.Name;
    if (id || name)
      if ((id !== null || name !== null) && !(id != null && name != null))
        this.wrongText =
          "Для того чтобы населенный пункт сохраниля, нужно выбрать тип населенного пункта и ввести название";

    let idstret = this.StreetId; ///pointModelItem.Address.Street.Type.Id;
    let namestreet = this.StreetName; ///pointModelItem.Address.Street.Name;

    if (idstret || namestreet)
      if (
        (idstret !== null || namestreet !== null) &&
        !(idstret != null && namestreet != null)
      )
        this.wrongText =
          "Для того чтобы улица сохранилась, нужно выбрать тип улицы и ввести название";
    let idBuilding = this.BuildingId; //pointModelItem.Address.Building.Type.Id;
    let nameBuilding = this.BuildingNumber; //pointModelItem.Address.Building.Number;

    if (idBuilding || nameBuilding)
      if (
        (idBuilding !== null || nameBuilding !== null) &&
        !(idBuilding != null && nameBuilding != null)
      )
        this.wrongText =
          "Для того чтобы строение сохранилось, нужно выбрать тип строения и ввести название";
    if (this.wrongText != "") return false;
    this.wrong = false;
    return true;
  }
  // получение списков с фильтрами
  async GetSybAgentEnterprise(search?: string) {
    return await this.$api.EnterpriseService.getList({
      _filters: { Name: search },
      _page: 1,
      _perPage: 6,
    });
  }
  async GetEnterprise() {
    const res = await this.$api.EnterpriseService.getList({});
    return res.Response.Items.map((x) => {
      return { Id: x.Id, Name: x.Name };
    });
  }
  async GetShops(search?: string) {
    return await this.$api.ShopService.getList({
      _filters: { Name: search },
      _page: 1,
      _perPage: 6,
    });
  }
  async GetSybAgent(search?: string) {
    return await this.$api.PointOfSalesService.GetRegionsList({
      _filters: { Name: search },
      _page: 1,
      _perPage: 6,
    });
  }
  async GetTechnician(search?: string) {
    return await this.$api.UserService.GetUsersList({
      _filters: { Name: search, GroupName: "PosTechnician" },
      _page: 1,
      _perPage: 6,
    });
  }
  async GetManager(search?: string) {
    return await this.$api.UserService.GetUsersList({
      _filters: { Name: search, GroupName: "PosManager" },
      _page: 1,
      _perPage: 6,
    });
  }
  async GetCollector(search?: string) {
    return await this.$api.UserService.GetUsersList({
      _filters: { Name: search, GroupName: "PosCollector" },
      _page: 1,
      _perPage: 6,
    });
  }
}
</script>
<style >
.week {
  display: flex;
  flex-wrap: wrap;
}
</style>
