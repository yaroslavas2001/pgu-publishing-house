import ApiDataSource from "@/api/dataSource/api/ApiDataSource";
import { App } from "vue";
import { Store } from "vuex";

import Vuex from 'vuex'
import InitService from "./init-service";
declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
      $initService: Store<InitService>
    }
  }
const install = (app: App) => {
  let api = app.config.globalProperties.$api as ApiDataSource
    const initService = new InitService(api);
    const store = new Vuex.Store({
      state : initService   
    })
    app.config.globalProperties.$initService = store;
  };
  
  const initService = {
    install,
  };
  
  export default initService;
  