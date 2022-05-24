<template>
  <button
    @click="$emit('click')"
    class="btn"
    :class="{
      btnSmall: isSmall,
      btnBig: !isSmall,
    }"
  >
    {{ title }}
  </button>
</template>
<script lang="ts">
import { Options, Prop, Vue, Watch } from "vue-property-decorator";

@Options<Btn>({
  name: "btn",
})
export default class Btn extends Vue {
  @Prop({ type: String, default: "lable" }) title: string;
  @Prop({ type: Boolean, default: false }) isSmall: boolean;
}
</script>
<style lang="less" scoped>
.btn {
  outline: none;
  background: transparent;
  border: 1px #cd8458 solid;
  width: fit-content;
  height: fit-content;
  font-family: "Open Sans", sans-serif;
  cursor: pointer;
  transition: all 0.2s ease-out;
  color:#000;
  &:hover {
    background: #cd8458;
    color: #dedfd7;
  }
}
.btnBig {
  font-size: 25px;
  border-radius: 20px;
  padding: 7px 25px;
}
.btnSmall {
  font-size: 15px;
  border-radius: 5px;
  padding: 3px 14px;
}
</style>