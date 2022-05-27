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
    <div class="sum">Итого  : {{ sum }}</div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
// @Options({
//   emits: ["goToAdmin"],
// })
import CalculationСhangeModel from "@models/calculation/article/CalculationСhangeModel";
export default class CalculationArticle extends Vue {
  model: CalculationСhangeModel = new CalculationСhangeModel();

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
</style>