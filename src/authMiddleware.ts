import { App } from "vue";
import { Router } from "vue-router";
import Vuex, { Store } from 'vuex'

import Cookies from "js-cookie";
import AuthService from "./api/dataSource/api/plugins/services/authService";
import { LOGIN, PAYMENTS ,NEWS} from "./router/routerNames";
import ApiDataSource from "./api/dataSource/api/ApiDataSource";
import { StateModel } from "./store";


const install = (app: App, opts: { router: Router }) => {
  opts.router.beforeEach(async (to, from, next) => {
    // const api = app.config.globalProperties.$api as ApiDataSource
    // const store = app.config.globalProperties.$store as Store<StateModel>

    const cookie = Cookies.get(AuthService.AdminAuthTokenName);
      
    let isAuthorized = !!cookie && cookie != ''

    if (to.name == LOGIN && isAuthorized) {
      next({ name: NEWS });
      return;
    }
    if (!to.meta.allowAnonymous && !isAuthorized) {
      next({ name: LOGIN })
      return
    }
    next()


  });
}


export default {
  install,
};
