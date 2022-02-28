<template>
  <div
    class="ui-text-editor"
    v-if="type === 'extended'"
    v-bind:class="{ 'full-screen': stretchDraft }"
    @keyup.ctrl.enter="onPressCtrEnter"
    tabindex="1"
    @mouseover="hover = true"
    @mouseout="hover = false"
  >
    <!--     @focusout="lossFocus" -->
    <div class="toolbar" v-if="isToolbar">
      <div>
        <button type="button" @click="wysiwygFormat('undo')">
          <i class="icon-undo-left"></i>
        </button>
        <button type="button" @click="wysiwygFormat('redo')">
          <i class="icon-undo-right"></i>
        </button>
        <button type="button" @click="wysiwygFormat('bold')">
          <i class="icon-bold"></i>
        </button>
        <button type="button" @click="wysiwygFormat('italic')">
          <i class="icon-italic"></i>
        </button>
        <!-- <button type="button" @click="wysiwygFormat('underline')">
          <i class="texteditor-icon texteditor-icon-underline"></i>
        </button> -->
        <button type="button" @click="wysiwygFormat('strikeThrough')">
          <i class="icon-strikethrough"></i>
        </button>
        <!-- <button type="button" @click="wysiwygFormat('h3')" class="H">H</button> -->
        <button type="button" @click="wysiwygFormat('justifyLeft')">
          <i class="icon-paragraph-left"></i>
        </button>
        <button type="button" @click="wysiwygFormat('justifyCenter')">
          <i class="icon-paragraph-center"></i>
        </button>
        <button type="button" @click="wysiwygFormat('justifyRight')">
          <i class="icon-paragraph-right"></i>
        </button>
        <button type="button" @click="wysiwygFormat('justifyFull')">
          <i class="icon-paragraph-justify"></i>
        </button>
        <!-- <button type="button" @click="wysiwygFormat('indent')">
          <i class="texteditor-icon texteditor-icon-indent-increase"></i>
        </button>
        <button type="button" @click="wysiwygFormat('outdent')">
          <i class="texteditor-icon texteditor-icon-indent-decrease"></i>
        </button> -->
        <!-- <button type="button" @click="wysiwygFormat('insertImage')" v-if="hasImage"><i class='texteditor-icon texteditor-icon-image'></i></button> -->
      </div>
      <div>
        <!-- кнопки для расширения на весь экран -->
        <!-- <button type="button" @click="stretchWysiwyg" v-if="!stretchDraft">
          <i class="texteditor-icon texteditor-icon-enlarge"></i>
        </button>
        <button type="button" @click="stretchWysiwyg" v-else>
          <i class="texteditor-icon texteditor-icon-shrink"></i>
        </button> -->
      </div>
    </div>
    <div class="text">
      <ui-scroll style="height: 100vh" v-if="stretchDraft">
        <div
          id="editor"
          :style="{ minHeight: minHeight }"
          ref="editor"
          tabindex="-1"
          contenteditable
          @input="update"
          @paste="handlePaste"
          v-html="innerValue"
        ></div>
        <div
          class="placeholder"
          v-if="modelValue.length == 0"
          @click="setActive"
          tabindex="-1"
        >
          <span>{{ placeholder }}</span>
        </div>
      </ui-scroll>
      <div v-else>
        <div
          id="editor"
          :style="{ minHeight: minHeight }"
          ref="editor"
          tabindex="-1"
          contenteditable
          @input="update"
          @paste="handlePaste"
          v-html="innerValue"
        ></div>
        <div
          class="placeholder"
          v-if="modelValue.length == 0"
          @click="setActive"
          tabindex="-1"
        >
          <span>{{ placeholder }}</span>
        </div>
      </div>
    </div>
    <!-- <ui-texteditorimageloader v-if="hasImage" :minRatio="1.7" @saveImage="saveImage" ref="imageLoader"/> -->
  </div>
</template>

<script lang="ts">
import { Vue, Options, Prop, Watch, Ref } from "vue-property-decorator";
@Options({
  name: "ui-text-editor",
  emits: ["update:modelValue"],
})
export default class UiTextEditorComponent extends Vue {
  @Prop({ type: String, default: "extended" }) type: string;
  @Prop({ type: String, default: "" }) placeholder: string;
  @Prop({ type: String, default: "" }) modelValue: string;
  @Prop({ type: Boolean, default: true }) stripHtml: boolean;
  @Prop({ type: String, default: "100px" }) minHeight: string;
  @Prop({ type: Boolean, default: true }) isToolbar: boolean;
  // @Prop({ type: Boolean, default: true }) hasImage: boolean;
  // @Prop({ type: String }) savedImage: string;
  // pasteImageRange: Range = null;
  stretchDraft = false;
  innerValue = "";
  scrollStyle = {
    bottom: "0px",
  };

  moveCaretTo(element, index) {
    const range = document.createRange();
    const selection = window.getSelection();

    range.setStart(element, index);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    console.log("moveCaretTo");
  }
  created() {
    this.innerValue = this.modelValue;
    var self = this;
    document.addEventListener("selectionchange", function () {
      const sel = window.getSelection();
      if ((sel.focusNode as any).id == "workaround") {
        self.moveCaretTo(sel.focusNode.childNodes[sel.focusOffset - 1], 0);
      }
    });

    //this.fetchData();
    // console.log("Йа эдитор");
  }
  @Watch("modelValue")
  onValueChanged() {
    if ((this.$refs.editor as HTMLElement).innerHTML !== this.modelValue) {
      this.innerValue = this.modelValue;
    }
  }
  // @Watch("innerValue")
  // onInnerValueChanged() {
  //   let editor = this.$refs.editor as HTMLElement;
  //   // this.placeCaretAtEnd(document.getElementById("editor"));
  //   // if (editor) {
  //   //   this.placeCaretAtEnd(editor);
  //   // }
  // }
  fetch() {}
  onPressCtrEnter() {
    this.$emit("ctrlEnter", this.modelValue);
  }
  handlePaste(e: ClipboardEvent) {
    if (window.getSelection) {
      window.getSelection().getRangeAt(0).deleteContents();
    }
    if (this.stripHtml) {
      this.pasteText(e);
      this.update(e);
    }
  }
  pasteText(e: ClipboardEvent) {
    var clipboardData, pastedData;
    e.stopPropagation();
    e.preventDefault();
    clipboardData = e.clipboardData || (window as any).clipboardData;
    pastedData = clipboardData.getData("text");
    this.processPaste(pastedData);
  }
  processPaste(pastedData: string) {
    const textFragments = pastedData.split(/\r?\n/);
    const textFragment = document.createDocumentFragment();
    textFragments.forEach((text, index) => {
      const textNode = document.createTextNode(text);
      textFragment.appendChild(textNode);
      if (index < textFragments.length - 1) {
        textFragment.appendChild(document.createElement("br"));
      }
    });
    if (window.getSelection) {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      range.insertNode(textFragment);
      range.collapse(false);
    }
  }

  wysiwygFormat(command: string) {
    if (command == "h3" || command == "h2") {
      document.execCommand("formatBlock", false, command);
    }
    // if (command == "insertImage") {
    //   this.loadImage();
    //   return;
    // }
    if (command == "createlink") {
      let url = prompt("Enter the link here: ", "http://");
      document.execCommand(command, false, url);
    } else document.execCommand(command, false, null);
  }
  stretchWysiwyg() {
    this.stretchDraft = !this.stretchDraft;
  }
  manualUpdate(text: string) {
    this.$emit("input", text);
  }
  update(event: ClipboardEvent) {
    this.innerValue = document.getElementById("editor").innerHTML;
    this.$emit("update:modelValue", this.innerValue);
    setTimeout(() => {
      this.placeCaretAtEnd(document.getElementById("editor"));      
    });
    // this.manualUpdate(document.getElementById("editor").innerHTML);
  }
  setActive() {
    (this.$refs.editor as HTMLElement).focus();
  }
  placeCaretAtEnd(el) {
    var node = el,
      textNode = node.firstChild,
      caret = textNode.length,
      range = document.createRange(),
      sel = window.getSelection();

    node.focus();

    //console.log("range Before", range, textNode, caret);

    range.setStart(textNode, caret);
    // range.setEnd(textNode, caret);

    //console.log("range After", range);

    sel.removeAllRanges();
    sel.addRange(range);
  }
}
</script>
<style lang="less">
.ui-text-editor {
  display: flex;
  flex-direction: column;
  width: 100%;
  outline: none;
  .toolbar {
    display: flex;
    flex: 0 0 auto;
    justify-content: space-between;
    .right {
      button {
        position: relative;
        top: 3px;
      }
    }
  }
  .placeholder {
    position: absolute;
    left: 13px;
    top: 11px;
    color: #828282;
    right: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: text;
    span {
      position: absolute;
    }
  }
  .text {
    margin-top: 5px;
    flex-grow: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    .scroll {
      flex-grow: 1;
    }
  }
  .placeholder {
    left: 6px;
    top: 21px;
  }
  #editor {
    width: 100%;
    outline: none;
    font-size: 16px;
    font-family: FreeSetLightC;
    resize: none;
    padding: 10px 20px;
    display: inline-block;
    border: 1px solid #ced4de;
    color: #364358;
    // font-family: "ProximaNova", sans-serif;
  }
  button {
    border: 1px solid transparent;
    background-color: transparent;
    padding: 10px;
    width: 38px;
    display: inline-block;
    text-align: center;
    color: #99a4c0;
    outline: none;
    &:hover {
      color: #062634;
    }
    &:active {
      color: #062634;
    }
  }
  .H {
    font-size: 17px;
  }
  &.full-screen {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 20px 10px;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 100;
    #editor {
      resize: none;
      overflow: auto;
      flex-grow: 1;
      height: 90vh;
    }
  }
}
</style>
