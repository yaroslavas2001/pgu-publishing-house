<template>
  <!-- <div> -->
    <transition name="fade">
      <div>
        <div :class="{ 'ui-loading': loading }" v-if="loading">
          <slot name="loading" v-if="loading">
            <div class="loading"></div>
            {{ loadingMessage }}
          </slot>
        </div>
        <slot name="error" v-if="error">{{ errorMessage }}</slot>
        <slot name="ok" v-if="ok">{{ okMessage }}</slot>
        <slot v-if="!loading"> </slot>
      </div>
    </transition>
  <!-- </div> -->
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options<UiLoading>({
  props: {
    loading: Boolean,
    error: Boolean,
    ok: Boolean,
    errorMessage: String,
    okMessage: String,
    loadingMessage: String,
  },
  name:"UiLoading"
})
export default class UiLoading extends Vue {
  loading: { default: false };
  error: { default: false };
  ok: { default: false };
  errorMessage: { default: "Ошибка" };
  okMessage: { default: "Операция прошла успешно" };
  loadingMessage: { default: "Идет загрузка" };
  // @Prop({ default: false }) loading!: boolean;
  // @Prop({ default: false }) error!: boolean;
  // @Prop({ default: false }) ok!: boolean;
  // @Prop({ default: "Ошибка" }) errorMessage: string;
  // @Prop({ default: "Операция прошла успешно" }) okMessage: string;
  // @Prop({ default: "Идет загрузка" }) loadingMessage: string;

  mounted() {
    (this.$el as any).parentElement.style.position = "relative";
  }
}
</script>

<style lang="less">
// body{
//     overflow: hidden;
// }
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.ui-loading {
  position: absolute;
  // left: 0px;
  // top: 0px;
  // bottom: 0px;
  // right: 0px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 99;
  opacity: 0.7;
  // pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading {
  /* size */
  width: 100px;
  height: 100px;
  background-size: cover;
  // background: url("~@assets/img/giphy.gif") no-repeat center center;
    // background: url("~@assets/img/runpay-loading.svg") no-repeat center center;
}
</style>
