<template>
  <div class="date-time" v-if="!linkedDatePickerName">
    <ui-days
      v-if="innerCurrentView == 'days'"
      @onNavigation="NavigatorDatetime('months')"
      @changeDay="(date) => ChangeDatetime(date, 'days', 'days')"
      @changeCurrentView="ChangeCurrentView"
      :allowedToShowView="allowedToShowView"
      :date="innerDate"
      :dateSecond="this.dateSecond"
      :maximumDate="maximumDate"
      :minimumDate="minimumDate"
      :isDateRange="isDateRange"
      :eventDates="eventDates"
      :showCurrentDay="showCurrentDate"
    >
    </ui-days>
    <ui-months
      v-if="innerCurrentView == 'months'"
      @onNavigation="NavigatorDatetime('years')"
      @changeMonth="(date) => ChangeDatetime(date, 'days', 'month')"
      :date="innerDate"
      :maximumDate="maximumDate"
      :minimumDate="minimumDate"
    >
    </ui-months>
    <ui-years
      v-if="innerCurrentView == 'years'"
      @changeYear="(date) => ChangeDatetime(date, 'months', 'years')"
      :date="innerDate"
      :maximumDate="maximumDate"
      :minimumDate="minimumDate"
    >
    </ui-years>
    <ui-hours
      v-if="innerCurrentView == 'hours'"
      @onNavigation="NavigatorDatetime('days')"
      @changeHour="(date) => ChangeDatetime(date, 'minutes', 'hours')"
      @changeCurrentView="ChangeCurrentView"
      :allowedToShowView="allowedToShowView"
      :date="innerDate"
      :dateSecond="this.dateSecond"
      :isDateRange="isDateRange"
    >
    </ui-hours>
    <ui-minutes
      v-if="innerCurrentView == 'minutes'"
      @onNavigation="NavigatorDatetime('hours')"
      @changeMinute="(date) => ChangeDatetime(date, 'minutes', 'minutes')"
      @changeCurrentView="ChangeCurrentView"
      :date="innerDate"
    >
    </ui-minutes>
  </div>
</template>

<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";
const views = ["minutes", "hours", "days", "months", "years"];
import UiDays from "@views/components/ui-date-picker/ui-days.vue";
import UiMonths from "@views/components/ui-date-picker/ui-months.vue";
import UiYears from "@views/components/ui-date-picker/ui-years.vue";
import UiHours from "@views/components/ui-date-picker/ui-hours.vue";
import UiMinutes from "@views/components/ui-date-picker/ui-minutes.vue";
const validatorView = function (value: string): boolean {
  return views.indexOf(value) !== -1;
};
@Options<UiDateTime>({
  watch: {
    maximumView(value) {
      this.validateViewRanges();
    },
    minimumView(value) {
      this.validateViewRanges();
    },
    minDate(value) {
      if (this.linkedDatePicker) {
        return this.linkedDatePicker;
      }
      return this.minimumDate;
    },
  },
  components: { UiDays, UiMonths, UiYears, UiHours, UiMinutes },
})
export default class UiDateTime extends Vue {
  @Prop({ default: new Date(), type: Date }) date: Date;
  @Prop({ default: new Date(), type: Date }) dateSecond: Date;
  @Prop({ default: null, type: Date }) minimumDate: Date;
  // ограничение даты сверху
  @Prop({ default: null, type: Date }) maximumDate: Date;
  @Prop({ type: String, validator: validatorView }) initialView: String;
  @Prop({ default: "years", type: String, validator: validatorView })
  minimumView: string;
  @Prop({ default: "months", type: String, validator: validatorView })
  maximumView: string;
  @Prop({ default: null, type: String }) linkedDatePickerName: String;
  @Prop({ default: false, type: Boolean }) isDateRange: boolean;
  @Prop({ default: () => [] }) eventDates: Array<any>;
  @Prop({ default: true }) showCurrentDate: boolean;

  innerCurrentView = this.getInitialView();
  innerDay: number = null;
  innerMonth: number = null;
  innerYear: number = null;
  innerHour: number = null;
  innerMinute: number = null;
  innerDate: Date = null;
  linkedDatePicker;
  created() {
    this.innerCurrentView = this.getInitialView();
    this.innerDay = this.date.getDate();
    this.innerMonth = this.date.getMonth();
    this.innerYear = this.date.getFullYear();
    this.innerHour = this.date.getHours();
    this.innerMinute = this.date.getMinutes();
    this.innerDate = this.date;
    this.validateViewRanges();
    this.innerCurrentView = this.getInitialView();
    this.linkedDatePicker = this.linkedDatePickerName;
  }
  mounted() {
    this.linkedDatePicker = this.linkedDatePickerName;
    this.validateViewRanges();
  }

  validateViewRanges() {
    var invalid =
      views.indexOf(this.minimumView) > views.indexOf(this.maximumView);
    if (invalid) {
      console.error(
        `Maximumview не может быть меньше minimumView. Maximumview=${this.maximumView}, minimumview=${this.minimumView}`
      );
    }
  }

  NavigatorDatetime(typeView: any) {
    if (this.allowedToShowView(typeView)) {
      this.innerCurrentView = typeView;
    }
  }

  ChangeDatetime(date: Date, typeView: any, type: string) {
    //console.log('ChangeDatetime', date, typeView, type);
    
    this.innerDate = date;
    this.$emit("change", date, type);
    if (this.allowedToShowView(typeView)) {
      this.ChangeCurrentView(typeView);
    }
  }
  /**
   * Изменить текущее представление
   */
  ChangeCurrentView(typeView: any) {
    this.innerCurrentView = typeView;
  }

  getInitialView(): String {
    if (!this.initialView) return this.maximumView;
    return this.initialView;
  }
  /**
   * Разрешено ли открытие представления
   */
  allowedToShowView(view: any) {
    let minimumViewIndex = views.indexOf(this.minimumView);
    let maximumViewIndex = views.indexOf(this.maximumView);
    let viewIndex = views.indexOf(view);
    return viewIndex >= minimumViewIndex && viewIndex <= maximumViewIndex;
  }
  getRequest() {
    return this.date;
  }
}
</script>

<style lang="less">
@uiDateTimeBgColor: #293b5a;
@uiDateTimeBorderColor: #3e71bb;
@uiDateTimeNavigationColor: #fff;
@uiDateTimeBgColorTitleHover: #043043;
@uiDatePickerBorderRadius: "0";
@uiDateTimeBoxShadow: 0px 0px 20px rgba(0, 0, 0, 0);

.date-time {
  background-color: @uiDateTimeBgColor;
  border-radius: @uiDatePickerBorderRadius;
  border: 1px solid @uiDateTimeBorderColor;
  width: 270px;
  box-shadow: @uiDateTimeBoxShadow;

  .navigation {
    color: @uiDateTimeNavigationColor;
    display: flex;
    justify-content: center;
    font-size: 0.9em;
    padding-top: 15px;
    .title_date-picker {
      display: flex;
      justify-content: center;
      margin: 0 10px;
      padding: 5px;
      border-radius: 20px;
      width: 120px;
      text-transform: uppercase;
      cursor: pointer;
      &:hover {
        background: @uiDateTimeBgColorTitleHover;
        color: #fff;
      }
    }
    .backward,
    .next {
      display: flex;
      
      font-size: 0.7em;
      align-items: center;
      cursor: pointer;
      width: 25px;
      position: relative;
      justify-content: center;
      border-radius: 20px;
      &:hover {
        background: @uiDateTimeBgColorTitleHover;
        color: #fff;
      }
    }
    .backward::before {
      content: "\e909";
    }
    .next::before {
      content: "\e90a";
    }
  }
}
</style>
