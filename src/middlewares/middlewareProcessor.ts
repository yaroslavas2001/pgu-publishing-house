//import Vue from "*.vue";
//import router from '../router';
// import VueRouter, { NavigationGuard, Route, RouteConfig } from "vue-router";
import { App } from "vue";
import { RouteLocationNormalized, Router, RouteRecordRaw } from "vue-router";
//import Vue from "vue/types/umd";
import IRouteMiddleware from "./IRouteMiddleware";

class MiddlewareProcessor {
  constructor(private readonly router: Router) {
    this.beforeEach(router);
    this.afterEach(router);
  }
  /**
   * Обработчик для конвеера
   * @param context 
   * @param middlewares 
   * @param index 
   * @returns 
   */
  private pipeline(context: any, middlewares: Array<IRouteMiddleware>, index: number) {
    const nextMiddleware = middlewares[index];
    if(!nextMiddleware){
        return context.next 
    }
    return () => {
        const nextPipeline = this.pipeline(
            context, middlewares, index + 1
        )
        nextMiddleware.process({ ...context, next: nextPipeline });
    }
  }
  /**
   * Получить список маршрутов от самого рутового, до дочернего
   * Проходится по дереву маршрутов и собирает в одномерный массив
   * @param routeName 
   * @param routesToSearch 
   * @returns 
   */
  private getRecursiveRouteConfigs(routeName: string, routesToSearch: RouteRecordRaw[]): RouteRecordRaw[] {
    let result = new Array<RouteRecordRaw>();
    for (let index = 0; index < routesToSearch.length; index++) {
      const element = routesToSearch[index];
      if (element.name == routeName) {
        result.push(element);
      } else {
        if ((element.children || []).length > 0) {
          const childsFind = this.getRecursiveRouteConfigs(routeName, element.children);
          if (childsFind.length > 0) {
            result = result.concat([element]).concat(childsFind);
          }
        }
      }
    }
    return result;
  }
  /**
   * Собрать все middleware'ы из списка роутов отсортированных от дочернего к родительскому (дочерние приоритетны)
   * @param routes 
   * @returns 
   */
  private collectMiddlewares(routes: RouteRecordRaw[]) {
    let middlewares = new Array<IRouteMiddleware>();
    routes.forEach(route => {
      const currentMiddlewares = ((route.meta || {}).middleware || []) as IRouteMiddleware[];
      // из уже собранных middleware'в выкинем обработчики, которые есть в следующем маршруте (дочернем)
      // т.е. если будет обработчик типа Auth в родительском роуте и дочернем - сработает дочерний
      middlewares = middlewares.filter(x =>
         !currentMiddlewares.some(c => c.hookCallTime == x.hookCallTime && typeof(c) == typeof(x)));         
      if (currentMiddlewares.length > 0) {
        middlewares = middlewares.concat(currentMiddlewares);
      }
    })
    return middlewares;
  }
  /**
   * Возвращает обработчики для типа маршрута
   * @param to 
   * @param type 
   * @returns 
   */
  private getMiddlewares(to: RouteLocationNormalized, type: 'after' | 'before'): IRouteMiddleware[] {
    const routeTree = this.getRecursiveRouteConfigs((to.name || '').toString(), this.router.options.routes);
    const middlewares = this.collectMiddlewares(routeTree);    
    return (middlewares || []).filter((x: IRouteMiddleware) => x.hookCallTime == type);
  }
  /**
   * Непосредственная обработка хуков маршрутов
   * @param hookRouteType 
   * @param to 
   * @param from 
   * @param next 
   * @returns 
   */
  private processRouteHookMiddlewares(hookRouteType: 'after' | 'before', to: RouteLocationNormalized, from: RouteLocationNormalized, next?: Function): any {
    const middlewares = this.getMiddlewares(to, hookRouteType);
    if (middlewares.length != 0) {
      const context = {
        to,
        from,
        next
      };
      return middlewares[0].process({
        ...context,
        next: this.pipeline(context, middlewares, 1)
      })
    } else {
      next && next();
      return;
    }
  }
  async afterEach(router: Router) {
   router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) =>
    this.processRouteHookMiddlewares('after', to, from));
  }
  async beforeEach(router: Router) {
    router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: Function) => 
      this.processRouteHookMiddlewares('before', to, from, next));
  }
}

const install = (app: App, router: Router) => {
  if (router == null) {
    console.error('Нужен экземпляр router для работы middleware processor\'а!');
    return;
  }
  new MiddlewareProcessor(router);
};

const middlewareInstall = {
  install,
};

export default middlewareInstall;
