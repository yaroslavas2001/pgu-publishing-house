<template>
  <div>
    <label-input
      nameLabel="Тираж"
      placeholder="Введите число"
      v-model="model.Circulation"
    />
    <label-input
      nameLabel="Объем"
      placeholder="Введите число"
      v-model="model.Volume"
    />
    <ui-checkbox v-model="model.IsEditing">Редактирование</ui-checkbox>
    <ui-checkbox v-model="model.IsFirstProofreading">
      IsFirstProofreading
    </ui-checkbox>
    <ui-checkbox v-model="model.IsRevision">IsRevision</ui-checkbox>
    <ui-checkbox v-model="model.IsTyping">IsTyping</ui-checkbox>
    <ui-checkbox v-model="model.IsPrototyping">IsPrototyping</ui-checkbox>
    <ui-checkbox v-model="model.IsReplication">IsReplication</ui-checkbox>
    <ui-checkbox v-model="model.IsColor">IsColor</ui-checkbox>
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
  created() {
    this.model = new CalculationСhangeModel();
  }
}
</script>
<style scoped >
</style>