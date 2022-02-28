<template>
  <div
    class="crop-image-preview"
    :style="blockStyle"
    ref="preview"
    :class="{ round: round }"
  >
    <img :src="imageSrc" :style="crImage" class="cr-image" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ImagePreviewModel from "./ImagePreviewModel";

@Options<CropImagePreview>({
  props: {
    cropParams: { Object },
    aspectRatio: { default: 1, type: Number },
    defaultImage: {
      default: require("@assets/img/no_image.svg"),
      type: String,
    },
    elHeight: { default: 80, type: Number },
    round: { default: false, type: Boolean },
  },

  watch: {
    cropParams(value) {
      this.recalcStyle();
    },
  },
})
export default class CropImagePreview extends Vue {
  readonly cropParams: ImagePreviewModel = {
    Width: 0,
    Height: 0,
    Top: 0,
    Left: 0,
    ImageSrc: "",
  };

  readonly aspectRatio = 1;
  readonly defaultImage = "";
  readonly elHeight = 80;
  readonly round = false;

  // @Prop({ type: Object}) cropParams: ImagePreviewModel;
  // //Отношение ширины к высоте
  // @Prop({ default: 1 }) aspectRatio: number;
  // @Prop({ default: '/assets/img/no_image.svg' }) defaultImage: string;
  // @Prop({ default: 80 }) elHeight: number;
  // @Prop({ default: false }) round: Boolean;

  // @Watch('cropParams' { deep: true })
  // onUpdateParamsCrop() {
  //   this.recalcStyle();
  //   //  //console.log('crop params changed: ', this.cropParams);
  // }

  // @Prop() imageSrc: string;
  // @Watch("imageSrc")
  // onUpdateParamsSrc() {
  //   this.recalcStyle();
  // }
  get imageSrc(): string {
    const rez = (this.cropParams || {}).ImageSrc || this.defaultImage;
    return rez;
  }

  mounted() {
    // this.$emit("input", this.elHeight);
    this.recalcClientHeight();
    this.recalcStyle();
    window.addEventListener("resize", this.recalcClientHeight);
  }
  get blockStyle(): Object {
    return {
      height: `${this.elHeight}px`,
      width: `${this.elHeight * this.aspectRatio}px`,
    };
  }

  //#region computed
  defaultStyle = {
    height: `${this.elHeight}px`,
    width: "100%",
    // transform: "translateY(-50%)",
    // top: "50%",
  };

  crImage = {};
  isCropped(): boolean {
    return (
      !!this.cropParams &&
      !!this.cropParams.ImageSrc &&
      !!this.cropParams.Height &&
      !!this.cropParams.Width &&
      this.cropParams.Left != null &&
      this.cropParams.Top != null
    );
  }
  recalcStyle() {
    let aspect =
      this.elHeight /
      (this.cropParams ? this.cropParams.Height : this.elHeight);
    aspect = Number.isNaN(aspect) ? 1 : aspect;
    if (this.isCropped()) {
      let i = new Image();
      i.onload = () => {
        this.crImage = {
          left: -(this.cropParams.Left || 0) * aspect + "px",
          top: -(this.cropParams.Top || 0) * aspect + "px",
          height: (i.height || 1) * aspect + "px",
        };
      };
      i.src = this.cropParams.ImageSrc;
    } else {
      this.crImage = this.defaultStyle;
    }
  }
  height = 0;
  //#endregion
  //#region methods: {
  recalcClientHeight() {
    if (this.$refs.preview) {
      //console.log(
      //  `(this.$refs.preview as any).clientHeight`,
       // (this.$refs.preview as any).clientHeight
      //);
      this.defaultStyle.height = (this.$refs.preview as any).clientHeight;
    }
  }
  //#endregion
}
</script>

<style lang="less" scoped>
@cropImagePreviewBorderColor: #d2d2d2;
.crop-image-preview {
  position: relative;
  overflow: hidden;
  text-align: left;
  border: 1px solid @cropImagePreviewBorderColor;
  &.round {
    border-radius: 50%;
  }
  .cr-image {
    position: absolute;
    z-index: 2;
    background-color: #fff;
  }
}
.max {
  height: 80px;
  width: 304px;
}
.min {
  height: 80px;
  width: 80px;
}
.fluid {
  height: 100%;
  width: 100%;
  position: absolute;
}
</style>
