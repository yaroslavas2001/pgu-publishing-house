import AllAuthorModel from "@/models/author/AllAuthorModel";
import AuthorModel from "@/models/author/AuthorModel";
import GetListRequest from "../models/getListRequest";
import GetListResponse from "../models/getListResponse";
import HttpResponseResult from "../models/httpResponseResult";
import { WebApiService } from "../webApiService";
import RequestService from "./requestsService";

export default class AuthorService extends RequestService<any, any, any, any>{
    /**
     *
     */
    constructor(api: WebApiService) {
        super(api, "Author");

    }
    
    public async AddAuthor(request: AllAuthorModel): Promise<HttpResponseResult<AuthorModel>> {
        let res = await this.createRequestPromise<any>('/Add', 'POST', request);
        console.log("res Author/Add", res)
        return res;
    }
    public async Search(request: AllAuthorModel): Promise<HttpResponseResult<AuthorModel>> {
        let res = await this.createRequestPromise<any>('/Search', 'GET', request);
        return res;
    }
    public async Get(request: AllAuthorModel): Promise<HttpResponseResult<AuthorModel>> {
        let res = await this.createRequestPromise<any>('/Get', 'GET', request);
        return res;
    }
    public async Update(request: AllAuthorModel): Promise<HttpResponseResult<AuthorModel>> {
        let res = await this.createRequestPromise<any>('/Update', 'PATCH', request);
        return res;
    }
    public async Delete(request: AllAuthorModel): Promise<HttpResponseResult<AuthorModel>> {
        let res = await this.createRequestPromise<any>('/Delete', 'DELETE', request);
        return res;
    }
    // public GetTechStateList(): Promise<HttpResponseResult<Array<any>>> {

    //     return this.createRequestPromise<Array<any>>('/TechState/DropDownList', 'GET');
    // }
//     public GetSettlementType(): Promise<HttpResponseResult<Array<any>>> {

//         return this.createRequestPromise<Array<any>>('/SettlementType/DropDownList', 'GET');
//     }
//     public GetStreetType(): Promise<HttpResponseResult<Array<any>>> {

//         return this.createRequestPromise<Array<any>>('/StreetType/DropDownList', 'GET');
//     }
//     public GetBuildingType(): Promise<HttpResponseResult<Array<any>>> {

//         return this.createRequestPromise<Array<any>>('/BuildingType/DropDownList', 'GET');
//     }
//     public GetAppartmentType(): Promise<HttpResponseResult<Array<any>>> {

//         return this.createRequestPromise<Array<any>>('/AppartmentType/DropDownList', 'GET');
//     }
    // public async GetAuthorsList(request?: GetListRequest<any>): Promise<HttpResponseResult<GetListResponse<any>>> {

    //     var url = '/DropDownList'
    //     if(request)
    //     url += '?'+this.getListQueryParams(request);
    //     console.log('url', url);
    //     let resp = await this.createRequestPromise<Array<any>>(url,'GET'); 
    //     let contentRangeSplit = resp.ResponseHeaders['content-range']?.split('/')   

    //     return {
    //         IsSuccess: resp.IsSuccess,
    //         ResponseHeaders: resp.ResponseHeaders,
    //         StatusCode:resp.StatusCode,
    //         StatusText:resp.StatusText,
    //         Response: {
    //             Items : resp.Response,
    //             Count : contentRangeSplit && contentRangeSplit.length>1 ?Number(contentRangeSplit[1]):undefined
    //         }
    //     }
    // }

//     // public GetPosDeviceType(): Promise<HttpResponseResult<Array<any>>> {

//     //     return this.createRequestPromise<Array<any>>('/PosDeviceType/DropDownList', 'GET');
//     // }
}