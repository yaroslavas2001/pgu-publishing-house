<template>
  <ui-quick-view titleText="Информация о точке" @goToHome="$emit('hideDetail')">
    <template #table>
      <div class="panel-body">
        <div class="form-log">
          <table>
            <tr>
              <th>ID</th>
              <td>{{ pointDetailItem.Id }}</td>
            </tr>
            <tr>
              <th>Код точки в магазине</th>
              <td>{{ pointDetailItem.ShopPosCode }}</td>
            </tr>
            <tr>
              <th>Субагент</th>
              <td>
                {{ pointDetailItem.Shop.Enterprise.Name }}
              </td>
            </tr>
            <tr>
              <th>Магазин</th>
              <td>
                {{ pointDetailItem.Shop.Name }}
              </td>
            </tr>

            <tr>
              <th>Тип интерфейса точки</th>
              <td>{{ PosType }}</td>
            </tr>
            <tr>
              <th>Время работы (чч:мм-чч:мм)</th>
              <td>{{ pointDetailItem.BusinessHours }}</td>
            </tr>
            <tr>
              <th>Сколько ждать alive от терминала (сек)</th>
              <td>{{ pointDetailItem.N4AliveTimeout }}</td>
            </tr>
            <tr>
              <th>Суточный лимит</th>
              <td>{{ pointDetailItem.DayLimit }}</td>
            </tr>
            <tr>
              <th>Недельный лимит</th>
              <td>{{ pointDetailItem.WeekLimit }}</td>
            </tr>
            <tr>
              <th>Месячный лимит</th>
              <td>{{ pointDetailItem.MonthLimit }}</td>
            </tr>
            <tr>
              <th>Юр. наименование</th>
              <td>{{ pointDetailItem.JurAdress }}</td>
            </tr>
            <tr>
              <th>Место установки точки</th>
              <td>{{ pointDetailItem.Address.Apartment.Type.Id }}</td>
            </tr>
            <tr>
              <th>Куратор</th>
              <td>{{ pointDetailItem.Shop.Enterprise.CuratorFio }}</td>
            </tr>
            <tr>
              <th>Реклама на верхних мониторах</th>
              <td>{{ pointDetailItem.TopAdvertise }}</td>
            </tr>
            <tr>
              <th>Почтовый индекс</th>
              <td>{{ pointDetailItem.Address.Zip }}</td>
            </tr>
            <tr>
              <th>Долгота</th>
              <td>{{ pointDetailItem.Longtitude }}</td>
            </tr>
            <tr>
              <th>Широта</th>
              <td>{{ pointDetailItem.Latitude }}</td>
            </tr>
            <tr>
              <th>Серийный номер киоска</th>
              <td>{{ pointDetailItem.SerialNum }}</td>
            </tr>
            <tr>
              <th>Версия ПО</th>
              <td>{{ pointDetailItem.SoftVersion }}</td>
            </tr>
            <tr>
              <th>Версия шлюза</th>
              <td>{{ pointDetailItem.N4GWVersion }}</td>
            </tr>
            <tr>
              <th>Номер сим карты</th>
              <td>{{ pointDetailItem.Mobile }}</td>
            </tr>
            <tr>
              <th>
                Дата последнего обращения на сервер для получения запроса к
                киоску
              </th>
              <td>
                {{
                  $filterService.formatDateAll(
                    pointDetailItem.pos_LAST_N4UPLOAD_DATE
                  )
                }}
              </td>
            </tr>
            <tr>
              <th>Статус регистрации точки</th>
              <td>{{ PosRegistrationState }}</td>
            </tr>
            <tr>
              <th>Код точки в магазине</th>
              <td>{{ pointDetailItem.ShopPosCode }}</td>
            </tr>
            <tr>
              <th>Код точки у оператора</th>
              <td>{{ pointDetailItem.BeepayPosCode }}</td>
            </tr>
            <tr>
              <th>Режим приема платежей</th>
              <td>{{ paymentAcceptanceMode }}</td>
            </tr>
            <tr>
              <th>Тип устройства приема платежей</th>
              <td>{{ Device }}</td>
            </tr>
            <!-- pointDetailItem.DeviceType.Id -->
            <tr>
              <th>Комментарий к техническому состоянию</th>
              <td>{{ pointDetailItem.TerminalStateComment }}</td>
            </tr>
            <tr>
              <th>Описание расположения в магазине</th>
              <td>{{ pointDetailItem.TerminalPlaceComment1 }}</td>
            </tr>
            <tr>
              <th>Адрес</th>
              <td>{{ pointDetailItem.CalculatedAddress }}</td>
            </tr>
            <tr>
              <th>Серийный номеркиоска</th>
              <td>{{ pointDetailItem.SerialNum }}</td>
            </tr>
            <tr>
              <th>Версия ПО</th>
              <td>{{ pointDetailItem.SoftVersion }}</td>
            </tr>
          </table>
        </div>
        <div class="wrong">{{ wrongText }}</div>
      </div>
    </template>
    <template #btn>
      <button
        class="btn btn-success btn-quick-view"
        @click="$emit('edit', pointDetailItem.Id)"
      >
        Редактировать
      </button>
      <button
        class="btn btn-success btn-quick-view"
        @click="$emit('duplicate', pointDetailItem.Id)"
      >
        Дублировать
      </button>
      <button
        class="btn btn-success btn-quick-view"
        @click="$emit('delete', pointDetailItem.Id)"
      >
        Удалить
      </button>
    </template>
  </ui-quick-view>
</template>
<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";
import PointDetailMaperModel from "@/api/dataSource/api/plugins/models/mapModel/points/PointDetailMaperModel";
import PaymentAcceptanceMode from "@/dictionary-servise/PaymentAcceptanceMode";
import PosRegistrationState from "@/dictionary-servise/PosRegistrationState";
// import PaymentAcceptanceMode from "@/dictionary-servise/PaymentAcceptanceMode";

@Options({
  components: {},
  emits: ["hideDetail", "delete", "duplicate", "edit"],
  name: "UiQuickViewPointComponent",
})
export default class UiQuickViewPointComponent extends Vue {
  @Prop({ type: Object }) modelValue: PointDetailMaperModel;
  @Prop({ type: String }) wrongText: string;

  pointDetailItem: PointDetailMaperModel = null;
  DeviceType: Array<any> = [];
  PosTypeArray: Array<any> = [];
  PosType: string = null;
  Device: string = null;
  PosRegistrationState:string=null
  paymentAcceptanceMode: string = null;
  async created() {
    this.pointDetailItem = this.modelValue;
    this.paymentAcceptanceMode = PaymentAcceptanceMode.find(
      (el) => el.Id == this.pointDetailItem.Online
    ).Name;
    this.DeviceType = await this.$initService.state.GetDeviceType();
    this.PosTypeArray = await this.$initService.state.GetPosType();

    this.Device = this.DeviceType.find(
      (el) => el.Id == this.pointDetailItem.DeviceType.Id
    ).Name;
    console.log("this.PosTypeArray ",this.PosTypeArray ,this.pointDetailItem.Type.Id)
    if(this.pointDetailItem.Type.Id!=undefined)
    this.PosType = this.PosTypeArray.find(
      (el) => el.Id == this.pointDetailItem.Type.Id
    ).Name;
  this.PosRegistrationState = PosRegistrationState.find((el) => el.Id == this.pointDetailItem.RegistrationStatus).Name
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
