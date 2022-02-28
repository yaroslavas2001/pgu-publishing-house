<template>
  <ui-quick-view
    titleText="Информация о терминале"
    @goToHome="$emit('hideDetail')"
  >
    <template #table>
    <div class="panel-body">
      <div class="form-log">
        <table>
          <tr>
            <th>Субагент</th>
            <td>
              {{
                PointOfSalesMonitoringDetailItem.PointOfSales.Shop.Enterprise
                  .Name
              }}
            </td>
          </tr>
          <tr>
            <th>Магазин</th>
            <td>
              {{ PointOfSalesMonitoringDetailItem.PointOfSales.Shop.Name }}
            </td>
          </tr>
          <tr>
            <th>Код точки</th>
            <td>
              {{ PointOfSalesMonitoringDetailItem.PointOfSales?.ShopPosCode }}
            </td>
          </tr>
          <tr>
            <th>Состояние</th>
            <td></td>
          </tr>
          <tr>
            <th>Баланс</th>
            <td></td>
          </tr>
          <tr>
            <th>Принтер</th>
            <td></td>
          </tr>
          <tr>
            <th>Купюроприемник</th>
            <td></td>
          </tr>
          <tr>
            <th>Не принято купрюр (%)</th>
            <td></td>
          </tr>
          <tr>
            <th>Диспенсер верхняя кассета</th>
            <td></td>
          </tr>
          <tr>
            <th>Диспенсер нижняя кассета</th>
            <td></td>
          </tr>
          <tr>
            <th>Дата</th>
            <td>
              {{
                $filterService.formatDate(PointOfSalesMonitoringDetailItem.Date)
              }}
            </td>
          </tr>
          <tr>
            <th>Версии ПО</th>
            <td>
              {{ PointOfSalesMonitoringDetailItem.PointOfSales.SoftVersion }}
            </td>
          </tr>
          <tr>
            <th>Версии шлюза</th>
            <td>
              {{ PointOfSalesMonitoringDetailItem.PointOfSales.N4GWVersion }}
            </td>
          </tr>
          <tr>
            <th>Версии установленного ПО</th>
            <td>{{ PointOfSalesMonitoringDetailItem.AppInfo.VerAppInfo }}</td>
          </tr>
          <tr>
            <th>Последняя ошибка</th>
            <td>{{ PointOfSalesMonitoringDetailItem.LastErrors }}</td>
          </tr>
        </table>
      </div>
    </div>
    </template>
  </ui-quick-view>
</template>
<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";
import PointOfSalesMonitoringListItem from "@/api/dataSource/api/plugins/models/controllersModels/pointOfSalesMonitoring/PointOfSalesMonitoringListItem";
@Options({
  components: {},
  emits: ["hideDetail"],
  name: "UiQuickViewTerminalComponent",
})
//UiQuickViewEnterprisesComponent
export default class UiQuickViewTerminalComponent extends Vue {
  @Prop({ type: Object }) modelValue: PointOfSalesMonitoringListItem;

  PointOfSalesMonitoringDetailItem: PointOfSalesMonitoringListItem = {};
  created() {
    this.PointOfSalesMonitoringDetailItem = this.modelValue;
  }
}
</script>
<style scoped lang="less">
</style>
