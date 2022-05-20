import { App } from "vue";
import { Router } from "vue-router";
import Vuex, { Store } from 'vuex'

import Cookies from "js-cookie";
import AuthService from "./api/plugins/services/authService";
import { LOGIN, ADMIN, USER } from "./router/routerNames";
import ApiDataSource from "./api/ApiDataSource";
import { StateModel } from "./store";
import UserRole from "./Enum/UserRole"

const install = (app: App, opts: { router: Router }) => {
  opts.router.beforeEach(async (to, from, next) => {
    const api = app.config.globalProperties.$api as ApiDataSource
    const store = app.config.globalProperties.$store as Store<StateModel>

    const cookie = Cookies.get(AuthService.AdminAuthTokenName);

    let isAuthorized = !!cookie && cookie != ''
    // todo main-page исключение
    // if (to.name == LOGIN && isAuthorized) {
    //   if (store.state.UserRole == UserRole.Admin)
    //     next({ name: ADMIN });
    //   else if (store.state.UserRole == UserRole.User)
    //     next({ name: USER });
    //   else  next({ name: ADMIN });
    //   return;
    // }
    // if (!to.meta.allowAnonymous && !isAuthorized) {
    //   // next()
    //   next({ name: LOGIN })
    //   return
    // }
    next()


  });
}


export default {
  install,
};
