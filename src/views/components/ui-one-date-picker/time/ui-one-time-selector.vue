<template>
  <div class="ui-time-range" v-if="!linkedDatePickerName">
    <ui-one-hour-selector
      v-if="innerCurrentView == 'hours'"
      @onNavigation="NavigatorDatetime('days')"
      @changeHour="ChangeDatetime('minutes', 'hours')"
      @changeCurrentView="ChangeCurrentView"
      :allowedToShowView="allowedToShowView"
      v-model:date="innerDate"
      @change="$emit('change', $event)"
      @update:date="$emit('update:date', $event)"
      @errorDate="$emit('errorDate', $event)"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";
const views = ["minutes", "hours"];
import UiHourSelector from "@views/components/ui-time-range-selector/ui-hour-selector.vue";
@Options<UiOneTimeSelector>({
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
  components: { UiHourSelector },
})
export default class UiOneTimeSelector extends Vue {
  @Prop({ default: new Date(), type: Date }) date: Date;
  @Prop({ default: new Date(), type: Date }) dateSecond: Date;
  @Prop({ default: null, type: Date }) minimumDate: Date;
  // ограничение даты сверху
  @Prop({ default: null, type: Date }) maximumDate: Date;
  minimumView = "hours";
  maximumView = "hours";
  initialView = "hours";
  @Prop({ default: null, type: String }) linkedDatePickerName: String;
  isDateRange = true;
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

  ChangeDatetime(typeView: any, type: string) {
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
@uiDateTimeBgColor: #fff;
@uiDateTimeBorderColor: #d0d9de;
@uiDateTimeNavigationColor: #043043;
@uiDateTimeBgColorTitleHover: #043043;
@uiDatePickerBorderRadius: "0";
@uiDateTimeBoxShadow: 0px 0px 20px rgba(0, 0, 0, 0);

.ui-time-range {
  background-color: @uiDateTimeBgColor;
  border-radius: @uiDatePickerBorderRadius;
 border-top: 1px solid @uiDateTimeBorderColor;
  border-right: 1px solid @uiDateTimeBorderColor;
  border-left: 1px solid @uiDateTimeBorderColor;
  width: 297px;
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
      font-family: TirScript;
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
