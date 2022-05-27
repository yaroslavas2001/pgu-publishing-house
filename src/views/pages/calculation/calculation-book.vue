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
    <ui-checkbox v-model="model.IsEditing" class="mb-5">
      Редактирование
    </ui-checkbox>
    <ui-checkbox v-model="model.IsFirstProofreading" class="mb-5">
      Первая корректура
    </ui-checkbox>
    <ui-checkbox v-model="model.IsRevision" class="mb-5">Ревизия</ui-checkbox>
    <ui-checkbox v-model="model.IsTyping" class="mb-5">Набор</ui-checkbox>
    <ui-checkbox v-model="model.IsPrototyping" class="mb-5">
      Макетирование
    </ui-checkbox>
    <!-- <ui-checkbox v-model="model.IsReplication">IsReplication</ui-checkbox> -->
    <div class="sum">Итого : {{ model.one }}</div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { MAINPAGE } from "@/router/routerNames";
import CalculationСhangeModel from "@models/calculation/CalculationСhangeModel";
@Options({
  emits: ["goToAdmin"],
})
export default class CalculationBook extends Vue {
  model: CalculationСhangeModel = new CalculationСhangeModel();
  sum: number = 0;
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