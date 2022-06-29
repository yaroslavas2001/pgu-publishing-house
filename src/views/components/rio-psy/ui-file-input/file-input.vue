<template>
  <div class="file-input" id="app">
    <input
      ref="file"
      class="custom-file-input"
      type="file"
      :id="id"
      :disabled="readonly"
      @change="onChangeInput"
      multiple
    />
    <!--  accept="image/png, image/jpeg" -->
    <div class="ui-button-show" type="submit" @click="onClick">
      <slot></slot>
    </div>
    <div
      v-for="(item, index) in fileArray"
      :key="index"
      class="file-input-block"
    >
      <div v-if="getTypeDocument(item.type)" class="file-input-document">
        <p>Document: {{ item.fileName }}</p>
      </div>
      <div v-else class="file-input-img">
        <img :src="item.fileBody" alt="" class="input-img" />
        <p class="file-input-img-name">{{ item.fileName }}</p>
      </div>
      <div>
        <btn isSmall @click="del(item.fileName)" title="Удалить" v-if="isDel" />
        <a
          :href="item.fileBody"
          :download="item.fileName"
          class="btn-input-file"
          v-if="isDownload"
        >
          Скачать
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";
import FileModel from "./FileModel";
@Options<UiFileInput>({
  emits: ["onChange"],
})
export default class UiFileInput extends Vue {
  @Prop({ default: false }) readonly!: boolean;
  @Prop({ default: 5 }) maxSizeMb: number;
  @Prop({ default: true, type: Boolean }) isDel: boolean;
  @Prop({ default: true, type: Boolean }) isDownload: boolean;

  // @Prop({ default: true,type:Boolean}) download: boolean;

  fileArray: Array<FileModel> = [];
  private file: File;
  errorMessage: string = "";

  id = `ui_file_input_${Math.floor(Math.random() * 1000) + 1}`;
  get maxSizeBytes(): number {
    return this.maxSizeMb * 1024 * 1024;
  }
  //загрузка файлов
  async onChangeInput() {
    if (!this.$refs.file) return null;
    var files = (this.$refs.file as HTMLInputElement).files;
    if (files.length >= 1) {
      for (var i = 0; i < files.length; i++) {
        let blob = new Blob([files[i]]);
        await this.getBase64(blob, files[i]);
      }
    }
    this.$emit("onChange", this.fileArray);
    this.clearValue();
  }

  getBase64(blob: Blob, file: File) {
    let self = this;
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => {
        let encoded = reader.result;
        let res = self.fileArray.filter((el) => el.fileName == file.name);
        if (res.length == 0) {
          self.fileArray.push({
            fileBody: reader.result as string,
            fileName: file.name,
            type: file.type,
          });
          console.log("path", file.webkitRelativePath);
          console.log("reader", reader.result);
        }
        resolve(encoded);
      };
      reader.onerror = (error) => reject(error);
    });
  }

  private clearValue() {
    (this.$refs.file as HTMLInputElement).value = null;
  }
  onClick() {
    (this.$refs.file as HTMLElement).click();
  }
  del(fileName: string) {
    for (var i = this.fileArray.length - 1; i >= 0; --i) {
      if (this.fileArray[i].fileName == fileName) {
        this.fileArray.splice(i, 1);
        this.$emit("onChange", this.fileArray);
      }
    }
  }
  download(fileName: string) {
    for (var i = this.fileArray.length - 1; i >= 0; --i) {
      if (this.fileArray[i].fileName == fileName) {
        this.fileArray.splice(i, 1);
        this.$emit("onChange", this.fileArray);
      }
    }
  }
  getTypeDocument(type: string) {
    if (type.includes("pdf") || type.includes("doc") || type.includes("docx"))
      return true;
    else return false;
  }
}
</script>

<style lang="less" scoped>
.file-input {
  display: flex;
  flex-direction: column;
  margin: 10px 0px;
  .custom-file-input {
    display: none;
  }
  .ui-button-show {
    display: flex;
  }
  .error-msg {
    display: flex;
  }
  .file-input-block {
    display: flex;
    // flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    .file-input-document {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .file-input-document-close {
        background-color: #fff;
      }
    }
    .file-input-img {
      // position: relative;
      display: flex;
      flex-direction: column;
      .input-img {
        height: auto;
        width: auto;
        max-height: 200px;
      }
      .file-input-img-name {
        padding: 5px 0px 10px 0px;
      }

      .file-input-img-close {
        position: absolute;
        right: 0;
        top: 30px;
      }
    }
  }
}
.btn-input-file {
  outline: none;
  background: transparent;
  border: 1px #cd8458 solid;
  width: fit-content;
  height: fit-content;
  font-family: "Open Sans", sans-serif;
  cursor: pointer;
  transition: all 0.2s ease-out;
  color: #000;
  font-size: 15px;
  border-radius: 5px;
  padding: 3px 14px;
  text-decoration: none;
  box-sizing: border-box;
  margin-left: 10px;
  &:hover {
    background: #cd8458;
    color: #dedfd7;
  }
}
</style>
