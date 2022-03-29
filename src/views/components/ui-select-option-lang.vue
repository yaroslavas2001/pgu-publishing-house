<template>
  <div class="ui-select-lang" @click="showLang">
    <!-- <img
      src="@assets/img/ru.svg"
      alt=""
      class="img"
      v-if="selectLang.id == 0"
    />
    <img
      src="@assets/img/md.svg"
      alt=""
      class="img"
      v-if="selectLang.id == 1"
    />
    <img
      src="@assets/img/lv.svg"
      alt=""
      class="img"
      v-if="selectLang.id == 2"
    /> -->
    <div class="ui-select-lang-name">{{ selectLang.name }}</div>
    <!-- <img src="@assets/img/icon/s_down.svg" alt="" /> -->
  </div>
  <div
    v-if="selectionLang"
    class="ui-select-lang-item"
    v-click-outside="onBlur"
  >
    <div
      v-for="item in lang"
      :key="item.id"
      class="ui-select-lang-item-block"
      @click="seletLang(item.id)"
    >
      <!-- <img src="@assets/img/ru.svg" alt="" class="img" v-if="item.id == 0" />
      <img src="@assets/img/md.svg" alt="" class="img" v-if="item.id == 1" />
      <img src="@assets/img/lv.svg" alt="" class="img" v-if="item.id == 2" /> -->
      <div class="ui-select-lang-item-text">{{ item.name }}</div>
    </div>
  </div>
</template>
<script lang="ts">
// import Lang from "@/models/interfaces/Lang";
import { Prop, Vue, Options } from "vue-property-decorator";
@Options({
  components: {},
  name: "ui-select-lang",
  emits: ["changeLang"],
})
export default class UiSelectLang extends Vue {
  created() {
    this.selectLang = this.lang[0];
  }
  showLang() {
    this.selectionLang = true;
  }
  seletLang(id: number) {
    this.selectLang = this.lang.find((el) => el.id == id);
    this.$emit("changeLang", this.selectLang.name);
    this.onBlur();
  }
  onBlur() {
    this.selectionLang = false;
  }
  selectionLang: boolean = false;
  selectLang: any = null;
  lang: Array<any> = [
    { id: 0, name: "ru" },
    { id: 1, name: "md" },
    { id: 2, name: "lv" },
  ];
}
</script>
<style lang="less">
.ui-select-lang {
  width: 115px !important;
  min-width: 70px !important;
  background: #ffffff;
  border-radius: 8px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  padding: 0px 15px;
  cursor: pointer;
  .ui-select-lang-name {
    font-size: 14px;
    line-height: 17px;
    color: #4f5e74;
  }
}
.ui-select-lang-item {
  background-color: #fff;
  border-radius: 4px;
  padding: 4px;
  cursor: pointer;
  .ui-select-lang-item-block {
    display: flex;
    align-items: center;
    padding: 5px 2px;
    .ui-select-lang-item-text {
      font-size: 14px;
      line-height: 17px;
      color: #4f5e74;
      margin-left: 10px;
    }
  }
}
.img {
  height: 20px;
  width: 28px;
}
</style>