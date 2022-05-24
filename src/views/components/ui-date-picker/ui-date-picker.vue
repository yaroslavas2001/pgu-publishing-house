<template>
  <div class="ui-date-picker">
    <slot >
      <div class="input-group" :class="{ view2: view2, wrong: wrong }">
        <!--  :class="{ wrong: wrong }" -->
        <template v-if="isDateRange && view2">
          <slot name="isDateRange">
            <template v-if="!changeDateManual">
              <div class="isDateRange" @click="targetDatetime">
                {{ inner2DateFormatted.dateFrom }} -
                {{ inner2DateFormatted.dateTo }}
              </div>
            </template>
            <template v-else>
              <div class="twoDateView">
                <input
                  @keydown.enter="onPressEnterLeft"
                  @keydown.tab="onPressEnterLeft"
                  v-model="inner2DateFormatted.dateFrom"
                  :class="[{ transformer: transformer }, 'twoDate', 'left']"
                  :readonly="!changeDateManual"
                  v-click-outside="onPressEnterLeft"
                />
                <!--  -->
                <div style="font-size: 15px">&#8212;</div>
                <input
                  @keydown.enter="onPressEnterRight"
                  @keydown.tab="onPressEnterRight"
                  v-model="inner2DateFormatted.dateTo"
                  :class="[{ transformer: transformer }, 'twoDate', 'right']"
                  :readonly="!changeDateManual"
                  v-click-outside="onPressEnterRight"
                />
                <!--   v-click-outside="onLossFocus"-->
              </div>
            </template>
          </slot>
        </template>
        <template v-else>
          <input
            v-model="innerDateFormatted"
            :class="[{ transformer: transformer }, { focus: iconFocused }]"
            :readonly="!changeDateManual"
            @focus="onFocus"
            @blur="onBlur"
            @keydown.tab="onTab"
            @keydown.enter="onEnter"
          />
        </template>
        <div
          class="icon-calendar"
          :class="[{ transformer: transformer }]"
          @click="targetDatetime"
        ></div>
        <template v-if="isDateRange && !view2">
          <span class="delimiter">-</span>
          <input v-model="innerSecondDateFormatted" />
          <div class="icon-calendar"></div>
        </template>
      </div>
    </slot>
    <div
      class="date-time-wrapper"
      id="dateTimeWrapper"
      ref="dateTimeWrapper"
      v-if="innerShowDatetime"
    >
      <ui-date-time
        ref="FirstDatePicker"
        :date="this.innerDate"
        :dateSecond="isDateRange ? this.innerSecondDate : null"
        @change="changeDate"
        :minimumDate="minimumDate"
        :minimumView="minimumView"
        :maximumView="maximumView"
        :initialView="initialView"
        :isDateRange="isDateRange"
        :eventDates="eventDates || []"
        :showCurrentDate="showCurrentDate"
        :letSelectAllDays="letSelectAllDays"
      >
      </ui-date-time>
    </div>
  </div>
</template>

<script lang="ts">
import moment from "moment";
import { Options, Vue, Watch, Prop } from "vue-property-decorator";
import UiDateTime from "@views/components/ui-date-picker/ui-date-time.vue";
import { setTransitionHooks } from "@vue/runtime-core";

@Options<UiDatePicker>({
  watch: {
    innerShowDatetime() {
      this.iconFocused = this.innerShowDatetime;
    },

    value(value) {
      this.innerDate = this.value;
      this.innerDateFormatted = this.formatDate(this.value);
    },
    innerDateFormatted(value) {
      this.oninnerDateFormatted();
    },
    innerSecondDateFormatted(value) {
      this.oninnerDateFormatted();
    },
  },
  emits: ["update:modelValue", "inputRage", "errorData"],
  components: { UiDateTime },
})
export default class UiDatePicker extends Vue {
  @Prop({ type: Date, default: new Date() }) fromDate: Date;
  @Prop({ type: Date, default: new Date() }) toDate: Date;

  @Prop({ type: Date, default: () => new Date() }) value: Date;
  // @Prop({ type: Date, default: () => new Date() }) dateSecond: Date;
  @Prop({ type: Boolean, default: true }) asUTC: boolean;
  @Prop({ default: "DD.MM.YYYY", type: String }) dateFormat: string;
  // ограничение даты снизу
  @Prop({ default: null, type: Date }) minimumDate: Date;
  @Prop({ default: null, type: Date }) maximumDate: Date;

  @Prop({ type: String }) initialView: String;
  @Prop({ default: "months", type: String }) minimumView: string;
  @Prop({ default: "years", type: String }) maximumView: string;

  //включен диапазон дат
  @Prop({ default: false, type: Boolean }) isDateRange: boolean;
  @Prop({ default: false, type: Boolean }) view2: boolean;

  // показывать текущую дату
  @Prop({ default: true, type: Boolean }) showCurrentDate: boolean;

  //показывать рамку только активации элемента
  @Prop({ default: false, type: Boolean }) transformer: boolean;

  @Prop({ default: null }) eventDates: Array<any>;
  @Prop({ default: true, type: Boolean }) autoCloseWhenChangeDay: boolean; //закрывать после выбора дня месяца
  @Prop({ default: false, type: Boolean }) changeDateManual: boolean; //разрешить редактирование даты вручную
  @Prop({ default: false, type: Boolean }) letSelectAllDays: boolean;

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
  created() {
    this.innerDateFormatted = this.formatDate(this.fromDate);
    this.innerSecondDateFormatted = this.formatDate(this.toDate);
    this.inner2DateFormatted = {
      dateFrom: this.innerDateFormatted,
      dateTo: this.innerSecondDateFormatted,
    };
    this.innerDate = this.fromDate;
    this.innerSecondDate = this.toDate;
    document.body.addEventListener("click", this.clickOutside.bind(this));
  }
  destroyed() {
    document.body.removeEventListener("click", this.clickOutside.bind(this));
  }
  oninnerDateFormatted() {
    if (this.isDateRange) {
      if (this.view2) {
        this.inner2DateFormatted = {
          dateFrom: this.formatDate(this.innerDate),
          dateTo: this.formatDate(this.innerSecondDate),
        };
      }
      // apdete
      if (
        this.inner2DateFormatted.dateFrom == this.inner2DateFormatted.dateTo
      ) {
        return;
      }
      if (this.innerDate < this.innerSecondDate) {
        this.wrong = false
        this.changeFirstDate(this.innerDate);
        this.changeSecondDate(this.innerSecondDate);
      } else {
        this.wrong = true;
        let self = this;
        setTimeout(function(){self.wrong = false}, 2000);
        this.inner2DateFormatted.dateFrom = this.innerDateFormatted;
        this.changeFirstDate(this.toDate);
        this.inner2DateFormatted.dateTo = this.innerSecondDateFormatted;
        this.changeFirstDate(this.fromDate);
      }
      // this.$emit(
      //   "inputrange",
      //   this.getFormatDate(this.innerDate),
      //   this.getFormatDate(this.innerSecondDate)
      // );
    } else {
      this.$emit("input", this.getFormatDate(this.innerDate));
      this.$emit("update:modelValue", this.getFormatDate(this.innerDate));

      if (this.changeDateManual) {
        return;
      }

      var x = this.formatDateRev(this.innerDateFormatted.toString());
      if (x != "Invalid Date") {
        this.innerDate = x;
      } else this.innerDateFormatted = this.formatDate(this.innerDate);

      this.$emit("input", this.getFormatDate(this.innerDate));
      this.$emit("update:modelValue", this.getFormatDate(this.innerDate));
    }
  }
  getFormatDate(date: Date): Date {
    if (!this.asUTC) {
      return date;
    }
    const temp = new Date(date);

    var now_utc = Date.UTC(
      temp.getFullYear(),
      temp.getMonth(),
      temp.getDate(),
      temp.getHours(),
      temp.getMinutes(),
      temp.getSeconds()
    );
    return new Date(now_utc);
  }

  //--------------------------------------------
  changeDate(date: Date, type: string) {
    console.log('changeDate' , date);
    
    if (this.isDateRange) {
      if (this.isFirstChoice) {
        this.changeFirstDate(date);
        this.inner2DateFormatted.dateFrom = this.formatDate(date);
      } else {
        if (this.innerDate > date) {
          //console.log("заходит сюда если сначала выбрана дата больше");
          let swap = this.innerDate;
          this.innerDate = date;
          this.innerDateFormatted = this.formatDate(this.innerDate);
          this.inner2DateFormatted.dateFrom = this.formatDate(this.innerDate);
          date = swap;
          this.innerSecondDate = date;
          this.innerSecondDateFormatted = this.formatDate(this.innerSecondDate);
          this.changeFirstDate(this.innerDate);
          this.inner2DateFormatted.dateTo = this.formatDate(date);
          this.isFirstChoice = !this.isFirstChoice;
          if (this.autoCloseWhenChangeDay && type == "days") {
            this.innerShowDatetime = false;
          }
          return;
        }
        this.changeSecondDate(date);
        this.inner2DateFormatted.dateTo = this.formatDate(date);
      }
      this.isFirstChoice = !this.isFirstChoice;
    } else {
      this.changeFirstDate(date);
    }
    if (this.autoCloseWhenChangeDay && this.isFirstChoice && type == "days") {
      this.innerShowDatetime = false;
    }
  }

  changeFirstDate(date: Date) {
    this.innerDate = date;
    this.innerDateFormatted = this.formatDate(this.innerDate);
    this.$emit("inputRage", this.getFormatDate(this.innerDate));
  }

  changeSecondDate(date: Date) {
    this.innerSecondDate = date;
    this.innerSecondDateFormatted = this.formatDate(this.innerSecondDate);
    this.$emit("inputRage", this.getFormatDate(this.innerSecondDate));
  }

  targetDatetime() {
    this.innerShowDatetime = !this.innerShowDatetime;
    this.iconFocused = this.innerShowDatetime;
  }
  formatDate(date: Date) {
    var moment = require("moment");
    var now = moment(date);
    moment.locale("ru");
    return now.format(this.dateFormat);
  }
  formatDateRev(value: String) {
    var moment = require("moment");
    var now = moment(value, this.dateFormat);
    moment.locale("ru");
    return now.toDate();
  }

  isClickedToDatePicker(event: MouseEvent): boolean {
    // const box = this.$refs.dateTimeWrapper as HTMLElement;
    const boxId = document.getElementById("dateTimeWrapper");
    if (!boxId) {
      return false;
    }
    const rect = boxId.getBoundingClientRect();
    if (!rect) {
      return false;
    }
    const dx = event.clientX - rect.left;
    const dy = event.clientY - rect.top;
    return dx > 0 && dx < rect.width && dy > 0 && dy < rect.height;
  }

  clickOutside(event: any) {
    if (this.isClickedToDatePicker(event)) {
      if (this.isDateRange) {
        // this.isFirstChoice = true;
        // if (this.isFirstChoice && this.innerDate > this.innerSecondDate) {
        //   var k = this.innerDate;
        //   this.changeFirstDate(this.innerSecondDate);
        //   this.changeSecondDate(k);
        // }
      }
    } else {
      if (!(this.$el == event.target || this.$el.contains(event.target))) {
        if (this.innerShowDatetime) {
          this.innerShowDatetime = false;
        }
      }
    }
  }
  onPressEnterLeft() {
    if (moment(this.inner2DateFormatted.dateFrom, "DD.MM.YYYY").isValid) {
      this.innerDate = moment(
        this.inner2DateFormatted.dateFrom,
        this.dateFormat
      ).toDate();
      this.oninnerDateFormatted();
    } else {
      this.inner2DateFormatted.dateFrom = this.formatDate(this.innerDate);
    }
  }
  onPressEnterRight() {
    if (moment(this.inner2DateFormatted.dateTo, "DD.MM.YYYY").isValid) {
      this.innerSecondDate = moment(
        this.inner2DateFormatted.dateTo,
        this.dateFormat
      ).toDate();
      this.oninnerDateFormatted();
    } else {
      this.inner2DateFormatted.dateTo = this.formatDate(this.innerSecondDate);
    }
  }
  onFocus(el: any) {
    this.innerShowDatetime = true;
  }
  onEnter(el: any) {
    if (this.changeDateManual) {
      if (moment(this.innerDateFormatted, this.dateFormat).isValid()) {
        var now = moment(this.innerDateFormatted, this.dateFormat);
        this.innerDate = now.toDate();
      }
    }
    el.target.blur();
    this.innerShowDatetime = false;
    this.iconFocused = false;
  }
  onTab(el: any) {
    if (this.changeDateManual) {
      if (moment(this.innerDateFormatted, this.dateFormat).isValid()) {
        var now = moment(this.innerDateFormatted, this.dateFormat);
        this.innerDate = now.toDate();
        this.$emit("input", this.getFormatDate(this.innerDate));
        this.$emit("update:modelValue", this.getFormatDate(this.innerDate));
      } else {
        this.innerDateFormatted = this.formatDate(this.innerDate);
      }
    }
    el.target.blur();
    this.innerShowDatetime = false;
    this.iconFocused = false;
  }

  onBlur(el: any) {
    if (this.changeDateManual) {
      if (moment(this.innerDateFormatted, this.dateFormat).isValid()) {
        var now = moment(this.innerDateFormatted, this.dateFormat);
        this.innerDate = now.toDate();
        this.$emit("input", this.getFormatDate(this.innerDate));
        this.$emit("update:modelValue", this.getFormatDate(this.innerDate));
      } else {
        this.innerDateFormatted = this.formatDate(this.innerDate);
      }
    }
  }
}
</script>

<style lang="less">
@uiDatePickerBorderRadius: 0;

@uiDatePickerColor: #000;
@uiDatePickerBorderColor: #394e72;
@uiDatePickerBgColor: #293b5a;
@uiDatePickerFocusBgColor: #fff;
@uiDatePickerBorderColorFocus: #293b5a;

.ui-date-picker {
  width: auto;
  display: flex;
  border-radius: @uiDatePickerBorderRadius;
  background-color: @uiDatePickerBgColor;
  .border-nofocus {
    border: 1px solid @uiDatePickerBorderColor;
  }
  .border-focus {
    border: 1px solid @uiDatePickerBorderColorFocus;
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
      // background-color: red;
    }
  }
  .wrong {

border: 2px solid red !important;
  }
  .isDateRange {
    padding: 0.375em 0.75em;
  }
  .input-group {
    position: relative;
    width: auto;
    display: flex;
    flex-wrap: nowrap;
    .icon-calendar {
      margin-right: 10px;
    }
    input {
      // padding: 0.375em 0.75em;
      // background: @uiDatePickerBgColor;
      font-size: 1rem;
      color: @uiDatePickerColor;
      border: 1px solid @uiDatePickerBorderColor;

      display: flex;
      width: 100%;

      &:focus {
        border: 1px solid @uiDatePickerBorderColorFocus;
        outline: none !important;
      }
      &.focus {
        border: 1px solid @uiDatePickerBorderColorFocus;
      }
    }
    .icon {
      position: absolute;
      right: 15px;
      top: calc(50% - 1em / 2);
      border-left: none;
      cursor: pointer;
      
      color: #99a4c0;
      align-items: center;
    }
    &.view2 {
      align-items: center;
      border-radius: @uiDatePickerBorderRadius;
      .icon {
        margin: 0 10px;
        position: unset;
      }
    }
    .icon::before {
      content: "\e90c";
    }
    .delimiter {
      color: rgba(0, 0, 0, 0.2);
      padding: 0 15px;
      display: flex;
      align-items: center;
      font-size: 1.4rem;
      font-weight: bold;
    }
  }
  .date-time-wrapper {
    margin-top: 35px;
    z-index: 1000;
    position: absolute;
  }
  & + & {
    margin-left: 20px;
  }
}

.ui-date-picker {
  .input-group {
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
  .view2 {
    border: 1px solid @uiDatePickerBorderColor;
    border-radius: @uiDatePickerBorderRadius;
    display: flex;
    input {
      width: 110px;
      margin: 1px;
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
  }
}
</style>
