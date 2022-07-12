import { RouteRecordRaw } from "vue-router";

const BaseTemplate = () => import("@/views/layouts/base-layout.vue");
const UserLayout = () => import("@views/layouts/user/user-layout.vue");

import NewArticlePage from "@/views/pages/user/new-material/new-material.vue"
import UserMaterials from "@/views/pages/user/user-materials/user-materials.vue"
import ReviewersResponse from "@/views/pages/user/user-materials/reviewers-response.vue"
import ArticleArchive from "@/views/pages/user/material-archive/material-archive.vue"
import AddAuthor from "@/views/pages/user/add-author/add-author.vue"
import UserMaterialDetailed from "@views/pages/user/user-materials/user-material-detailed.vue"
import {
  USER, ARTICLEARCHIVE, REVIEWERSRESPONSE, ADDAUTHOR, USERMATERIALS, ALLUSERMATERIALS,
  DETAILEDUSER, NEWMATERIALADD, NEWMATERIAL,
} from "../routerNames";

const UserRouter: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: BaseTemplate,
    children: [
      {
        name: USER,
        path: USER,
        component: UserLayout,
        redirect: { name: USERMATERIALS },
        children: [
          {
            name: USERMATERIALS,
            path: USERMATERIALS,
            component: BaseTemplate,
            redirect: { name: ALLUSERMATERIALS },
            children: [
              {
                name: ALLUSERMATERIALS,
                path: ALLUSERMATERIALS,
                component: UserMaterials,
                meta: { title: "Мои материалы" }
              },
              {
                name: DETAILEDUSER,
                path: ":id",
                props: true,
                component: UserMaterialDetailed,
                meta: { title: "Детальная" }
              },
              {
                name: REVIEWERSRESPONSE,
                path: REVIEWERSRESPONSE,
                component: ReviewersResponse,
                meta: { title: "Ответ проверяющего" }
              },
            ]
          },

          {
            name: NEWMATERIAL,
            path: NEWMATERIAL,
            component: BaseTemplate,
            redirect: { name: NEWMATERIALADD },
            children: [
              {
                name: NEWMATERIALADD,
                path: NEWMATERIALADD,
                component: NewArticlePage,
                meta: { title: "Загрузить новую статью" },
              },

            ]
          },

          {
            name: ARTICLEARCHIVE,
            path: ARTICLEARCHIVE,
            component: ArticleArchive,
            meta: { title: "Архив статей" }
          },
       
          {
            name: ADDAUTHOR,
            path: ADDAUTHOR,
            component: AddAuthor,
            meta: { title: "Добавить автора" }
          },
        ]
      }
    ]
  },
];

export default UserRouter;
