import { RouteLocationNormalized } from "vue-router";

export default interface IRouteMiddleware {
    hookCallTime: 'before' | 'after';
    process(context: {to: RouteLocationNormalized, from: RouteLocationNormalized, next?: Function}): Promise<void>;
}