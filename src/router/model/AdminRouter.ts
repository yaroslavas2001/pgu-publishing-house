//#region import
import { createRouter, createWebHistory, RouteRecordRaw, RouterView } from "vue-router";
const BaseTemplate = () => import("@/views/layouts/base-layout.vue");
const AdminLayout = () => import("@views/layouts/admin/admin-layout.vue");

import AuthorsPage from "@views/pages/admin/authors/authors.vue"
import  AuthorsDetailed from "@views/pages/admin/authors/authors-detailed.vue"
import MaterialsAdminPage from "@views/pages/admin/materials/materials.vue"
import Reviewer from "@views/pages/admin/reviewer/reviewer.vue"
import ReviewerDetailed from "@views/pages/admin/reviewer/reviewer-detailed.vue"
import MaterialDetailed from "@views/pages/admin/materials/material-detailed.vue"
import NewMaterials from "@views/pages/admin/new-materials/new-materials.vue"
import NewMaterialDetailed from "@views/pages/admin/new-materials/new-material-detailed.vue"

import { ADMIN, AUTHORS, DETAILEDADMIN, ADMINMATERIALS, ALLADMINMATERIALS, NEWMATERIALADMIN, ALLNEWMATERIALADMIN, DETAILEDNEWMATERIALADMIN, REVIEWER, ALLREVIEWER, REVIEWERDETAILED, AUTHOR, AUTHORSGROUP} from "../routerNames";

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
        redirect: { name: NEWMATERIALADMIN },
        children: [
          {
            name: AUTHORSGROUP,
            path: AUTHORSGROUP,
            component: BaseTemplate,
            redirect: { name: AUTHORS },
            children: [
              {
                name: AUTHORS,
                path: AUTHORS,
                component: AuthorsPage,
                meta: { title: "авторы" }
              },
              {
                name: AUTHOR,
                path: AUTHOR,
                component: AuthorsDetailed,
                meta: { title: "AuthorsDetailed" }
              },
            ]
          },
      
          {
            name: REVIEWER,
            path: REVIEWER,
            component: BaseTemplate,
            redirect: { name: ALLREVIEWER },
            children: [
              {
                name: ALLREVIEWER,
                path: ALLREVIEWER,
                component: Reviewer,
                meta: { title: "Reviewer" }
              },
              {
                name: REVIEWERDETAILED,
                path: REVIEWERDETAILED,
                component: ReviewerDetailed,
                meta: { title: "ReviewerDetailed" }
              },
            ]
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
          {
            name: NEWMATERIALADMIN,
            path: NEWMATERIALADMIN,
            component: BaseTemplate,
            redirect: { name: ALLNEWMATERIALADMIN },
            children: [
              {
                name: ALLNEWMATERIALADMIN,
                path: ALLNEWMATERIALADMIN,
                component: NewMaterials,
                meta: { title: "Новые материалы" }
              },
              {
                name: DETAILEDNEWMATERIALADMIN,
                path: DETAILEDNEWMATERIALADMIN,
                component: NewMaterialDetailed,
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
