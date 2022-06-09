<template>
  <div class="paper-block">
    <div class="paper-block-list">{{title}}</div>
    <div class="paper-block-price">
      {{ price }}
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Prop, Vue, Watch } from "vue-property-decorator";

export default class PaperBlock extends Vue {
  @Prop({ type: String, default: "lable" }) title: string;
  @Prop({ type: String, default: "" }) price: boolean;
}
</script>
<style lang="less" scoped>
.paper-block{
  display: flex;
  flex-direction: column;
    font-family: 'Open Sans', sans-serif !important;

  .paper-block-list{
    background-color: #e98546;
    color:white;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 104px;
    height: 270px;
    margin: 0px 10px 5px;
    font-size: 45px;
  }
  .paper-block-price{
    text-align: center;
  }
}

</style>