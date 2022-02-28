<template>
  Home
</template>
<script lang="ts">
//import PointListItem from "@/api/dataSource/api/plugins/models/controllersModels/point/PointListItem";
import {  Vue } from "vue-property-decorator";
export default class HomePageComponent extends Vue {
  
  async mounted() {
     console.log("api", this.$api);
    //  let a:PointListItem = {
    //    PosType:{
    //      Id:23
    //    }
    //  }
    //  a.PosType.Id
    // let resAuth = await this.$api.AuthService.login({
    //     username:'mdTest',
    //     password:'Zaq12345'
    // });
    // console.log('auth', resAuth);
    // let res = await this.$api.ReportService.getList();
    // console.log('reports', res);
    
  }
  

  
}
</script>
