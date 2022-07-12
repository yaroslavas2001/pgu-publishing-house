<template>
  <label-input
    nameLabel="Тираж"
    placeholder="Введите число"
    v-model="model.Circulation"
    type="number"
  />
  <ui-checkbox v-model="model.IsBuplex" class="mb-5">
    Двухсторонний
  </ui-checkbox>
  <div class="row">
    <paper-block title="A5" :price="sumA5.toFixed(2)" />
    <paper-block title="A4" :price="sumA4.toFixed(2)" />
    <paper-block title="A3" :price="sumA3.toFixed(2)" />
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-property-decorator";
import CalculationFormСhangeModel from "@models/calculation/form/CalculationFormСhangeModel";

export default class CalculationForm extends Vue {
  model: CalculationFormСhangeModel = new CalculationFormСhangeModel();
  get sumA5(): number {
    return this.isNan(this.model.allA5);
  }
  get sumA4(): number {
    return this.isNan(this.model.allA4);
  }
  get sumA3(): number {
    return this.isNan(this.model.allA3);
  }
  created() {
    this.model = new CalculationFormСhangeModel();
  }
  isNan(num: any) {
    return isNaN(num) ||
      num == Infinity ||
      this.model.Circulation < 0 ||
      this.model.Circulation < 0
      ? 0
      : num;
  }
}
</script>