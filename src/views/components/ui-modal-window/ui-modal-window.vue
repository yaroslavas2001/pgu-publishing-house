<template>
  <div
    class="ui-modal-window"
    id="modal-wrapper"
    v-if="innerVisible"
    @mouseup="mouseUpWrapper"
    @mousedown="mouseDownWrapper"
  >
    <div class="window" :style="{ width: width }">
      <div class="header-modal" v-if="showHeaderTitle" style="">
        <slot name="header">
          <div class="name-modal">
            <div
              class="icon"
              v-if="icon"
              style="display: flex; padding-right: 10px"
            >
              <span v-if="type == 2" class="icon-icon_error">
                <span class="path1"></span><span class="path2"></span>
                <span class="path3"></span>
              </span>
              <span v-if="type == 3" class="icon-icon_warning">
                <span class="path1"></span><span class="path2"></span>
              </span>
              <span v-if="type == 4" class="icon-icon_info">
                <span class="path1"></span><span class="path2"></span
                ><span class="path3"></span>
              </span>
            </div>
            <div class="title">{{ title }}</div>
            <slot name=togle />
          </div>
        </slot>
        <!-- <div class="bnt-close" v-if="showCloseBtn" @click="closeWindow">
          &times;
        </div> -->
      </div>
      <div class="body">
        <slot name="default"></slot>

        <slot name="button" v-if="!noButton">
          <div class="">
            <div class="button-wrapper">
              <ui-button @onClick="onCancel" :width="100" :tabindex="'101'">
                {{ titleBtnNo }}</ui-button
              >
              <ui-button
                @onClick="onOk"
                :width="100"
                active
                :tabindex="'102'"
                style="margin-right: 5px"
                >{{ titleBtnYes }}</ui-button
              >
            </div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue, Ref, Prop, Watch } from "vue-property-decorator";
import StatusWindow from "./status-window";
import UiButton from "@views/components/ui-button.vue";
import UiScroll from "@/views/components/ui-scroll.vue";

@Options<UiModalWindow>({
  components: {
    StatusWindow,
    UiButton,
    UiScroll,
  },
  emits: ["onCancel", "onOk"],
})
export default class UiModalWindow extends Vue {
  @Prop({ type: String }) titleBtnYes: string;
  @Prop({ type: String }) titleBtnNo: string;

  @Prop({ type: String, default: "title" }) title: string;
  @Prop({ type: Boolean, default: false }) visible: boolean;
  @Prop({ type: Boolean, default: true }) showCloseBtn: boolean;
  @Prop({ type: Object, default: null, required: false }) closeHandler: () =>
    | boolean
    | (() => Promise<boolean>);
  @Prop({ type: Object, default: null, required: false }) okHandler: () =>
    | boolean
    | (() => Promise<boolean>);
  @Prop({ type: String, default: "623px" }) width: string;
  @Prop({ type: Number, default: StatusWindow.Text }) type: StatusWindow;

  @Prop({ type: Boolean, default: false }) noButton: boolean;
  @Prop({ type: Boolean, default: true }) showHeaderTitle: boolean;
  @Prop({ type: Boolean, default: true }) autoClose: boolean;

  icon: boolean = false;
  innerVisible = false;
  elementClick: HTMLElement = null;
  @Watch("visible")
  onChangeVisible() {
    this.innerVisible = this.visible;
  }
  // @Watch("innerVisible")
  // onChangeVisible(visible: boolean) {
  //   this.innerVisible = visible;
  // }
  created() {}

  private hasSlotData() {
    return this.$slots.button;
  }
  private async getHandlerResult(
    handler: () => boolean | (() => Promise<boolean>)
  ): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      if (handler != null) {
        const resultOrPromise = handler();
        const isPromise = resultOrPromise instanceof Promise;
        let result: boolean = null;
        if (isPromise) {
          result = await (resultOrPromise as boolean);
        } else {
          result = resultOrPromise as boolean;
        }
        //console.log("result: ", result);

        resolve(result);
        return;
      }
      //console.log("TRUe");
      resolve(true);
    });
  }
  private async closeWindow(
    handler?: () => boolean | (() => Promise<boolean>)
  ) {
    //console.log("close");

    const isClose = await this.getHandlerResult(handler);
    if (!isClose) {
      return;
    }
    this.innerVisible = false;
    
    return false;
  }
  private async onCloseBtnClicked() {
    await this.closeWindow(this.closeHandler);
  }
  private async onCancel() {
    this.$emit("onCancel", false);
    await this.closeWindow(this.closeHandler);
  }
  private async onOk() {
    this.$emit("onOk", true);
    if (this.autoClose) {
      await this.closeWindow(this.okHandler);
    }
    return false;
  }
  private async onKeyDown(evt: any) {
    if (this.innerVisible) {
      evt = evt || window.event;
      var isEscape = false;
      if ("key" in evt) {
        isEscape = evt.key === "Escape" || evt.key === "Esc";
      } else {
        isEscape = evt.keyCode === 27;
      }
      if (isEscape) {
        await this.onCancel();
      }
    }
  }
  private getWindowsType(type: StatusWindow) {
    var value = "";
    switch (type) {
      case 1:
        //text
        value = "";
        break;
      case 2:
        //error
        value = "icon-icon_error";
        break;
      case 3:
        //warning
        value = "icon-icon_warning";
        break;
      case 4:
        //info
        value = "icon-icon_info";
        break;
      default:
        break;
    }

    return value;
  }
  private mouseDownWrapper(ev: MouseEvent) {
    this.elementClick = ev.target as HTMLElement;
  }
  private mouseUpWrapper(ev: MouseEvent) {
    const wrapper = document.getElementById("modal-wrapper");
    if (this.elementClick == wrapper && ev.target == wrapper) {
      this.$emit("clickOutside");
    }
  }

  show() {
    this.innerVisible = true;
  }
  async hide() {
    await this.closeWindow(this.closeHandler);
  }
}
</script>
<style lang="less" scoped>
@modalWindowWrapperBgColor: rgba(32, 37, 48, 0.8);
@modalWindowBgColor: #fff;
@modalWindowHeaderBgColor: #fff;
@modalWindowTitleColor: #2f3749;
@modalWindowHeaderColor: #162a47;
@modalWindowBodyColor: #7a7878;
@modalWindowHeaderMargin: 0;
@modalWindowHeaderBorderBottom: none;
@modalWindowCloseButtonColor: #99a4c0;
.ui-modal-window {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: @modalWindowWrapperBgColor;
  z-index: 9000;
  display: flex;
  align-items: center;
  justify-content: center;
  .window {
    background: @modalWindowBgColor;
    outline: none;
      border-radius: 8px;
    // border: 1px solid #4d648b;
    .header-modal {
      // display: grid;
      // grid-template-columns: auto 40px;
        border-radius: 8px;

      align-content: center;
      background: @modalWindowHeaderBgColor;
      margin: @modalWindowHeaderMargin;
      border-bottom: @modalWindowHeaderBorderBottom;
      color: @modalWindowHeaderColor;
      font-size: 17px;
      // border-bottom: 2px solid #F0F0F0;
      .name-modal {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0 20px; 
        justify-content: space-between;
        cursor: unset;
      }

      .title {
        color: @modalWindowTitleColor;
        display: flex;
        font-size: 18px;
        // font-weight: bold;
        align-items: center;
        padding: 0 20px 0 0;
        height: 48px;
      }
      .bnt-close {
        font-size: 30px;
        align-items: center;
        display: flex;
        cursor: pointer;
        color: @modalWindowCloseButtonColor;
      }
    }
    .icon {
      font-size: 24px;
    }
    .body {
      padding: 0 20px 0 20px;
      color: @modalWindowBodyColor;
      .button-wrapper {
        display: flex;
        justify-content: flex-end;
        padding: 25px 0;
      }
    }
  }
}
</style>