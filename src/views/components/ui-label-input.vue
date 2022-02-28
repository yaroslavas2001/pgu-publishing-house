<template>
  <div class="ui-label-input">
    <label :for="id" class="label">
      {{ nameLabel }}<span v-if="required" class="label-wrong">*</span>
    </label>
    <input
      class="input"
      v-model="innerValue"
      :placeholder="placeholder"
      :class="{
        wrong: wrong,
      }"
      :id="id"
    />
  </div>
</template>
<script lang="ts">
import { Options, Prop, Vue, Watch } from "vue-property-decorator";

@Options<UiLableInput>({
  emits: ["update:modelValue"],
  name: "ui-label-input",
})
export default class UiLableInput extends Vue {
  @Prop({ type: String, default: "lable" }) nameLabel: string;
  @Prop({ type: String, default: "placeholder" }) placeholder: string;
  @Prop({ type: String, default: "text" }) type: string;
  @Prop({ type: String, default: "id" }) id: string;
  @Prop({ type: Boolean, default: false }) required: boolean;

  @Prop({ type: [String, Number, Date, Object, Array] })
  modelValue: any | any[] | String | Number | string | number | Date;

  innerValue: any | any[] | String | Number | string | number | Date = null;
  wrong: boolean = false;
  created() {
    this.innerValue = this.modelValue;
  }
  // обычное значение
  @Watch("modelValue")
  onValueChanged() {
    this.innerValue = this.modelValue;
  }
  // внутреннее значение
  @Watch("innerValue")
  onInnerValueChanged() {
    if (this.type == "text") this.$emit("update:modelValue", this.innerValue);
    else if (this.type == "number" && this.innerValue) {
      if (isNaN(Number(this.innerValue))) this.wrong = true;
      else {
        this.$emit("update:modelValue", Number(this.innerValue));
        this.wrong = false;
      }
    } else if (this.type == "number" && !this.innerValue) {
      this.wrong = false;
      this.$emit("update:modelValue", undefined);
    }
  }
}
</script>
<style lang="less">
.ui-label-input {
  display: flex;
  flex-direction: column;
  // font-size: 12px;

  .wrong {
    border-color: red !important;
  }
  .label {
    font-size: 12px !important ;
    color: #2d3d5c !important;
  }
  .input {
    border: 1px solid #d0d9de;
    background: #f3f4fa;
    font-size: 12px;
    height: 30px;
    color: #4F5E74;
    box-sizing: border-box;
    width: 100%;
    border-radius: 4px;
    padding: 8px 12px;
    font-weight: 600;
    // margin-bottom: 2px;
    outline: none;
  }
  .input::placeholder {
    font-weight: 500;
    opacity: 0.6;
        color: #8797af;

  }
  .input:active,
  .input:focus {
    // color: #8797af !important;
    border-color: #67b9da;
  }
}
</style>