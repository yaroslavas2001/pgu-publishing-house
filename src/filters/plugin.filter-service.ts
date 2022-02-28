import { App } from "vue";

import FilterService from "@/filters/filter-service";
declare module '@vue/runtime-core' {
    export class ComponentCustomProperties {
      $filterService: FilterService
    }
  }
const install = (app: App) => {
   const filter = new FilterService()
    app.config.globalProperties.$filterService = filter;
  };
  
  const filterService = {
    install,
  };
  
  export default filterService;
  