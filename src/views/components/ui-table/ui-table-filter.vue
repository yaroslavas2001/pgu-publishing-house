<template>
  <div class="filter">
    <div class="filter-item">
      <input
        class="filter-input"
        v-model="filter.search"
        placeholder="Поиск.."
      />
      <button class="filter-btn" @click="onFilterChanged()">
        <img src="@assets/img/icons8-google-web-search.svg" alt="search" />
      </button>
    </div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Options, Prop, Vue } from "vue-property-decorator";

@Options<UiTableFilter>({
  emits: ["change"],
})
export default class UiTableFilter extends Vue {
  @Prop({ type: Object, required: true }) filter: { search: string };
  onFilterChanged() {
    this.$emit("change", this.filter);
  }
}
</script>
<style scoped lang="less">
.filter {
  display: flex;
  margin-bottom: 24px;
  .filter-item {
    display: flex;
    align-items: center;
    width: 100%;
    .filter-btn {
      background: #cec0ae;
      height: 39px;
      min-width: 36px;
      border: 0px;
    }
    .filter-input {
      width: 100%;
      min-width: 150px;
      height: 35px;
      border: 1px solid #ced4de;
      padding-left: 22px;
    }
  }
}
</style>