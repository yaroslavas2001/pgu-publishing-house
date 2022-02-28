// import { IUserResponse } from "src/api/dataSource/api/plugins/authPlugin";
// import WsResponseModel from "src/api/dataSource/api/SchemaBuilderServer/Models/WsResponseModel";
// import UserInfoResponse from "src/api/dataSource/api/Spirit/Admin/Interfaces/Models/AccountService/UserInfoResponse";
import Vue from "vue";
import { RouteLocationNormalized } from "vue-router";
import IRouteMiddleware from "./IRouteMiddleware";

export default class AuthGuardBase implements IRouteMiddleware {  
  hookCallTime: "before" | "after" = 'before';
  private isGotUser = false;
  constructor(public readonly routeNameToRedirect: string) {}
  async process(context: {to: RouteLocationNormalized, from: RouteLocationNormalized, next?: Function}) {
    // //console.log('auth guard');
    const next = context.next;
    const to = context.to;
    const from = context.from;
    if (to.meta && to.meta.allowAnonymous) {
      next();
      return;
    }
    // if (Vue.$api.isLoggedIn) {      
    //     next();
    //     return;
    // }
    if (this.isGotUser) {
      next(this.routeNameToRedirect);
      return;
    }
    // Vue.$api.AccountService.GetUserInfoEvent.once(
    //   (response: WsResponseModel<UserInfoResponse>) => {
    //     if (response.IsSuccess) {
    //       const userDefObj: IUserResponse = {Id: 0, Email: '', FullName: ''};
    //       Vue.$api.SetUser(Object.assign(userDefObj, response.Value));
    //       this.isGotUser = true;
    //     }
    //     if (Vue.$api.User == null) {
    //       next({name:this.routeNameToRedirect});
    //     } else {
    //       next();
    //     }
    //   }
    // );
    // Vue.$api.AccountService.GetUserInfo();
  }
}