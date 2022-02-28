<template>
  <div
    tabindex="0"
    @focusin="onGetFocus"
    @focusout="onBlur"
    ref="root"
    class="ui-select"
  >
    <div class="" @click="clickCurrent" v-if="!open">
      <slot name="current" :key="innerValue" :value="active">
        <div class="current" :class="{ active: open }">
          {{ activeText }}
        </div>
      </slot>
    </div>
    <div v-if="open">
      <input ref="searchEl" class="current-input" v-model="search" />
    </div>
    <slot name="container" :data="itemsToDisplay">
      <div class="container" :class="{ active: open }">
        <div
          class="item"
          v-for="(item, index) in itemsToDisplay"
          v-bind:key="index"
          @click="select(item)"
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
    </slot>
  </div>
</template>
<script lang="ts">
import { Vue, Options, Prop, Watch, Ref } from "vue-property-decorator";
@Options({
  name: "ui-select-autocomplete",
  emits: ["update:modelValue"],
})
export default class UiSelectAutocompleteComponent extends Vue {
  @Ref("asd") asd: HTMLInputElement;
  @Prop() keyField?: string;
  @Prop() valueField?: string;
  @Prop({ default: () => new Array<any>(), type: Array, required: true })
  items!: any[];
  @Prop({ default: null }) selectText: string;
  @Prop({ default: true }) closeOnSelect: boolean;
  @Prop({ default: false }) checkActiveByRef: boolean;
  @Prop({ type: String, default: "(все)" }) defaultText: string;
  @Prop({ type: [String, Number, Number, Date, Object, Array] })
  modelValue: any | any[] | String | Number | string | number | Date;

  innerValue: any | any[] | String | Number | string | number | Date = null;
  innerItems: any[] = this.items;
  hoveredIdx: number = null;
  hasFocus = false;
  autocomplete = true;
  search = "";
  private open = false;
  preventCurrentClick = false;
  // обычное значение
  @Watch("modelValue")
  onValueChanged(value, oldValue) {
    this.innerValue = value;
  }
  // внутреннее значение
  @Watch("innerValue", { deep: true })
  onInnerValueChanged() {
    this.$emit("update:modelValue", this.innerValue);
  }
  @Watch("items")
  onItemsChanged(value, oldValue) {
    this.innerItems = value;
  }
  get itemsToDisplay(): any[] {
    let res = this.innerItems.filter((x) =>
      (this.getValue(x) || "").toLowerCase().includes(this.search.toLowerCase())
    );
    res = [undefined].concat(res);
    return res.slice(0, 7);
  }
  get active(): any {
    return (this.innerItems.filter((el: any) =>
      this.isEqual(this.getKey(el), this.innerValue)
    ) || [])[0];
  }
  get activeText(): string {
    var active = this.active;
    if (Array.isArray(active)) {
      var text =
        active.length > 0
          ? active.map((el: any) => this.getValue(el)).join(",")
          : this.selectText || "";
    } else {
      text = active
        ? this.getValue(active)
        : this.selectText || this.defaultText;
    }
    return text;
  }
  // хуки жизненного цикла
  created() {
    this.innerValue = this.modelValue;
  }
  mounted() {
    document.addEventListener("keydown", this.onKeyDown.bind(this));
  }

  select(item: any) {
    if (item === undefined) {
      this.innerValue = undefined;
      if (this.closeOnSelect) {
        this.setOpen(false);
      }
      return;
    }
    this.innerValue = this.getKey(item);

    if (this.closeOnSelect) {
      this.setOpen(false);
    }
    this.search = "";
    this.setHoveredIdx(this.innerItems.indexOf(item));
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
      ? this.setHoveredIdx(
          this.itemsToDisplay.indexOf(active[active.length - 1])
        )
      : this.setHoveredIdx(this.itemsToDisplay.indexOf(active));
  }

  setHoveredIdx(idx: number) {
    this.hoveredIdx =
      (idx + this.itemsToDisplay.length) % this.itemsToDisplay.length;
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
    this.select(this.itemsToDisplay[this.hoveredIdx]);
  }
  clickCurrent() {
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
    if (this.keyField) {
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
@uiSelectColor: #3c3f40;
@uiSelectIconColor: #062634;
@uiSelectBorderColor: #263958;
@uiSelectActiveColor: #ced4de;
@uiSelectBackColor: #fff;
@uiSelectColorLabel: #7a7878;

.ui-select {
  position: relative;
  user-select: none;
  cursor: pointer;
  outline: none;
  min-width: 11em;
  &:focus {
    .current {
      border: 1px #ced4de solid;
    //  &.active {
        // border-width: 1px 1px 0px 1px;
        // border-color: #062634;
        // border-bottom: 1px solid #ced4de;
      //}
    }
  }
  .current {
    background: url("~@assets/img/arrow-botton.png") no-repeat 95% center,
      #f3f4fa;
    border: 1px solid #ced4de;
    height: 100%;
    padding: 6px 10px;
    border-radius: 4px;
    color: #8797af;
    font-size: 12px;
    outline: none !important;
  }
  .current-input {
    outline: none;
    border: 1px solid #ced4de;
    width: 100%;
    padding: 6px 7px;
    color: #162a47;
    font-size: 14px;
  }
  .container {
    color: #162a47;
    display: none;
    padding: 0;
    &.active {
      display: block;
      position: absolute;
      z-index: 1000;
      min-width: calc(~"100%");
      top: 100%;
      border: 1px #f3f4fa solid;
      border-width: 0px 1px 1px 1px;
      border-color: #d0d9de;
      .item {
        padding: 7px 10px;
        background-color: #f3f4fa;
        border-top: @uiSelectBorderColor;
        font-size: 14px;
        &.hover,
        &:hover {
          background-color: #eff0f7;
        }
        &.active {
          border: 0px;
          // background-color: #062634;
          color: #4f5e74;
          font-weight: bold;
        }
        &.hover.active,
        &:hover.active {
          background-color: #eff0f7;
        }
      }
    }
  }
}
</style>