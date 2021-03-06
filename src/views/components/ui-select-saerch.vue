<template>
  <div
    tabindex="0"
    @click="onGetFocus"
    v-click-outside="onBlur"
    ref="root"
    class="ui-dropdown"
  >
    <div class="" @click="clickCurrent">
      <slot name="current" :key="innerValue" :value="active">
        <div class="multiselect d-flex" v-if="multiselect">
          <div v-if="active.length == 0">{{ selectText }}</div>
          <div
            class="multiselect-item d-flex mr-3"
            v-for="item in active"
            :key="getKey(item)"
          >
            <div class="flex-grow-1">{{ getValue(item) }}</div>
            <div class="remove" @click="deleteItem(item)" tabindex="1">X</div>
          </div>
        </div>
        <div v-else class="current" :class="{ active: open }">
          {{ activeText }}
        </div>
      </slot>
    </div>
    <div v-if="autocomplete && open">
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
          <slot
            name="item"
            :item="item"
            :index="index"
            :hover="index == hoveredIdx"
            :active="isSelect(item)"
          >
            {{ getValue(item) }}
          </slot>
        </div>
      </div>
    </slot>
  </div>
</template>
<script lang="ts">
import { Vue, Options, Prop, Watch, Ref } from "vue-property-decorator";
@Options({
  name: "ui-select",
  emits: ["update:modelValue"],
})
export default class UiDropdownComponent extends Vue {
  @Prop() keyField?: string;
  @Prop() valueField?: string;
  multiselect = true;
  autocomplete = true;
  // todo: сделать проверку на повторяющиеся значения ключей и кидать ошибку/предупреждение
  @Prop({ default: () => new Array<any>(), type: Array, required: true })
  items!: any[];
  @Prop({ default: null }) selectText: string;
  @Prop({ default: true }) closeOnSelect: boolean;
  @Prop({ default: false }) checkActiveByRef: boolean;
  @Prop({ type: [String, Number, Number, Date, Object, Array] })
  modelValue: any | any[] | String | Number | string | number | Date;
  search = "";

  innerValue: any | any[] | String | Number | string | number | Date = null;

  // обычное значение
  @Watch("modelValue")
  onValueChanged() {
    this.innerValue = this.modelValue;
    //нк тест
  }
  // внутреннее значение
  @Watch("innerValue", { deep: true })
  onInnerValueChanged() {
    this.$emit("update:modelValue", this.innerValue);
  }
  @Watch("items")
  onItemsChanged() {
    this.trySetDefault();
  }
  hoveredIdx: number = null;
  hasFocus = false;
  private open = false;
  preventCurrentClick = false;
  get itemsToDisplay(): any[] {
    if (!this.autocomplete || !this.search) {
      return this.items;
    }
    return this.items.filter(
      (x) =>
        (this.getValue(x) || "")
          .toLowerCase()
          .includes(this.search.toLowerCase()) && 1
    );
  }
  get active(): any {
    return this.multiselect
      ? this.items.filter((el: any) =>
          this.innerValue.some((iv: any) => this.isEqual(iv, this.getKey(el)))
        )
      : (this.items.filter((el: any) =>
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
      text = active ? this.getValue(active) : this.selectText || "";
    }
    return text;
  }
  created() {
    this.innerValue = this.modelValue;
    this.trySetDefault();
  }
  mounted() {
    document.addEventListener("keydown", this.onKeyDown.bind(this));
  }
  trySetDefault() {
    if (this.innerValue == undefined) {
      this.select(this.selectText);
      return;
    }
    if (this.hasValue() && this.valueInItems()) {
      return;
    } else {
      this.select(this.items[0]);
    }
  }
  hasValue(): boolean {
    return (
      this.innerValue != null ||
      (this.multiselect && this.innerValue.length > 0)
    );
  }
  valueInItems(): boolean {
    const allKeys = (this.items || []).map((x) => this.getKey(x));
    const selectedKeys = this.multiselect ? this.innerValue : [this.innerValue];
    return selectedKeys.every((x) => allKeys.indexOf(x) > -1);
    //текущее значения все есть в наборе items
  }

  setOpen(value: boolean) {
    this.open = value;
    var active = this.active;
    if (value && this.autocomplete) {
      this.$nextTick(() => {
        (this.$refs["searchEl"] as HTMLInputElement).focus();
      });
    }
    if (!active) {
      this.setHoveredIdx(0);
    }
    Array.isArray(active)
      ? this.setHoveredIdx(this.items.indexOf(active[active.length - 1]))
      : this.setHoveredIdx(this.items.indexOf(active));
  }
  clickCurrent() {
    if (this.preventCurrentClick || this.multiselect) {
      return;
    }
    this.setOpen(!this.open);
  }

  beforeDestroy() {
    document.removeEventListener("keydown", this.onKeyDown.bind(this));
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
  isSelect(item: any) {
    var key = this.getKey(item);
    return this.multiselect
      ? (this.innerValue || []).some((el: any) => this.isEqual(el, key))
      : this.isEqual(key, this.modelValue);
  }
  isEqual(fst: any, scd: any): boolean {
    return this.checkActiveByRef
      ? fst === scd
      : JSON.stringify(fst) === JSON.stringify(scd);
  }
  setHoveredIdx(idx: number) {
    this.hoveredIdx =
      (idx + this.itemsToDisplay.length) % this.itemsToDisplay.length;
  }
  onEnter() {
    this.select(this.itemsToDisplay[this.hoveredIdx]);
  }

  select(item: any) {
    if (this.multiselect) {
      this.innerValue = this.innerValue || [];
      this.isSelect(item)
        ? (this.innerValue = this.innerValue.filter(
            (el: any) => !this.isEqual(el, this.getKey(item))
          ))
        : this.innerValue.push(this.getKey(item));
    } else {
      this.innerValue = this.getKey(item);
      if (this.closeOnSelect) {
        this.setOpen(false);
      }
    }
    this.search = "";
    this.setHoveredIdx(this.items.indexOf(item));
  }
  deleteItem(item: any) {
    // this.innerValue = this.innerValue || [];
    this.setOpen(false);
    this.isSelect(item)
      ? (this.innerValue = this.innerValue.filter(
          (el: any) => !this.isEqual(el, this.getKey(item))
        ))
      : this.innerValue.push(this.getKey(item));
  }

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

.ui-dropdown {
  position: relative;
  user-select: none;
  cursor: pointer;
  outline: none;
  min-width: 11em;
  // margin-left: 23px;
  &:focus {
    .current {
      border: 1px #ced4de solid;
      &.active {
        border-width: 1px 1px 0px 1px;
        border-color: #062634;
        border-bottom: 1px solid #ced4de;
      }
    }
  }
  .current {
    // background: url("~@assets/img/arrow-botton.png") no-repeat 95% center, #fff;
    border: 1px solid #ced4de;
    height: 100%;
    padding: 6px 10px;
    color: #162a47;
    font-size: 14px;
  }
  .current-input {
    // background: url("~@assets/img/arrow-botton.png") no-repeat 95% center, #fff;
    border: 1px solid #ced4de;
    height: 100%;
    padding: 6px 10px;
    color: #162a47;
    font-size: 14px;
    width: 100%;
  }
  .remove {
    margin-left: 4px;
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
      border: 1px #062634 solid;
      border-width: 0px 1px 1px 1px;
      .item {
        padding: 7px 10px;
        background-color: @uiSelectBackColor;
        border-top: @uiSelectBorderColor;
        font-size: 14px;
        &.hover,
        &:hover {
          background-color: #f0f0f0;
        }
        &.active {
          border: 0px;
          background-color: #062634;
          color: white;
        }
        &.hover.active,
        &:hover.active {
          background-color: #062634;
        }
      }
    }
  }
}
</style>