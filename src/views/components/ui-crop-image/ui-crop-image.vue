<template>
  <div
    class="ui-crop-image noselect"
    :style="[backgroundStyle, { 'max-width': maxWidth + 'px' }]"
  >
    <div class="overlay left" :style="leftStyle"></div>
    <div class="overlay center">
      <div class="top" :style="topStyle"></div>
      <div class="frame" :style="frameStyle" @mousedown="onMouseDown($event)">
        <slot>
          <div class="rectangle">
            <div class="rectangle__border1"></div>
            <div class="rectangle__border2"></div>
            <div class="rectangle__border3"></div>
            <div class="rectangle__border4"></div>
            <div></div>
            <div
              v-for="item in controls"
              :key="item"
              :class="getClassForControlType(item)"
              class="btn"
              @mousedown.stop="onMouseDown($event, item)"
            ></div>
          </div>
        </slot>
      </div>
      <div class="overlay bottom"></div>
    </div>
    <div class="overlay right"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CropImageBg from "./crop-image-background.vue";
import CropImageFrame from "./crop-image-frame.vue";
import CropImageViewModel, { ControlType } from "./cropImageViewModel";
@Options<UiCropImage>({
  props: {
    // type: String,
    aspectRatio: Number,
    elHeight: { default: 100, type: Number },
    imageSrc: { default: "", type: String },
    maxHeight: { type: Number, default: 100 },
    maxWidth: { type: Number, default: 100 },
    minHeight: { type: Number, default: 100 },
    minWidth: { type: Number, default: 100 },
    // height: { type: Number },
    // width: Number,
    // isLiveUpdate: Boolean,
    // prevParams: Object,
  },
  // components: { CropImageBg, CropImageFrame },
})
export default class UiCropImage extends Vue {
  readonly maxHeight: number = 400;
  readonly maxWidth: number = 400;
  readonly minHeight: number = 100;
  readonly minWidth: number = 100;
  readonly aspectRatio: number = 1;
  readonly elHeight: number = 100;
  controls = [
    ControlType.LeftTop,
    ControlType.Top,
    ControlType.RightTop,
    ControlType.Right,
    ControlType.RightBottom,
    ControlType.Bottom,
    ControlType.LeftBottom,
    ControlType.Left,
  ];
  viewModel = new CropImageViewModel();
  readonly imageSrc: string;

  getClassForControlType(type: ControlType): string {
    return `btn_${ControlType[type].toLowerCase()}`;
  }
  created() {}
  mounted() {
    // this.viewModel.height = this.elHeight;
    // this.viewModel.width =
    //   this.elHeight * (this.aspectRatio ? this.aspectRatio : 1);

    this.viewModel.maxHeight = this.maxHeight;
    this.viewModel.maxWidth = this.maxWidth;
    this.viewModel.minHeight = this.minHeight;
    this.viewModel.minWidth = this.minWidth;
    this.viewModel.aspectRatio = this.aspectRatio;
    this.getImageSize();
  }

  get backgroundStyle(): Object {
    return {
      background: `url(${this.imageSrc})`,
      // maxHeight: `${this.maxHeight}px`,
      width: `${this.w}px`,
      backgroundSize: "cover",
      height: `${this.h}px`,
    };
  }
  h = this.maxHeight;
  w = this.maxWidth;
  ratio = 1;
  imageSize: { width: number; height: number } = null;
  getImageSize() {
    let self = this;
    let i = new Image();
    i.onload = () => {
      self.imageSize = { width: i.width, height: i.height };

      let ratioHeight = self.maxHeight / self.imageSize.height;
      let ratioWidth = self.maxWidth / self.imageSize.width;
      if (ratioHeight < ratioWidth) {
        self.ratio = ratioHeight;
        self.h = self.maxHeight;
        self.w = Math.round(self.imageSize.width * ratioHeight);
      } else {
        self.ratio = ratioWidth;
        self.w = self.maxWidth;
        self.h = Math.round(self.imageSize.height * ratioWidth);
      }
      if (!self.aspectRatio) {
        self.viewModel.aspectRatio = self.ratio;
      }
      self.viewModel.maxHeight = self.h;
      self.viewModel.maxWidth = self.w;
      if (self.viewModel.height > self.h) {
        self.viewModel.height = self.h;
        self.viewModel.width = self.h * self.viewModel.aspectRatio;
      } else {
        self.viewModel.height =
          self.viewModel.width / self.viewModel.aspectRatio;
      }
      self.$emit("update", {
        Left: Math.round(self.viewModel.left / self.ratio),
        Top: Math.round(self.viewModel.top / self.ratio),
        Width: Math.round(self.viewModel.width / self.ratio),
        Height: Math.round(self.viewModel.height / self.ratio),
        ImageSrc: self.imageSrc,
      });
    };
    i.src = self.imageSrc;
  }
  get frameStyle(): Object {
    return {
      width: `${this.viewModel.width}px`,
      height: `${this.viewModel.height}px`,
    };
  }
  prevPoint: { x: number; y: number } = null;
  editMode: "move" | "resize" | null = null;

  resizePoint: ControlType = null;
  get leftStyle(): Object {
    return {
      width: `${this.viewModel.left}px`,
      maxWidth: `calc(100%-${this.viewModel.width}px)`,
    };
  }
  get topStyle(): Object {
    return {
      height: `${this.viewModel.top}px`,
    };
  }
  onMouseDown(e: MouseEvent, type: ControlType = null) {
    this.prevPoint = { x: e.pageX, y: e.pageY };

    if (!type) {
      this.editMode = "move";
    } else {
      this.editMode = "resize";
      this.resizePoint = type;
    }

    this.addDocumentEventListeners();
  }

  onMouseMove(e: MouseEvent) {
    if (this.editMode == "move") {
      this.processMoving(e);
      return;
    }
    this.processResizing(e);
  }
  processMoving(e: MouseEvent) {
    const dx = e.pageX - this.prevPoint.x;
    const dy = e.pageY - this.prevPoint.y;
    this.viewModel.move(dx, dy);
    this.prevPoint = { x: e.pageX, y: e.pageY };
  }
  processResizing(e: MouseEvent) {
    let dx = 0;
    let dy = 0;

    dx = e.pageX - this.prevPoint.x;
    dy = e.pageY - this.prevPoint.y;

    this.viewModel.resize(dx, dy, this.resizePoint);
    this.prevPoint = { x: e.pageX, y: e.pageY };
  }
  onMouseUp(e: MouseEvent) {
    this.prevPoint = null;
    this.editMode = null;
    this.$emit("update", {
      Left: Math.round(this.viewModel.left / this.ratio),
      Top: Math.round(this.viewModel.top / this.ratio),
      Width: Math.round(this.viewModel.width / this.ratio),
      Height: Math.round(this.viewModel.height / this.ratio),
      ImageSrc: this.imageSrc,
    });
    this.removeDocumentEventListeners();
  }
  addDocumentEventListeners() {
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("mouseup", this.onMouseUp);
  }
  removeDocumentEventListeners() {
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseup", this.onMouseUp);
  }
  // // @Prop() type: string;
  // // @Prop() aspectRatio: number;
  // // @Prop() maxHeight: number;
  // // @Prop() maxWidth: number;
  // // @Prop() height: number;
  // // @Prop() width: number;
  // // @Prop({ default: false }) isLiveUpdate: boolean;
  // // @Prop({
  // //   default: () => {
  // //     return {
  // //       left: 0,
  // //       top: 0,
  // //       height: 0,
  // //       width: 0,
  // //     };
  // //   },
  // // })
  // type: string = "";
  // aspectRatio: number = 1;
  // imageSrc: string = "";
  // maxHeight: number = 1;
  // maxWidth: number = 1;
  // height: number = 80;
  // width: number = 80;
  // isLiveUpdate: boolean = false;
  // prevParams: PrevParams = { left: 0, height: 0, top: 0, width: 0 };

  // realWidth = 0;
  // realHeight = 0;
  // created() {
  //   //console.log(`this`, this);
  // }
  // loaded(data: any) {
  //   (this.$refs.frame as any).show(data);
  //   this.realHeight = data.height;
  //   this.realWidth = data.width;
  // }
  // getCropParams() {
  //   this.$emit("height", this.realHeight);
  //   return (this.$refs.frame as any).getParams();
  // }
  // forceUpdate() {
  //   (this.$refs.frame as any).forceUpdate();
  // }
  // updateCropParams(data: any) {
  //   this.$emit("update", data);
  // }
}
export interface PrevParams {
  left: number;
  top: number;
  height: number;
  width: number;
}
</script>

<style lang="less" >
.ui-crop-image {
  display: flex;
  justify-content: space-between;
  > .overlay {
  }
  .overlay {
    &.center {
      display: flex;
      flex-direction: column;
      .top {
        background-color: rgba(0, 0, 0, 0.6);
      }
      .bottom {
        flex-grow: 1;
      }
    }
    &.left {
      background-color: rgba(0, 0, 0, 0.6);
    }
    &.center {
      .frame {
        cursor: move;

        .rectangle {
          position: relative;
          height: 100%;
          width: 100%;
          .rectangle__border1 {
            position: absolute;
            background: url("~@assets/img/border-anim-v.gif") repeat-y left top;
            width: 100%;
            height: 100%;
          }
          .rectangle__border2 {
            position: absolute;
            width: 100%;
            height: 100%;
            background: url("~@assets/img/border-anim-h.gif") repeat-x left top;
          }

          .rectangle__border3 {
            width: 100%;
            height: 100%;
            position: absolute;
            background: url("~@assets/img/border-anim-v.gif") repeat-y right top;
          }
          .rectangle__border4 {
            width: 100%;
            height: 100%;
            position: absolute;
            background: url("~@assets/img/border-anim-h.gif") repeat-x left
              bottom;
          }

          .btn {
            position: absolute;
            background-color: #fff;
            font-size: 0px;
            z-index: 1;
            width: 5px;
            height: 5px;
            display: flex;
            flex: 0 0;

            &.btn_lefttop {
              left: 0px;
              cursor: nwse-resize;
            }
            &.btn_top {
              left: 50%;
              cursor: n-resize;
            }
            &.btn_righttop {
              right: 0px;

              cursor: nesw-resize;
            }
            &.btn_right {
              right: 0px;
              bottom: 50%;
              cursor: ew-resize;
            }
            &.btn_rightbottom {
              right: 0px;
              bottom: 0px;
              cursor: nwse-resize;
            }
            &.btn_bottom {
              right: 50%;
              bottom: 0px;
              cursor: ns-resize;
            }
            &.btn_leftbottom {
              left: 0px;
              bottom: 0px;
              cursor: nesw-resize;
            }
            &.btn_left {
              left: 0px;
              bottom: 50%;
              cursor: ew-resize;
            }
          }
        }
      }
      .overlay {
        // width: 100px;

        background-color: rgba(0, 0, 0, 0.6);
      }
    }

    &.right {
      background-color: rgba(0, 0, 0, 0.6);
      // width: 100px;
      flex-grow: 1;
    }
  }
}
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>