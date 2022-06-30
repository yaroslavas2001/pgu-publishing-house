<template>
  <div
    tabindex="0"
    @focusin="onGetFocus"
    @focusout="onBlur"
    ref="root"
    class="ui-autocomplete"
  >
    <div @mouseup="mouseup" class="mouseup">
      <div class="current-block" @click="clickCurrent" v-if="!open">
        <slot name="current" :key="innerValue" :value="active">
          <div class="current" :class="{ active: open }">
            {{ activeText }}
          </div>
        </slot>
      </div>
      <div v-if="open" class="current-input">
        <input ref="searchEl" class="input" v-model="search" />
      </div>
    </div>
    <slot name="container" :data="items">
      <!-- <transition name="fade" appear> -->
      <div
        class="container"
        v-if="open || isLoading"
        :class="{ active: open, isLoading: isLoading }"
      >
        <ui-loading :loading="isLoading" />

        <div
          class="item"
          v-for="(item, index) in items"
          v-bind:key="index"
          @mouseup="select(item)"
          :class="{ active: isSelect(item), hover: index == hoveredIdx }"
        >
          <template v-if="item === undefined">
            {{ defaultText }}
          </template>
          <template v-else>
            <slot
              name="item"
              :item="item"
              :index="index"
              :hover="index == hoveredIdx"
              :active="isSelect(item)"
              >{{ getValue(item) }}</slot
            >
          </template>
        </div>
      </div>
      <!-- </transition> -->
    </slot>
  </div>
</template>
<script lang="ts">
// import { Events } from "@/api/plugins/events";
import { Vue, Options, Prop, Watch, Ref } from "vue-property-decorator";
import HttpResponseResult from "@/api/plugins/models/httpResponseResult";
@Options({
  name: "ui-autocomplite",
  emits: ["update:modelValue"],
})
export default class UiAutocompleteComponent extends Vue {
  @Ref("asd") asd: HTMLInputElement;
  @Prop() keyField?: string;
  @Prop() valueField?: string;
  // @Prop({ default: () => new Array<any>(), type: Array, required: true })
  items: any[] = [];
  @Prop({ type: Function, required: true })
  SearchAsyncFunc: (search?: string) => any;

  @Prop({ default: null }) selectText: string;
  @Prop({ default: true }) closeOnSelect: boolean;
  @Prop({ default: false }) checkActiveByRef: boolean;
  @Prop({ type: String, default: "Не выбрано" }) defaultText: string;
  @Prop({ type: [String, Number, Number, Date, Object, Array] })
  modelValue: any | any[] | String | Number | string | number | Date;
  @Prop({ default: false }) noUndefined: boolean;

  innerValue: any | any[] | String | Number | string | number | Date = null;
  hoveredIdx: number = null;
  hasFocus = false;
  autocomplete = true;
  search = "";
  saveValue: any = null;
  open = false;
  preventCurrentClick = false;
  isLoading: boolean = false;
  clickMouse: boolean = false;
  // обычное значение
  @Watch("modelValue")
  onValueChanged(value, oldValue) {
    if (typeof this.modelValue !== "number" && this.modelValue != null) {
      this.firstObject = {};
      this.firstObject[this.keyField] = this.getKey(this.modelValue);
      this.firstObject[this.valueField] = this.getValue(this.modelValue);
      this.innerValue = this.getKey(this.modelValue);
    } else this.innerValue = this.modelValue;
    if (!this.clickMouse) this.sendSearchRequest();
    if (this.noUndefined) this.onSearchResult();
  }
  // внутреннее значение
  @Watch("innerValue", { deep: true })
  onInnerValueChanged() {
    this.$emit("update:modelValue", this.innerValue);
  }
  @Watch("search")
  onSearch() {
    this.sendSearchRequest();
  }
  mouseup() {
    this.isLoading = true;
    this.sendSearchRequest();
    this.clickMouse = true;
    this.isLoading = false;
  }
  async sendSearchRequest() {
    let data = await this.SearchAsyncFunc(this.search);
    this.items = data;
    if (this.noUndefined) this.onSearchResult();
    if (this.firstObject != null) {
      for (var i = this.items.length - 1; i >= 0; --i) {
        if (
          this.getKey(this.items[i]) == this.getKey(this.firstObject) ||
          this.getKey(this.items[i]) == this.innerValue
        ) {
          this.firstObject = this.items[i];
          this.firstObject = null;
          return;
        }
      }
      this.items.push(this.firstObject);
      this.firstObject = null;
    }
    for (var i = this.items.length - 1; i >= 0; --i) {
      if (
        this.getKey(this.items[i]) == this.getKey(this.saveValue) ||
        this.getKey(this.items[i]) == this.innerValue
      ) {
        this.saveValue = this.items[i];
        return;
      }
    }
    if (this.saveValue) this.items.push(this.saveValue);
  }
  get active(): any {
    return (this.items.filter((el: any) =>
      this.isEqual(this.getKey(el), this.innerValue)
    ) || [])[0];
  }
  get activeText(): string {
    var active = this.active;
    let text =
      active && this.getKey(active)
        ? this.getValue(active)
        : this.selectText || this.defaultText;
    return text;
  }
  firstObject = null;
  // хуки жизненного цикла
  created() {
    // console.log("modelValue", this.modelValue);

    if (typeof this.modelValue !== "number" && this.modelValue != null) {
      this.firstObject = {};
      this.firstObject[this.keyField] = this.getKey(this.modelValue);
      this.firstObject[this.valueField] = this.getValue(this.modelValue);
      this.innerValue = this.getKey(this.modelValue);
    } else this.innerValue = this.modelValue;
    // this.sendSearchRequest();
    if (this.noUndefined) this.onSearchResult();
  }
  onSearchResult() {
    let a = {};
    a[this.keyField] = undefined;
    a[this.valueField] = "(все)";
    this.items = [a].concat(this.items);
  }
  mounted() {
    document.addEventListener("keydown", this.onKeyDown.bind(this));
  }

  select(item: any) {
    if (item === undefined) {
      this.innerValue = undefined;
      this.$emit("update:modelValue", this.innerValue);
      if (this.closeOnSelect) {
        this.setOpen(false);
      }
      return;
    }
    this.innerValue = this.getKey(item);
    this.saveValue = item;
    if (this.closeOnSelect) {
      this.setOpen(false);
    }
    // this.search = "";
    if (this.items) this.setHoveredIdx(this.findIndexItem(item));
  }
  findIndexItem(item) {
    return this.items.findIndex((i) => {
      return this.getKey(i) == this.getKey(item);
    });
  }
  setOpen(value: boolean) {
    this.open = value;
    var active = this.active;
    if (value) {
      this.$nextTick(() => {
        (this.$refs["searchEl"] as HTMLInputElement).focus();
      });
    }
    if (!active) {
      this.setHoveredIdx(0);
    }
    Array.isArray(active)
      ? this.setHoveredIdx(this.findIndexItem(active[active.length - 1]))
      : this.setHoveredIdx(this.findIndexItem(active));
  }

  setHoveredIdx(idx: number) {
    this.hoveredIdx = (idx + this.items.length) % this.items.length;
  }
  onKeyDown(ev: KeyboardEvent) {
    if (!this.hasFocus) {
      return;
    }
    var key = ev.key.toLowerCase();
    if (key == "escape") {
      return (this.open = false);
    }
    if (key == "enter") {
      return this.open ? this.onEnter() : this.setOpen(true);
    }
    if (key == "arrowdown" || key == "arrowup") {
      ev.preventDefault();
      return this.open
        ? key === "arrowdown"
          ? this.setHoveredIdx(++this.hoveredIdx)
          : this.setHoveredIdx(--this.hoveredIdx)
        : this.setOpen(true);
    }
  }
  onEnter() {
    this.select(this.items[this.hoveredIdx]);
  }
  clickCurrent() {
    // console.log("5345345");

    if (this.preventCurrentClick) {
      return;
    }
    this.setOpen(!this.open);
  }

  onGetFocus() {
    this.setOpen(true);
    this.preventCurrentClick = true;
    setTimeout(() => (this.preventCurrentClick = false), 300);
    this.hasFocus = true;
    //this.sendSearchRequest();
  }
  onBlur() {
    this.setOpen(false);
    this.hasFocus = false;
  }

  isSelect(item: any) {
    if (item === undefined) return this.innerValue === undefined;
    var key = this.getKey(item);

    return this.isEqual(key, this.innerValue);
  }
  isEqual(fst: any, scd: any): boolean {
    return this.checkActiveByRef
      ? fst === scd
      : JSON.stringify(fst) === JSON.stringify(scd);
  }

  // для того чтобы передать список с id и name
  getKey(item: any) {
    if (this.keyField && item) {
      return item[this.keyField];
    }
    return item;
  }
  getValue(item: any) {
    if (this.valueField) {
      const resText = item[this.valueField];
      if (resText == undefined) {
        console.error("Не найден valueField");
      }
      return resText;
    }
    return item;
  }
}
</script>
<style lang="less" scoped>
@bgItem: #fff;
@colorItem: #bb8b65;
@borderCurent: #ced4de;
@hoverItembg: #deded5;
@activeItembg: #cec0ae;
@curentColor: #000;

.ui-autocomplete {
  position: relative;
  user-select: none;
  cursor: pointer;
  outline: none;
  min-width: 11em;

  &:focus {
    .current {
      // border: 1px #ced4de solid;
      &.active {
        border-width: 1px 1px 0px 1px;
        border-color: @borderCurent;
        border-bottom: 1px solid @borderCurent;
      }
    }
  }
  .current {
    // background: url("~@assets/img/icon/s_down.svg") no-repeat 97% center, #fff;
    height: 30px;
    background-color: @bgItem;
    border: 1px solid @borderCurent;
    padding: 5px 12px;
    border-radius: 4px;
    font-size: 12px;
    color: @curentColor;
    box-sizing: border-box;
    font-weight: 600;
  }
  .current-input {
    box-sizing: border-box;
    height: 100%;
  }
  .input {
    border-radius: 4px;
    border: 1px solid @borderCurent;
    outline: none;
    width: 100%;
    padding: 5px 7px;
    color: @curentColor;
    font-size: 14px;
    height: 30px;
  }
  .input::placeholder {
    opacity: 0.6;
  }
  .container {
    color: @curentColor;
    display: none;
    padding: 0;
    position: absolute !important;
    &.isLoading {
      height: 100px;
      position: absolute !important;
      background-color: @bgItem;
    }
    &.active {
      display: block;
      position: absolute;
      z-index: 100;
      min-width: calc(~"100%");
      top: 100%;
      border: solid @borderCurent;
      // background-color: #e1e3eb;

      border-width: 0px 1px 1px 1px;
      .item {
        padding: 7px 10px;
        color:@curentColor;
        background-color: @bgItem;
        border-top: @borderCurent;
        font-size: 14px;
        &.hover,
        &:hover {
          background-color: @hoverItembg;
        }
        &.active {
          border: 0px;
          // background-color: #e1e3eb;
          color: @colorItem;
          font-weight: bold;
        }
        &.hover.active,
        &:hover.active {
          background-color:@activeItembg ;
        }
      }
    }
  }
}
.fade-enter-active {
  transition: all 0.3s ease-in-out;
}
.fade-leave-active {
  transition: all 0.4s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  transform: translateY(-20%);
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(1%);
}
</style>