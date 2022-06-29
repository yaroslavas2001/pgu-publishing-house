<template>
  <div>
    <div class="mb-10">Книга, статья, методическо пособие и др.</div>
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
    <label-input
      nameLabel="Редактирование"
      placeholder="Введите число"
      v-model="model.Editing"
      type="number"
      title="Сколько раз статья пройдет этап редактирования."
    />
    <label-input
      nameLabel="Корректура"
      placeholder="Введите число"
      v-model="model.FirstProofreading"
      type="number"
      title="Исправление типографских ошибок на оттиске набора."
    />
    <!-- Сделать выпадающий список с расчетом работ -->
    <ui-checkbox
      v-model="model.IsRevision"
      class="mb-5"
      title="Проверка всех необходимых документов."
    >
      Ревизия
    </ui-checkbox>
    <ui-checkbox
      v-model="model.IsTyping"
      class="mb-5"
      title="Набор в эллектронный вид."
    >
      Набор
    </ui-checkbox>
    <ui-checkbox
      v-model="model.IsPrototyping"
      class="mb-5"
      title="Создание макета печатного издания."
    >
      Макетирование
    </ui-checkbox>
    <ui-checkbox
      v-model="model.IsColor"
      class="mb-5"
    >
      Цветная печать - рекомендована если есть картинки
    </ui-checkbox>
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