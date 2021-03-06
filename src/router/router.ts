import { createRouter, createWebHistory, RouteRecordRaw, RouterView } from "vue-router";
const BaseTemplate = () => import("@/views/layouts/base-layout.vue");

import LoginPageComponent from "@/views/pages/login/login.vue"
import ForgotPasswordPageComponent from "@/views/pages/login/forgot-password.vue"
import ErrorPageComponent from "@/views/pages/login/404-page.vue"
import RegistrationPage from "@views/pages/login/registration.vue"
import ActivateAccount from "@views/pages/login/activate-account.vue"
import ActivateAccountInfo from "@/views/pages/login/activate-account-info.vue"
import ReviewerGratitudePage from "@/views/pages/reviewer/reviewer-gratitude.vue"
// import Reviewer
import Reviewer from "@views/pages/reviewer/reviewer.vue"
import MainPage from "@/views/pages/general/main-page.vue"
import Calculation from "@/views/pages/calculation/calculation.vue"
import {
  DEFAULT, LOGIN, FORGOTPESSWORD, REGISTRATION,CALCULATION,
  REVIEWER, ACTIVATEACCOUNT, ACTIVATEACCOUNTINFO, INDEX, PUBLICATION, ReviewerGratitude
} from "./routerNames";

import AdminRouter from "./model/AdminRouter"
import UserRouter from "./model/UserRouter"

const routes: Array<RouteRecordRaw> = [
  {
    name: DEFAULT,
    path: "/",
    redirect: INDEX
  },
  {
    name: INDEX,
    path: "/index",
    component: MainPage,
    meta: {
      title: "Издательство ПГУ",
      allowAnonymous: true,
    }
  },
  {
    name: CALCULATION,
    path: "/calculation",
    component: Calculation,
    meta: {
      title: "Калькуляция",
      allowAnonymous: true,
    }
  },
  {
    name: LOGIN,
    path: "/login",
    component: LoginPageComponent,
    meta: {
      title: "Авторизация",
      allowAnonymous: true,
    }
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
    path: '/publication/',
    component: BaseTemplate,
    meta: {
      allowAnonymous: true,
    },
    children: [
      {
        name: PUBLICATION,
        path: ":id",
        component: Reviewer,
        props: true,
        meta: { title: "Рецензирование" }
      },
      {
        name: ReviewerGratitude,
        path: ":id",
        component: ReviewerGratitudePage,
        props: true,
        meta: { title: "Рецензирование" }
      },
    ]
  },
  // {
  //   name: FORGOTPESSWORD,
  //   path: '/forgot-password',
  //   component: ForgotPasswordPageComponent,
  //   meta: {
  //     allowAnonymous: true,
  //   }
  // },
  {
    name: ACTIVATEACCOUNTINFO,
    path: '/activate-account-info',
    component: ActivateAccountInfo,
  },
  // {
  //   name: REVIEWER,
  //   path: '/reviewer',
  //   component: Reviewer,
  //   meta: {
  //     allowAnonymous: true,
  //   }
  // },
  {
    name: REGISTRATION,
    path: '/registration',
    component: RegistrationPage,
    meta: {
      allowAnonymous: true,
      title: "registration"
    }
  },
  ...AdminRouter,
  ...UserRouter,
  { path: '/:pathMatch(.*)*', component: ErrorPageComponent },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


export default router;
