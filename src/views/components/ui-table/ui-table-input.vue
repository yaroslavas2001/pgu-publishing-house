<template>
   <input class="input" v-model="search" placeholder="Поиск.."/>
  <button class="btn"  @click="onFilterChanged()"><img src="@assets/img/search.png" alt="search"></button>
</template>
<script lang="ts">
import { Options, Prop, Vue, Ref } from "vue-property-decorator";

@Options<UiTableInput>({
 emits: ["onFilterChanged"]
})
export default class UiTableInput extends Vue {
  search = "";
  onFilterChanged() {
    this.$emit("onFilterChanged", this.search);
  }
}
</script>
<style scoped>
.btn{
    background-color:#D25338;
    height: 36px;
    width: 36px;
    border: 0px;
}
.input{
    height: 36px;
    min-width: 463px;
}
</style>