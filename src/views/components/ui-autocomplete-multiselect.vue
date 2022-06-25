<template>
  <div
    tabindex="0"
    @click="onGetFocus"
    v-click-outside="onBlur"
    ref="root"
    class="ui-dropdown"
  >
    <div class="current-block" @click="clickCurrent">
      <slot name="current" :key="innerValue" :value="innerValue" class="current">
        <div class="multiselect d-flex">
          <div v-if="innerValue && innerValue.length == 0" >
            {{ selectText }}
          </div>
          <div
            v-else
            class="multiselect-item d-flex mr-3"
            v-for="item in innerValue"
            :key="getKey(item)"
          >
            <div class="flex-grow-1">{{ getValue(item) }}</div>
            <div class="remove" @click="deleteItem(item)" tabindex="1">X</div>
          </div>
        </div>
      </slot>
    </div>
    <div v-if="autocomplete && open" >
      <input ref="searchEl" class="current-input" v-model="search" />
    </div>
    <slot name="container" :data="items">
      <div class="container" :class="{ active: open }">
        <div
          class="item"
          v-for="(item, index) in items"
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
import HttpResponseResult from "@/api/plugins/models/httpResponseResult";
// import EnterpriseListRequest from "@/api/plugins/models/controllersModels/enterprises/EnterpriseListRequest";
@Options({
  name: "UiAutocompleteMultiselectComponent",
  emits: ["update:modelValue"],
})
export default class UiAutocompleteMultiselectComponent extends Vue {
  @Prop() keyField?: string;
  @Prop() valueField?: string;
  autocomplete = true;
  items: any[] = [];
  @Prop({ default: null }) selectText: string;
  @Prop({ default: true }) closeOnSelect: boolean;
  @Prop({ default: false }) checkActiveByRef: boolean;
  @Prop({ type: [String, Number, Number, Date, Object, Array] })
  modelValue: any | any[] | String | Number | string | number | Date;
  search = "";

  @Prop({ type: Function, required: true })
  SearchAsyncFunc: (
    search?: string 
  ) => Promise<HttpResponseResult<any>>;

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
    //this.trySetDefault();
  }
  @Watch("search")
  onSearch() {
    //this.$emit("onSearch", this.search);
    this.sendSearchRequest();
  }
  hoveredIdx: number = null;
  hasFocus = false;
 open = false;
  preventCurrentClick = false;
  async sendSearchRequest() {
    let data = await this.SearchAsyncFunc(this.search);
    // this.items = data.data;
  }
  get active(): any {
    if (this.innerValue)
      return this.innerValue.filter((el: any) =>
        this.innerValue.some((iv: any) => this.isEqual(iv, this.getKey(el)))
      );
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
  // onSearchResult(res: HttpResponseResult<ISearchResponse>) {
  //   this.items = res.Response.Items;
  // }
  filter: any = {
    _page: 1,
    _perPage: 10,
  };
  async created() {
    this.innerValue = this.modelValue;
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
    return this.innerValue != null || this.innerValue.length > 0;
  }
  valueInItems(): boolean {
    const allKeys = (this.items || []).map((x) => this.getKey(x));
    const selectedKeys = this.innerValue;
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
      ? this.setHoveredIdx(this.findIndexItem(active[active.length - 1]))
      : this.setHoveredIdx(this.findIndexItem(active));
  }
  clickCurrent() {
    this.sendSearchRequest();
    if (this.preventCurrentClick) {
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
    return (this.innerValue || []).some((el: any) =>
      this.isEqual(this.getKey(el), key)
    );
  }
  isEqual(fst: any, scd: any): boolean {
    return this.checkActiveByRef
      ? fst === scd
      : JSON.stringify(fst) === JSON.stringify(scd);
  }
  setHoveredIdx(idx: number) {
    this.hoveredIdx = (idx + this.items.length) % this.items.length;
  }
  onEnter() {
    this.select(this.items[this.hoveredIdx]);
  }

  select(item: any) {
    this.innerValue = this.innerValue || [];
    this.isSelect(item)
      ? (this.innerValue = this.innerValue.filter(
          (el: any) => !this.isEqual(this.getKey(el), this.getKey(item))
        ))
      : this.innerValue.push(item);

    // this.search = "";
    if (this.items) this.setHoveredIdx(this.findIndexItem(item));
  }
  findIndexItem(item) {
    return this.items.findIndex((i) => {
      return this.getKey(i) == this.getKey(item);
    });
  }
  deleteItem(item: any) {
    this.setOpen(false);
    this.isSelect(item)
      ? (this.innerValue = this.innerValue.filter(
          (el: any) => !this.isEqual(this.getKey(el), this.getKey(item))
        ))
      : this.innerValue.push(item);
  }

  getKey(item: any) {
    if (item === undefined) return undefined;
    if (this.keyField) {
      return item[this.keyField];
    }
    return item;
  }
  getValue(item: any) {
    if (item === undefined) return undefined;
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
      border: 1px #d0d9de solid;
      border-width: 0px 1px 1px 1px;
      .item {
        padding: 7px 10px;
        background-color: #f3f4fa;
        border-top: @uiSelectBorderColor;
        font-size: 14px;
        &.hover,
        &:hover {
          background-color: #d8dae4;
        }
        &.active {
          border: 0px;
          background-color: #d8dae4;
          color: #4f5e74;
          font-weight: bold;
        }
        &.hover.active,
        &:hover.active {
          background-color: #d8dae4;
        }
      }
    }
  }
}
.multiselect {
  flex-wrap: wrap;
  background-color: #f3f4fa;
  border: 1px solid #d0d9de;
  padding: 5px 12px;
  border-radius: 4px;
  font-size: 12px;
  color: #8797af;
  min-height: 30px;
}
.multiselect-item {
  background-color: #e1e3eb;
  border: 1px solid #d0d9de;
  padding: 1px 9px;
  color: #4f5e74;
  margin-bottom: 4px;
}
</style>