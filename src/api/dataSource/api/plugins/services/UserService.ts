import GetListRequest from "../models/getListRequest";
import GetListResponse from "../models/getListResponse";
import HttpResponseResult from "../models/httpResponseResult";
import { WebApiService } from "../webApiService";
import RequestService from "./requestsService";

export default class UserService extends RequestService<any, any, any, any>{
    /**
     *
     */
    constructor(api: WebApiService) {
        super(api, "User");

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
    public async GetUsersList(request?: GetListRequest<any>): Promise<HttpResponseResult<GetListResponse<any>>> {

        var url = '/DropDownList'
        if(request)
        url += '?'+this.getListQueryParams(request);
        console.log('url', url);
        let resp = await this.createRequestPromise<Array<any>>(url,'GET'); 
        let contentRangeSplit = resp.ResponseHeaders['content-range']?.split('/')   

        return {
            IsSuccess: resp.IsSuccess,
            ResponseHeaders: resp.ResponseHeaders,
            StatusCode:resp.StatusCode,
            StatusText:resp.StatusText,
            Response: {
                Items : resp.Response,
                Count : contentRangeSplit && contentRangeSplit.length>1 ?Number(contentRangeSplit[1]):undefined
            }
        }
    }

//     // public GetPosDeviceType(): Promise<HttpResponseResult<Array<any>>> {

//     //     return this.createRequestPromise<Array<any>>('/PosDeviceType/DropDownList', 'GET');
//     // }
}