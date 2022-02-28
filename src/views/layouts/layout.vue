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
import { reactive } from "vue";
import LayoutHeader from "@layouts/layout-header.vue";
import LayoutSidebar from "@layouts/layout-sidebar.vue";
@Options({
  components: {
    LayoutHeader,
    LayoutSidebar,
  },
  setup() {},
  provide() {
    return {
      MyDependency: this.MyDependency,
      user: this.user,
      settings: this.settings,
    };
  },
  name:"Layout"
})
export default class Layout extends Vue {
  
  MyDependency = {
    foo: "bar",
  };
  settings = reactive({ theme: "light" });
  user = "John Doe";

  logined = false;
  async created() {
  }
}
</script>
<style lang="less">
body {
  margin: 0;
  font-style: normal;
  font-weight: normal;
}
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  .container-custom {
    flex-grow: 1;
    background: #e7e7f2;
    display: flex;
    overflow-x: auto;
    .content {
      // margin: 150px 20px 20px 345px;
      flex-grow: 1;
    }
  }
}
</style>
