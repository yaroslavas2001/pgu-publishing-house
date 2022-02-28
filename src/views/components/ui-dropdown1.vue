<template>
  <div class="ui-dropdown" @mouseleave="onMouseLeave" @mouseover="onMouseOver">
    <div class="my-class" @click="onClick">
      <template v-if="!showItemsList">
        <slot
          v-if="multiselect"
          name="multiselect"
          :SelectItems="getSelectItems()"
        >
          <div
            class="ui-select"
            :style="styleUiSelect"
            :class="{ 'has-error': hasError }"
          >
            <div class="placeholder" v-if="getSelectItems().length == 0">
              {{ placeholder }}
            </div>
            <ui-tags
              style="font-size: =0.875em"
              :items="getSelectItems()"
              @close="onClose"
            ></ui-tags>
            <div class="icon1" :class="innerIcon"></div>
          </div>
        </slot>
        <slot v-else name="singleselect" :SelectItems="getSelectItems()">
          <div
            class="ui-select"
            :style="styleUiSelect"
            :class="{ transformer: innerTransformer, 'has-error': hasError }"
          >
            <div class="placeholder cut" v-if="getSelectItems().length == 0">
              {{ placeholder }}
            </div>
            <div class="cut">{{ getSelectText() }}</div>
            <div class="icon1" :class="innerIcon"></div>
          </div>
        </slot>
      </template>

      <template v-else>
        <slot
          v-if="multiselect"
          name="multiselectactive"
          :selectItems="getSelectItems()"
        >
          <div
            class="ui-select"
            :style="styleUiSelect"
            :class="{ 'has-error': hasError }"
          >
            <div class="placeholder" v-if="getSelectItems().length == 0">
              {{ placeholder }}
            </div>
            <div style="display: flex">
              <ui-tags
                style="font-size: =0.875em"
                :items="getSelectItems()"
                @close="onClose"
              ></ui-tags>
            </div>
            <div class="icon" :class="innerIcon"></div>
          </div>
        </slot>
        <slot v-else name="singleselectactive" :SelectItems="getSelectItems()">
          <div
            v-if="autocomplete"
            class="ui-select"
            style="width: 100%; border: none; padding: 0"
          >
            <div class="ui-input" style="width: 100%">
              <input
                tabindex="991"
                v-model="autoComplete"
                autofocus
                ref="auto"
                @click.stop=""
                @input="onInputAutocomplete"
                @keydown.enter="onEnterAutocomplete"
              />
            </div>
            <!-- <div class="icon1" :class="innerIcon" @click.passive style=" position: absolute; right: 5px; top: 5px;"></div> -->
          </div>
          <div
            v-else
            class="ui-select"
            :style="styleUiSelect"
            :class="{ transformer: innerTransformer, 'has-error': hasError }"
          >
            <div class="placeholder cut" v-if="getSelectItems().length == 0">
              {{ placeholder }}
            </div>
            <div class="cut ">{{ getSelectText() }}</div>
            <div class="icon1" :class="innerIcon"></div>
          </div>
        </slot>
      </template>
      <div class="ui-options" v-bind:class="{ active: eShowItemsList }">
        <!-- v-if="eShowItemsList" -->
        <slot name="options" :items="getInnerItems()" :select="onSelect">
          <ui-box-menu
            class="width100"
            :class="{ ms: multiselect && getSelectItems().length > 0 }"
          >
            <!-- <div
              v-if="autocomplete"
              class="ui-select"
              style="width: 100%; border: none; padding: 0"
            >
              <div class="ui-input" style="width: 100%">
                <input
                  tabindex="991"
                  v-model="autoComplete"
                  autofocus
                  ref="auto"
                  @click.stop=""
                  @input="onInputAutocomplete"
                  @keydown.enter="onEnterAutocomplete"
                />
              </div>
              <div
                class="icon1"
                :class="innerIcon"
                @click.passive
                style="position: absolute; right: 5px; top: 5px"
              ></div>
            </div> -->
            <ui-scroll v-if="scroll" :style="{ height: h + 'px' }">
              <ui-list-view
                :items="getInnerItems()"
                @select="onSelect"
                :multiselect="multiselect"
                :underline="underline"
              >
                <template #def></template>
                <!-- <template slot="item"></template> -->
              </ui-list-view>
            </ui-scroll>
            <ui-list-view
              v-else
              :items="getInnerItems()"
              @select="onSelect"
              :multiselect="multiselect"
              :underline="underline"
            ></ui-list-view>
          </ui-box-menu>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, Prop, Watch } from 'vue-property-decorator';
// import { Options, Vue } from "vue-class-component";
import ListViewItem from "@views/components/ListViewItem";
import UiBoxMenu from "@views/components/ui-box-menu.vue";
import UiListView from "@views/components/list-view/ui-list-view.vue";
import UiListViewItem from "@views/components/list-view/ui-list-view-item.vue";
import UiScroll from "@views/components/ui-scroll.vue";
import DefaultModel from "@views/components/component-models/default-model";
import UiTags from "@views/components/ui-tags/ui-tags.vue";
@Options<UiDropdownComponent>({
  components: {
    UiBoxMenu,
    ListViewItem,
    UiListView,
    UiListViewItem,
    UiScroll,
    UiTags
  },
  props: {
    items: [],
    multiselect: Boolean,
    placeholder: String,
    transformer: Boolean,
    icon: String,
    removeSelected: Boolean,
    underline: Boolean,
    scroll: Boolean,
    countItem: String,
    autocompleteText: String,
    autocomplete: Boolean,
    height: String,
    autoOpen: Boolean,
    required: Boolean,
  },
  // watch: {
  //   autocompleteText(value) {
  //     if (this.autocomplete) {
  //       this.autoComplete = this.autocompleteText.toString();
  //       this.$emit("changeAutocomlite", this.autoComplete);
  //     }
  //   },
  //   items(value) {
  //     this.ItemsInner = this.items;
  //   },
  //   autoOpen(value) {
  //     this.ShowItemsList = true;
  //   },
  // },
})
export default class UiDropdownComponent extends Vue {
  // @Prop({ default: () => [], type: Array }) Items!: ListViewItem<any>[];
  // @Prop({ default: false, type: Boolean }) multiselect: Boolean;
  // @Prop({ default: null, type: String }) placeholder!: String;

  // @Prop({ default: false, type: Boolean }) transformer: boolean;
  // @Prop({ default: "icon-ic_down", type: String }) icon: string;

  // @Prop({ default: false, type: Boolean }) removeSelected: boolean;

  // @Prop({ default: false, type: Boolean }) underline: boolean;
  // @Prop({ default: false, type: Boolean }) scroll: boolean;
  // @Prop({ default: null, type: String }) countItem: String;

  // @Prop({ default: "", type: String }) autocompleteText: String;
  // @Prop({ default: false, type: Boolean }) autocomplete: boolean;
  // @Prop({ default: "", type: String }) height: String;

  // @Prop({ default: false, type: Boolean }) autoOpen: boolean;
  // @Prop({ default: false }) required: boolean;
  items: Array<ListViewItem<DefaultModel>> = [];
  multiselect: boolean = false;
  placeholder: string = "";
  transformer: boolean = false;
  icon: string = "icon-ic_down";
  removeSelected: boolean = false;
  underline: boolean = false;
  scroll: boolean = false;
  countItem: string = "";
  autocompleteText: string = "";
  autocomplete: boolean = false;
  height: string = "";
  autoOpen: boolean = false;
  required: boolean = false;
  autofocus = false;
  eShowItemsList = false;
  get showItemsList(): boolean {
    return this.eShowItemsList;
  }
  set showItemsList(value: boolean) {
    // console.log('set _ShowItemsList = ', value);
    if (!value) {
      // console.log('false');
    }
    this.$forceUpdate();
    this.eShowItemsList = value;
  }
  hasError = false;
  autoComplete = "";
  focusOn = false;
  ItemsInner: ListViewItem<{ id: number; name: string }>[] = this.items; //(this.items).map(x => Object.assign({}, x));
  innerIcon = "";
  innerTransformer = false;
  filter: String = "";
  outside = false;
  h = 0; // высота для скролла
  styleUiSelect = {
    height: this.height,
    "align-items": "center",
  };

  @Watch("autocompleteText")
  onChangeautocomplete() {
    if (this.autocomplete) {
      this.autoComplete = this.autocompleteText.toString();
      this.$emit("changeAutocomlite", this.autoComplete);
    }
  }

  @Watch("items")
  onItemsChanged(items: ListViewItem<any>[]) {
    this.ItemsInner = this.items;
  }

  @Watch("autoOpen")
  onAutoOpen() {
    // console.log("++++")
    this.showItemsList = true;
  }

  created() {
    this.ItemsInner = this.items;
    // console.log(this.ItemsInner);
    // debugger;
    // debugger;
    // this.ItemsInner = this.items.map(
    //   (el) => new ListViewItem(el.Value, el.Selected, el.Disabled)
    // );
    //document.body.addEventListener("click", this.clickOutside.bind(this));
    this.innerIcon = this.icon;
    this.innerTransformer = this.transformer;
    // this.ShowItemsList =this.autoOpen;
    // console.log("CREATED this.ShowItemsList", this.ShowItemsList)
  }
  mounted() {
    document.body.addEventListener("click", this.clickOutside.bind(this));
    this.showItemsList = this.autoOpen;
  }
  isValid(): boolean {
    if (this.required && !(this.getSelectItems().length > 0)) {
      this.hasError = true;
      return false;
    }
    return true;
  }

  onSelect(value: any) {
    if (this.multiselect) {
      this.showItemsList = false;
    }

    var items = this.getSelectItems();
    // this.autoComplete = '';
    if (!this.multiselect && items.length > 1) {
      console.error(
        "Больше одного выбранного элемента, установите multiselect в true."
      );
    }
    this.$emit("change", items);
  }

  onClick() {
    // console.log('click');
    this.showItemsList = !this.showItemsList;

    this.innerTransformer = false;
    // (this.$refs.auto as any).focus();
    this.$emit("click", this.showItemsList);
    return false;
  }

  onClose(value: any) {
    value.Selected = false;
    if (this.multiselect) this.showItemsList = true;
    this.$emit("deleteItem", value);
  }

  onChange() {}
  onInputAutocomplete(res: string[]) {
    // console.log(`this.autocopmlete`, this.autoComplete);
    this.$emit("changeAutocomlite", this.autoComplete);
  }

  onEnterAutocomplete() {
    if (this.ItemsInner[0] != null) {
      this.selectItem(this.ItemsInner[0]);
      var items = this.getSelectItems();
      this.$emit(
        "change",
        this.ItemsInner.filter((el) => el.Selected)
      );
    }
    // this.autoComplete = '';
    this.filter = "";
    this.showItemsList = false;
  }

  selectItem(value: any) {
    if (!this.multiselect) {
      this.ItemsInner.forEach(
        (x) => (x.Selected = x.Value.Equal(value.Value)) // x.Value.id == value.Value.id)
      );
    } else {
      this.ItemsInner[this.ItemsInner.indexOf(value)].Selected = true;
    }
  }

  getInnerItems(): Array<ListViewItem<any>> {
    // debugger;
    // расчет высоты выпадающего окна в случае включенного scroll
    if (!this.countItem) {
      this.h =
        this.ItemsInner.length * 25 > 400 ? 400 : this.ItemsInner.length * 35;
    } else {
      this.h = Number(this.countItem) * 35;
    }
    if (!this.removeSelected) {
      if (this.filter != "" && this.filter != null) {
        const rez = this.ItemsInner.filter(
          (x) =>
            x.Value.ToString()
              .toLowerCase()
              .indexOf(this.filter.toLowerCase()) > -1
          // x.Value.Name.toLowerCase().indexOf(this.filter.toLowerCase()) > -1
        );

        return rez;
      } else {
        // this.h = this.ItemsInner.length * 25 > 400 ? 400 : this.ItemsInner.length * 35;
        // console.log('h=', this.ItemsInner.length);
        return this.ItemsInner;
      }
    } else {
      let rez = this.ItemsInner.filter((item) => !item.Selected);
      // this.h = this.ItemsInner.length * 25 > 400 ? 400 : this.ItemsInner.length * 35;
      // console.log('h=', this.ItemsInner.length);
      return rez;
    }
  }

  getSelectItems(): Array<ListViewItem<any>> {

    return this.ItemsInner.filter((item) => item.Selected);
  }

  getSelectText(): String {
          // console.log("тут?");

    if (this.getSelectItems().length > 0) {
      this.innerTransformer = this.transformer;
      // console.log("ты тут?");
      
      return this.getSelectItems()[0].Value.ToString();
    }
    return "";
  }

  onFocus() {
    // this.ShowItemsList = true;
  }
  onKeypress(value: any) {
    // if (this.focusOn) {
    //   this.ShowItemsList = false;
    //   this.focusOn = false;
    // } else {
    //   this.focusOn = true;
    // }
  }

  onKeyUp() {
    // console.log("onKeyUp" + this.focusOn);
  }
  onMouseLeave() {
    this.outside = true;
  }
  onMouseOver() {
    this.outside = false;
  }
  clickOutside(event: any) {
    if (!(this.$el == event.target || this.$el.contains(event.target))) {
      this.innerTransformer = this.transformer;
      if (this.showItemsList && this.outside) this.showItemsList = false;
      this.$emit("clickOutSide");
    }
  }

  destroyed() {
    document.body.removeEventListener("click", this.clickOutside.bind(this));
  }
}
</script>

<style lang="less">
@UiDropdownFontSize: 1em;
@UiDropdownPlaceholderFontSize: 1em;
@UiDropdownColor: #162a47;
@UiDropdownPlaceholderColor: #162a47;
@uiDropdownBorderColor: #e8e8e8;
@uiDropdownIconColor: #23a4a2;
@uiDropdownTransformerBgColor: #1b283f;
@UiDropdownHeight: 34px;
@uiDropdownBorderRadius: 0;

.ui-dropdown {
  .my-class {
    .ui-select {
      &.has-error {
        border: 1px solid #e18fa2;
      }
    }
  }

  .control-input {
    border: none;
    background: 0;
    width: 100%;
  }

  .width100 {
    width: 100%;
  }
  // margin: 0.3em 0;
  min-width: 160px;
  display: block;
  position: relative;
  // color: #3c3f40;
  .cut {
    overflow: hidden;
    white-space: nowrap;
    margin-right: 10px;
    text-overflow: ellipsis;
  }
  & > div {
    display: flex;
  }
  .placeholder {
    display: flex;
    align-items: center;
    color: @UiDropdownPlaceholderColor;
    font-size: @UiDropdownPlaceholderFontSize;
  }
  .hidden {
    opacity: 0;
    width: 0px;
  }
  .icon1 {
    color: @uiDropdownIconColor;
    margin-left: auto;
    font-size: 0.8em;
  }

  .ui-select {
    display: flex;
    width: 100%;

    padding: 0.375em 0.75em;
    cursor: pointer;
    border: 1px solid @uiDropdownBorderColor;
    font-size: @UiDropdownFontSize;
    color: @UiDropdownColor;
    min-height: @UiDropdownHeight;
    border-radius: @uiDropdownBorderRadius;

    .ui-tags-item {
      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Chrome/Safari/Opera */
      -khtml-user-select: none; /* Konqueror */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none;
    }

    &.transformer {
      border: none;
      background-color: @uiDropdownTransformerBgColor;
      cursor: default;
      line-height: 1.5;
      .icon1 {
        color: transparent;
      }
    }
  }
  .ui-options {
    display: none;
    font-size: @UiDropdownFontSize;
    color: @UiDropdownColor;

    &.active {
      display: block;
      position: absolute;
      z-index: 1000;
      // min-width: calc(~"100% - 2px");
      min-width: 100%;
      bottom: 1px;
    }
  }
}
</style>
