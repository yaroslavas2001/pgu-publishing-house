import HttpResponseResult from "../models/httpResponseResult";
import AddPublicationAuthorRequestModel from "../models/PublicationAuthor/AddPublicationAuthorRequestModel";
import GetReviewRequestModel from "../models/Review/GetReviewRequestModel";
import { WebApiService } from "../webApiService";
import BaseRequestService from "./baseRequestService";

export default class PublicationAuthorService extends BaseRequestService{
    constructor(api: WebApiService) {
        super(api, "PublicationAuthor");
    }

    public async Add(request: AddPublicationAuthorRequestModel): Promise<HttpResponseResult<any>> {
        let res = await this.createRequestPromise<any>('/Add', 'POST', request,false);
        return res;
    }
    public async Get(request: GetReviewRequestModel): Promise<HttpResponseResult<Array<number>>> {
        let res = await this.createRequestPromise<any>('/Get', 'GET', request,false);
        return res;
    }
    public async Remove(request: AddPublicationAuthorRequestModel): Promise<HttpResponseResult<any>> {
        let res = await this.createRequestPromise<any>('/Remove', 'DELETE', request,false);
        return res;
    }
}