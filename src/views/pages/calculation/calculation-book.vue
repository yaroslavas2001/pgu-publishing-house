<template>
  <div>
    <label-input
      nameLabel="Тираж"
      placeholder="Введите число"
      v-model="model.Circulation"
      type="number"
    />
    <label-input
      nameLabel="Объем"
      placeholder="Введите число"
      v-model="model.Volume"
      type="number"
    />
    Сделать выпадающий список с расчетом работ
    <!-- форма заказ наряд -->
    <ui-checkbox v-model="model.IsEditing" class="mb-5">
      Редактирование - вычитка, исправление ошибок
    </ui-checkbox>
    <ui-checkbox v-model="model.IsFirstProofreading" class="mb-5">
      Первая корректура - вносится исправления
    </ui-checkbox>
    <ui-checkbox v-model="model.IsRevision" class="mb-5">Ревизия - </ui-checkbox>
    <ui-checkbox v-model="model.IsTyping" class="mb-5">Набор</ui-checkbox>
    <ui-checkbox v-model="model.IsPrototyping" class="mb-5">
      Макетирование
    </ui-checkbox>
    <!-- <ui-checkbox v-model="model.IsReplication">IsReplication</ui-checkbox> -->

    <div class="sum">Цена экземпляра : {{ one.toFixed(2) }}</div>
    <div class="sum">Итого затрат : {{ sum.toFixed(2) }}</div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import CalculationСhangeModel from "@models/calculation/book/CalculationСhangeModel";
// @Options({
//   emits: ["goToAdmin"],
// })
export default class CalculationBook extends Vue {
  model: CalculationСhangeModel = new CalculationСhangeModel();
  get one(): number {
    // console.log(this.model.one === NaN || this.model.one===Infinity? 0:this.model.one );
    return isNaN(this.model.one) ||
      this.model.one == Infinity ||
      this.model.Volume < 0 ||
      this.model.Circulation < 0
      ? 0
      : this.model.one;
  }
    get sum(): number {
    // console.log(this.model.one === NaN || this.model.one===Infinity? 0:this.model.one );
    return isNaN(this.model.all) ||
      this.model.all == Infinity ||
      this.model.Volume < 0 ||
      this.model.Circulation < 0
      ? 0
      : this.model.all;
  }
  created() {
    this.model = new CalculationСhangeModel();
  }
}
</script>
<style scoped >
.sum {
  margin: 10px 0px;
}
</style>