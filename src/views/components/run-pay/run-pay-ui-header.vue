<template>
  <ui-table-header-item
    defaultSort="desc"
    iconAsc="table-ord-asc"
    :onSort="onSort"
    iconDesk="table-ord-desk"
    :sortName="sortName"
    :filter="filter"
    >
    <slot />
    </ui-table-header-item
  >
</template>

<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";
import GetListRequest from "@/api/dataSource/api/plugins/models/getListRequest";
import ShopListRequest from "@/api/dataSource/api/plugins/models/controllersModels/shops/ShopListRequest";

@Options({
  name: "run-pay-ui-header",
})
//RunPayUiHeaderComponent
export default class RunPayUiHeaderComponent extends Vue {
  @Prop({ type: Object }) filter: GetListRequest<ShopListRequest>;
  @Prop({ type: String }) sortName: string;
  onSort(){
       this.$emit("onSort");
  }
}
</script>
<style scoped>
/* */
</style>
