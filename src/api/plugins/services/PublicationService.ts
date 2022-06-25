import AllAuthorModel from "@/models/author/AllAuthorModel";
import AuthorModel from "@/models/author/AuthorModel";
import HttpResponseResult from "../models/httpResponseResult";
import { WebApiService } from "../webApiService";
import BaseRequestService from "./baseRequestService";

export default class PublicationService extends BaseRequestService{
    constructor(api: WebApiService) {
        super(api, "Publication");
    }

    public async Add(request: AllAuthorModel): Promise<HttpResponseResult<AuthorModel>> {
        let res = await this.createRequestPromise<any>('/Add', 'POST', request);
        return res;
    }
    public async Get(request: AllAuthorModel): Promise<HttpResponseResult<AuthorModel>> {
        let res = await this.createRequestPromise<any>('/Get', 'GET', request);
        return res;
    }
    public async SetStatus(request: AllAuthorModel): Promise<HttpResponseResult<AuthorModel>> {
        let res = await this.createRequestPromise<any>('/SetStatus', 'PATCH', request);
        return res;
    }
    public async Update(request: AllAuthorModel): Promise<HttpResponseResult<AuthorModel>> {
        let res = await this.createRequestPromise<any>('/Update', 'PATCH', request);
        return res;
    }
}