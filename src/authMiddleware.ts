import { App } from "vue";
import { Router } from "vue-router";
import Vuex, { Store } from 'vuex'

import Cookies from "js-cookie";
import AuthService from "./api/plugins/services/authService";
import { LOGIN, ADMIN, USER, INDEX, CALCULATION, REGISTRATION, ACTIVATEACCOUNTINFO, ACTIVATEACCOUNT } from "./router/routerNames";

import UserRole from "./Enum/UserRole"

const install = (app: App, opts: { router: Router }) => {
  opts.router.beforeEach(async (to, from, next) => {

    const cookie = Cookies.get(AuthService.AdminAuthTokenName);
    const role = Cookies.get(AuthService.Role);

    let isAuthorized = !!cookie && cookie != ''
    if (to.name == INDEX || to.name == CALCULATION || to.name == LOGIN 
      || to.name == REGISTRATION || to.name == ACTIVATEACCOUNTINFO 
      || to.name == ACTIVATEACCOUNT) {
      next()
      return
    }
    if (isAuthorized && from.name != LOGIN) {
      if (role == UserRole.Admin && to.fullPath.includes("user")) {
        next({ name: ADMIN });
        return;
      }
      else if (role == UserRole.User && to.fullPath.includes("admin")) {
        next({ name: USER });
        return;
      }
    }
    if (to.name == LOGIN && isAuthorized) {
      if (role == UserRole.Admin) {
        next({ name: ADMIN });
        return;
      }
      else if (role == UserRole.User) {
        next({ name: USER });
        return;
      }
    }
    if (!to.meta.allowAnonymous && !isAuthorized) {
      next({ name: INDEX })
      return
    }
    next()
  });
}
export default {
  install,
};
