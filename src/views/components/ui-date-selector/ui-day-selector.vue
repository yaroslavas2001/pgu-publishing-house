<template>
  <div class="days">
    <div class="navigation">
      <div class="icon-arrow-left" @click="backward"></div>
      <div class="title_date-picker" @click.stop="changeMonth">
        {{
          moment(
            new Date(
              year ? year : this.innerYear,
              month ? month : this.innerMonth,
              1
            )
          )
        }}
      </div>
      <div class="icon-arrow-right" @click="next"></div>
    </div>
    <div class="items">
      <template v-for="(item, key) in weeks" :key="key">
        <div class="weekday">{{ moment(item, "ddd") }}</div>
      </template>
      <div v-for="day in innerDays" :key="day.date.getTime() + new Date()">
        <slot name="day" v-bind="day">
          <div class="day" :class="day.type" @click="changeDay(day)">
            <span class="backround-current"></span>
            <div>{{ day.number }}</div>
          </div>
        </slot>
      </div>
    </div>
    <!-- <div class="select-hours icon-clock" @click="openHours">Выбрать часы</div> -->
  </div>
</template>

<script lang="ts">
import { Vue, Prop } from "vue-property-decorator";
import moment from "moment";
export default class UiDaySelector extends Vue {
  weekday: string[] = ["Пт", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  @Prop({ default: () => new Date(), type: Date }) date: Date;

  @Prop({ default: () => new Date(), type: Date }) dateSecond: Date;
  @Prop({ type: Function }) allowedToShowView: Function;
  @Prop({ default: null, type: Date }) minimumDate: Date;
  @Prop({ default: null, type: Date }) maximumDate: Date;
  isDateRange = true;
  @Prop({ default: () => [] }) eventDates: Array<any>;
  @Prop({ default: true, type: Boolean }) showCurrentDay: boolean;
  @Prop({ default: true, type: Boolean }) letSelectAllDays: boolean;
  @Prop({ type: Number, default: null }) month: number;
  @Prop({ type: Number, default: null }) year: number;

  innerDays: any[] = [];
  innerMonth: number = null;
  innerYear: number = null;
  innerDay: number = null;
  innerHour: number = null;


  innerDate: Date = null;
  innerSecondDate: Date = null;
  weeks: any[] = [];
  click = false;
  firstData = null;
  created() {
    this.innerMonth = this.date.getMonth();
    this.innerYear = this.date.getFullYear();
    this.innerDay = this.date.getDate();
    this.innerHour = this.date.getHours();

    this.innerDate = this.date; // первая дата
    this.innerSecondDate = this.dateSecond; // вторая дата
  }
  mounted() {
    this.innerMonth = this.date.getMonth();
    this.innerYear = this.date.getFullYear();
    this.innerDay = this.date.getDate();
    this.innerHour = this.date.getHours();

    this.innerDate = this.date; // первая дата
    this.innerSecondDate = this.dateSecond; // вторая дата
    this.installWeeks();
    this.setMonth(this.date);
  }

  days() {
    return this.innerDays;
  }
  /**
   * Устанавливаем текущий месяц, собираем массив дней, дополняя его до 6 недель
   */
  moment(date: Date, format: string = "DD.MM.YYYY") {
    return moment(date).format(format);
  }
  setMonth(date: Date) {
    this.innerMonth = date.getMonth();
    this.innerYear = date.getFullYear();
    this.innerDays = [];
    var firstDay = new Date(this.innerYear, this.innerMonth, 1).getDay() || 7;
    var days = new Date(this.innerYear, this.innerMonth + 1, 0).getDate();
    var lastDay = new Date(this.innerYear, this.innerMonth, days).getDay() || 7;
    let begin = 2 - firstDay;
    var end = days + (7 - lastDay);
    end = end - begin < 41 ? end + 7 : end;
    for (let index = begin; index <= end; index++) {
      this.innerDays.push({
        type: this.getStyle(index, days),
        number: new Date(this.innerYear, this.innerMonth, index).getDate(),
        date: new Date(this.innerYear, this.innerMonth, index),
      });
    }
  }

  /**
   * Проверить активность даты
   */
  checkDateActivity(day: any) {
    if (!this.minimumDate) return true;
    var x = new Date(this.innerYear, this.innerMonth, day) > this.minimumDate;
    return x;
  }
  next() {
    this.setMonth(new Date(this.innerYear, this.innerMonth + 1, 1));
  }
  backward() {
    this.setMonth(new Date(this.innerYear, this.innerMonth - 1, 1));
  }
  changeMonth() {
    this.$emit("onNavigation");
  }
changeDay(day: any) {
    let mon = parseInt(moment(this.date).format("MM")) - 1;

    let hour = parseInt(moment(this.date).format("HH"));
    let min = parseInt(moment(this.date).format("mm"));
    let sek = parseInt(moment(this.date).format("ss"));

    if (day.type != "no-active") {
      this.clearDays();
      this.innerDay = day.number;
      day.type = "current";
      this.innerDate = new Date(
        this.innerYear,
        this.innerMonth,
        this.innerDay,
        hour,
        min,
        sek
      );
      this.$emit(
        "changeDay",
        new Date(this.innerYear, this.innerMonth, day.number, hour, min, sek)
      );
    }
  }

  clearDays() {
    for (let index = 0; index < this.innerDays.length; index++) {
      if (this.innerDays[index].type == "current") {
        this.innerDays[index].type = "";
      }
    }
  }
  clearDaysAll() {
    for (let index = 0; index < this.innerDays.length; index++) {
      this.innerDays[index].type = "";
    }
  }
  openHours() {
    this.$emit("changeCurrentView", "hours");
  }
  installWeeks() {
    var moment = require("moment");
    var startOfWeek = moment().startOf("isoWeek");
    var endOfWeek = moment().endOf("isoWeek");

    this.weeks = [];
    var day = startOfWeek;

    while (day <= endOfWeek) {
      this.weeks.push(day.toDate());
      day = day.clone().add(1, "d");
    }
  }
  getStyle(index: number, days: any) {
    var result = "";
    if (index < 1 || index > days || !this.checkDateActivity(index)) {
      result = "no-active";
    }
    if (
      moment(new Date(this.innerYear, this.innerMonth, index)).isSame(
        this.innerDate,
        "day"
      ) &&
      !this.isDateRange
    ) {
      result = "current";
    }
    if (
      moment(new Date(this.innerYear, this.innerMonth, index)).isSame(
        this.innerDate,
        "day"
      )
    )
      result = "current-area-begin-single";

    var eventDateIndex =
      this.eventDates.length > 0
        ? this.eventDates.findIndex((item) =>
            moment(item).isSame(
              new Date(this.innerYear, this.innerMonth, index)
            )
          )
        : -1;
    if (
      moment(new Date(this.innerYear, this.innerMonth, index)).isSame(
        this.innerDate,
        "day"
      ) &&
      moment(new Date(this.innerYear, this.innerMonth, index)).isSame(
        this.innerSecondDate,
        "day"
      )
    )
      result = "current-area-begin-single";
    if (eventDateIndex != -1) {
      result = result + "event-day-" + "green";
    }
    return result;
  }
}
</script>

<style lang="less">
@uiDaysTitleColor: #fff;
@uiDaysColor: #465675;

@uiDaysColorHover: #fff;
@uiDaysBgColorHover: #043043;

@uiDaysBgColorCurrentAreaBegin: #043043;
@uiDaysBgColorCurrentAreaEnd: #043043;

@uiDaysBgColorCurent: #ff7f66;
@uiDaysBgColorCurentHover: #ff7f66;
@uiDaysColorCurent: #fff;
@uiDaysColorNoActive: #b8c3e0;
@uiDaysWeekDayColor: #043043;
@uiDaysBgColorCurrentArea: #dce7f6;
.days {
  .navigation {
    align-items: center;
  }
  .title__days {
    text-transform: capitalize;
    color: @uiDaysTitleColor;
    cursor: pointer;
  }
  .items {
    height: 210px;
    padding: 0px 1.2em;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(7, 1fr);
    font-size: 0.9em;

    .day {
      display: flex;
      align-items: center;
      justify-content: center;
      color: @uiDaysColor;
      cursor: pointer;
    }
    .day > div,
    .day.current > div {
      align-items: center;
      justify-content: center;
      display: flex;
      border-radius: 100%;
      width: 1.5em;
      height: 1.5em;
      &:hover {
        color: @uiDaysColorHover;
        background-color: @uiDaysBgColorHover;
      }
    }
    .day.no-active {
      color: @uiDaysColorNoActive;
      cursor: default;
    }
    .day.current > div {
      color: @uiDaysColorCurent;
      background-color: @uiDaysBgColorCurent;
      &:hover {
        background-color: @uiDaysBgColorCurentHover;
      }
    }
    .day.event-day-orange div {
      color: #fff;
      background-color: orange;
    }
    .day.event-day-red div {
      color: #fff;
      background-color: red;
    }
    .day.event-day-green div {
      color: #fff;
      background-color: green;
    }
    .day.current-area-begin {
      color: #fff;
      // border-radius: 100% 0 0 100%;

      position: relative;
      .backround-current {
        position: absolute;
        z-index: 1;
        right: 0;
        top: 0;
        height: 100%;
        width: 50%;
        background-color: @uiDaysBgColorCurrentArea;
      }
      div {
        position: relative;
        z-index: 2;
        color: #fff;
        background-color: @uiDaysBgColorCurrentAreaBegin;
        border-radius: 100%;
      }
    }
    .day.current-area {
      background-color: @uiDaysBgColorCurrentArea;
    }
    .day.current-area-end {
      color: #fff;
      border-radius: 0 100% 100% 0;

      position: relative;
      .backround-current {
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        height: 100%;
        width: 50%;
        background-color: @uiDaysBgColorCurrentArea;
      }
      div {
        position: relative;
        z-index: 2;
        color: #fff;
        background-color: @uiDaysBgColorCurrentAreaEnd;
        border-radius: 100%;
      }
    }
    .day.current-area-begin-single {
      div {
        color: #fff;
        background-color: #043043;
        border-radius: 100%;
      }
    }
    .weekday {
      display: flex;
      align-items: center;
      justify-content: center;
      color: @uiDaysWeekDayColor;
    }
  }
  .select-hours {
    display: flex;
    font-family: TirScript;
    border-top: 1px solid rgba(0, 0, 0, 0.11);
    padding: 8px 0 10px;
    justify-content: center;
    cursor: pointer;
    &:before {
      font-size: 17px;
      color: #3e71bb;
    }
  }
}
</style>
