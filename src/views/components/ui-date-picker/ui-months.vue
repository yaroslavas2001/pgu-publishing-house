<template>
  <div class="months">
    <div class="navigation">
      <div class="icon-arrow-left" @click="backward"></div>
      <div class="title_date-picker unselectable" @click.stop="changeYear">
        {{ innerYear }}
      </div>
      <div class="icon-arrow-right" @click="next"></div>
    </div>
    <div class="items">
      <template v-for="(month, key) in innerMonths" :key="key">
        <div class="month" :class="month.type">
          <div @click.stop="changeMonth(month)">{{ month.name }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue ,Prop} from "vue-property-decorator";
import moment from "moment";
@Options<UiMonths>({
  props: {
    minimumDate: Date,
  },
})
export default class UiMonths extends Vue {
  @Prop({ default: new Date(), type: Date })         date: Date;
  @Prop({ default: null, type: Date })        minimumDate: Date;
  readonly months: string[] = [
    "янв",
    "фев",
    "мар",
    "апр",
    "май",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек",
  ];

  innerMonths: any[] = [];
 innerMonth:number= null;
 innerYear:number= null;
 innerDay:number = null;
  created(){
     this.innerMonth = this.date.getMonth();
  this.innerYear = this.date.getFullYear();
  this.innerDay = this.date.getDate();
  }
  mounted() {
    this.setMonths();
    this.setMonth(this.date);
  }

  setMonths() {
    var self = this;
    this.innerMonths = this.months.map(function (item, index) {
      return {
        number: index,
        name: item,
        type: !self.checkDateActivity(index)
          ? "no-active"
          : self.innerMonth == index
          ? "current"
          : "",
      };
    });
  }
  setMonth(date: Date) {
    this.innerYear = date.getFullYear();
  }
  next() {
    this.setMonth(new Date(this.innerYear + 1, this.innerMonth, 1));
  }
  backward() {
    this.setMonth(new Date(this.innerYear - 1, this.innerMonth, 1));
  }
  changeMonth(month: any) {
    let mon = parseInt(moment(this.date).format("MM")) - 1;
    let day = parseInt(moment(this.date).format("DD"));
    let hour = parseInt(moment(this.date).format("HH"));
    let min = parseInt(moment(this.date).format("mm"));
    let sek = parseInt(moment(this.date).format("ss"));

    if (month.type != "no-active") {
      this.$emit(
        "changeMonth",
        new Date(this.innerYear, month.number, day, hour, min, sek)
      );
      this.innerMonth = month.number;
      this.setMonths();
    }
  }
  changeYear() {
    this.$emit("onNavigation");
  }
  /**
   * Проверить активность даты
   */
  checkDateActivity(month: any) {
    if (!this.minimumDate) return true;
    return (
      new Date(this.innerYear, month) >
      new Date(this.minimumDate.getFullYear(), this.minimumDate.getMonth(), 0)
    );
  }
}
</script>

<style lang="less">
@uiMonthsColor: #043043;

@uiMonthsColorHover: #fff;
@uiMonthsBgColorHover: #043043;

@uiMonthsBgColorCurent: #043043;
@uiMonthsBgColorCurentHover: #043043;
@uiMonthsColorCurent: #fff;
@uiMonthsColorNoActive: #fff;

.months {
   .navigation{
    align-items: center;
  }
  .items {
    height: 210px;
    padding: 0.9em 1.2em;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    font-size: 0.9em;
    .month {
      display: flex;
      align-items: center;
      justify-content: center;
      color: @uiMonthsColor;
      cursor: pointer;
      &:hover > div {
        color: @uiMonthsColorHover;
        background-color: @uiMonthsBgColorHover;
        border-radius: 15px;
        padding: 7px 0px;
        width: 100%;
        align-items: center;
        justify-content: center;
        display: flex;
      }
      &.current > div {
        color: @uiMonthsColorCurent;
        background-color: @uiMonthsBgColorCurentHover;
        border-radius: 15px;
        padding: 7px 0px;
        width: 100%;
        align-items: center;
        justify-content: center;
        display: flex;
      }
      &.no-active {
        color: @uiMonthsColorNoActive;
        cursor: default;
      }
    }
  }
}
</style>
