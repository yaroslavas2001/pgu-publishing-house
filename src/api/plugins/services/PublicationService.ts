import GeneralModel from "../models/GeneralModel";
import HttpResponseResult from "../models/httpResponseResult";
import AddPublicationRequestModel from "../models/Publication/AddPublicationRequestModel";
import GetPublicationRequestModel from "../models/Publication/GetPublicationRequestModel";
import GetPublicationResponseModel from "../models/Publication/GetPublicationResponseModel";
import SetStatusPublicationRequestModel from "../models/Publication/SetStatusPublicationRequestModel";
import UpdatePublicationRequestModel from "../models/Publication/UpdatePublicationRequestModel";
import { WebApiService } from "../webApiService";
import BaseRequestService from "./baseRequestService";

export default class PublicationService extends BaseRequestService{
    constructor(api: WebApiService) {
        super(api, "Publication");
    }

    public async Add(request: AddPublicationRequestModel): Promise<HttpResponseResult<any>> {
        let res = await this.createRequestPromise<any>('/Add', 'POST', request);
        return res;
    }
    public async Get(request: GetPublicationRequestModel): Promise<HttpResponseResult<GeneralModel<Array<GetPublicationResponseModel>>>> {
        let res = await this.createRequestPromise<any>('/Get', 'GET', request,false);
        return res;
    }
    public async SetStatus(request: SetStatusPublicationRequestModel): Promise<HttpResponseResult<any>> {
        let res = await this.createRequestPromise<any>('/SetStatus', 'PATCH', request,false);
        return res;
    }
    public async Update(request: UpdatePublicationRequestModel): Promise<HttpResponseResult<any>> {
        let res = await this.createRequestPromise<any>('/Update', 'PATCH', request);
        return res;
    }
}