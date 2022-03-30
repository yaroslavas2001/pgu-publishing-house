//#region import
import { createRouter, createWebHistory, RouteRecordRaw, RouterView } from "vue-router";
const BaseTemplate = () => import("@/views/layouts/base-layout.vue");
const AdminLayout = () => import("@views/layouts/admin/admin-layout.vue");

import AuthorsPage from "@views/pages/admin/authors/authors.vue"
import ArticlesPage from "@views/pages/admin/articles/articles.vue"

import { ADMIN, AUTHORS, ARTICLES, } from "../routerNames";

//#endregion
const AdminRouter: Array<RouteRecordRaw> = [
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
];



export default AdminRouter;
