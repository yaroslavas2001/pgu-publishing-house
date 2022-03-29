import { WebApiService } from "../webApiService";
import HttpResponseResult from "../models/httpResponseResult";
import LoginRequest from "../models/loginRequest";
import LoginResponse from "../models/loginResponse";
import Cookies from "js-cookie"
import BaseRequestService from "./baseRequestService";
import GetListRequest from "../models/getListRequest";
import GetListResponse from "../models/getListResponse";
import AuthRegister from "../models/AuthRegister";

export default class AuthService extends BaseRequestService {

    constructor(api: WebApiService) {
        super(api, 'Auth');
    }
    public static AdminAuthTokenName: string = 'AdminAuthToken'


    public async login(request: LoginRequest): Promise<HttpResponseResult<LoginResponse>> {
        let res = await this.createRequestPromise<LoginResponse>('/Login', 'POST', request);
        console.log("res", res)
        if (res.isSuccess) {
            Cookies.set(AuthService.AdminAuthTokenName, res.data.token);
            //  Cookies.set("userName", request.username);
        }
        return res;
    }
    public logout() {
        console.log("ds[jl")
        Cookies.set(AuthService.AdminAuthTokenName, '');
    }
    public createUser(requestBody: AuthRegister): Promise<HttpResponseResult<any>> {
        console.log("requestBody", requestBody)
        return this.createRequestPromise('/Register', 'POST', requestBody);
    }
    public activateUser(key: string): Promise<HttpResponseResult<LoginResponse>> {
        console.log("requestBody", key)
        let a = {
            key: key
        }
        return this.createRequestPromise('/ActivateAccount', 'POST', a);
    }
}



