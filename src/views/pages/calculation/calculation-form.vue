<template>
  <div>
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
      <paper-block title="A5" :price="sumA5.toFixed(2)"></paper-block>
      <paper-block title="A4" :price="sumA4.toFixed(2)"></paper-block>
      <paper-block title="A3" :price="sumA3.toFixed(2)"></paper-block>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import CalculationFormСhangeModel from "@models/calculation/form/CalculationFormСhangeModel";

// @Options({
//   emits: ["goToAdmin"],
// })
export default class CalculationForm extends Vue {
  model: CalculationFormСhangeModel = new CalculationFormСhangeModel();
  get sumA5(): number {
    return isNaN(this.model.allA5) ||
      this.model.allA5 == Infinity ||
      this.model.Circulation < 0 ||
      this.model.Circulation < 0
      ? 0
      : this.model.allA5;
  }
  get sumA4(): number {
    return isNaN(this.model.allA4) ||
      this.model.allA4 == Infinity ||
      this.model.Circulation < 0 ||
      this.model.Circulation < 0
      ? 0
      : this.model.allA4;
  }
  get sumA3(): number {
    return isNaN(this.model.allA3) ||
      this.model.allA3 == Infinity ||
      this.model.Circulation < 0 ||
      this.model.Circulation < 0
      ? 0
      : this.model.allA3;
  }

  created() {
    this.model = new CalculationFormСhangeModel();
  }
}
</script>
<style scoped >
.row {
  display: flex;
}
</style>