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
