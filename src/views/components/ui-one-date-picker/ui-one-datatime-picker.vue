<template>
  <div class="ui-one-data-picker" :class="{ wrongTime: wrong }">
    <!--  v-click-outside="onBlur" -->
    <slot>
      <div class="input-group">
        <template v-if="isDateRange">
          <slot name="isDataRange">
            <template v-if="!changeDateManual">
              <div class="input-1" v-if="innerDateFormatted">
                {{ innerDateFormatted }}
              </div>
            </template>
            <template v-else>
              <div class="inputDate">
                <input
                  @keydown.enter="onBlur"
                  @keydown.tab="onBlur"
                  v-model="innerDateFormatted"
                  :class="[{ transformer: transformer }, 'twoDate', 'left']"
                  :readonly="!changeDateManual"
                />
              </div>
            </template>
          </slot>
        </template>
        <div :class="[{ transformer: transformer }]" @click="targetDatetime">
          <!-- <img src="@assets/img/calendar.svg" class="mr-2 ml-2 pointer" alt="calendar" /> -->
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
        <ui-one-date-selector
          v-model:date="this.innerDate"
          @update:date="$emit('update:date', $event)"
          @change="changeDate"
          @errorDate="errorDate"
        />
        <div
          @click="changeDayHours"
          class="change_day_hours pointer"
          v-if="isShowClock"
        >
          Выбрать час
        </div>
      </div>
      <div v-else>
        <ui-one-time-selector
          v-model:date="this.innerDate"
          @update:date="$emit('update:date', $event)"
          @change="changeDate"
          @errorDate="errorDate"
        />
        <div @click="changeDayHours" class="change_day_hours pointer">
          Выбрать день
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import moment from "moment";
import { Options, Vue, Prop, Watch } from "vue-property-decorator";
@Options<UiOneDatetimePicker>({
  name: "datatime-range-picker",
  watch: {
    innerShowDatetime() {
      this.iconFocused = this.innerShowDatetime;
    },
  },
  emits: ["update:modelValue"],
})
export default class UiOneDatetimePicker extends Vue {
  // @Prop({ type: Date }) modelValue: Date;

  @Prop() modelValue: Date;

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
  @Prop({ default: true, type: Boolean }) isShowClock: boolean;

  @Prop({ default: null }) eventDates: Array<any>; //выделенный промежуток дат
  @Prop({ default: true, type: Boolean }) autoCloseWhenChangeDay: boolean; //закрывать после выбора дня месяца
  changeDateManual = true; //разрешить редактирование даты вручную

  innerDate: Date;
  innerDateFormatted: Date = null;
  innerSecondDate: Date;
  innerSecondDateFormatted: Date;
  innerShowDatetime = false;
  isFirstChoice = true;
  iconFocused = false;
  firstClick = true;
  wrong: boolean = false;
  isDay = false;
  changeDayHours() {
    this.isDay = !this.isDay;
  }

  @Watch("modelValue")
  modelValueUpdate() {    
    if (!moment(this.modelValue).isValid() || this.modelValue == null) {
      this.innerDate = new Date();
    } else {
      this.innerDateFormatted = this.formatDate(this.modelValue);
      this.innerDate = this.modelValue;
    }
  }
  created(){
      if (!moment(this.modelValue).isValid() || this.modelValue == null) {
      this.innerDate = new Date();
    } else {
      this.innerDateFormatted = this.formatDate(this.modelValue);
      this.innerDate = this.modelValue;
    }
  }
  // modelValueUpdateAsync() {
  //   if (!moment(this.modelValue).isValid() || this.modelValue == null) {
  //     this.innerDate = new Date();
  //   } else {
  //     this.innerDateFormatted = this.formatDate(this.modelValue);
  //     this.innerDate = this.modelValue;
  //   }
  // }

  closeCalendar() {
    this.innerShowDatetime = false;
  }
  errorDate() {
    this.wrong = true;
    let self = this;
    setTimeout(function () {
      self.wrong = false;
    }, 2000);
  }
  oninnerDateFormatted() {
    this.innerDateFormatted = this.formatDate(this.innerDate);
    this.changeDate(this.innerDate);
  }
  //отпраыить изменения
  changeDate(date: Date) {
    this.innerShowDatetime = false;
    this.innerDate = date;
    this.innerDateFormatted = this.formatDate(this.innerDate);
    this.$emit("update:modelValue", date);
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
    if (this.modelValue !== null) {
      if (moment(this.innerDateFormatted, this.dateFormat).isValid()) {
        this.innerDate = moment(
          this.innerDateFormatted,
          this.dateFormat
        ).toDate();
        this.oninnerDateFormatted();
      } else {
        this.innerDateFormatted = this.formatDate(this.innerDate);
        this.errorDate();
      }
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

.ui-one-data-picker {
  width: auto;
  // display: flex;
  border-radius: @uiDatePickerBorderRadius;
  border: 1px solid @uiDatePickerBorderColor;
  // background-color: @uiDatePickerBgColor;
    border-radius: 4px;

  .border-nofocus {
    border: 1px solid @uiDatePickerBorderColor;
  }
  .border-focus {
    border: 1px solid @uiDatePickerBorderColorFocus;
  }
  .input-group {
    background-color: #f3f4fa;
    border-radius: @uiDatePickerBorderRadius;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    padding: 4px 20px;
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
      width: auto;
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
    width: 200px;
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
</style>
