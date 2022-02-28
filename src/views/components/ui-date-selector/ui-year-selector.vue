<template>
  <div class="years">
    <div class="navigation">
      <div class="icon-arrow-left" @click="backward"></div>
      <div class="title_date-picker unselectable">
        {{ innerYear }} - {{ this.innerYear + 10 }}
      </div>
      <div class="icon-arrow-right" @click="next"></div>
    </div>
    <div class="items">
      <template v-for="(year, key) in years" :key="key">
        <div class="year" :class="year.type">
          <div @click.stop="changeYear(year)">{{ year.number }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import moment from "moment";
@Options<UiYears>({
  props: {
    date: Date,
    minimumDate: Date,
  },
})
export default class UiYears extends Vue {
  // @Prop({ default: new Date(), type: Date }) date: Date;
  // @Prop({ default: null, type: Date }) minimumDate: Date;
  readonly date: Date = new Date();
  readonly minimumDate: Date = new Date();

  innerYear = this.date.getFullYear();
  years: any[] = [];

  mounted() {
    this.setYears(this.date);
  }

  setYears(date: Date) {
    this.innerYear = Math.trunc(date.getFullYear() / 10) * 10;
    this.years = [];
    for (
      let index = this.innerYear - 1;
      index <= this.innerYear + 10;
      index++
    ) {
      this.years.push({
        number: index,
        type:
          index < this.innerYear ||
          index >= this.innerYear + 10 ||
          !this.checkDateActivity(index)
            ? "no-active"
            : date.getFullYear() == index
            ? "current"
            : "",
      });
    }
  }
  next() {
    this.setYears(new Date(this.innerYear + 100, 1, 1));
  }
  backward() {
    this.setYears(new Date(this.innerYear - 100, 1, 1));
  }
  changeYear(year: any) {
    let mon = parseInt(moment(this.date).format("MM")) - 1;
    let day = parseInt(moment(this.date).format("DD"));
    let hour = parseInt(moment(this.date).format("HH"));
    let min = parseInt(moment(this.date).format("mm"));
    let sek = parseInt(moment(this.date).format("ss"));

    // if (year.type != "no-active") {
    this.$emit("changeYear", new Date(year.number, mon, day, hour, min, sek));
    this.innerYear = year.number;
    this.setYears(new Date(year.number, mon, day, hour, min, sek));
    // }
  }
  /**
   * Проверить активность даты
   */
  checkDateActivity(year: any) {
    if (!this.minimumDate) return true;
    return year >= this.minimumDate.getFullYear();
  }
}
</script>

<style lang="less">
// @uiYearsTitleColor :#fff;
@uiYearsColor: #b8c3e0;

@uiYearsColorHover: #fff;
@uiYearsBgColorHover: #3e71bb;

@uiYearsBgColorCurent: #043043;
@uiYearsBgColorCurentHover: #043043;
@uiYearsColorCurent: #fff;
@uiYearsColorNoActive: #465675;

.years {
  .items {
    // width: 210px;
    height: 210px;
    padding: 0.9em 1.2em;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    // font-size: 1em;
    font-size: 0.9em;
    .year {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: @uiYearsColor;
      &:hover > div {
        color: @uiYearsColorHover;
        background-color: @uiYearsBgColorHover;
        border-radius: 15px;
        padding: 7px 0px;
        width: 100%;
        align-items: center;
        justify-content: center;
        display: flex;
      }
      &.current > div {
        color: @uiYearsColorCurent;
        background-color: @uiYearsBgColorCurentHover;
        border-radius: 15px;
        padding: 7px 0px;
        width: 100%;
        align-items: center;
        justify-content: center;
        display: flex;
      }
      &.no-active {
        color: @uiYearsColorNoActive;
        // cursor: default;
      }
    }
  }
}
</style>


