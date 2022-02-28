<template>
  <div class="mcw">
    <div class="center">
      <div class="block w-70" v-if="enterprisesModelItem">
        <page-template>
          <template #header>
            <div class="table-title" v-if="id != undefined && !duplication">
              <b> Редактирование предприятия</b>
            </div>
            <div class="table-title" v-else><b> Создание предприятия </b></div>
          </template>
          <template #body>
            <div class="form-block">
              <div class="row row-50">
                <div class="col-6">
                  <ui-checkbox v-model="enterprisesModelItem.IsBlocked">
                    Статус (заблокирован?)
                  </ui-checkbox>
                  <ui-checkbox v-model="enterprisesModelItem.IsNdsPayer">
                    Является ли плательщиком НДС
                  </ui-checkbox>
                  <ui-checkbox v-model="enterprisesModelItem.IsMini">
                    Агент RunPay
                  </ui-checkbox>
                  <div class="form-group">
                    <ui-label-input
                      nameLabel="Краткое наименование"
                      placeholder="Введите краткое наименование"
                      v-model="enterprisesModelItem.Name"
                      id="Name"
                      class="editing"
                      required
                    />
                    <!--      :class="{
                        required:
                          (id != undefined &&
                            enterprisesModelItem.Name !== undefined &&
                            enterprisesModelItem.Name.length == 0) ||
                          (id == undefined &&
                            enterprisesModelItem.Name.length == 0),
                      }" -->
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      required
                      nameLabel="Агент RunPay"
                      placeholder="“10 LEVEL” S.R.L. Te"
                      v-model="enterprisesModelItem.FullName"
                      id="FullName"
                      class="editing"
                    />
                    <!--      :class="{
                        required:
                          (id != undefined &&
                            enterprisesModelItem.FullName !== undefined &&
                            enterprisesModelItem.FullName.length == 0) ||
                          (id == undefined &&
                            enterprisesModelItem.FullName.length == 0),
                      }" -->
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      nameLabel="Юридический адрес"
                      placeholder="mun. Chisinau, str. Liviu Deleanu 13/1"
                      v-model="enterprisesModelItem.Address"
                      id="Address"
                      class="editing"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <ui-label-input
                      nameLabel="Контактный телефон"
                      placeholder="111"
                      v-model="enterprisesModelItem.Phone"
                      id="Phone"
                      class="editing"
                    />
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      nameLabel="Факс"
                      placeholder=""
                      v-model="enterprisesModelItem.Fax"
                      id="Fax"
                      class="editing"
                    />
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      nameLabel="E-mail"
                      placeholder=""
                      v-model="enterprisesModelItem.Email"
                      id="Email"
                      class="editing"
                    />
                  </div>
                  <div class="form-group">
                    <label for="BankRequisite">Банковские реквизиты</label>
                    <textarea
                      id="BankRequisite"
                      class="form-control"
                      v-model="enterprisesModelItem.BankRequisite"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="form-block">
              <div class="row row-50">
                <div class="col-6">
                  <div class="form-group">
                    <ui-select-label
                      :items="SettlementTypes"
                      keyField="Id"
                      valueField="Name"
                      v-model="enterprisesModelItem.BillingType"
                      class="ui-select"
                      noUndefined="true"
                      label="Тип взаиморасчета"
                    />
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      nameLabel="ИНН"
                      placeholder="2028600015123"
                      v-model="enterprisesModelItem.Inn"
                      id="Inn"
                      required
                      class="editing"
                    />
                    <!--      :class="{
                        required: enterprisesModelItem.Inn.length == 0,
                      }" -->
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      nameLabel="КПП"
                      placeholder=""
                      v-model="enterprisesModelItem.Kpp"
                      id="Kpp"
                      class="editing"
                    />
                  </div>
                  <div class="form-group">
                    <label for="CashRegisterItem">Кассовый аппарат</label>
                    <ui-autocomplete
                      v-model="CashRegisterItem"
                      class="ui-select"
                      id="CashRegisterItem"
                      keyField="Id"
                      valueField="RegNumber"
                      noUndefined="true"
                      :SearchAsyncFunc="GetCashRegister"
                      defaultText="Кассовый аппарат"
                    />
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      nameLabel="Разница с московским временем 0-23"
                      placeholder="0"
                      v-model="TimeDifference"
                      id="TimeDifference"
                      type="number"
                      class="editing"
                    />
                  </div>
                  <div class="form-group">
                    <ui-select-label
                      :items="FullPayment"
                      keyField="Id"
                      valueField="Name"
                      v-model="enterprisesModelItem.FullPayment"
                      class="ui-select"
                      noUndefined="true"
                      label="Способ удержания вознаграждения"
                    />
                  </div>
                  <ui-checkbox
                    v-model="enterprisesModelItem.IsBalanceFromLastAct"
                  >
                    BALANCE_FROM_LAST_ACT
                  </ui-checkbox>
                </div>
                <div class="col-6">
                  <!-- <div class="form-group"> -->
                  <!-- <ui-select-label
                      :items="test"
                      keyField="id"
                      valueField="name"
                      v-model="testId"
                      class="ui-select"
                      defaultText="(все)"
                      label="План комисси"
                    /> -->
                  <!-- </div> -->
                  <div class="form-group">
                    <ui-select-label
                      :items="addBalanceType"
                      keyField="Id"
                      valueField="Name"
                      v-model="enterprisesModelItem.AddBalanceType"
                      class="ui-select"
                      noUndefined="true"
                      label="Способ начисления баланса"
                      type="number"
                    />
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      nameLabel="Вознаграждение Агента (%)"
                      placeholder="1,0000"
                      v-model="enterprisesModelItem.RewardFromPayPercent"
                      id="RewardFromPayPercent"
                      type="number"
                      class="editing"
                    />
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      nameLabel="Вознаграждение Агента (фикс.)"
                      placeholder="0"
                      v-model="enterprisesModelItem.RewardFromPayAmount"
                      id="RewardFromPayAmount"
                      type="number"
                      class="editing"
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
                      nameLabel="Сумма застрахованного потока"
                      placeholder="0"
                      v-model="enterprisesModelItem.InsuredLimit"
                      id="InsuredLimit"
                      type="number"
                      class="editing"
                    />
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      nameLabel="Блок застрахованного поктока (руб.)"
                      placeholder="5000,00"
                      v-model="enterprisesModelItem.InsuredBlockSum"
                      id="InsuredBlockSum"
                      type="number"
                      class="editing"
                    />
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      nameLabel="Стоимость блока застрахованного потока"
                      placeholder="0"
                      v-model="enterprisesModelItem.InsuredBlockPrice"
                      id="InsuredBlockPrice"
                      type="number"
                      class="editing"
                    />
                  </div>
                  <div class="form-group">
                    <label for="InsuredBlockEndDate">
                      Дата действия страховки
                    </label>
                    <ui-one-datatime-picker
                      v-model="enterprisesModelItem.InsuredBlockEndDate"
                      dateFormat="DD.MM.YYYY"
                      :isShowClock="false"
                      id="InsuredBlockEndDate"
                      class="editing-date"
                    />
                  </div>
                  <ui-checkbox v-model="enterprisesModelItem.IsVerified">
                    Зарегистрирован в НБМ
                  </ui-checkbox>
                  <div class="form-group">
                    <ui-label-input
                      nameLabel="Количество дней для оплаты акта"
                      placeholder="-1"
                      v-model="enterprisesModelItem.DaysForPay"
                      id="DaysForPay"
                      type="number"
                      class="editing"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <ui-label-input
                      nameLabel="Сумма по договору (руб.)"
                      placeholder="5000,00"
                      v-model="enterprisesModelItem.AgreementAmount"
                      id="AgreementAmount"
                      type="number"
                      class="editing"
                    />
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      nameLabel="Экстра лимит"
                      placeholder="0"
                      v-model="enterprisesModelItem.ExtraLimit"
                      id="ExtraLimit"
                      type="number"
                      class="editing"
                    />
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      nameLabel="Максимальный кредитный лимит"
                      placeholder="0"
                      v-model="enterprisesModelItem.MaxLimitSize"
                      id="MaxLimitSize"
                      type="number"
                      class="editing"
                    />
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      nameLabel="Модель провизиона"
                      placeholder="(все)"
                      v-model="enterprisesModelItem.ProvisionModel"
                      id="ProvisionModel"
                      type="number"
                      class="editing"
                    />
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      nameLabel="Периодичность рассылки счетом в днях"
                      placeholder="0"
                      v-model="enterprisesModelItem.ReportSendPeriodicity"
                      id="ReportSendPeriodicity"
                      type="number"
                      class="editing"
                    />
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      nameLabel="Стоимость регистрации пользователя Emoney"
                      placeholder=""
                      v-model="enterprisesModelItem.EmoneyRegistrationCoast"
                      id="EmoneyRegistrationCoast"
                      type="number"
                      class="editing"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="form-block">
              <div class="row row-50">
                <div class="col-6">
                  <ui-checkbox v-model="enterprisesModelItem.IsCreatePayment">
                    Формировать платеж возмещения по доходам
                  </ui-checkbox>
                  <div class="form-group">
                    <label for="LastReportDate">
                      Дата и время отправки последнего счета
                    </label>
                    <ui-one-datatime-picker
                      id="LastReportDate"
                      v-model="enterprisesModelItem.LastReportDate"
                      :modelValue="enterprisesModelItem.LastReportDate"
                      class="editing-date"
                    />
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      nameLabel="Время рассылки счетов (чч:мм:сс)"
                      placeholder="00:00:00"
                      v-model="ReportSendTime"
                      id="ReportSendTime"
                      class="editing"
                    />
                  </div>
                  <div class="form-group">
                    <label for="ChildEntIdList">Дочерние предприятия</label>
                    <ui-autocomplete-multiselect
                      class="autocomplete-multiselect mb-2"
                      selectText="Выберите дочерние предприятия"
                      keyField="Id"
                      valueField="Name"
                      v-model="ChildEntIdListItem"
                      id="ChildEntIdList"
                      :SearchAsyncFunc="GetSybAgent"
                    />
                  </div>
                  <div class="form-group">
                    <label for="AllowedCurrencyList">Валюты платежа</label>
                    <ui-multiselect
                      selectText="Выберите валюту"
                      keyField="Name"
                      valueField="Name"
                      :items="AllowedCurrencyList"
                      v-model="enterprisesModelItem.AllowedCurrencyList"
                      id="AllowedCurrencyList"
                      class="autocomplete-multiselect"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <ui-label-input
                      nameLabel="Должность лица, подписывающего документы"
                      placeholder="Директор"
                      v-model="enterprisesModelItem.SignaturePosition"
                      id="SignaturePosition"
                      class="editing"
                    />
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      nameLabel="ФИО лица, подписывающего документы"
                      placeholder="Константинопольский Константин Константинович"
                      v-model="enterprisesModelItem.SignatureFIO"
                      id="SignatureFIO"
                      class="editing"
                    />
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      nameLabel="ФИО главного бухгалтера"
                      placeholder="Константинопольский Константин Константинович"
                      v-model="enterprisesModelItem.ChiefAccountantFio"
                      id="ChiefAccountantFio"
                      class="editing"
                    />
                  </div>
                  <div class="form-group">
                    <ui-label-input
                      nameLabel="ФИО куратора"
                      placeholder="Константинопольский Константин Константинович"
                      v-model="enterprisesModelItem.CuratorFio"
                      id="CuratorFio"
                      class="editing"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row row-50">
              <div class="col-6">
                <ui-checkbox
                  v-model="enterprisesModelItem.InsertEncashmentPayment"
                >
                  Небходимо ли при получении лога инкассации автоматически
                  формировать платеж возмещения
                </ui-checkbox>
                <ui-checkbox v-model="enterprisesModelItem.ChangeTranDate">
                  Автоматически изменять дату платежа на точке на дату
                  регитрации в системе
                </ui-checkbox>
                <ui-checkbox v-model="enterprisesModelItem.ShowInReport">
                  Отображать в отчетах
                </ui-checkbox>
                <ui-checkbox v-model="enterprisesModelItem.BalanceRecalc">
                  Пересчитывать баланс
                </ui-checkbox>
                <div class="form-group">
                  <label for="ActHeader">Шапка акта</label>
                  <textarea
                    v-model="enterprisesModelItem.ActHeader"
                    class="form-control"
                    id="ActHeader"
                  />
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <ui-label-input
                    nameLabel="Периодичность отправки уведомления об оплате акта
                    (дни)"
                    placeholder=""
                    v-model="enterprisesModelItem.EmailSendPeriodicity"
                    id="EmailSendPeriodicity"
                    class="editing"
                  />
                </div>
                <div class="form-group">
                  <label for="Notes">Примечание</label>
                  <textarea
                    v-model="enterprisesModelItem.Notes"
                    class="form-control"
                    id="Notes"
                  />
                </div>
              </div>
            </div>
            <div class="row" v-if="id != undefined">
              <div class="col-6">
                <div class="form-log">
                  <table v-if="enterprisesModelItem.Editor">
                    <tr>
                      <th>Кем редактирован</th>
                      <td>
                        {{ enterprisesModelItem.Editor.FullName }}
                      </td>
                    </tr>
                    <tr>
                      <th>Дата добавления</th>
                      <td>
                        {{
                          $filterService.formatDateAll(
                            enterprisesModelItem.DateAdd
                          )
                        }}
                      </td>
                    </tr>
                    <tr>
                      <th>Когда редактирован</th>
                      <td>
                        {{
                          $filterService.formatDateAll(
                            enterprisesModelItem.DateChange
                          )
                        }}
                      </td>
                    </tr>
                    <tr>
                      <th>ID</th>
                      <td>
                        {{ enterprisesModelItem.Editor.Id }}
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
                  @click="SaveEnterprises"
                  v-if="id != undefined && !duplication"
                >
                  Сохранить
                </button>
                <button
                  class="btn btn-success mr-1"
                  @click="AddEnterprises"
                  v-else
                >
                  Сохранить
                </button>
                <!-- <button
                  class="btn btn-success mr-1"
                  @click="DeleteEnterprises"
                  v-if="id != undefined"
                >
                  Удалить
                </button>
                <button class="btn btn-success mr-1" @click="GoToHome" v-else>
                  Удалить
                </button> -->
                <!-- <button
                  class="btn btn-success"
                  @click="duplicateEnterprises"
                  v-if="!duplication && id !== undefined"
                >
                  Дублировать
                </button> -->

                <button class="btn btn-success" @click="GoToHome">
                  Отмена
                </button>
              </div>
              <div class="col-3 text-right">
                <router-link
                  class="btn btn-default"
                  :to="{ name: enterprises }"
                >
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
import { Options, Vue, Prop } from "vue-property-decorator";
import { ENTERPRISES } from "@/router/routerNames";
import EnterpriseDetailItem from "@/api/dataSource/api/plugins/models/controllersModels/enterprises/EnterpriseDetailItem";
import HttpResponseResult from "@/api/dataSource/api/plugins/models/httpResponseResult";
import SettlementType from "@/dictionary-servise/SettlementType";
import AddBalanceType from "@/dictionary-servise/AddBalanceType";
import GetListRequest from "@/api/dataSource/api/plugins/models/getListRequest";
import EnterpriseListRequest from "@/api/dataSource/api/plugins/models/controllersModels/enterprises/EnterpriseListRequest";
import FullPayment from "@/dictionary-servise/FullPayment";
import EnterpriseMapper from "@/maper-service/EnterpriseDetailMaper";
import EnterpriseDetailMaper from "@/api/dataSource/api/plugins/models/mapModel/enterprises/EnterpriseDetailMapper";
@Options({
  components: { EnterpriseMapper, EnterpriseDetailMaper },
  name: "EnterprisesDetailsPageComponent",
})
export default class EnterprisesDetailsPageComponent extends Vue {
  @Prop({ type: String, required: false }) id?: string;
  enterprises = ENTERPRISES;
  enterprisesModel: HttpResponseResult<EnterpriseDetailItem>;
  enterprisesModelItem: EnterpriseDetailMaper = new EnterpriseDetailMaper();
  //списки
  AllowedCurrencyList = [{ Name: "RUB" }, { Name: "EUR" }, { Name: "MDL" }];
  SettlementTypes = SettlementType;
  addBalanceType = AddBalanceType;
  FullPayment = FullPayment;

  filter: GetListRequest<EnterpriseListRequest> = {
    _page: 1,
    _perPage: 10,
  };
  //поля для ошибки
  wrong: boolean = false;
  wrongText: string = "";
  duplication: boolean = false;
  endCreated: boolean = false;

  // доп поля
  CashRegisterItem: any = null;
  ChildEntIdListItem: any = null;
  //часы 00:00:00
  ReportSendTime: string = "";
  // часы
  TimeDifference: number = null;

  async created() {
    if (this.id) {
      this.LoadCreate();
    } //else{
    // this.enterprisesModelItem= new EnterpriseDetailMaper();
    // }
    this.endCreated = true;
  }
  async LoadCreate() {
    //загруска деталей предприятия и заполнение всех доп плей
    this.enterprisesModel = await this.$api.EnterpriseService.getOne(
      Number(this.id)
    );
    this.enterprisesModelItem = EnterpriseMapper.fromServerModel(
      this.enterprisesModel.Response
    );
    if (this.$route.query.duubl == "true") {
      this.duplication = true;
      this.enterprisesModelItem.Id = undefined;
      this.enterprisesModelItem.Inn = "";
    }
    if (this.enterprisesModelItem.ChildEntIdList.length != 0) {
      let resChild = await this.$api.EnterpriseService.getMany(
        this.enterprisesModelItem.ChildEntIdList
      );
      this.ChildEntIdListItem = resChild.Response.map((x): {
        Id: number;
        Name: any;
      } => {
        return { Id: x.Id, Name: x.Name };
      });
    }
    if (this.enterprisesModelItem.CashRegister != null) {
      if (this.enterprisesModelItem.CashRegister?.Id !== undefined) {
        let cashRegisterItem = await this.$api.CashRegisterService.getOne(
          this.enterprisesModelItem.CashRegister.Id
        );
        this.CashRegisterItem = cashRegisterItem.Response;
      }
    }
    this.TimeDifference = Number(
      this.enterprisesModelItem.TimeDifference.slice(0, 2)
    );

    this.ReportSendTime = this.enterprisesModelItem.ReportSendTime;
  }
  GoToHome() {
    //кнопка "к таблице"
    this.$router.push({ name: this.enterprises });
  }
  // async duplicateEnterprises() {
  //   //дублирование предпрития
  //   if (!this.FieldValidation(this.enterprisesModelItem)) {
  //     return;
  //   }
  //   this.fieldСheck();
  //   let res = await this.$api.EnterpriseService.update(
  //     Number(this.id),
  //     this.enterprisesModelItem
  //   );
  //   if (res.IsSuccess) {
  //     this.duplication = true;
  //     this.enterprisesModelItem.Id = undefined;
  //     this.enterprisesModelItem.Inn = "";
  //     window.scrollTo({ top: 0, behavior: "smooth" });
  //   }
  // }
  // async DeleteEnterprises() {
  //   //удаление прадприятия
  //   var dialog = await this.$dialog.confirm(
  //     "Вы действительно хотите удалить предприятие " +
  //       this.enterprisesModelItem.Name +
  //       " ?"
  //   );
  //   if (dialog) {
  //     let res = await this.$api.EnterpriseService.delete(Number(this.id));
  //     if (res.IsSuccess) this.$router.push({ name: this.enterprises });
  //     else {
  //       this.wrong = true;
  //       this.wrongText = res.ErrorInfo.title;
  //       return;
  //     }
  //   }
  // }

  async AddEnterprises() {
    //добавление нового предприятия
    if (!this.FieldValidation(this.enterprisesModelItem)) {
      return;
    }
    this.fieldСheck();
    this.enterprisesModelItem.Editor = null;
    let res = await this.$api.EnterpriseService.create(
      this.enterprisesModelItem
    );
    // this.enterprisesModelItem.ReportSendTime = this.ReportSendTime;
    if (res.IsSuccess) {
      this.$router.push({ name: this.enterprises });
    } else {
      this.wrong = true;
      this.wrongText = res.ErrorInfo.title;
    }
  }
  fieldСheck() {
    //сопоставление всех доп полей с моделю для отправки на сервер

    if (this.CashRegisterItem == null)
      this.enterprisesModelItem.CashRegister = null;
    else this.enterprisesModelItem.CashRegister.Id = this.CashRegisterItem;
    // console.log("ReportSendTime", this.ReportSendTime);

    if (this.ReportSendTime != undefined && this.ReportSendTime.length != 0) {
      let reportSendTime = this.ReportSendTime.split(":");
      let hour = reportSendTime[0];
      let min = reportSendTime[1];
      let sec = reportSendTime[2];
      this.enterprisesModelItem.ReportSendTime = hour + ":" + min + ":" + sec;
    } else this.enterprisesModelItem.ReportSendTime = this.ReportSendTime;

    if (this.ChildEntIdListItem !== null) {
      this.enterprisesModelItem.ChildEntIdList = this.ChildEntIdListItem.map(
        (i) => i.Id
      );
    }
    if (this.TimeDifference != undefined && this.TimeDifference != null)
      this.enterprisesModelItem.TimeDifference =
        this.TimeDifference.toString() + ":00:00";
    else this.enterprisesModelItem.TimeDifference = undefined;

    if (this.enterprisesModelItem.AllowedCurrencyList == undefined)
      this.enterprisesModelItem.AllowedCurrencyList = [];

    if (!Array.isArray(this.enterprisesModelItem.AllowedCurrencyList)) {
      this.enterprisesModelItem.AllowedCurrencyList = [
        this.enterprisesModelItem.AllowedCurrencyList,
      ];
    }
  }
  async SaveEnterprises() {
    // сохранение отредактированного предприятия
    if (!this.FieldValidation(this.enterprisesModelItem)) {
      return;
    }
    this.fieldСheck();
    let res = await this.$api.EnterpriseService.update(
      Number(this.id),
      this.enterprisesModelItem
    );
    if (res.IsSuccess) {
      this.$router.push({ name: this.enterprises });
    } else {
      this.wrong;
      this.wrongText = res.ErrorInfo.title;
    }
  }

  FieldValidation(enterprisesModelItem: EnterpriseDetailItem) {
    //валидация всех полей предприятия
    this.wrong = true;
    this.wrongText = "";
    if (
      ((enterprisesModelItem.Name == undefined ||
        enterprisesModelItem?.Name?.length == 0) &&
        (enterprisesModelItem?.FullName?.length == 0 ||
          enterprisesModelItem.FullName == undefined) &&
        (enterprisesModelItem?.Inn?.length == 0 ||
          enterprisesModelItem.Inn == undefined) &&
        this.id == undefined) ||
      ((enterprisesModelItem.Name.length == 0 ||
        enterprisesModelItem.FullName.length == 0 ||
        enterprisesModelItem.Inn.length == 0) &&
        this.id !== undefined)
    ) {
      this.wrongText = "Заполните обязательные поля";
    }
    if (enterprisesModelItem.Inn.length > 20) {
      this.wrongText = "МАксимальная длина ИНН 20 символов";
    }
    let reportSendTime = this.ReportSendTime.split(":");
    if (this.ReportSendTime != undefined && this.ReportSendTime.length != 0)
      if (reportSendTime?.length != 3) {
        this.wrongText = "Введите 'время рассылки счетов' в праильном формате";
      } else {
        let hour = Number(reportSendTime[0]);
        let min = Number(reportSendTime[1]);
        let sec = Number(reportSendTime[2]);
        if (hour == NaN || min == NaN || sec == NaN) {
          this.wrongText =
            "Введите 'время рассылки счетов' в праильном формате";
        }
        if (hour > 24 || hour < 0) {
          this.wrongText = "Введите часы 'время рассылки счетов' от 0 до 23";
        }
        if (min > 59 || min < 0) {
          this.wrongText = "Введите минуты 'время рассылки счетов' от 0 до 59";
        }
        if (sec > 59 || sec < 0) {
          this.wrongText = "Введите секунды 'время рассылки счетов' от 0 до 59";
        }
        if (reportSendTime[0].length == 1)
          reportSendTime[0] = "0" + reportSendTime[0];
        if (reportSendTime[1].length == 1)
          reportSendTime[1] = "0" + reportSendTime[1];

        if (reportSendTime[2].length == 1)
          reportSendTime[2] = "0" + reportSendTime[2];
        this.ReportSendTime =
          reportSendTime[0] + ":" + reportSendTime[1] + ":" + reportSendTime[2];
      }
    if (this.TimeDifference < 0 || this.TimeDifference > 23) {
      this.wrongText = "Разница с Мсоковским временем от 0 до 24 часов";
    }
    if (enterprisesModelItem.RewardFromPayPercent > 1000) {
      this.wrongText = "Вознаграждение агента должно быть меньше 1000%";
    }
    if (enterprisesModelItem.MaxLimitSize >= 999999999) {
      this.wrongText =
        "Максимальный кредитный лимит должен быть меньше 1 миллиарда";
    }
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      enterprisesModelItem.Email !== null &&
      enterprisesModelItem.Email.length > 0
    ) {
      if (!re.test(String(enterprisesModelItem.Email).toLowerCase())) {
        this.wrongText = "Введите валидный email";
      }
    }
    if (this.wrongText != "") return false;
    this.wrong = false;
    return true;
  }
  async GetSybAgent(search?: string) {
    //получение по search субагентов
    return await this.$api.EnterpriseService.getList({
      _filters: { Name: search },
      _page: 1,
      _perPage: 6,
    });
  }
  async GetCashRegister(search?: string) {
    //получение по search кассовых аппаратов
    return await this.$api.CashRegisterService.getList({
      _filters: { RegNumber: search },
      _page: 1,
      _perPage: 6,
    });
  }
}
</script>
<style lang="less">
.router-link-btn {
  background-color: #71b92f;
  color: #fff;
}
</style>
