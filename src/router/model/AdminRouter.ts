//#region import
import { createRouter, createWebHistory, RouteRecordRaw, RouterView } from "vue-router";
const BaseTemplate = () => import("@/views/layouts/base-layout.vue");
const AdminLayout = () => import("@views/layouts/admin/admin-layout.vue");

import AuthorsPage from "@views/pages/admin/authors/authors.vue"
import MaterialsAdminPage from "@views/pages/admin/materials/materials.vue"
import Reviewer from "@views/pages/admin/reviewer/reviewer.vue"
import MaterialDetailed from "@views/pages/admin/materials/material-detailed.vue"
import { ADMIN, AUTHORS, DETAILEDADMIN, ADMINMATERIALS, ALLADMINMATERIALS} from "../routerNames";

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
        redirect: { name: ADMINMATERIALS },
        children: [
          {
            name: AUTHORS,
            path: AUTHORS,
            component: AuthorsPage,
            meta: { title: "авторы" }
          },
          {
            name: ADMINMATERIALS,
            path: ADMINMATERIALS,
            component: BaseTemplate,
            redirect: { name: ALLADMINMATERIALS },
            children: [
              {
                name: ALLADMINMATERIALS,
                path: ALLADMINMATERIALS,
                component: MaterialsAdminPage,
                meta: { title: "Материалы" }
              },
              {
                name: DETAILEDADMIN,
                path: DETAILEDADMIN,
                component: MaterialDetailed,
                meta: { title: "Детальная" }
              },
            ]
          },
         
        ]
      }
    ]
  },
];



export default AdminRouter;
