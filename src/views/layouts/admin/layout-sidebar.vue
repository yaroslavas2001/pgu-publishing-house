<template>
  <div class="layout-sidebar">
    <div class="layout-sidebar-menu">
      <router-link
        class="layout-sidebar-item"
        v-for="(item, index) in AdminSidebarItems"
        :key="index"
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

    .layout-sidebar-item {
      color: @ColorText;
      text-decoration: none;
      font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
        "Lucida Sans", Arial, sans-serif;
      outline: none;
      padding: 10px;
      &:hover {
        color: @ColorTextHover;
        transition: 0.3s;
      }
    }
  }
}
.router-link-active {
  color: @RouterLinkActive !important;
}
</style>
