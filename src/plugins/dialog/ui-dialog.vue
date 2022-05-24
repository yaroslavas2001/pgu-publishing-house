<template>
  <ui-modal-window
    :visible="visible"
    :width="'600px'"
    :title="'Удаление'"
    @close="onClose"
  >
    <template #header>
      <div class="dialog__title">
        {{ dialogModal.Title }}
      </div>
    </template>
    <div class="dialog__text">
      {{ dialogModal.Text }}
    </div>
    <template #button>
      <div v-if="dialogModal.Buttons" class="dialod__btn">
        <ui-button
          v-for="(item, index) in dialogModal.Buttons"
          :key="index"
          :width="120"
          :style="getButtonStyle(item)"
          @onClick="clickButton(item.Value)"
        >
          {{ item.Title }}
        </ui-button>
      </div>
    </template>
  </ui-modal-window>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
// import StatusWindow from "modal-window/src/status-window";
import DialogModal, { DialogButton } from "./model/dialogModal";
import UiModalWindow from "@/views/components/ui-modal-window/ui-modal-window.vue";
import { Events } from "./events";
import UiButton from "@views/components/ui-button.vue";
@Options({
  props: {
    eventBus: Events,
  },
  components: {
    UiModalWindow,
    UiButton,
  },
  emits: ["change"],
})
export default class UiDialog extends Vue {
  type: string = "";
  visible = false;
  eventBus = new Events<DialogModal>();
  dialogModal: DialogModal = new DialogModal();
  created() {
    this.eventBus.on(this.show);
  }
  getButtonStyle(item: DialogButton): Object {
    return {
      background: item.BgColor,
      color: item.Color,
    };
  }
  // toModalType(): StatusWindow {
  //   // switch(this.dialogModal.Type) {
  //   //     // case
  //   // }
  //   return StatusWindow.Text;
  // }
  onClose() {
    this.clickButton(undefined);
  }
  clickButton(result: any) {
    this.hide();
    this.$emit("change", result);
    this.dialogModal?.Callback(result);
  }
  hide() {
    this.visible = false;
  }
  show(data: DialogModal) {
    this.dialogModal = data;
    this.visible = true;
  }

  mounted() {
    // //console.log("mounted");
  }
}
</script>
<style lang="less">
.dialog {
}
.dialog__title {
  font-weight: 600;
  font-size: 17px;
  line-height: 21px;
  color: #4f5e74;
  padding: 13px 0px;
  margin-left: 26px;
}
.dialog__text {
  font-size: 14px;
  line-height: 17px;
  color: #4f5e74;
  border-top: 2px solid #f0f0f0;
  border-bottom: 2px solid #f0f0f0;
  padding-top: 16px;
  padding-bottom: 35px;
}
.dialod__btn {
  display: flex;
  justify-content: flex-end;
  padding-top: 24px;
  padding-bottom: 19px;
}
</style>
