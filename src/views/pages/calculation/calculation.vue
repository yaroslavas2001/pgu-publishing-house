<template>
  <modal-block title="Расчет стоимости" @clickBack="goToMain">
    <ui-tabs>
      <ui-tabs-item title="Издание">
        <calculation-book />
      </ui-tabs-item>
       <ui-tabs-item title="Бланк">
        <calculation-form />
      </ui-tabs-item>
    </ui-tabs>
  </modal-block>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { INDEX } from "@/router/routerNames";
import CalculationBook from "./calculation-book.vue";
import CalculationForm from "./calculation-form.vue";
@Options({
  components: {  CalculationBook, CalculationForm },
})
export default class Calculation extends Vue {
  goToMain() {
    this.$router.push({ name: INDEX });
  }
}
</script>
<style scoped >
</style>