<template>
  <div
    tabindex="0"
    @focusin="onGetFocus"
    @focusout="onBlur"
    ref="root"
    class="ui-select-label"
  >
    <p class="lable" :class="{row:required}">{{ label }} <label class="label-wrong" v-if="required"> *</label></p>

    <div
      class="current-block"
      @click="clickCurrent"
      v-if="!open || !autocomplete"
    >
      <slot name="current" :key="innerValue" :value="active">
        <div class="multiselect d-flex" v-if="multiselect">
          <div v-if="active.length == 0">{{ selectText }}</div>
        </div>
        <div v-else class="current" :class="{ active: open, currentimg: open }">
          {{ activeText }}
        </div>
      </slot>
    </div>

    <slot name="container" :data="itemsToDisplay">
      <transition name="fade" appear>
        <div class="container" v-if="open" :class="{ active: open }">
          <div
            class="item"
            v-for="(item, index) in itemsToDisplay"
            v-bind:key="index"
            @click="select(item)"
            :class="{ active: isSelect(item), hover: index == hoveredIdx }"
          >
            <template v-if="item === undefined && !noUndefined">
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
      </transition>
    </slot>
  </div>
</template>
<script lang="ts">
import { Vue, Options, Prop, Watch, Ref } from "vue-property-decorator";
@Options({
  name: "ui-select-label",
  emits: ["update:modelValue"],
})
export default class UiSelectLabelComponent extends Vue {
  @Ref("asd") asd: HTMLInputElement;
  @Prop() keyField?: string;
  @Prop() valueField?: string;
  // todo: сделать проверку на повторяющиеся значения ключей и кидать ошибку/предупреждение
  @Prop({ default: () => new Array<any>(), type: Array, required: true })
  items!: any[];
  @Prop({ default: false, type: Boolean }) autocomplete: boolean;
  @Prop({ default: "", type: String }) label: string;
    @Prop({ default: false, type: Boolean }) required: boolean;

  // @Prop({ default: "id", type: String }) id: string;

  @Prop({ default: false }) multiselect: boolean;
  @Prop({ default: null }) selectText: string;
  @Prop({ default: true }) closeOnSelect: boolean;
  @Prop({ default: false }) noUndefined: boolean;

  @Prop({ default: false }) checkActiveByRef: boolean;
  @Prop({ type: String, default: "Не выбрано" }) defaultText: string;
  //@Prop({ type: Boolean, default: false }) required: boolean;
  @Prop({ type: [String, Number, Number, Date, Object, Array] })
  modelValue: any | any[] | String | Number | string | number | Date;
  search = "";

  innerValue: any | any[] | String | Number | string | number | Date = null;
  innerItems: any[] = this.items;

  // обычное значение
  @Watch("modelValue")
  onValueChanged(value, oldValue) {
    this.innerValue = value;
  }
  // внутреннее значение
  // @Watch("innerValue")
  // onInnerValueChanged() {
  //   // console.log( this.innerValue);
  //   this.$emit("update:modelValue", this.innerValue);
  // }
  private open = false;
  preventCurrentClick = false;
  setOpen(value: boolean) {
    if (!value) {
    }
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
      ? this.setHoveredIdx(
          this.itemsToDisplay.indexOf(active[active.length - 1])
        )
      : this.setHoveredIdx(this.itemsToDisplay.indexOf(active));
  }
  clickCurrent() {
    if (this.preventCurrentClick || this.multiselect) {
      return;
    }
    this.setOpen(!this.open);
  }
  hoveredIdx: number = null;
  hasFocus = false;
  mounted() {
    document.addEventListener("keydown", this.onKeyDown.bind(this));
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
    if (item === undefined) return this.innerValue === undefined;
    var key = this.getKey(item);

    return this.multiselect
      ? (this.innerValue || []).some((el: any) => this.isEqual(el, key))
      : this.isEqual(key, this.innerValue);
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
  @Watch("items")
  onItemsChanged(value, oldValue) {
    this.innerItems = value;
    this.trySetDefault();
  }
  hasValue(): boolean {
    return (
      this.innerValue != null ||
      (this.multiselect && this.innerValue.length > 0)
    );
  }
  valueInItems(): boolean {
    const allKeys = (this.innerItems || []).map((x) => this.getKey(x));
    const selectedKeys = this.multiselect ? this.innerValue : [this.innerValue];
    return selectedKeys.every((x) => allKeys.indexOf(x) > -1);
    //текущее значения все есть в наборе items
  }
  trySetDefault() {
    if (this.hasValue() && this.valueInItems()) {
      return;
    } else {
      if (!this.noUndefined) this.select(undefined);
      //выбирает не найдено при обновлении страницы
    }
  }
  get itemsToDisplay(): any[] {
    if (this.noUndefined) {
      return this.innerItems;
    }
    if (!this.autocomplete || !this.search) {
      let res = this.innerItems;
      res = [undefined].concat(res);
      return res;
    }

    let res = this.innerItems.filter((x) =>
      (this.getValue(x) || "").toLowerCase().includes(this.search.toLowerCase())
    );
    res = [undefined].concat(res);
    return res;
  }

  get active(): any {
    return this.multiselect
      ? this.innerItems.filter((el: any) =>
          this.innerValue.some((iv: any) => this.isEqual(iv, this.getKey(el)))
        )
      : (this.innerItems.filter((el: any) =>
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
  select(item: any) {
    if (item === undefined) {
      this.innerValue = undefined;
      this.$emit("update:modelValue", this.innerValue);
      if (this.closeOnSelect) {
        this.setOpen(false);
      }
      return;
    }
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
    this.$emit("update:modelValue", this.innerValue);
    this.search = "";
    this.setHoveredIdx(this.innerItems.indexOf(item));
  }
  created() {
    this.innerValue = this.modelValue;
    this.trySetDefault();
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
@uiSelectBorderColor: #f3f4fa;
@uiSelectBackColor: #fff;
.lable {
  margin: 0px 0px 2px 0px;
  font-size: 12px;
  color: #2d3d5c;
}
.ui-select-label {
  position: relative;
  user-select: none;
  cursor: pointer;
  outline: none;
  min-width: 11em;
  // margin-bottom: 1px;
  &:focus {
    .current {
      border: 1px #ced4de solid;
      // &.active {
      //   // border-width: 1px 1px 0px 1px;
      //   // border-color: #062634;
      //   // border-bottom: 1px solid #ced4de;
      // }
    }
  }
  .current {
    background: url("~@assets/img/icon/s_down.svg") no-repeat 97% center,
      #f3f4fa;
    border: 1px solid #d0d9de;
    border-radius: 4px;
    color: #4F5E74;
    padding: 5px 12px;
    min-height: 30px;
    font-weight: 600;
    font-size: 12px;
    outline: none !important;
    align-items: center;
  }
  .currentimg {
    background: url("~@assets/img/icon/arrow-top.svg") no-repeat 97% center,
      #f3f4fa;
  }
  .container {
    color: #8797af;
    display: none;
    padding: 0;
    &.active {
      display: block;
      position: absolute;
      z-index: 100;
      min-width: calc(~"100%");
      top: 100%;
      border: 2px #f3f4fa solid;
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
          // background-color: #f3f4fa;
          color: #8797af;
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
.fade-enter-active {
  transition: all 0.3s ease-in-out;
}
.fade-leave-active {
  transition: all 0.4s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  transform: translateY(-10%);
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(1%);
}
</style>