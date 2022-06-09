<template>
  <div class="layout">
    <layout-header></layout-header>
    <div class="container-custom">
      <layout-sidebar></layout-sidebar>
      <div class="content">
        <slot>
          <router-view />
        </slot>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Options, Vue } from "vue-class-component";
import LayoutHeader from "./layout-header.vue";
import LayoutSidebar from "./layout-sidebar.vue";
@Options({
  components: {
    LayoutHeader,
    LayoutSidebar,
  },
  name: "Layout",
})
export default class AdminLayout extends Vue {}
</script>
<style lang="less">
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  .container-custom {
    flex-grow: 1;
    background: #ffffff;
    display: flex;
    overflow-x: auto;
    .content {
      flex-grow: 1;
      margin: 15px;
                background: #eff0e8;

    }
  }
}
</style>
