<template>
  <div class="ui-pagination">
    <div class="pagination" :class="{ disabled: disablePrev }" @click="goPrev">
      <slot name="prev" :disabled="disablePrev"> &#10094; </slot>
      Предыдущая
    </div>
    <div
      v-for="(page, idx) in pages"
      :key="idx"
      class="pagination-item pointer"
      :class="{
        disabled: page.value == null || pages.length==1 ,
        active: page.value == currentPage &&  pages.length>1,
      }"
      @click="goToPage(page.value)"
      :disabled="page.value == null"
    >
      <slot :page="page">
        {{ page.text }}
      </slot>
    </div>
    <div class="pagination" :class="{ disabled: disableNext }" @click="goNext">
      Следующая
      <slot name="next" :disabled="disableNext"> &#10095; </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
// import { watch, ref } from 'vue';

const emitChangePage = "onChange";

class Page {
  // value?: number;
  get text(): string {
    return !!this.value ? this.value.toString() : "...";
  }
  constructor(public value?: number) {
    // this.value = value;
  }
}
@Options<UiPaginationComponent>({
  props: {
    size: { type: Number, default: 10 },
    count: { type: Number, required: true, default: 0 },
  },
  emits: [emitChangePage],
  watch: {
    count(value) {
      this.refreshPages();
    },
    size(value) {
      this.refreshPages();
    },
  },
  name:"UiPaginationComponent"
})
export default class UiPaginationComponent extends Vue {
  // readonly current = 1;
  readonly size = 10;
  readonly count = 0;
  get pagesCount(): number {
    return Math.ceil(this.count / this.size);
  }
  get disablePrev(): boolean {
    return this.currentPage <= 1;
  }
  get disableNext(): boolean {
    return this.currentPage >= this.pagesCount;
  }

  // не с нуля, а с одного!!!
  currentPage = 1;
  pages: Page[] = [];
  // только нечетные!!!
  showPages = 7;
  created() {
    this.refreshPages();
  }
  goPrev() {
    this.goToPage(this.currentPage - 1);
  }
  goNext() {
    this.goToPage(this.currentPage + 1);
  }
  goToPage(page: number) {
    
    if (page < 1 || page > this.pagesCount) {
      return;
    }
    this.currentPage = page;
    this.$emit(emitChangePage, page);
    this.refreshPages();
  }
  private refreshPages() {
        console.log("paginatiom",this.count,this.size);

    this.pages = [];
    const pagesCount = this.pagesCount;
    // console.log(pagesCount);
    
    if (pagesCount <= this.showPages) {      
      this.pages = new Array(this.pagesCount)
        .fill(0)
        .map((v: number, i: number) => new Page(i + 1));
        // console.log("pages",this.pages);
      return;
    }
    let pagesToDraw = this.showPages - 2;
    this.pages.push(new Page(1));
    let startPage = this.currentPage - Math.floor(pagesToDraw / 3);

    if (startPage + Math.round(pagesToDraw / 3) >= this.pagesCount) {
      startPage = this.pagesCount - Math.round(pagesToDraw / 2);
    }
    if (startPage <= 1) {
      startPage = 2;
    }
    while (startPage < this.pagesCount && pagesToDraw > 2) {
      this.pages.push(new Page(startPage++));
      pagesToDraw--;
    }
    this.pages.push(new Page(pagesCount));
  }
  reset() {
    this.currentPage = 1;
    this.refreshPages();
  }
 
}
</script>

<style lang="less">
@uiPaginationBgColor: #71b92f;
@uiPaginationBorderRadius: 5px;
@uiPaginationColor: #fff;
@uiPaginationLinkBgColor: #21324f;
@uiPaginationSelectedColor: #fff;
@uiPaginationDisabledColor: #fff;
@uiPaginationSelectedBGColor: #71b92f;

.ui-pagination {
  display: flex;
  margin-top: 10px;
  .pagination-item {
    margin: 0px 5px;
    padding: 5px 10px;
      border-radius: 5px;

    &.active{
      background-color: @uiPaginationSelectedBGColor;
      color: #fff;
    }
    &:hover:not(.disabled) {
      background-color:#F3F4FA;
    }
  }
  .pagination {
    margin: 0px 10px;
    padding: 5px 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: @uiPaginationBgColor;
    font-size: 0ю5rem;
    color: @uiPaginationColor;
    min-height: 25px;
    min-width: 34px;
    cursor: pointer;
    -moz-user-select: none;
    -o-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    &.active,
    &:hover:not(.disabled) {
      background-color: @uiPaginationSelectedBGColor;
      color: @uiPaginationSelectedColor;
    }
  }
  div:last-child {
    margin: 0;
  }
  div.disabled,
  span {
    cursor: default;
    background-color: rgba(113, 185, 47, 0.5);
    color: @uiPaginationDisabledColor;
  }
}
</style>
