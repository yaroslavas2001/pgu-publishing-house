<template>
    <router-view/>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({ 
    name:"BaseLayout"
 })
export default class BaseLayout extends Vue {
  
}
</script>
<style lang="less">
body {
  margin: 0;
  font-style: normal;
  font-weight: normal;
 font-family: 'Open Sans', sans-serif !important;
}
</style>

