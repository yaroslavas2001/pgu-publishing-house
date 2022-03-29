<template>
  <div
    class="control-time"
    :class="{ open: isOpen }"
    tabindex="0"
    @blur="() => (isOpen = false)"
    @focus="() => (isOpen = true)"
  >
    <label v-if="!!label">{{ label }}:</label>
    <div class="current">{{ text }}{{ currentTime.displayTime }}</div>
    <div class="select" ref="select">
      <div class="hours" @wheel="onScrollHours">
        <div
          class="select-item"
          :class="{ active: item.value === currentTime.Hours }"
          v-for="(item, index) in currentTime.hoursElements"
          :key="index"
          :style="getHourItemStyle(item)"
          @click="setHour(item)"
        >
          {{ currentTime.displayTimeItem(item.value) }}
        </div>
      </div>
      <div class="time-separator">:</div>
      <div class="minutes" @wheel="onScrollMinutes">
        <div
          class="select-item"
          :class="{ active: item.value === currentTime.Minutes }"
          v-for="(item, index) in currentTime.minutesElements"
          :key="index"
          :style="getMinuteItemStyle(item)"
          @click="setMinute(item)"
        >
          {{ currentTime.displayTimeItem(item.value) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, Prop, Watch } from "vue-property-decorator";
// import { setTimeout } from "timers";
@Options({
  name: "control-time",
})
export default class ControlTimeComponent extends Vue {
  @Prop({ default: new Date() }) value!: Date;
  @Prop() min!: Date;
  @Prop() max!: Date;
  @Prop({ default: "" }) label!: string;
  @Prop({ default: "" }) text!: string;
  currentTime: TimeModel = new TimeModel(this.value, this.min, this.max);
  isOpen = false;
  @Watch("min")
  onMinChanged(newValue: Date) {
    this.currentTime.min = newValue;
    this.currentTime.refresh();
  }
  @Watch("max")
  onMaxChanged(newValue: Date) {
    this.currentTime.max = newValue;
    this.currentTime.refresh();
  }
  @Watch("value")
  onValueChanged(value: Date) {
    this.currentTime.fromDate(value, this.min, this.max);
  }
  @Watch("currentTime.Hours")
  onHoursChanged(value: Date) {
    this.$emit("input", this.currentTime.toDate());
  }
  @Watch("currentTime.Minutes")
  onMinutesChanged(value: Date) {
    this.$emit("input", this.currentTime.toDate());
  }
  toggleOpen() {
    this.isOpen = !this.isOpen;
  }
  created() {}
  destroyed() {}
  onScrollHours(event: WheelEvent) {
    this.currentTime.Hours += event.deltaY > 0 ? 1 : -1;
    event.preventDefault();
  }
  get blockHeight(): number {
    if (!this.$refs.select) {
      return 0;
    }
    return (this.$refs.select as any).clientHeight;
  }
  setHour(hour: TimeItemModel) {
    if (hour.value !== this.currentTime.Hours) {
      this.currentTime.Hours +=
        this.currentTime.hoursElements.indexOf(hour) < 2 ? -1 : 1;
    }
  }
  setMinute(minute: TimeItemModel) {
    if (minute.value !== this.currentTime.Minutes) {
      this.currentTime.Minutes +=
        this.currentTime.minutesElements.indexOf(minute) < 2
          ? -this.currentTime.step
          : this.currentTime.step;
    }
  }
  getHourItemStyle(item: TimeItemModel): Object {
    const blockHeight = 70;
    const step = blockHeight / 3;
    let index = this.currentTime.hoursElements.indexOf(item) - 2;
    return { top: `${index * step + blockHeight / 2}px` };
  }
  getMinuteItemStyle(item: TimeItemModel): Object {
    const blockHeight = 70;
    const step = blockHeight / 3;
    let index = this.currentTime.minutesElements.indexOf(item) - 2;
    return { top: `${index * step + blockHeight / 2}px` };
  }
  onScrollMinutes(event: WheelEvent) {
    this.currentTime.Minutes +=
      event.deltaY > 0 ? this.currentTime.step : -this.currentTime.step;
    event.preventDefault();
  }
}
class TimeItemModel {
  value: number;
  constructor(value: number) {
    this.value = value;
  }
}
class TimeModel {
  min?: Date;
  max?: Date;
  private _hours!: number;
  get minHours(): number {
    if (!this.min) {
      return null;
    }
    return this.min.getHours();
  }
  get maxHours(): number {
    if (!this.max) {
      return null;
    }
    return this.max.getHours();
  }
  get minMinutes(): number {
    if (!this.min) {
      return null;
    }
    return this._hours === this.minHours ? this.min.getMinutes() : 0;
  }
  get maxMinutes(): number {
    if (!this.max) {
      return null;
    }
    return this._hours === this.maxHours ? this.max.getMinutes() : 60;
  }
  get Hours(): number {
    return this._hours;
  }
  limitHour(value: number): number {
    return this.limit(value, 23, this.minHours, this.maxHours);
  }
  limitMinute(value: number): number {
    return this.limit(
      value,
      60 - this.step,
      this.minMinutes,
      this.maxMinutes,
      this.step
    );
  }
  limit(
    value: number,
    ceil: number,
    min?: number,
    max?: number,
    step = 1
  ): number {
    min = min == null ? 0 : min;
    max = max == null ? ceil : max;
    const delta = max - min + step;
    return ((value - min + delta) % delta) + min;
  }
  set Hours(value: number) {
    if (value === this._hours) {
      return;
    }
    const isMore = value > this._hours;
    value = (value + 24) % 24;
    value = this.limitHour(value);
    if (isMore) {
      let pushValue = (value + 2 + 24) % 24;
      pushValue = this.limitHour(pushValue);
      this.hoursElements.push(new TimeItemModel(pushValue));
      setTimeout(() => {
        this.hoursElements.shift();
      }, 0);
    } else {
      const pushValue = this.limitHour((value - 2 + 24) % 24);
      this.hoursElements.unshift(new TimeItemModel(pushValue));
      this.hoursElements.splice(-1, 1);
    }
    this._hours = value;
  }
  private _minutes!: number;
  get Minutes(): number {
    return this._minutes;
  }
  set Minutes(value: number) {
    if (value === this._minutes) {
      return;
    }
    const isMore = value > this._minutes;
    value = (value + 60) % 60;
    value = this.limitMinute(value);
    if (isMore) {
      const pushValue = this.limitMinute((value + 2 * this.step + 60) % 60);
      this.minutesElements.push(new TimeItemModel(pushValue));
      setTimeout(() => {
        this.minutesElements.shift();
      }, 0);
    } else {
      const pushValue = this.limitMinute((value - 2 * this.step + 60) % 60);
      this.minutesElements.unshift(new TimeItemModel(pushValue));
      this.minutesElements.splice(-1, 1);
    }
    this._minutes = value;
  }
  InnerDate!: Date;
  step = 5;
  displayTimeItem(item: number): string {
    return `0${item}`.slice(-2);
  }
  get displayMinutes(): string {
    return `0${this.Minutes}`.slice(-2);
  }
  get displayTime(): string {
    return `${this.displayTimeItem(this.Hours)}:${this.displayTimeItem(
      this.Minutes
    )}`;
  }
  hoursElements: TimeItemModel[] = new Array<TimeItemModel>();
  initHoursElements() {
    this.hoursElements = [
      new TimeItemModel(this.limitHour((this.Hours - 2 + 24) % 24)),
      new TimeItemModel(this.limitHour((this.Hours - 1 + 24) % 24)),
      new TimeItemModel(this.limitHour(this.Hours)),
      new TimeItemModel(this.limitHour((this.Hours + 1 + 24) % 24)),
      new TimeItemModel(this.limitHour((this.Hours + 2 + 24) % 24)),
    ];
  }
  minutesElements: TimeItemModel[] = new Array<TimeItemModel>();
  initMinutesElements() {
    this.minutesElements = [
      new TimeItemModel(
        this.limitMinute((this.Minutes - 2 * this.step + 60) % 60)
      ),
      new TimeItemModel(
        this.limitMinute((this.Minutes - 1 * this.step + 60) % 60)
      ),
      new TimeItemModel(this.limitMinute(this.Minutes)),
      new TimeItemModel(
        this.limitMinute((this.Minutes + 1 * this.step + 60) % 60)
      ),
      new TimeItemModel(
        this.limitMinute((this.Minutes + 2 * this.step + 60) % 60)
      ),
    ];
  }
  fromDate(date: Date, min?: Date, max?: Date) {
    this.min = min;
    this.max = max;
    this.Hours = date.getHours();
    this.Minutes = Math.floor(date.getMinutes() / this.step) * this.step;
    this.InnerDate = date;
    this.initHoursElements();
    this.initMinutesElements();
  }
  toDate(): Date {
    this.InnerDate.setHours(this.Hours);
    this.InnerDate.setMinutes(this.Minutes);
    this.InnerDate.setSeconds(0);
    this.InnerDate.setMilliseconds(0);
    return this.InnerDate;
  }
  refresh() {
    this.initHoursElements();
    this.initMinutesElements();
  }
  constructor(date: Date, min?: Date, max?: Date) {
    this.fromDate(date, min, max);
  }
}
</script>

<style lang="less">
@border: 1px solid #e1e6e8;
@borderActiveColor: #3f72bb;
@padding: 10px 35px 10px 25px;
.control-time {
  position: relative;
  user-select: none;
  label {
    display: block;
    color: #8d93a1;
    margin-bottom: 10px;
  }
  .current {
    cursor: pointer;
    border: @border;
    padding: @padding;
  }
  .select {
    font-size: 13px;
    position: absolute;
    display: none;
    left: 0;
    right: 0;
    top: calc(~"100% + 2px");
    z-index: 11;
    background-color: #ffffff;
    border: @border;
    overflow: hidden;
    height: 70px;
    .time-separator {
      line-height: 68px;
    }
    .hours,
    .minutes {
      width: 50%;
      height: 100%;
      position: relative;
      transition: top 2s ease 0s;
      .select-item {
        cursor: pointer;
        left: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
        opacity: 0.35;
        // transition: top 2s ease 0s;
        // transition: all 100ms ease-in-out;
        &.active {
          font-size: 15px;
          opacity: 1;
        }
      }
    }
    // .hours {
    // }
    // .minutes {
    // }
  }
  &.open {
    .current {
      border-color: @borderActiveColor;
    }
    .select {
      border-color: @borderActiveColor;
      display: flex;
    }
  }
}
</style>
