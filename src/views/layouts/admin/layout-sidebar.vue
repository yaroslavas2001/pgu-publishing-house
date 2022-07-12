<template>
  <div class="layout-sidebar">
    <div class="layout-sidebar-menu">
      <router-link
        class="layout-sidebar-item"
        :class="{ active: getActive(item.routeName) }"
        v-for="(item, index) in AdminSidebarItems"
        :key="index"
        :exact-active-class="'active'"
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
import { AdminSidebarItems } from "./AdminSidebarItems";
import SidebarItem from "@/models/sidebar/sidebarItem";
@Options({
  components: {},
  name: "LayoutSidebar",
})
export default class LayoutSidebar extends Vue {
  AdminSidebarItems: Array<SidebarItem> = AdminSidebarItems;
  getActive(routeName: string): boolean {
    return this.$route.fullPath.includes(routeName);
  }
}
</script>
<style lang="less">
@import "../../../assets/less/main.less";

.layout-sidebar {
  min-height: 100%;
  width: 200px;
  min-width: 200px;
  background-color: @BcLayoutSidebar;
  .layout-sidebar-menu {
    height: auto;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    .layout-sidebar-item {
      color: @CLayoutSidebarText;
      text-decoration: none;
      outline: none;
      padding: 10px;
      height: 40px;
      box-sizing: border-box;
      display: flex;
      text-align: center;
      &:hover {
        color: @CLayoutSidebarTextHover;
        transition: 0.3s;
      }
    }
  }
}
.active {
  color: @CRouterLinkActive !important;
  background-color: @BcRouterLinkActive;
}
</style>
