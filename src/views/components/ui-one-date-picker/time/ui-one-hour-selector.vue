<template>
  <div class="one-hours">
    <div class="items">
      <template v-for="(hour, index) in innerHours" :key="index">
        <div class="hour" :class="hour.type" @click.stop="changeHour(hour)">
          <div>{{ hour.name }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, Prop, Watch } from "vue-property-decorator";
import moment from "moment";
interface rangeData {
  firstData: Date;
  SecondData: Date;
}
@Options<UiOneHourSelector>({})
export default class UiOneHourSelector extends Vue {
  @Prop({ default: new Date(), type: Date }) date: Date;
  @Prop({ type: Function }) allowedToShowView: Function;
  // @Prop({ default: false, type: Boolean }) isDateRange: boolean;
  isDateRange = true;

  innerHours: any[] = [];
  innerMonth: number = null;
  innerYear: number = null;
  innerDay: number = null;
  innerHour: number = null;
  innerMonthSecond: number = null;
  innerYearSecond: number = null;
  innerDaySecond: number = null;
  innerHourSecond: number = null;
  innerDate: Date = null;
  innerSecondDate: Date = null;
  rangeData: rangeData = {
    firstData: null,
    SecondData: null,
  };
  get m() {
    let x = moment(
      new Date(this.innerYear, this.innerMonth, this.innerDay)
    ).format("DD.MM.YYYY");
    return x;
  }
  created() {
    this.innerMonth = this.date.getMonth();
    this.innerYear = this.date.getFullYear();
    this.innerDay = this.date.getDate();
    this.innerHour = this.date.getHours();
    this.innerDate = this.date; // первая дата
  }

  mounted() {
    this.setDay(this.date);
    for (let index = 0; index < 24; index++) {
      this.innerHours.push({
        name:
          index.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          }) + ":00",
        number: index,
        type: index == this.innerHour ? "current" : "",
      });
    }
  }

  setDay(date: Date) {
    this.innerDay = date.getDate();
  }
  next() {
    this.setDay(new Date(this.innerYear, this.innerMonth, this.innerDay + 1));
  }
  backward() {
    this.setDay(new Date(this.innerYear, this.innerMonth, this.innerDay - 1));
  }
  click = false;
  changeHour(hour: any) {
    this.rangeData.firstData = new Date(
      this.innerYear,
      this.innerMonth,
      this.innerDay,
      hour.number,
      0
    );
    this.$emit("change", this.rangeData.firstData);
    this.innerHour = hour.number;
  }
  changeDays() {
    this.$emit("onNavigation");
  }
  clearHours() {
    for (let index = 0; index < this.innerHours.length; index++) {
      if (this.innerHours[index].type == "current") {
        this.innerHours[index].type = "";
      }
    }
  }
  // openDays() {
  //   this.$emit("changeCurrentView", "days");
  // }
  clearDaysAll() {
    for (let index = 0; index < this.innerHour; index++) {
      this.innerHour[index].type = "";
    }
  }
}
</script>

<style lang="less">
@uiHoursBgColorCurent: #465675;
@uiHoursBgColorCurentHover: #043043;
.one-hours {
  .navigation {
    align-items: center;
  }
  .items {
    height: 210px;
    padding: 10px 1.2em 0px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(6, 1fr);
    font-size: 0.9em;
    background-color: #f3f4fa;
    .hour {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover > div {
        color: #000;
        background-color: #e7e7f2;
        border-radius: 15px;
        padding: 5px 0px;
        width: 100%;
        align-items: center;
        justify-content: center;
        display: flex;
      }
      & > div {
        padding: 5px 0px;
      }
    }
    .hour.current > div {
      color: #f3f4fa;
      background-color: @uiHoursBgColorCurent;
      border-radius: 15px;

      width: 100%;
      align-items: center;
      justify-content: center;
      display: flex;
      &:hover {
        background-color: @uiHoursBgColorCurentHover;
      }
    }
  }
  .back-to-days {
    display: flex;
    font-family: TirScript;
    border-bottom: 1px solid rgba(0, 0, 0, 0.11);
    padding: 20px 0 12px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 17px;

    color: #043043;
    &:before {
      font-size: 17px;
      // content: "\e90c";
      color: #3e71bb;
    }
  }
}
</style>
