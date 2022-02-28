import { App } from "vue";
import Api from "./ApiDataSource";


declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $api: Api;// ApiDataSource;
  }
}



const install = (app: App, opts: {url: string}) => {
  if (!(opts || {}).url) {
    console.error('Для работы api плагина необходимо задать параметр url!');
    return;
  }
  const apiDataSource = new Api(opts.url);
  app.config.globalProperties.$api = apiDataSource;
  
};

const dialog = {
  install,
};

export default dialog;