<template>
  <div class="ui-schedule">
    <div class="ui-schedule-header">
      <label class="weekDay"> {{ weekDay }}</label>
      <div class="icon-plus" @click="showTime" v-if="!aboutTime"></div>
    </div>
    <div class="ui-schedule-body" v-if="aboutTime">
      <div class="d-flex week-day">
        <div class="from-time">
          <label for="">С</label>
          <div class="from-times">
            <control-time v-model="testDate" />
          </div>
        </div>
        <div class="to-time">
          <label for="">До</label>
          <div class="to-times">
            <control-time v-model="testDate" />
            <div @click="removeTime" class="icon-trash btn-icon ml-3"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Prop, Vue, Watch } from "vue-property-decorator";

@Options<UiSchedule>({
  emits: ["update:modelValue"],
  name:"UiSchedule"
})
export default class UiSchedule extends Vue {
  @Prop({ type: String, default: "День недели" }) weekDay: string;
  @Prop({ type: [String, Number, Date, Object, Array] })
  modelValue: any | any[] | String | Number | string | number | Date;
// todo - сделать разделение modalValue на время с и до
  innerValue: any | any[] | String | Number | string | number | Date = null;
  aboutTime = false;
  created() {
    this.innerValue = this.modelValue;
    console.log(this.innerValue);
    
  }
  // обычное значение
  @Watch("modelValue")
  onValueChanged() {
    this.innerValue = this.modelValue;
  }
  // внутреннее значение
  @Watch("innerValue")
  onInnerValueChanged() {
    this.$emit("update:modelValue", this.innerValue);
  }
  showTime() {
    console.log("about");
    this.aboutTime = true;
  }
  removeTime() {
    this.aboutTime = false;
  }
}
</script>
<style lang="less">
.ui-schedule {
  display: flex;
  flex-direction: column;
  padding-bottom: 14px;
  border-bottom: 1px solid #e2e2e2;
  margin-bottom: 10px;
  .ui-schedule-header {
    display: flex;
    justify-content: space-between;
  }
  .weekDay {
    font-size: 13px;
    line-height: 16px;
    color: #586174;
  }
  .from-time,
  .to-time {
    margin-right: 30px;
  }
  .from-times,
  .to-times {
    display: flex;
    align-items: center;
    text-align: center;
  }
}
</style>