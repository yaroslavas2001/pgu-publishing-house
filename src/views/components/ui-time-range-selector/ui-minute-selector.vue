<template>
  <div class="minutes">
    <div class="navigation">
      <div class="icon-arrow-left" @click="backward"></div>
      <div class="title_date-picker minutes" @click="changeHours">
        <!-- {{ m }} -->
        {{ this.getHourName() }}
      </div>
      <div class="icon-arrow-right" @click="next"></div>
    </div>
    <!-- <div class="back-to-days" @click.stop="openDays"></div> -->
    <div class="items">
      <template v-for="(minute, key) in innerMinutes" :key="key">
        <div class="minute" :class="minute.type" @click="changeMinute(minute)">
          <div>{{ minute.name }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";
import moment from "moment";
@Options<UiMinuteSelector>({})
export default class UiMinuteSelector extends Vue {
  @Prop({ default: new Date(), type: Date }) date: Date;
  innerMinutes: any = [];
  innerMonth: number = null;
  innerYear: number = null;
  innerDay: number = null;
  innerHour: number = null;
  innerMinute: number = null;

  created() {
    console.log(this.date);
    // console.log(this/f);
    
    
    this.innerMonth = this.date.getMonth();
    this.innerYear = this.date.getFullYear();
    this.innerDay = this.date.getDate();
    this.innerHour = this.date.getHours();
    this.innerMinute = this.date.getMinutes();
  }
  mounted() {
    this.setHour(this.date);
    this.setMinutes();
  }
  get m() {
    return moment(
      new Date(this.innerYear, this.innerMonth, this.innerDay)
    ).format("D MMM YYYY");
  }
  setMinutes() {
    this.innerMinutes = [];
    for (let index = 0; index < 60; index += 5) {
      this.innerMinutes.push({
        name:
          this.innerHour +
          ":" +
          index.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          }),
        number: index,
        type: Number(this.innerMinute) == index ? "current" : "",
      });
    }
  }
  getHourName() {
    let hourNames = [" час", " часа", " часов"];
    let n = Math.abs(this.innerHour) % 100;
    let n1 = n % 10;
    if (n > 10 && n < 20) {
      return this.innerHour + hourNames[2];
    }
    if (n1 > 1 && n1 < 5) {
      return this.innerHour + hourNames[1];
    }
    if (n1 == 1) {
      return this.innerHour + hourNames[0];
    }
    return this.innerHour + hourNames[2];
  }

  setHour(date: Date) {
    this.innerHour = date.getHours();
  }
  next() {
    this.setHour(
      new Date(
        this.innerYear,
        this.innerMonth,
        this.innerDay,
        this.innerHour + 1
      )
    );
    this.setMinutes();
  }
  backward() {
    this.setHour(
      new Date(
        this.innerYear,
        this.innerMonth,
        this.innerDay,
        this.innerHour - 1
      )
    );
    this.setMinutes();
  }
  click = false;
  firstData: Date;
  changeMinute(minute: any) {
    this.clearMinutes();
    minute.type = "current";
    if (!this.click) {
      this.firstData = new Date(
        this.innerYear,
        this.innerMonth,
        this.innerDay,
        this.innerHour,
        minute.number
      );
    } else {
      let secondData = new Date(
        this.innerYear,
        this.innerMonth,
        this.innerDay,
        this.innerHour,
        minute.number
      );
      this.$emit("changeMinute");
    }

    // this.$emit("changeCurrentView", "hours");
  }
  changeHours() {
    this.$emit("onNavigation");
  }
  clearMinutes() {
    for (let index = 0; index < this.innerMinutes.length; index++) {
      if (this.innerMinutes[index].type == "current") {
        this.innerMinutes[index].type = "";
      }
    }
  }
  // openDays() {
  //   this.$emit("changeCurrentView", "days");
  // }
}
</script>

<style lang="less">
.date-time .navigation .title_date-picker.minutes {
  width: 145px;
}
.minutes {
  .navigation {
    align-items: center;
  }
  .items {
    // width: 210px;
    height: 165px;
    padding: 0.9em 1.2em;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    // font-size: 14px;
    font-size: 0.9em;
    .minute {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover > div {
        color: #fff;
        background-color: #043043;
        border-radius: 15px;
        padding: 7px 0px;
        width: 100%;
        align-items: center;
        justify-content: center;
        display: flex;
      }
    }
    .minute.current > div {
      color: #fff;
      background-color: #465675;
      border-radius: 15px;
      padding: 7px 0px;
      width: 100%;
      align-items: center;
      justify-content: center;
      display: flex;
      &:hover {
        background-color: #465675;
      }
    }
  }
  .back-to-days {
    display: flex;
    font-family: TirScript;
    border-bottom: 1px solid rgba(0, 0, 0, 0.11);
    padding: 20px 0 12px;
    justify-content: center;
    cursor: pointer;
    &:before {
      font-size: 17px;
      content: "\e90c";
      color: #043043;
    }
  }
}
</style>
