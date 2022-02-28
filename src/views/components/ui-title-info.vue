<template>
  <div class="ui-title-info">
    <div class=" trigger">
     <slot />
    </div>
    <div class="hidden">
      <slot name="hidden" />
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Prop, Vue } from "vue-property-decorator";

@Options<UiTitleInfo>({
  name: "ui-title-info",
}) 
export default class UiTitleInfo extends Vue {
}
</script>
<style lang="less">
.ui-title-info {
  display: flex;
  flex-direction: column;
  .trigger{
    display: flex;
    justify-content: center;
  }
  .hidden {
    display: none;
    position: relative;
  }
  .trigger:hover + .hidden {
    display: inline;
    position: absolute; 
    margin-left: 20px;;
    background: #fff; 
    border: 1px solid #D0D9DE;
    width: auto;
    padding: 10px;
    height: auto;
    z-index: 9999;
  }
}
</style>