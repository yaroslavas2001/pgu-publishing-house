import { WebApiService } from "../webApiService";
import HttpResponseResult from "../models/httpResponseResult";
import LoginRequest from "../models/loginRequest";
import LoginResponse from "../models/loginResponse";
import Cookies from "js-cookie"
import BaseRequestService from "./baseRequestService";
import AuthRegister from "../models/Auth/AuthRegister";

export default class AuthService extends BaseRequestService {

    constructor(api: WebApiService) {
        super(api, 'Auth');
    }
    public static AdminAuthTokenName: string = 'AdminAuthToken'
    public static Role: string = 'UserRole'


    public async login(request: LoginRequest): Promise<HttpResponseResult<LoginResponse>> {
        let res = await this.createRequestPromise<LoginResponse>('/Login', 'POST', request);
        if (res.isSuccess) {
            Cookies.set(AuthService.AdminAuthTokenName, res.data.token);
            Cookies.set(AuthService.Role, res.data.role);
        }
        return res;
    }
    public logout() {
        Cookies.set(AuthService.AdminAuthTokenName, '');
        Cookies.set(AuthService.Role, '');

    }
    public createUser(requestBody: AuthRegister): Promise<HttpResponseResult<any>> {
        // console.log("requestBody", requestBody)
        return this.createRequestPromise('/Register', 'PUT', requestBody);
    }
    public activateUser(key: string): Promise<HttpResponseResult<LoginResponse>> {
        // console.log("requestBody", key)
        let a = {
            key: key
        }
        return this.createRequestPromise('/ActivateAccount', 'PATCH', a);
    }
}



