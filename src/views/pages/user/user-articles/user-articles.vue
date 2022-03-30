<template>
  <div class="fon">
    <div class="test"></div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import {  } from "@/router/routerNames";
@Options({
  // emits: ["goToAdmin"],
})
export default class UserArticles extends Vue {}
</script>
<style scoped  lang="less">
.fon{
  height: auto;
  width: 100%;
  background-color: rgb(255, 255, 255);
  .test{
    background-color: rgba(173, 28, 28, 0.329);
    height: 300px;
    width: 90px;
  }
}
</style>