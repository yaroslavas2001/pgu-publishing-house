<template>
  <div class="page">
    <div class="page-header">
      <div class="page-header__name">
        <h1>{{ name }}</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref, provide } from "vue";
import { Options, Vue } from "vue-class-component";
import Grid from "@views/components/Grid.vue";
import Filter from "@views/components/Filter.vue";
import Pagination from "@views/components/Pagination.vue";

import * as faker from "faker";
import moment from "moment";
import UiPaginationComponent from "./ui-table/ui-pagination.vue";

interface IUser {
  login: string;
  name: string;
type: string;
boolean: boolean;
}
@Options<Page>({
  props: {
    searchPlaceholder: { default: "Поиск", type: String },
    noApi: { default: false, type: Boolean },
    noFilter: { default: false, type: Boolean },
    defaultSearchField: String,
    noPagination: { default: false, type: Boolean },
    name: {
      type: String,
      default: "Название страницы",
    },
    getDataFuncAsync: { type: Function, required: true },
  },
  watch: {
    filter(value) {
      this.innerItems = this.filter;
    },
  },
  emits: ["onAdd"],
  components: {
    Grid,
    Filter,
    Pagination,
  },
  name:"page"
})
export default class Page extends Vue {
  created() {
    this.initData();
  }
  allUsers: IUser[] = [];
  filteredUsers: IUser[] = [];
  currentPage = 1;
  pageSize = 10;
  initData() {
    for (var i = 0; i < 30; i++) {
      let dist = {
        login: faker.name.lastName(),
        name: faker.name.firstName(),
        type: faker.vehicle.type(),
        boolean: faker.random.boolean(),
      };
      this.allUsers.push(dist);
    }
    this.filteredUsers = this.allUsers.slice();
  }

  get usersToDisplay(): IUser[] {
    let from = (this.currentPage - 1) * this.pageSize;
    let to = from + this.pageSize;
    return this.filteredUsers.slice(from, to);
  }
  // {
  //   Coutn: 100110,
  //   Items: [1,2,3,32,4,124,]
  // }
  get totalCount(): number {
    return this.filteredUsers.length;
  }
  get totalPageCount(): number {
    return Math.ceil(this.filteredUsers.length / this.pageSize);
  }
  // получает номер страницы на которую нажали
  pageClick(page: Number) {
    this.currentPage = Number(page);
  }
  formatDate(date: Date) {
    return moment(date).format("DD.MM.YYYY");
  }
  // ловля события
  onFilterChanged(data: string) {
    const s = data.toLowerCase();
    this.filteredUsers = this.allUsers.filter(
      (x) =>
        x.name.toLowerCase().includes(s) ||
        x.login.toLowerCase().includes(s) ||
         x.type.toLowerCase().includes(s) ||
          x.boolean.toString().includes(s)
    );
    if (this.currentPage > this.totalPageCount) {
      this.currentPage = this.totalPageCount;
    }
  }























  // если закоментировать то будет ошибка
  readonly searchPlaceholder: string = "Поиск";
  readonly name: string = "Название страницы";
  readonly noApi: boolean = false;
  readonly noFilter: boolean = false;
  readonly noPagination: boolean = false;
  readonly defaultSearchField = "Name";

  isLoading = false;
  totalItems = 0;
  // currentPage = 1;
  innerItems: any[] = [];

  hasFilter = false;

  countPerPage = 10;
  pagination = true;
  search = "";

  onClick() {
    this.$emit("onAdd");
  }

  // async created() {
  //   if (this.noApi) {
  //     return;
  //   }
  //   await this.refresh();
  // }

  mounted() {
    this.hasFilter = this.$slots.filter != null;
  }

  addSearch(item: any) {}

  sort(sortName: string, sortType: string) {
    // if (sortName != "" && this.innerFilter.Sort == null) {
    //   this.innerFilter.Sort = { FieldName: "", Desc: false };
    // }
    // this.innerFilter.Sort.FieldName = sortName;
    // this.innerFilter.Sort.Desc = sortType == "1";
    // (this.$refs.pagination as UiPaginationComponent).currentPage = 1;

    this.refresh();
  }

  async refresh() {}

  // get pageSize(): number {
  //   return 10;
  //   // const x = this.innerFilter.Pagination.Take;
  //   // return x;
  // }

  resetPagination() {
    // this.innerFilter.Pagination.Skip = 0;
    this.currentPage = 1;
    this.totalItems = 0;
  }
  onSort(sortName: string, sortType: string) {
    // //console.log("sortType", sortType);
    this.resetPagination();
    this.refresh();
  }

  onPaginationChanged(currentPage: number) {
    this.currentPage = currentPage;
    // this.innerFilter.Pagination.Skip =
    //   (currentPage - 1) * this.innerFilter.Pagination.Take;
    this.refresh();
  }

  // onSearch() {
  //   // this.innerFilter.Pagination.Skip = 0;
  //   this.currentPage = 1;
  //   this.refresh();
  // }
}
</script>
<style lang="less" scoped>
@BaseColor: #d25338;
.page {
  background: white;
  height: 100%;
 padding: 0 26px;
  label {
    font-size: 13px;
  }
  h1 {
    font-size: 18px;
    line-height: 22px;
    color: #262838;
    font-weight: 400;
  }

  .page-header {
    font-size: 17px;
    line-height: 20, 71px;
    color: #162147;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 21px;
    border-bottom: 2px solid #f0f0f0;
    padding: 14px 0px;

    // .page-header__bnts {
    //   margin-left: auto;
    //   .ui-button {
    //     height: 36px;
    //     font-size: 1rem;
    //   }
    // }
  }
  .page__btn {
    background-color: @BaseColor;
    width: 108px;
    height: 36px;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    border: 0px;
  }
  .page-content {
    margin: 19px 28px 55px 26px;
  }
  .page-content__panel {
    // margin-bottom: 10px;
    // background: #f8f8f8;
    // padding: 8px 16px;
  }
  .ui-input {
    display: flex;
    margin-bottom: 22px;
    max-width: 535px;
    input {
      // background: #fcfcfc;
      border: 1px solid #ced4de;
      box-sizing: border-box;
      padding: 5px 10px 5px 10px;
      font-size: 14px;
      width: 100%;

      &::placeholder {
        // color: #787878;
      }
      &:focus {
        outline: none;
        border: solid 1px @BaseColor;
      }
    }
    .ui-input__btn {
      background: @BaseColor;
      min-width: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      cursor: pointer;
    }
  }
  .ui-textarea {
    background: #fff;
    border: 1px solid #d2d2d2;
    font-size: 14px;
    padding: 10px;
    resize: none;

    &:focus {
      border: 1px solid @BaseColor;
    }
  }
  .ui-dropdown {
    ui-input input:focus &:focus {
      .ui-select {
        border: 1px solid @BaseColor;
      }
      .ui-box-menu {
        border: 1px solid @BaseColor;
      }
    }

    .ui-box-menu {
      background: #fff;
      border: 1px solid #d2d2d2;
      top: 1px;
    }
    .ui-list-view-item.selected {
      background: #e2e2e2;
    }
    .ui-list-view-item:hover {
      background: #e2e2e2;
      color: #000;
      font-weight: 600;
    }
  }
  .pointer {
    cursor: pointer;
  }
  @-webkit-keyframes fadeInOut {
    0% {
      opacity: 0;
      top: -0.5em;
    }
    25% {
      opacity: 1;
      top: 0;
    }
    75% {
      opacity: 0;
      top: 0.5em;
    }
    100% {
      opacity: 0;
      top: 0.5em;
    }
  }
  @keyframes fadeInOut {
    0% {
      opacity: 0;
      top: -0.5em;
    }
    25% {
      opacity: 1;
      top: 0;
    }
    75% {
      opacity: 0;
      top: 0.5em;
    }
    100% {
      opacity: 0;
      top: 0.5em;
    }
  }
  .add {
    .add__btn::before {
      color: @BaseColor;
      cursor: pointer;
    }
    .add__text {
      text-decoration: underline;
      cursor: pointer;
      color: #000;
    }
  }
  input.ui-checkbox {
    transform: scale(1.3);
    &:checked {
    }
  }
  .ui-date-picker {
    input {
      border: 1px solid #d2d2d2;
    }
    input,
    input:focus {
      background: #fff;
      color: #414351;
    }
    input:focus {
      border: 1px solid @BaseColor;
    }
    .icon {
      color: #414351;
    }
    .date-time {
      background: #fff;
      color: #414351;
      border: 1px solid @BaseColor;
      transition: all 1s;
      .navigation {
        color: #414351;
        .title_date-picker {
          transition: all 1s;
        }
        .title_date-picker:hover {
          background: @BaseColor;
          color: #fff;
        }
        .backward,
        .next {
          transition: all 1s;
        }
        .backward:hover,
        .next:hover {
          background: @BaseColor;
          color: #fff;
        }
      }
      .minute,
      .hour {
        > div {
          transition: all 1s;
        }
      }
      .minute:hover,
      .hour:hover {
        > div {
          background: @BaseColor;
          color: #fff;
        }
      }
    }
  }
  .icon-apteka-pencil,
  .icon-apteka-delete {
    color: #9e9e9e;
    transition: all 0.5s;
    &:hover {
      color: unset;

      text-shadow: 1px 1px 2px black, 0 0 1em @BaseColor;
    }
  }
  .ui-input {
    .invalid {
      border-color: #dc3545;
    }
  }
  .icon {
    margin-right: 0;
  }
  label {
    line-height: 1.5rem;
  }
}
</style>
