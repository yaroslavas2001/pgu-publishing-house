import RequestAddModel from "../models/Faculty/RequestAddModel";
import ResponseGetAllModel from "../models/Faculty/ResponseGetAllModel";
import GeneralModel from "../models/GeneralModel";
import HttpResponseResult from "../models/httpResponseResult";
import PageModel from "../models/Page/PageModel";
import { WebApiService } from "../webApiService";
import BaseRequestService from "./baseRequestService";

export default class FacultyService extends BaseRequestService{
    constructor(api: WebApiService) {
        super(api, "Faculty");
    }
    
    public async Add(request: RequestAddModel): Promise<HttpResponseResult<any>> {
        let res = await this.createRequestPromise<any>('/Add', 'POST', request);
        return res;
    }
    public async GetAll(request:PageModel): Promise<HttpResponseResult<GeneralModel<Array<ResponseGetAllModel>>>> {
        let res = await this.createRequestPromise<any>('/GetAll', 'GET',request,false);
        return res;
    }
}