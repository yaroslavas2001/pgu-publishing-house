<template>
  <ui-quick-view
    titleText="Информация о платеже"
    @goToHome="$emit('hideDetail')"
  >
    <template #table>
      <div class="panel-body">
        <div class="form-log">
          <div class="table-legend">
            <span class="l-success">Платёж проведён</span>
            <span class="l-danger">Превышен допустимый баланс</span>
            <span class="l-warning">Платёж оплачен</span>
            <span class="l-delete">Платёж удалён</span>
          </div>
          <table>
            <tr>
              <th>ID</th>
              <td>{{ paymentDetailItem.Id }}</td>
            </tr>
            <tr>
              <th>Статус платежа</th>
              <td>{{ paymentDetailItem.StatusName }}</td>
            </tr>
            <tr>
              <th>Оператор</th>
              <td>{{ paymentDetailItem.OperatorName }}</td>
            </tr>
            <tr>
              <th>Субагент</th>
              <td>{{ paymentDetailItem.Enterprise.Name }}</td>
            </tr>
            <tr>
              <th>Магазин</th>
              <td>{{ paymentDetailItem.Shop.Name }}</td>
            </tr>
            <tr>
              <th>Код точки приема платежа</th>
              <td>
                {{ paymentDetailItem.PosCode }}
                {{ paymentDetailItem.PosAddress }}
              </td>
            </tr>
            <tr>
              <th>Номер телефона/счета</th>
              <td>{{ paymentDetailItem.Phone }}</td>
            </tr>
            <tr>
              <th>Сумма</th>
              <td>{{ paymentDetailItem.Summa }}</td>
            </tr>
            <tr>
              <th>NN платежа в магазине</th>
              <td>{{ paymentDetailItem.TransactionNumber }}</td>
            </tr>
            <tr>
              <th>ID платежа у оператора</th>
              <td>{{ paymentDetailItem.OperatorId }}</td>
            </tr>
            <tr>
              <th>Код ошибки</th>
              <td>{{ paymentDetailItem.RequestErrorDescription }}</td>
            </tr>
            <tr>
              <th>Статус отчета</th>
              <td>
                <span v-if="paymentDetailItem.ReportState == 0">
                  Не проведенные
                </span>
                <span v-if="paymentDetailItem.ReportState == 1"
                  >Проведенные</span
                >
                <span v-if="paymentDetailItem.ReportState == 2">
                  Отмененные
                </span>
                <span v-if="paymentDetailItem.ReportState == 3">
                  Обнаружена оплата фальшивыми деньгами
                </span>
                <span v-if="paymentDetailItem.ReportState == 4">
                  Оплаченные субагентом
                </span>
                <span v-if="paymentDetailItem.ReportState == 5">
                  Непрошедшие проверку в оффлайне
                </span>
                <span v-if="paymentDetailItem.ReportState == 6">
                  Оплаченые, но не проведенные
                </span>
              </td>
            </tr>
            <tr>
              <th>Идентификатор запроса на проверку</th>
              <td>{{ paymentDetailItem.Request1Id }}</td>
            </tr>
            <tr>
              <th>Идентификатор запроса на подтверждение</th>
              <td>{{ paymentDetailItem.Request2Id }}</td>
            </tr>
            <tr>
              <th>Оффлайн?</th>
              <td>{{ paymentDetailItem.IsOffline }}</td>
            </tr>
            <tr>
              <th>Кол-во попыток отправки платежа оператору</th>
              <td>{{ paymentDetailItem.GatewayAttempts }}</td>
            </tr>
            <tr>
              <th>Дата регистрации платежа в система (UTC+2)</th>
              <td>
                {{
                  $filterService.formatDateAll(paymentDetailItem.Request1Date)
                }}
              </td>
            </tr>
            <tr>
              <th>Дата платежа на точке (местное время)</th>
              <td>
                {{
                  $filterService.formatDateAll(
                    paymentDetailItem.TransactionDate
                  )
                }}
              </td>
            </tr>
            <tr>
              <th>Дата изменения статуса (UTC+2)</th>
              <td>
                {{ $filterService.formatDateAll(paymentDetailItem.StatusDate) }}
              </td>
            </tr>
            <tr>
              <th>Дата пометки удаления</th>
              <td>
                {{
                  $filterService.formatDateAll(paymentDetailItem.DeleteMarkDate)
                }}
              </td>
            </tr>
            <tr>
              <th>Дата платежа в шлюзе</th>
              <td>
                {{
                  $filterService.formatDateAll(paymentDetailItem.Accept_Date)
                }}
              </td>
            </tr>
            <tr>
              <th>Название шлюза</th>
              <td>
                {{ paymentDetailItem.GatewayName }}
              </td>
            </tr>
            <tr>
              <th>Параметры оплаты платежа</th>
              <td>
                {{ paymentDetailItem.PayNotes }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </template>
  </ui-quick-view>
</template>
<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";
import PaymentsDetailItem from "@/api/dataSource/api/plugins/models/controllersModels/payments/PaymentsDetailItem";
@Options({
  components: {},
  emits: ["hideDetail"],
  name: "UiQuickViewPaymentsComponent",
})
export default class UiQuickViewPaymentsComponent extends Vue {
  @Prop({ type: Object }) modelValue: PaymentsDetailItem;
  summ: number = null;
  paymentDetailItem: PaymentsDetailItem = {};
  created() {
    this.paymentDetailItem = this.modelValue;
    let Currency =
      this.paymentDetailItem.Currency != null
        ? this.paymentDetailItem.Currency
        : this.paymentDetailItem.DefaultCurrency != null
        ? this.paymentDetailItem.DefaultCurrency
        : 0;
    this.paymentDetailItem.Summa =
      this.paymentDetailItem.Summa +
      this.paymentDetailItem.FullSumma +
      Currency +
      this.paymentDetailItem.Rate;
  }
}
</script>
<style scoped lang="less">
.form-log {
  overflow-y: auto;
}
.table-legend {
  display: flex;
  flex-wrap: wrap;
}
</style>
