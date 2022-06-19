import RequestAddModel from "../models/Faculty/RequestAddModel";
import ResponseGetAllModel from "../models/Faculty/ResponseGetAllModel";
import HttpResponseResult from "../models/httpResponseResult";
import { WebApiService } from "../webApiService";
import RequestService from "./requestsService";

export default class FacultyService extends RequestService<any, any, any, any>{
    constructor(api: WebApiService) {
        super(api, "Faculty");

    }
    
    public async Add(request: RequestAddModel): Promise<HttpResponseResult<any>> {
        let res = await this.createRequestPromise<any>('/Add', 'POST', request);
        return res;
    }
    public async GetAll(): Promise<HttpResponseResult<Array<ResponseGetAllModel>>> {
        let res = await this.createRequestPromise<any>('/GetAll', 'GET');
        return res;
    }
    // public async Get(request: any): Promise<HttpResponseResult<any>> {
    //     let res = await this.createRequestPromise<any>('/Get', 'GET', request);
    //     return res;
    // }
    // public async Rename(request: any): Promise<HttpResponseResult<any>> {
    //     let res = await this.createRequestPromise<any>('/Rename', 'PATCH', request);
    //     return res;
    // }
    // public async Delete(request: any): Promise<HttpResponseResult<any>> {
    //     let res = await this.createRequestPromise<any>('/Delete', 'DELETE', request);
    //     return res;
    // }
}