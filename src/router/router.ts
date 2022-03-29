//#region import
import { createRouter, createWebHistory, RouteRecordRaw, RouterView } from "vue-router";

import LoginPageComponent from "@/views/pages/login/login.vue"
import ForgotPasswordPageComponent from "@/views/pages/login/forgot-password.vue"
import ErrorPageComponent from "@/views/pages/login/404-page.vue"
const BaseTemplate = () => import("@/views/layouts/base-layout.vue");
const AdminLayout = () => import("@views/layouts/admin/admin-layout.vue");

//#region search-for-payments

// import HomePageComponent from "@/views/pages/home.vue"
import RegistrationPage from "@views/pages/login/registration.vue"
//#endregion 


import Reviewer from "@views/pages/reviewer/reviewer.vue"
import ActivateAccount from "@views/pages/login/activate-account.vue"
import AuthorsPage from "@views/pages/admin/authors/authors.vue"
import ArticlesPage from "@views/pages/admin/articles/articles.vue"
// import AdminLayout from "@views/layouts/admin/admin-layout.vue"
import ActivateAccountInfo from "@views/pages/login/activate-account-info.vue"

import UserPage from "@views/pages/user/user.vue"
import {
  DEFAULT, LOGIN, FORGOTPESSWORD, REGISTRATION,
  REVIEWER, ADMIN, USER, AUTHORS, ARTICLES, ACTIVATEACCOUNT, ACTIVATEACCOUNTINFO
} from "./routerNames";

//#endregion
const routes: Array<RouteRecordRaw> = [
  //LoginPageComponent
  {
    name: LOGIN,
    path: "/login",
    component: LoginPageComponent,
    meta: {
      title: "Авторизация",
      allowAnonymous: true,
      // middleware: [
      //   new DocumentTitleMiddleware()
      // ]
    }
  },
  {
    name: DEFAULT,
    path: "/",
    redirect: "login"
  },

  {
    path: '/sign',
    component: BaseTemplate,
    meta: {
      allowAnonymous: true,
    },
    children: [
      {
        name: ACTIVATEACCOUNT,
        path: ":key",
        component: ActivateAccount,
        meta: { title: "Активация" }
      },
    ]
  },
  {
    name: FORGOTPESSWORD,
    path: '/forgot-password',
    component: ForgotPasswordPageComponent,
    meta: {
      allowAnonymous: true,
    }
  },
  {
    name: ACTIVATEACCOUNTINFO,
    path: '/activate-account-info',
    component: ForgotPasswordPageComponent,
  },
  {
    name: REVIEWER,
    path: '/reviewer',
    component: Reviewer,
    meta: {
      allowAnonymous: true,
    }
  },
  {
    name: REGISTRATION,
    path: '/registration',
    component: RegistrationPage,
    meta: {
      allowAnonymous: true,
      title: "registration"
    }
  },

  {
    path: '/',
    component: BaseTemplate,
    children: [
      {
        name: ADMIN,
        path: ADMIN,
        component: AdminLayout,
        redirect: { name: AUTHORS },
        children: [
          {
            name: AUTHORS,
            path: AUTHORS,
            component: AuthorsPage,
            meta: { title: "авторы" }
          },
          {
            name: ARTICLES,
            path: ARTICLES,
            component: ArticlesPage,
            meta: { title: "Статьи" }
          },
        ]
      }
    ]
  },
  { path: '/:pathMatch(.*)*', component: ErrorPageComponent },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


export default router;
