<template>
  <div class="msb" id="msb" :class="{ minimized: minimized }">
    <nav class="navbar navbar-default" role="navigation">
      <!-- Main Menu -->
      <div class="side-menu-container">
        <a href="#" id="menuCollapse" @click="toggleMinimize">
          <span v-if="!minimized" class="roll__up">Свернуть меню</span>
          <div class="expand__img" v-else></div>
        </a>
        <ul class="nav navbar-nav">
          <li>
            <router-link class="lev1" :to="{ name: AUTHORS }">
              <i class="icon search"></i>
              Авторы
            </router-link>
          </li>
          <li>
            <router-link class="lev1" :to="{ name: ARTICLES }">
              <i class="icon search"></i>
              Статьи
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { AUTHORS, ARTICLES } from "@/router/routerNames";

@Options({
  components: {},
  name: "LayoutSidebar",
})
export default class LayoutSidebar extends Vue {
  minimized: boolean = false;
  AUTHORS = AUTHORS;
  ARTICLES = ARTICLES;
  toggleMinimize() {
    this.minimized = !this.minimized;
  }
}
</script>
<style lang="less">
</style>
