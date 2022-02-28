<template>
  <div class="scroll" :class="[styleBar]" ref="scroll">
    <!-- <transition name="fade"> -->
    <div
      class="scroll-up"
      ref="scrollUp"
      v-show="isScrollUp && isShowScrollUp"
      :class="{ reverse: isReverseScroll }"
    >
      <div class="left-wrapper" @click="scrollTop" :style="leftScrollStyle">
        <div class="scroll-left">
          <div class="inner">
            <span class="arrow icon-next"></span>
            <transition name="fade">
              <span v-if="!isReverseScroll">Вверх</span>
            </transition>
          </div>
        </div>
      </div>
      <div
        class="scroll-right"
        :style="rightScrollStyle"
        @click="scrollTop"
      ></div>
    </div>
    <!-- </transition> -->
    <div
      class="scroll-content"
      ref="content"
      :style="[scrollStyle, { right: `-${scrollWidth}px` }]"
    >
      <slot name="default"></slot>
    </div>
    <div
      class="scroll-bar"
      :class="{ slide: hideScroll }"
      v-if="displayBar && scrollWidth != 0"
    >
      <div class="scroll-rail"></div>
      <div
        class="slider"
        @mousedown.left="mouseDownBar"
        :style="{ top: top + 'px', height: height + 'px' }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
let scrollY = 0;
let startY = 0;
const bottom = "bottom";
const top = "top";
// import { debounce } from "lodash";
import { Options, Vue } from "vue-class-component";
// import { setTimeout } from "timers";
// @Prop({
//   default: bottom,
//   type: String,
//   validator: (d: string) => {
//     return [bottom, top].indexOf(d) !== -1;
//   },
// })
// direction: string;
// @Prop({ type: String }) name: string;
// @Prop({ type: Boolean, default: true }) firstloading: boolean;
// @Prop({ type: String, default: "standart" }) styleBar: boolean;
// @Prop({ type: Object }) withScroll: Object;
// @Prop({ type: Object }) withoutScroll: Object;
// @Prop({ type: Boolean, default: false }) hasUnread: boolean;
// // включена прокрутка к верху
// @Prop({ type: Boolean, default: false }) isScrollUp: boolean;
// // значение в пикселях для прокрутки
// @Prop({ type: Number, default: 300 }) enableScrollUpValue: number;
// // класс основного контента
// @Prop({ type: String, default: "container" }) contentClass: string;
@Options<UiScroll>({
  props: {
    direction: {
      default: bottom,
      type: String,
      validator: (d: string) => {
        return [bottom, top].indexOf(d) !== -1;
      },
    },
    name: String,
    firstloading: { type: Boolean, default: true },
    styleBar: { type: String, default: "standart" },
    withScroll: Object,
    withoutScroll: Object,
    hasUnread: { type: Boolean, default: false },
    isScrollUp: { type: Boolean, default: false },
    enableScrollUpValue: { type: Number, default: 300 },
    contentClass: { type: String, default: "container" },
  },
  watch: {
    innerTop(value) {
      if (!this.isAutoScroll && value > this.enableScrollUpValue) {
        this.oldScrollPosition = 0;
      }
    },
    onInnerTop(value: number) {
      if (!this.isAutoScroll && value > this.enableScrollUpValue) {
        this.oldScrollPosition = 0;
      }
    },
  },
  name:"UiScroll"
})
export default class UiScroll extends Vue {
  // @Prop({
  //   default: bottom,
  //   type: String,
  //   validator: (d: string) => {
  //     return [bottom, top].indexOf(d) !== -1;
  //   },
  // })
  // direction: string;
  // @Prop({ type: String }) name: string;
  // @Prop({ type: Boolean, default: true }) firstloading: boolean;
  // @Prop({ type: String, default: "standart" }) styleBar: boolean;
  // @Prop({ type: Object }) withScroll: Object;
  // @Prop({ type: Object }) withoutScroll: Object;
  // @Prop({ type: Boolean, default: false }) hasUnread: boolean;
  // // включена прокрутка к верху
  // @Prop({ type: Boolean, default: false }) isScrollUp: boolean;
  // // значение в пикселях для прокрутки
  // @Prop({ type: Number, default: 300 }) enableScrollUpValue: number;
  // // класс основного контента
  // @Prop({ type: String, default: "container" }) contentClass: string;

  readonly direction: string;
  readonly name: string;
  readonly firstloading: boolean;
  readonly styleBar: boolean;
  readonly withScroll: Object;
  readonly withoutScroll: Object;
  readonly hasUnread: boolean;
  readonly isScrollUp: boolean;
  readonly enableScrollUpValue: number;
  readonly contentClass: string;

  innerTop: number = 0;
  element: any = {};
  bottomEvent: boolean = true;
  topEvent: boolean = true;
  hideScroll: boolean = false;
  oldScrollPosition: number = 0;
  isAutoScroll: boolean = false; // флаг показывающий что скролл происходит автоматически, а не от прокрутки пользователем
  rightScrollStyle: Object = {};
  leftScrollStyle: Object = {};
  scrollWidth: number = 17;

  get top(): number {
    (this.$refs.content as HTMLElement).scrollTop = this.innerTop;
    return this.innerTop * this.aspect;
  }
  get height(): number {
    let height = this.element.height * this.aspect;
    return height;
  }
  get aspect(): number {
    return this.element.height / this.element.scrollHeight;
  }
  get displayBar(): boolean {
    return this.element.scrollHeight > this.element.height;
  }
  get scrollStyle() {
    let style: any = {};
    if (!this.displayBar) {
      style = this.withScroll || {};
    } else {
      style = this.withoutScroll || {};
    }
    if (this.direction === "bottom") {
      style.top = 0;
    } else {
      style.bottom = 0;
    }
    return style;
  }
  get isShowScrollUp(): boolean {
    return this.enableScrollUpValue < this.innerTop || this.isReverseScroll;
  }
  // для скрола вверх
  get isReverseScroll(): boolean {
    return this.oldScrollPosition > 0;
  }

  mounted() {
    let el = this.$refs.content as HTMLElement;
    el.addEventListener("scroll", this.scrollEvent);
    if (this.isScrollUp) {
      this.recalcScrollUp();
      var scrollUp = this.$refs.scrollUp as HTMLElement;
      scrollUp && scrollUp.addEventListener("wheel", this.onWheel);
    }
    let self = this;

    this.setScrollWidth();
    //изменения внутри скрола
    new MutationObserver((e) => {
      this.$emit("mutation");
      if (self.direction === "top" && self.element.top == 0) {
        el.scrollTop = el.scrollHeight - self.element.scrollHeight;
      }
      self.onScroll(el, true);
      this.setScrollWidth();
    }).observe(el, { childList: true, subtree: true });
  }
  // @Watch("innerTop")
  // onInnerTop(value: number) {
  //   if (!this.isAutoScroll && value > this.enableScrollUpValue) {
  //     this.oldScrollPosition = 0;
  //   }
  // }
  created() {
    window.addEventListener("resize", this.recalcScrollUp);
    if (window.screen.width < 1024) this.scrollWidth = 0;
  }
  setScrollWidth() {
    // if (this.$refs.scroll != undefined && this.$refs.content) {
    //   this.scrollWidth =
    //     (this.$refs.scroll as HTMLElement).scrollWidth -
    //     (this.$refs.content as HTMLElement).scrollWidth;
    // }
  }
  onWheel(e) {
    this.setTop(this.innerTop + e.deltaY);
  }
  findFirstChildByClass(element: HTMLElement, className: string): HTMLElement {
    var foundElement = null,
      found;
    function recurse(element: HTMLElement, className: string, found: boolean) {
      if (!element) return;
      for (var i = 0; i < element.childNodes.length && !found; i++) {
        var el = element.childNodes[i] as HTMLElement;
        var classes = el.className != undefined ? el.className.split(" ") : [];
        for (var j = 0, jl = classes.length; j < jl; j++) {
          if (classes[j] == className) {
            found = true;
            foundElement = element.childNodes[i];
            break;
          }
        }
        if (found) break;
        recurse(element.childNodes[i] as HTMLElement, className, found);
      }
    }
    recurse(element, className, false);
    return foundElement;
  }

  recalcScrollUp() {
    // min width 90px
    var child = this.findFirstChildByClass(
      this.$refs.content as HTMLElement,
      this.contentClass
    );
    if (!child) return;
    var contentWidth = (this.$refs.content as HTMLElement).offsetWidth;
    var childWidth = child.offsetWidth + 30;
    var width = (contentWidth - childWidth) / 2;
    this.leftScrollStyle = {
      width: width + "px",
      opacity: width > 90 ? 1 : 0,
    };
  }
  scrollAnimate(element: HTMLElement, to: number, duration: number) {
    if (duration <= 0) {
      this.isAutoScroll = false;
      return;
    }
    var self = this;
    var difference = to - element.scrollTop;
    var perTick = (difference / duration) * 2;
    setTimeout(function () {
      element.scrollTop = element.scrollTop + perTick;
      self.scrollAnimate(element, to, duration - 2);
    }, 10);
  }
  scrollTop() {
    if (this.isAutoScroll) return;
    this.isAutoScroll = true;
    //todo: сохранять позицию если есть норм прокрутка.
    let el = this.$refs.content as HTMLElement;
    if (el.scrollTop > 300) {
      this.oldScrollPosition = el.scrollTop;
      this.scrollAnimate(el, 0, 20);
    } else {
      this.scrollAnimate(el, this.oldScrollPosition || 0, 20);
      this.oldScrollPosition = 0;
    }
  }
  scrollBottom() {
    if (this.isAutoScroll) return;
    this.isAutoScroll = true;
    // debugger;
    //todo: сохранять позицию если есть норм прокрутка.
    let el = this.$refs.content as HTMLElement;
    // if (el.scrollTop > 300) {
    // this.oldScrollPosition = el.scrollTop;
    this.scrollAnimate(el, el.scrollHeight, 20);
    // } else {
    //   this.scrollAnimate(el, el.innerHeight, 20);
    //   this.oldScrollPosition = 0;
    // }
  }
  // нахождение полосы прокрутки
  onTop() {
    return this.innerTop < 10;
  }
  onBottom() {
    return (
      this.element.top > this.element.scrollHeight - this.element.height - 10
    );
  }

  // установка отступа сверху и снизу
  setTop(value: number) {
    this.innerTop = value;
  }
  setBottom(value: number) {
    ////console.log('set bottom', value);
    this.innerTop =
      (this.$refs.content as HTMLElement).scrollHeight -
      (this.$refs.content as HTMLElement).clientHeight -
      value;
  }

  // события скролла
  scrollEvent(el: MouseEvent) {
    this.onScroll(el.target as HTMLElement, false);
    this.handleScroll();
  }
  resize() {
    this.onScroll(this.$refs.content as HTMLElement, false);
  }
  onScroll(el: HTMLElement, hide = true) {
    this.innerTop = el.scrollTop;
    this.element = {
      height: el.clientHeight,
      scrollHeight: el.scrollHeight,
      top: el.scrollTop,
    };
    if (!this.firstloading) {
      if (this.element.top < 10) {
        this.scrollTopEvent();
      }
      let short = false;
      if (this.$refs.scroll) {
        short =
          (this.$refs.scroll as HTMLElement).clientHeight >
          (this.$refs.content as HTMLElement).clientHeight;
      }
      if (
        !short &&
        this.element.top > this.element.scrollHeight - this.element.height - 10
      ) {
        this.scrollBottomEvent();
      }
    }
    this.hideScroll = hide;
    this.$emit("scroll");
  }
  scrollTopEvent() {
    if (this.topEvent) {
      this.$emit("scroll-top");
    }
    this.topEvent = false;
    let self = this;
    setTimeout(function () {
      self.topEvent = true;
    }, 200);
  }
  scrollBottomEvent() {
    if (this.bottomEvent) {
      this.$emit("scroll-bottom");
    }
    this.bottomEvent = false;
    let self = this;
    setTimeout(function () {
      self.bottomEvent = true;
    }, 200);
  }
  mouseDownBar(e: MouseEvent) {
    this.setStartPosition(e);
    document.documentElement.addEventListener(
      "mousemove",
      this.moveScrollBar,
      false
    );
    document.documentElement.onselectstart = function () {
      return false;
    };
  }
  mouseUpBar(e: MouseEvent) {
    document.documentElement.removeEventListener(
      "mousemove",
      this.moveScrollBar,
      false
    );
    document.documentElement.removeEventListener(
      "mouseup",
      this.mouseUpBar,
      false
    );
    document.documentElement.onselectstart = function () {
      return true;
    };
  }
  setStartPosition(e: MouseEvent) {
    scrollY = e.clientY;
    startY = this.innerTop;
    document.documentElement.addEventListener(
      "mouseup",
      this.mouseUpBar,
      false
    );
  }
  moveScrollBar(e) {
    // величина перемещения
    let b = scrollY - e.clientY;
    let y = startY - b / this.aspect;
    let c = this.element.scrollHeight - this.element.height;
    if (y < 0) {
      this.innerTop = 0;
    } else if (y > c) {
      this.innerTop = c;
    } else {
      this.innerTop = y;
    }
    this.hideScroll = false;
    this.handleScroll();
  }
  handleScrollInner() {
    if (!this.hideScroll) {
      clearTimeout(this.scrollTimeout);
      this.hideScroll = true;
      return;
    }
    if (this.scrollTimeout) {
    }
  }
  scrollTimeout = null;
  handleScroll() {
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = null;
    this.scrollTimeout = setTimeout(() => this.handleScrollInner(), 1000);
  }
}
</script>

<style lang="less" scoped>
@uiScrollSliderBgColor: #23a4a2;
@uiScrollSliderBgColor: #23a4a2;
@uiScrollSliderActiveBgColor: #23a4a2;
@uiScrollSliderWidth: 6px;
@uiScrollSliderRailWidth: 2px;
@uiScrollSliderRailBgColor: #e7e7e7;
.scroll-up {
  z-index: 100;
  height: 100vh;
  position: fixed;
  cursor: pointer;

  .left-wrapper {
    &:hover {
      .scroll-left {
        opacity: 0.85;
      }
    }
    height: 100%;
    .scroll-left {
      opacity: 0.5;
      background-color: #dbdbdb;
      padding-top: 30px;
      height: 100%;
      max-width: 150px;
      .inner {
        margin-left: 20px;
        display: flex;
        span {
          line-height: 25px;
          //color: #aeaeae;
        }
      }
      .arrow {
        margin-right: 10px;
        font-size: 18px;
        position: relative;
        top: -3px;
        opacity: inherit;
        -moz-transform: rotate(-90deg);
        -o-transform: rotate(-90deg);
        -webkit-transform: rotate(-90deg);
      }
    }
  }
}
.scroll-up.reverse {
  margin-top: 50px;
  .scroll-left {
    background-color: transparent;
    padding-top: 20px;
    .arrow {
      -moz-transform: rotate(90deg);
      -o-transform: rotate(90deg);
      -webkit-transform: rotate(90deg);
    }
  }
}
@media (max-width: 800px) {
  .scroll-up {
    display: none;
  }
}

.scroll {
  overflow: hidden;
  position: relative;
  height: 100%;
  max-height: 100%;
  .scroll-content {
    position: absolute;
    max-height: 100%;
    left: 0;
    // right: -18px;
    overflow-y: scroll;
    height: auto;
    overflow-x: hidden;
  }
  .scroll-bar {
    position: absolute;
    height: 100%;
    right: 0;
    top: 0;
    .scroll-rail {
      height: 100%;
      width: @uiScrollSliderRailWidth;
      background-color: @uiScrollSliderRailBgColor;
      margin: 0 auto;
      opacity: 1;
    }
    .slider {
      background-color: @uiScrollSliderBgColor;
      position: absolute;
      height: 200px;
      border-radius: calc(@uiScrollSliderWidth / 2);
      opacity: 1;
      transition: background-color 0.1s linear;
      cursor: pointer;
      &:hover,
      &:active {
        background-color: @uiScrollSliderActiveBgColor;
      }
    }
  }
  .slide {
    .slider {
      transition: opacity 0.4s linear;
      opacity: 0;
    }
    .scroll-rail {
      transition: opacity 0.4s linear;
      opacity: 0;
    }
  }
  .scroll-bar:hover {
    .slider {
      transition: opacity 0.4s linear;
      opacity: 1;
    }
  }
}
.standart {
  .scroll-bar {
    width: @uiScrollSliderWidth;
    .slider {
      width: @uiScrollSliderWidth;
    }
  }
}
.small {
  .scroll-bar {
    width: 4px;
    .slider {
      width: 4px;
    }
  }
}
.invis {
  .scroll-bar {
    opacity: 0;
  }
}
</style>