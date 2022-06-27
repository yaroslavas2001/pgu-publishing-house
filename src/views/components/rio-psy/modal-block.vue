<template>
  <div class="modal-block">
    <div class="modal-block-content">
      <div class="modal-block-header" v-if="title">
        <div class="content-title">{{ title }}</div>
        <img
          src="../../../assets/img/login-arrow-symbol-entering-back-into-a-square_icon-icons.com_73221.svg"
          alt="arrow-back"
          @click="$emit('clickBack')"
          class="pointer"
          v-if="isBask"
        />
      </div>
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";

@Options({ name: "modal-block" })
// Компонент для входа, как модальное окно толоко без фона сзади
export default class ModalBlock extends Vue {
  @Prop({ type: String, default: "" }) title: string;
    @Prop({ type: Boolean, default: true }) isBask: boolean;

}
</script>
<style lang="less" scoped>
@fon: #e3d4c1;
@block-fon: white;
@title: #cd8458;
.modal-block {
  background: @fon;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  .modal-block-content {
    height: auto;
    width: auto;
    background: @block-fon;
    border-radius: 16px;
    box-shadow: 0px 0px 40px rgba(177, 180, 160, 0.2);
    display: flex;
    flex-direction: column;
    padding: 20px 30px;
    min-width: 300px;
    .modal-block-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      padding-bottom: 15px;

      .content-title {
        font-size: 24px;
        color: @title;
        font-weight: bold;
        line-height: 120%;
        font-family: "Open Sans", sans-serif;
      }
    }
  }
}

</style>
