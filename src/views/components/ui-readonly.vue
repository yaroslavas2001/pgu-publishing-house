<template>
  <div class="ui-label-input">
    <label :for="id" class="label">{{ nameLabel }}</label>
    <p :id="id" class="text">{{ text }}</p>
  </div>
</template>
<script lang="ts">
import { Options, Prop, Vue } from "vue-property-decorator";

@Options<UiReadonlyComponent>({
  name: "ui-readonly",
})
export default class UiReadonlyComponent extends Vue {
  @Prop({ type: String, default: "lable" }) nameLabel: string;
  @Prop({ type: String, default: "id" }) id: string;
  @Prop({ type: String, default: "" }) text: string;
}
</script>
<style lang="less">
.ui-label-input {
  display: flex;
  flex-direction: column;
  .label {
    font-size: 11px;
    color: #4f5e74;
  }
  .text {
    border: 1px solid #d0d9de;
    background: #fff;
    font-size: 12px;
    height: 30px;
    color: #8797af;
    box-sizing: border-box;
    width: 100%;
    border-radius: 4px;
    padding: 8px 12px;
    margin-bottom: 2px;
    outline: none;
  }
}
</style>