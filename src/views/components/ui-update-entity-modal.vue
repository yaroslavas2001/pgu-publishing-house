<template>
  <ui-modal-window
    :closeHandler="closeHandler"
    ref="add-modal"
    :title="title"
    @onOk="onOk"
    @onCancel="onCancel"
    titleBtnYes="Сохранить"
    titleBtnNo="Отмена"
  >
    <ui-loading :loading="isLoading" />
    <slot />
    
    <template #togle v-if="togle">
      <div class="toggle-1">
        <div v-if="modelValue.isActive" class=" ">Активный</div>
        <div v-else class="">Не активный</div>
        <ui-toggle-switcher v-model="modelValue.isActive" />
      </div>
    </template>
  </ui-modal-window>
</template>
<script lang="ts">
import { Options, Vue, Ref, Prop, Watch } from "vue-property-decorator";
import md5 from "md5";
import UiModalWindow from "../components/ui-modal-window/ui-modal-window.vue";
@Options({
  name: "ui-update-entity-modal",
  emits: ["save","notSave"],
})
export default class UiUpdateEntityModal extends Vue {
  @Ref("add-modal") addModalWindow: UiModalWindow;
  @Prop({ type: Object }) modelValue: { id: string };
   @Prop({ type: Boolean, default: true }) togle: boolean;
  get title(): string {
    return this.modelValue?.id ? "Редактирование" : "Добавление";
  }
  isLoading = false;
  @Prop({ type: Object, required: true }) saveFunction: (
    obj: Object
  ) => Promise<any>;
  @Prop({ type: Object, required: true }) notSaveFunction: (
    obj: Object
  ) => Promise<any>;
  @Prop({ type: Object, required: false }) mapFunction: (obj: Object) => Object;
  getHash(): string {
    return md5(JSON.stringify(this.modelValue || {}));
  }
  onAddClicked() {
    this.addModalWindow.show();
  }
  initAddEntityHash: string;
  @Watch("modelValue", { deep: false })
  onEntityChanged() {
    if (this.modelValue != null) {
      this.initAddEntityHash = this.getHash();
      this.show();
    }
  }
  show() {
    this.addModalWindow.show();
  }
  hide() {
    this.addModalWindow.hide();
  }
  isSave: boolean;
  async closeHandler(data: boolean): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      const hash = this.getHash();
      // console.log("close handler");
      if (this.initAddEntityHash != hash && this.isSave == false) {
        var res = await (this as any).$dialog.confirm(
          "Есть несохраненные изменения. Хотите продолжить?"
        );
        resolve(res);
        return;
      }
      resolve(true);
    });
  }
  onCancel(data: boolean) {
    this.isSave = data;
    if(this.modelValue?.id){
    this.$emit("notSave");}
  }
  async onOk(data: boolean) {
    this.isSave = data;
    this.isLoading = true;
    try {
      const req =
        this.mapFunction == null
          ? this.modelValue
          : this.mapFunction(this.modelValue);
      const res = await this.saveFunction(req);
      if(this.modelValue?.id){
        this.$emit("save");
      }
     
      this.addModalWindow.hide();
    } catch (e) {
      throw e;
    } finally {
      this.isLoading = false;
    }
    // this.$emit("ok", res);
  }
}
</script>
<style scoped>
.toggle-1 {
  display: flex;
  width: 140px;
  justify-content: space-between;
  align-items: center;
}

</style>