<template>
  <ui-quick-view
    titleText="Информация о предприятии"
    @goToHome="$emit('hideDetail')"
  >
    <template #table>
      <div class="panel-body">
        <div class="form-log">
          <table v-if="enterprisesDetailItem">
            <tr>
              <th>ID</th>
              <td>{{ enterprisesDetailItem.Id }}</td>
            </tr>
            <tr>
              <th>Статус (заблокирован?)</th>
              <td>
                {{ enterprisesDetailItem.IsBlocked }}
              </td>
            </tr>
            <tr>
              <th>Плательщик НДС</th>
              <td>{{ enterprisesDetailItem.IsNdsPayer }}</td>
            </tr>
            <tr>
              <th>Агент RunPay</th>
              <td>
                {{ enterprisesDetailItem.IsMini }}
              </td>
            </tr>
            <tr>
              <th>Субагент</th>
              <td>{{ enterprisesDetailItem.Name }}</td>
            </tr>
            <tr>
              <th>Юридическое лицо</th>
              <td>{{ enterprisesDetailItem.FullName }}</td>
            </tr>
            <tr>
              <th>Адрес</th>
              <td>{{ enterprisesDetailItem.Address }}</td>
            </tr>
            <tr>
              <th>Контактный телефон</th>
              <td>{{ enterprisesDetailItem.Phone }}</td>
            </tr>
            <tr>
              <th>E-mail</th>
              <td>{{ enterprisesDetailItem.Email }}</td>
            </tr>
            <tr>
              <th>Факс</th>
              <td>{{ enterprisesDetailItem.Fax }}</td>
            </tr>
            <tr>
              <th>Банковские реквизиты</th>
              <td>{{ enterprisesDetailItem.BankRequisite }}</td>
            </tr>
            <tr>
              <th>Тип взаиморасчета</th>
              <td v-if="enterprisesDetailItem.BillingType == 0">Кредитный</td>
              <td v-if="enterprisesDetailItem.BillingType == 1">Авансовый</td>
            </tr>
            <tr>
              <th>ИНН</th>
              <td>{{ enterprisesDetailItem.Inn }}</td>
            </tr>
            <tr>
              <th>КПП</th>
              <td>{{ enterprisesDetailItem.Kpp }}</td>
            </tr>
            <tr>
              <th>Разница с московским временем</th>
              <td>
                {{ enterprisesDetailItem.TimeDifference }}
              </td>
            </tr>
            <tr>
              <th>Способ удержания вознаграждения</th>
              <td>{{ FullPayment }}</td>
            </tr>
            <tr>
              <th>Способ начисления баланса</th>
              <td>{{ AddBalanceType }}</td>
            </tr>
            <tr>
              <th>Вознаграждение Агента (фикс.)</th>
              <td>{{ enterprisesDetailItem.RewardFromPayAmount }}</td>
            </tr>
            <tr>
              <th>Сумма застрахованного потока</th>
              <td>{{ enterprisesDetailItem.InsuredLimit }}</td>
            </tr>
            <tr>
              <th>Блок застрахованного поктока (руб.)</th>
              <td>{{ enterprisesDetailItem.InsuredBlockSum }}</td>
            </tr>
            <tr>
              <th>Стоимость блока застрахованного потока</th>
              <td>{{ enterprisesDetailItem.InsuredBlockPrice }}</td>
            </tr>
            <tr>
              <th>Дата действия страховки</th>
              <td>
                {{
                  $filterService.formatDateAll(
                    enterprisesDetailItem.InsuredBlockEndDate
                  )
                }}
              </td>
            </tr>
            <tr>
              <th>Зарегистрирован в НБМ</th>
              <td>{{ enterprisesDetailItem.IsVerified }}</td>
            </tr>
            <tr>
              <th>Количество дней для оплаты акта</th>
              <td>{{ enterprisesDetailItem.DaysForPay }}</td>
            </tr>
            <tr>
              <th>Сумма по договору (руб.)</th>
              <td>{{ enterprisesDetailItem.AgreementAmount }}</td>
            </tr>
            <tr>
              <th>Экстра лимит</th>
              <td>{{ enterprisesDetailItem.ExtraLimit }}</td>
            </tr>
            <!-- <tr>
              <th>Максимальный кредитный лимит</th>
              <td>{{ enterprisesDetailItem.MaxLimitSize }}</td>
            </tr>
                <tr>
              <th>Модель провизиона</th>
              <td>{{ enterprisesDetailItem.ProvisionModel }}</td>
            </tr> -->

            <tr>
              <th>Стоимость регистрации пользователя Emoney</th>
              <td>{{ enterprisesDetailItem.EmoneyRegistrationCoast }}</td>
            </tr>
            <tr>
              <th>Дата и время отправки последнего счета</th>
              <td>
                {{
                  $filterService.formatDateAll(
                    enterprisesDetailItem.LastReportDate
                  )
                }}
              </td>
            </tr>
            <tr>
              <th>Время рассылки счетов (чч:мм:сс)</th>
              <td>{{ enterprisesDetailItem.ReportSendTime }}</td>
            </tr>
            <tr>
              <th>Периодичность рассылки счетом в днях</th>
              <td>{{ enterprisesDetailItem.ReportSendPeriodicity }}</td>
            </tr>
            <tr>
              <th>Валюты платежа</th>
              <td>
                {{ enterprisesDetailItem.AllowedCurrencyList.join(", ") }}
              </td>
            </tr>
            <tr>
              <th>Дочерние предприятия</th>
              <td>
                {{ enterprisesDetailItem.ChildEntIdList.join(", ") }}
              </td>
            </tr>
            <tr>
              <th>Должность лица, подписывающего документы</th>
              <td>{{ enterprisesDetailItem.SignaturePosition }}</td>
            </tr>
            <tr>
              <th>ФИО лица, подписывающего документы</th>
              <td>{{ enterprisesDetailItem.SignatureFIO }}</td>
            </tr>
            <tr>
              <th>ФИО главного бухгалтера</th>
              <td>{{ enterprisesDetailItem.ChiefAccountantFio }}</td>
            </tr>
            <tr>
              <th>ФИО куратора</th>
              <td>{{ enterprisesDetailItem.CuratorFio }}</td>
            </tr>
            <tr>
              <th>Периодичность отправки уведомления об оплате акта (дни)</th>
              <td>{{ enterprisesDetailItem.EmailSendPeriodicity }}</td>
            </tr>
            <tr>
              <th>Примечание</th>
              <td>{{ enterprisesDetailItem.Notes }}</td>
            </tr>
            <tr>
              <th>Статус регистрации</th>
              <td>{{ StateText }}</td>
            </tr>
            <tr>
              <th>Кем редактирован</th>
              <td>{{ enterprisesDetailItem.Editor.FullName }}</td>
            </tr>
            <tr>
              <th>Дата добавления</th>
              <td>
                {{
                  $filterService.formatDateAll(enterprisesDetailItem.DateAdd)
                }}
              </td>
            </tr>
            <tr>
              <th>Когда редактирован</th>
              <td>
                {{
                  $filterService.formatDateAll(enterprisesDetailItem.DateChange)
                }}
              </td>
            </tr>
          </table>
        </div>
        <div class="wrong">{{ wrongText }}</div>
      </div>
    </template>
    <template #btn>
      <button
        class="btn btn-success btn-quick-view"
        @click="$emit('edit', enterprisesDetailItem.Id)"
      >
        Редактировать
      </button>
      <button
        class="btn btn-success btn-quick-view"
        @click="$emit('duplicate', enterprisesDetailItem.Id)"
      >
        Дублировать
      </button>
      <button
        class="btn btn-success btn-quick-view"
        @click="$emit('delete', enterprisesDetailItem.Id)"
      >
        Удалить
      </button>
    </template>
  </ui-quick-view>
</template>
<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";
import EnterpriseDetailMaper from "@/api/dataSource/api/plugins/models/mapModel/enterprises/EnterpriseDetailMapper";
import State from "@/dictionary-servise/State";
import FullPayment from "@/dictionary-servise/FullPayment";
import AddBalanceType from "@/dictionary-servise/AddBalanceType";

@Options({
  components: { State },
  emits: ["hideDetail", "delete", "duplicate", "edit"],
  name: "UiQuickViewEnterprisesComponent",
})
export default class UiQuickViewEnterprisesComponent extends Vue {
  @Prop({ type: Object }) modelValue: EnterpriseDetailMaper;
  @Prop({ type: String }) wrongText: string;
  FullPayment: string = null;
  AddBalanceType: string = null;
  state = State;
  StateText: string = "";
  enterprisesDetailItem: EnterpriseDetailMaper = new EnterpriseDetailMaper();
  async created() {
    this.enterprisesDetailItem = this.modelValue;
    this.FullPayment = FullPayment.find(
      (el) => this.enterprisesDetailItem.FullPayment == el.Id
    ).Name;
    this.AddBalanceType = AddBalanceType.find(
      (el) => this.enterprisesDetailItem.AddBalanceType == el.Id
    ).Name;
    this.StateText = this.state.find(
      (el) => el.Id == this.enterprisesDetailItem.State
    ).Name;
  }
}
</script>
<style scoped lang="less">
.btn-quick-view {
  margin-right: 10px;
  margin-bottom: 10px;
}
.wrong {
  margin-top: 10px;
}
</style>
