<template>
  <div class="ui-datetime-range-picker" :class="{ wrongTime: wrong }">
    <!-- <div 
      v-click-outside="closeCalendar" >  -->
    <slot>
      <div class="input-group" v-click-outside="onBlur">
        <template v-if="isDateRange">
          <slot name="isDateRange">
            <template v-if="!changeDateManual">
              <div class="isDateRange">
                <!-- @click="targetDatetime" -->
                {{ inner2DateFormatted.dateFrom }} -
                {{ inner2DateFormatted.dateTo }}
              </div>
            </template>
            <template v-else>
              <div class="twoDateView">
                <!-- v-click-outside="onBlur" -->
                <input
                  @keydown.enter="onBlur"
                  @keydown.tab="onBlur"
                  v-model="inner2DateFormatted.dateFrom"
                  :class="[{ transformer: transformer }, 'twoDate', 'left']"
                  :readonly="!changeDateManual"
                />
                <div style="font-size: 15px">&#8212;</div>
                <input
                  @keydown.enter="onBlur"
                  @keydown.tab="onBlur"
                  v-model="inner2DateFormatted.dateTo"
                  :class="[{ transformer: transformer }, 'twoDate', 'right']"
                  :readonly="!changeDateManual"
                />
              </div>
            </template>
          </slot>
        </template>
        <div :class="[{ transformer: transformer }]" @click="targetDatetime" class="calendar">
          <img src="@assets/img/calendar.svg" class=" pointer" alt="calendar" />
        </div>
      </div>
    </slot>
    <div
      class="date-time-wrapper"
      id="dateTimeWrapper"
      ref="dateTimeWrapper"
      v-if="innerShowDatetime"
    >
      <div v-if="isDay">
        <ui-date-range-selector
          v-model:date="this.innerDate"
          @update:date="$emit('update:date', $event)"
          v-model:dateSecond="this.innerSecondDate"
          @update:dateSecond="$emit('update:dateSecond', $event)"
          @change="changeDate"
          @errorDate="errorDate"
        />
        <div @click="changeDayHours" class="change_day_hours pointer">
          Выбрать часы
        </div>
      </div>
      <div v-else>
        <ui-time-range-selector
          v-model:date="this.innerDate"
          @update:date="$emit('update:date', $event)"
          v-model:dateSecond="this.innerSecondDate"
          @update:dateSecond="$emit('update:dateSecond', $event)"
          @change="changeDate"
          @errorDate="errorDate"
        />
        <div @click="changeDayHours" class="change_day_hours pointer">
          Выбрать дни
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import moment from "moment";
import { Options, Vue, Prop, Watch } from "vue-property-decorator";
import UiDateTime from "@views/components/ui-date-picker/ui-date-time.vue";
interface rangeData {
  firstData: Date;
  SecondData: Date;
}
@Options<UiDatetimeRangePicker>({
  name: "datatime-range-picker",
  watch: {
    innerShowDatetime() {
      this.iconFocused = this.innerShowDatetime;
    },
    // value(value) {
    //   this.innerDate = this.value;
    //   this.innerDateFormatted = this.formatDate(this.value);
    // },
  },
  emits: ["update:modelValue", "inputRage"],
  components: { UiDateTime },
})
export default class UiDatetimeRangePicker extends Vue {
  @Prop({ type: Date, default: new Date() }) fromDate: Date;
  @Prop({ type: Date, default: new Date() }) toDate: Date;

  @Prop({ type: Date, default: () => new Date() }) value: Date;
  @Prop({ default: "DD.MM.YYYY HH:mm", type: String }) dateFormat: string;
  // ограничение даты снизу

  //включен диапазон дат
  isDateRange = true;

  view2 = true;
  // показывать текущую дату
  // @Prop({ default: true, type: Boolean }) showCurrentDate: boolean;
  showCurrentDate = true;
  //показывать рамку только активации элемента
  @Prop({ default: false, type: Boolean }) transformer: boolean;

  @Prop({ default: null }) eventDates: Array<any>; //выделенный промежуток дат
  @Prop({ default: true, type: Boolean }) autoCloseWhenChangeDay: boolean; //закрывать после выбора дня месяца
  changeDateManual = true; //разрешить редактирование даты вручную

  innerDate: Date;
  innerDateFormatted: Date;
  innerSecondDate: Date;
  innerSecondDateFormatted: Date;
  inner2DateFormatted: { dateFrom: Date; dateTo: Date };
  innerShowDatetime = false;
  isFirstChoice = true;
  iconFocused = false;
  firstClick = true;
  wrong: boolean = false;
  isDay = false;
  changeDayHours() {
    this.isDay = !this.isDay;
  }
  @Watch("fromDate")
  @Watch("toDate")
  onValueChanged(value, oldValue) {    
    this.innerDateFormatted = this.formatDate(this.fromDate);
    this.innerSecondDateFormatted = this.formatDate(this.toDate);
    this.inner2DateFormatted = {
      dateFrom: this.innerDateFormatted,
      dateTo: this.innerSecondDateFormatted,
    };

    this.innerDate = this.fromDate;
    this.innerSecondDate = this.toDate;
  }
  created() {
    this.innerDateFormatted = this.formatDate(this.fromDate);
    this.innerSecondDateFormatted = this.formatDate(this.toDate);
    this.inner2DateFormatted = {
      dateFrom: this.innerDateFormatted,
      dateTo: this.innerSecondDateFormatted,
    };

    this.innerDate = this.fromDate;
    this.innerSecondDate = this.toDate;
  }
  closeCalendar() {
    this.innerShowDatetime = false;
  }
  errorDate(data: boolean) {
    this.wrong = true;
    let self = this;
    setTimeout(function () {
      self.wrong = false;
    }, 2000);
  }
  oninnerDateFormatted() {
    this.inner2DateFormatted = {
      dateFrom: this.formatDate(this.innerDate),
      dateTo: this.formatDate(this.innerSecondDate),
    };
    // пропустит создание страницы с одинаковыми датами
    if (this.inner2DateFormatted.dateFrom == this.inner2DateFormatted.dateTo) {
      return;
    }
    // сравнит 2 даты и даст ошибку или отправит обраттно
    if (this.innerDate < this.innerSecondDate) {
      let set: rangeData = {
        firstData: this.innerDate,
        SecondData: this.innerSecondDate,
      };
      this.$emit("inputRage", set);
      this.wrong = false;
    } else {
      this.wrong = true;
    }
  }
  //отпраыить изменения
  changeDate(date: any) {
    this.innerShowDatetime = false;
    this.innerDate = date.firstData;
    this.innerSecondDate = date.SecondData;
    // this.oninnerDateFormatted();
    this.inner2DateFormatted = {
      dateFrom: this.formatDate(this.innerDate),
      dateTo: this.formatDate(this.innerSecondDate),
    };
    this.$emit("inputRage", date);
  }
  // открыть календарь
  targetDatetime() {
    this.innerShowDatetime = !this.innerShowDatetime;
    this.iconFocused = this.innerShowDatetime;
    this.isDay = true;
  }
  // форматировать дату
  formatDate(date: Date) {
    var moment = require("moment");
    var now = moment(date);
    moment.locale("ru");
    return now.format(this.dateFormat);
  }
  // для того чтобы при потере фокуса, нажатии на пробел и таб отправить дату

  onBlur() {
    if (
      moment(this.inner2DateFormatted.dateFrom, "DD.MM.YYYY HH:mm").isValid() &&
      moment(this.inner2DateFormatted.dateTo, "DD.MM.YYYY HH:mm").isValid()
    ) {
      this.innerDate = moment(
        this.inner2DateFormatted.dateFrom,
        this.dateFormat
      ).toDate();
      this.innerSecondDate = moment(
        this.inner2DateFormatted.dateTo,
        this.dateFormat
      ).toDate();
      this.wrong = false;
      this.oninnerDateFormatted();
    } else {
      this.wrong = true;
    }
  }
}
</script>

<style  lang="less" >
@uiDatePickerBorderRadius: 0;
@uiDatePickerColor: #000;
@uiDatePickerBorderColor: #d0d9de;
@uiDatePickerBgColor: #293b5a;
@uiDatePickerFocusBgColor: #f3f4fa;
@uiDatePickerBorderColorFocus: #d0d9de;

.ui-datetime-range-picker {
  width: auto;
  // display: flex;
  border-radius: @uiDatePickerBorderRadius;
  border: 1px solid @uiDatePickerBorderColor;
  // background-color: @uiDatePickerBgColor;
  .border-nofocus {
    border: 1px solid @uiDatePickerBorderColor;
  }
  .border-focus {
    border: 1px solid @uiDatePickerBorderColorFocus;
  }
  .input-group {
    background-color: #f3f4fa;
    // border: 1px solid @uiDatePickerBorderColor;
    border-radius: @uiDatePickerBorderRadius;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
        height: 30px;
    .icon-calendar {
      padding: 10px 10px 10px 0px;
    }
    input {
      width: 110px;
      margin: 1px;
            background-color: #f3f4fa;
  font-size: 12px;
      font-weight: bold;
      color:#4F5E74;
    }
    .icon {
      border: none;
    }
    input {
      border: none;
    }
    input:focus {
      border: none;
    }
    input {
      &.transformer {
        border: none;
        background-color: #1b283f;
        cursor: default;
      }

      &:focus {
        background-color: @uiDatePickerFocusBgColor;
        outline: none !important;
        cursor: pointer;
      }
    }
    .icon {
      &.transformer {
        color: transparent;
        border: none;
        cursor: default;
      }
    }
  }
  .twoDateView {
    display: flex;
    align-items: center;
    input:focus {
      border: none;
    }
    .left {
      padding: 4px 0px;
      text-align: right;
    }
    .right {
      padding: 4px 0px;
    }
    .twoDate {
      min-width: 130px;
    }
  }

  .isDateRange {
    padding: 0.375em 0.75em;
  }
  .date-time-wrapper {
    // margin-top: 35px;
    z-index: 1000;
    // right: 0px;
    position: absolute;
    .change_day_hours {
      background-color: #f3f4fa;
      display: flex;
      justify-content: center;
      border-right: 1px solid #d0d9de;
      border-bottom: 1px solid #d0d9de;
      border-left: 1px solid #d0d9de;
      color: #043043;
      padding-bottom: 12px;
    }
  }
  & + & {
    margin-left: 20px;
  }
}
.wrongTime {
  border: 1px solid red !important;
}
.calendar{
  min-width: 25px
}
</style>
