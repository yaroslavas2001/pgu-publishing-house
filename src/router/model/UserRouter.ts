import { createRouter, createWebHistory, RouteRecordRaw, RouterView } from "vue-router";

const BaseTemplate = () => import("@/views/layouts/base-layout.vue");
const UserLayout = () => import("@views/layouts/user/user-layout.vue");

import NewArticlePage from "@/views/pages/user/new-article/new-article.vue"
import UserArticles from "@/views/pages/user/user-articles/user-articles.vue"
import ReviewersResponse from "@/views/pages/user/reviewers-response/reviewers-response.vue"
import ArticleArchive from "@/views/pages/user/article-archive/article-archive.vue"
import AddAuthor from "@/views/pages/general/add-author.vue"

import { USER, NEWARTICLE, ARTICLEARCHIVE, REVIEWERSRESPONSE, USERARTICLES, ADDAUTHOR } from "../routerNames";

const UserRouter: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: BaseTemplate,
    children: [
      {
        name: USER,
        path: USER,
        component: UserLayout,
        redirect: { name: NEWARTICLE },
        children: [
          {
            name: USERARTICLES,
            path: USERARTICLES,
            component: UserArticles,
            meta: { title: "Мои статьи" }
          },
          {
            name: NEWARTICLE,
            path: NEWARTICLE,
            component: NewArticlePage,
            meta: { title: "Загрузить новую статью" }
          },
          {
            name: ARTICLEARCHIVE,
            path: ARTICLEARCHIVE,
            component: ArticleArchive,
            meta: { title: "Архив статей" }
          },
          {
            name: REVIEWERSRESPONSE,
            path: REVIEWERSRESPONSE,
            component: ReviewersResponse,
            meta: { title: "Ответ проверяющего" }
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
