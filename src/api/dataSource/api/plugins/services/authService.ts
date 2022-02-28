import { WebApiService } from "../webApiService";
import HttpResponseResult from "../models/httpResponseResult";
import LoginRequest from "../models/loginRequest";
import LoginResponse from "../models/loginResponse";
import Cookies from "js-cookie"
import BaseRequestService from "./baseRequestService";

export default class AuthService extends BaseRequestService {    
    
    constructor(api:WebApiService) {
        super(api,'Account');
    }     
    public static AdminAuthTokenName:string = 'AdminAuthToken'
    
    
    public async login(request:LoginRequest):Promise<HttpResponseResult<LoginResponse>>{
         let res = await this.createRequestPromise<LoginResponse>('/token','POST',request);    
         if(res.IsSuccess){
             Cookies.set(AuthService.AdminAuthTokenName, res.Response.access_token);
             Cookies.set("userName", request.username);
         }            
         return res;
    }   
    public logout(){
        Cookies.set(AuthService.AdminAuthTokenName, '');  
   }   
}



