<template>
  <ui-quick-view
    titleText="Информация о магазине"
    @goToHome="$emit('hideDetail')"
  >
    <template #table>
      <div class="panel-body">
        <div class="form-log">
          <table>
            <tr>
              <th>ID</th>
              <td>{{ shopDetailItem.Id }}</td>
            </tr>
            <tr>
              <th>Код</th>
              <td>{{ shopDetailItem.Code }}</td>
            </tr>
            <tr>
              <th>Наименование</th>
              <td>{{ shopDetailItem.Name }}</td>
            </tr>
            <tr>
              <th>Полное наименование</th>
              <td>{{ shopDetailItem.FullName }}</td>
            </tr>
            <tr>
              <th>Субагент</th>
              <td>
                {{ shopDetailItem.Enterprise.Name }}
              </td>
            </tr>
            <tr>
              <th>Торговая марка</th>
              <td>
                {{ shopDetailItem.BrendName }}
              </td>
            </tr>
            <tr>
              <th>Адрес</th>
              <td>
                {{ shopDetailItem.Address }}
              </td>
            </tr>
            <tr>
              <th>Контактный телефон</th>
              <td>
                {{ shopDetailItem.Phone }}
              </td>
            </tr>
            <tr>
              <th>Факс</th>
              <td>
                {{ shopDetailItem.Fax }}
              </td>
            </tr>
            <tr>
              <th>Тип взаиморасчета</th>
              <td>
                <div v-if="shopDetailItem.BillingType == 0">Кредитный</div>
                <div v-if="shopDetailItem.BillingType == 1">Авансовый</div>
              </td>
            </tr>
            <tr>
              <th>Примечание</th>
              <td>
                {{ shopDetailItem.Notes }}
              </td>
            </tr>
            <tr>
              <th>Кем редактирован</th>
              <td>{{ shopDetailItem.Editor.FullName }}</td>
            </tr>
            <tr>
              <th>Дата добавления</th>
              <td>
                {{ $filterService.formatDateAll(shopDetailItem.DateAdd) }}
              </td>
            </tr>
            <tr>
              <th>Когда редактирован</th>
              <td>
                {{ $filterService.formatDateAll(shopDetailItem.DateChange) }}
              </td>
            </tr>
            <tr>
              <th>Состояние</th>
              <td>{{ StateText }}</td>
            </tr>
          </table>
        </div>
        <div class="wrong">{{ wrongText }}</div>
      </div>
    </template>
    <template #btn>
      <button
        class="btn btn-success btn-quick-view"
        @click="$emit('edit', shopDetailItem.Id)"
      >
        Редактировать
      </button>
      <button
        class="btn btn-success btn-quick-view"
        @click="$emit('duplicate', shopDetailItem.Id)"
      >
        Дублировать
      </button>
      <button
        class="btn btn-success btn-quick-view"
        @click="$emit('delete', shopDetailItem.Id)"
      >
        Удалить
      </button>
    </template>
  </ui-quick-view>
</template>
<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";
import ShopDetailMapper from "@/api/dataSource/api/plugins/models/mapModel/shop/ShopDetailMaperModel";
import State from "@/dictionary-servise/State";

@Options({
  components: {},
  emits: ["hideDetail", "delete", "duplicate", "edit"],
  name: "UiQuickViewShopComponent",
})
export default class UiQuickViewShopComponent extends Vue {
  @Prop({ type: Object }) modelValue: ShopDetailMapper;
  @Prop({ type: String }) wrongText: string;
  StateText: string = null;
  shopDetailItem: ShopDetailMapper = new ShopDetailMapper();
  created() {
    this.shopDetailItem = this.modelValue;
    this.StateText = State.find(
      (el) => el.Id == this.shopDetailItem.State
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
