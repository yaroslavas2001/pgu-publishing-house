<template>
  <div class="ui-image-preview">
    <template v-if="!oneImage">
      <crop-image-preview
        id="crop_preview"
        ref="croppreview"
        :el-height="elHight"
        :crop-params="cropResult"
        :aspect-ratio="aspectRatio"
      ></crop-image-preview>
    </template>
    <div
      v-if="showError"
      class="error-msg"
      :class="{ hidden: !showError || !errorMessage }"
    >
      {{ errorMessage }}
    </div>

    <div class="openimage">
      <ui-file-input
        ref="fileInput"
        :show-name="false"
        :placeholder="'Загрузить'"
        @onChange="onLoadFile"
      >
        Изменить фото
      </ui-file-input>
    </div>

    <div class="modal-windows">
      <ui-modal-window
        title="Форматирование изображения"
        :visible="!!cropImageUrl"
        width="600px"
        @close="cropImageUrl = null"
      >
        <template #default>
          <div class="row">
            <div class="col-auto mx-auto">
              <ui-crop-image
                ref="crop"
                :image-src="cropImageUrl"
                :max-height="400"
                :max-width="400"
                :el-height="elHight"
                :aspect-ratio="aspectRatio"
                @update="onCropUpdate"
              >
              </ui-crop-image>

              <!-- <slot name="crop-modal"></slot> -->
            </div>
          </div>
        </template>

        <template #button>
          <div
            style="justify-content: flex-end; display: flex"
            class="mt-3 mb-3 ml-3"
          >
            <ui-button active :width="100" @onClick="saveCrop" class="mr-3"
              >Сохранить</ui-button
            >
            <ui-button :width="100" @onClick="clearFile">Отменить</ui-button>
          </div>
        </template>
      </ui-modal-window>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CropImagePreview from "./crop-image-preview.vue";
import ImagePreviewModel from "./ImagePreviewModel";

import UiFileInput from "../ui-file-input/ui-file-input.vue";

//import ImagePreview from "@models/imagePreview";
@Options<UiImagePreview>({
  props: {
    modelValue: {
      type: ImagePreviewModel,
    },
    noCache: Boolean,
    showError: Boolean,
    required: Boolean,
    aspectRatio: { type: Number, default: 1 },
    elHight: Number,
    oneImage: Boolean,
  },
  watch: {
    modelValue(value) {
      this.innervalue = this.modelValue;
    },
  },
  components: { CropImagePreview },
})
export default class UiImagePreview extends Vue {
  modelValue: ImagePreviewModel = {
    Width: 0,
    Height: 0,
    Top: 0,
    Left: 0,
    ImageSrc: "",
  };
  readonly noCache: boolean;
  readonly showError: boolean;
  readonly required: boolean;
  readonly aspectRatio: number;
  readonly elHight: number;
  readonly oneImage: boolean;
  // @Prop({ type: Object, default: new ImagePreviewModel() })
  // value: ImagePreviewModel;
  // @Prop({ default: true }) noCache!: boolean;
  // @Prop({ default: true }) showError!: boolean;
  // @Prop({ default: true }) required!: boolean;
  // @Prop({ default: 1 }) aspectRatio: number;
  // @Prop({ default: 100 }) elHight: number;
  // @Prop({ default: false, type: Boolean }) oneImage: boolean;
  cropImageUrl = "";
  file: File;
  cropFile: File;
  errorMessage: string = "";
  hasError: boolean = false;

  innervalue: ImagePreviewModel = this.modelValue;
  cropResult: ImagePreviewModel = this.modelValue;
  // @Watch("innervalue")
  // onInnerValueChanged() {
  //   this.$emit("input", this.innervalue);
  // }
  // @Watch("value")
  // onValueChanged() {
  //   this.innervalue = this.value;
  // }
  created() {
    // //console.log(`this`, this);

    this.innervalue = this.modelValue;
    this.cropResult = this.modelValue;
  }
  get imageUrlPreview(): string {
    return (
      this.innervalue.ImageSrc +
      (this.noCache ? `?no_cache=${new Date().getTime()}` : "")
    );
  }

  setPositions(data: any) {
    this.innervalue = new ImagePreviewModel();
    this.innervalue.Width = parseInt(data.Width);
    this.innervalue.Height = parseInt(data.Height);
    this.innervalue.Top = parseInt(data.Top);
    this.innervalue.Left = parseInt(data.Left);
    this.innervalue.ImageSrc = data.ImageSrc;
  }
  onCropUpdate(data: ImagePreviewModel) {
    this.$emit("update:modelValue", data);
    this.setPositions(data);
  }
  onLoadFile(file: File) {
    this.cropFile = file;
    var fileToLoad = file;
    var fileReader = new FileReader();

    fileReader.onload = (fileLoadedEvent: any) => {
      var srcData = fileLoadedEvent.target.result;
      this.cropImageUrl = srcData;
    };
    fileReader.readAsDataURL(fileToLoad);
  }
  saveCrop() {
    this.file = this.cropFile;
    this.cropFile = null;
    // (this.$refs.crop as any).forceUpdate();
    this.innervalue.ImageSrc = this.cropImageUrl;
    this.cropImageUrl = null;
    this.cropResult = this.innervalue;
    this.clearFile();
    this.isValid();
  }

  getSetParams() {
    return this.innervalue;
  }

  isValid(): boolean {
    this.errorMessage = "";
    if (
      this.required &&
      (!this.innervalue.ImageSrc ||
        this.innervalue.ImageSrc == "/assets/img/no_image.svg")
    ) {
      this.errorMessage = "*Выберите изображение";
      this.hasError = true;
      return false;
    }
    this.hasError = false;
    return true;
  }

  getFile() {
    return this.innervalue;
  }

  clearFile() {
    this.cropImageUrl = null;
    (this.$refs.fileInput as UiFileInput).setFile(this.file);
  }
}
</script>

<style lang="less">
.ui-image-preview {
  .crop-image-preview {
    margin: 0 auto;
    position: relative;
  }
  #crop_preview {
    margin: 0 auto;
    img.cr-image {
      // height: auto !important;
      background-color: rgb(240, 240, 240, 0.5) !important;
    }

    // max-height: 182px;
    border: 1px solid #e8e8e8;
  }
  .openimage {
    display: flex;
    justify-content: center;

    .ui-file-input {
      padding-top: 5px;
    }
    .nameimg {
      margin-left: 130px;
      margin-top: auto;
    }
  }
  .buttons {
    display: flex;
    margin-left: auto;
    #saveData {
      margin-right: 15px;
    }
  }
  .error-msg {
    color: #f13131;
    font-size: 14px;
    text-align: left;
    padding-top: 3px;
    .hidden {
      visibility: hidden;
    }
    .hid {
      display: none;
    }
  }
}
</style>
