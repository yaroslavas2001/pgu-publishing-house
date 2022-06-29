import HttpResponseResult from "../models/httpResponseResult";
import { WebApiService } from "../webApiService";

export default class BaseRequestService{

    protected _controllerName:string;
    protected _api:WebApiService;
    constructor(api:WebApiService, controllerName:string) {
        this._api = api;
        this._controllerName = controllerName;
    }

    protected createRequestPromise<T>(url:string, method:string, requestBody?: any,isBody?:boolean): Promise<HttpResponseResult<T>> 
    {
        let self = this;
        return  new Promise<HttpResponseResult<T>>((resolve) => {
            self._api.sendXHR<T>(`/${self._controllerName}${url}`,method,requestBody,isBody ,(res)=>{
                resolve(res)
            });
        });       
    }
}