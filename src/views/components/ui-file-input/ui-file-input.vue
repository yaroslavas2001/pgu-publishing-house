<template>
  <div class="ui-file-input" id="app">
    <bs-label v-if="!!label" :for="id">{{ label }}:</bs-label>
    <input
      ref="file"
      class="inputDl"
      type="file"
      :id="id"
      :disabled="readonly"
      accept="image/png, image/jpeg"
      @change="onChangeInput"
      multiple
    />

    <div class="ui-button-show" type="submit" @click="onClick()">
      <slot></slot>
    </div>
    <!-- <div class="fileName">{{fileName}}</div> -->
    <div
      class="error-msg"
      :class="{ hidden: !showError || !errorMessage }"
      v-if="!showError == true"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";
@Options<UiFileInput>({
  // props: {
  //   readonly: { default: false, type: Boolean },
  //   required: { default: false, type: Boolean },
  //   showError: { default: true, type: Boolean },
  //   maxSizeMb: { default: 5, type: Number },
  //   label: { type: String, default: "" },
  //   showFileName: { default: true, type: Boolean },
  // },
  emits: ["onChange"],
})
export default class UiFileInput extends Vue {
  @Prop({ default: false }) readonly!: boolean;
  @Prop({ default: false }) required!: boolean;
  @Prop({ default: true }) showError!: boolean;
  @Prop({ default: 5 }) maxSizeMb: number;
  @Prop({ default: "" }) label!: string;
  @Prop({ default: true }) showFileName!: boolean;

  listBigFile = [];
  private file: File;
  private noImageText = "";
  fileName: string = this.noImageText;
  focused = false;
  hasError: boolean = false;
  errorMessage: string = "";

  id = `ui_file_input_${Math.floor(Math.random() * 1000) + 1}`;
  get maxSizeBytes(): number {
    return this.maxSizeMb * 1024 * 1024;
  }

  getFile(): File {
    if (!this.$refs.file) return null;
    var files = (this.$refs.file as HTMLInputElement).files;
    if (files.length > 1) {
      this.getFiles(files);
      return;
    }
    return files[0];
  }
  getFiles(files: any) {
    var self = this;
    for (var _i = 0; _i < files.length; _i++) {
      if (files[_i] != undefined && files[_i].size > this.maxSizeBytes) {
        this.listBigFile.push(files[_i].name);
      } else {
        this.fileName = files[_i].name;
        this.$forceUpdate();
        let blob = new Blob([files[_i]]);
        let url = this.getBase64(blob, this.fileName);
      }
    }
    if (this.listBigFile.length > 0) {
      alert(
        "Файлы не прошли " +
          this.listBigFile +
          "\n Максимальнй размер файла: " +
          this.maxSizeMb +
          "Mb"
      );
      this.listBigFile = [];
    }
    this.clearValue();
  }
  getBase64(file: Blob, name: string) {
    let self = this;
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result;
        let set = {
          fileName: name,
          url: encoded,
        };
        console.log(typeof(file));
        
        self.$emit("onChange", set);
        resolve(encoded);
      };
      reader.onerror = (error) => reject(error);
    });
  }
  private clearValue() {
    (this.$refs.file as HTMLInputElement).value = null;
  }
  setFile(file?: File) {
    this.file = file;
    this.fileName = !!file ? file.name : this.noImageText;
  }
  onClick() {
    (this.$refs.file as HTMLElement).click();
  }
  async onChangeInput() {
    var self = this;
    var file = this.getFile();
    if (file != undefined) {
      if (file.size > this.maxSizeBytes) {
        this.setFile();
        this.errorMessage = "Размер файла большой!";
        alert(
          this.errorMessage +
            " Максимальный размер файла: " +
            this.maxSizeMb +
            "Mb"
        );
        console.error(`Maximum file size ${this.maxSizeMb} Mb`);
        return;
      }
      this.fileName = file.name;
      this.$forceUpdate();
      let url = null;
      var reader = new FileReader();
      reader.onloadend = function () {
        url = reader.result;
        let set = {
          fileName: self.fileName,
          url: url,
        };
        self.$emit("onChange", set);
      };
      if (file) {
        reader.readAsDataURL(file);
      } else {
        url = "";
      }
      this.clearValue();
    }
  }
  isValid(): boolean {
    var isValid = !this.required || !!this.file;
    this.errorMessage = isValid ? "" : "Файл обязателен";
    return isValid;
  }
}
</script>

<style lang="less" scope>
@padding: 10px;

.ui-file-input {
  .ui-button-show {
    color: #a0255e;
    text-align: center;
    text-decoration: underline;
    font-size: 13px;
    cursor: pointer;
  }
  .fileName {
  }
  display: flex;
  height: auto;
  .form-control {
    display: block;
    width: 100%;
    padding: 0.375em 0.75em;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    box-sizing: border-box;
  }
  .inputDl {
    opacity: 0;
    position: absolute;
    cursor: pointer;
    z-index: -2;
  }
  label {
    display: block;
    color: #b8c3e0;
    margin-bottom: 10px;
  }
  .error-msg {
    color: #e18fa2;
    font-size: 12px;
    line-height: 20px;
    min-height: 20px;
    text-align: left;
    .hidden {
      visibility: hidden;
    }
    .hid {
      display: none;
    }
  }
  .icon {
    color: #cbcfd0;
    position: absolute;
    left: 12px;
    top: 10px;
    
  }
  .right {
    top: 10px;
    
    position: absolute;
    right: 12px;
  }

  position: relative;

  input {
    font-size: inherit;
    border: 1px solid #394e72;
    padding: 0 @padding;
    color: #b8c3e0;
    &::placeholder {
      color: #aab5d1;
      font-size: 1em;
    }

    &.has-icon {
      padding-left: 35px;
    }
    &.dark {
      background-color: #293b5a;
      color: #99a4c0;
    }
    &:focus {
      background-color: #1b283f;
      outline: none !important;
      border: 1px solid #394e72;
    }
    &.has-error {
      border-color: #e18fa2;
    }
  }
  .error {
    border: 1px solid #f65a48;
  }
  input {
    &.dark {
      &.transformer {
        border: none;
        background-color: #1b283f;
      }
      &:focus {
        background-color: #1b283f;
        outline: none !important;
        border: 1px solid #394e72;
      }
    }
  }
}
</style>
