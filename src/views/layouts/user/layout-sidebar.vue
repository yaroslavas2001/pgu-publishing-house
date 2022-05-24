<template>
  <div class="layout-sidebar">
    <div class="layout-sidebar-menu">
      <router-link
        class="layout-sidebar-item"
        v-for="(item, index) in UserSidebarItems"
        :key="index"
        exact-active-class="active"
        :to="{ name: item.routeName }"
      >
        <i :class="item.icon" />
        {{ item.name }}
      </router-link>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { UserSidebarItems } from "./UserSidebarItems";
import SidebarItem from "@/models/sidebar/sidebarItem";
@Options({
  components: {},
  name: "LayoutSidebar",
})
export default class LayoutSidebar extends Vue {
  UserSidebarItems: Array<SidebarItem> = UserSidebarItems;
}
</script>
<style lang="less">
@LayoutSidebar: #043043;
@ColorText: #fff;
@ColorTextHover: #c99d4b;
@RouterLinkActive: #ba8931;

.layout-sidebar {
  min-height: 100%;
  width: 200px;
  background-color: @LayoutSidebar;
  .layout-sidebar-menu {
    height: auto;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    .layout-sidebar-item {
      color: @ColorText;
      text-decoration: none;
      outline: none;
      padding: 10px;
      height: 40px;
      box-sizing: border-box;
      display: flex;
      text-align: center;
      &:hover {
        color: @ColorTextHover;
        transition: 0.3s;
      }
    }
  }
}
.router-link-active {
  color: @RouterLinkActive !important;
  background-color: #062634
}
.exact-active-class {
  color: @RouterLinkActive !important;
  background-color: #062634
}
.active{
  color: @RouterLinkActive !important;
  background-color: #062634
}
.router-link-exact-active{
   color: @RouterLinkActive !important;
  background-color: #062634
}
</style>
