<template>
<div></div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { MAINPAGE } from "@/router/routerNames";

@Options({
  emits: ["goToAdmin"],
})
export default class CalculationForm extends Vue {

}
</script>
<style scoped >
</style>