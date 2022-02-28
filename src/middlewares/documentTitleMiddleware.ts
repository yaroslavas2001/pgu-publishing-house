
import { RouteLocationNormalized } from "vue-router";
import IRouteMiddleware from "./IRouteMiddleware";

export default class DocumentTitleMiddleware implements IRouteMiddleware {  
  hookCallTime: "before" | "after" = 'after';
  async process(context: {to: RouteLocationNormalized, from: RouteLocationNormalized, next?: Function}) {
    document.title = context.to.meta.title || 'DEFAULT_TITLE';
    context.next && context.next();
  }
}