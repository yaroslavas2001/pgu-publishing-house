import AllAuthorModel from "@/models/author/AllAuthorModel";
import AuthorModel from "@/models/author/AuthorModel";
import SearchAuthorResponseModel from "../models/Author/SearchAuthorResponseModel";
import GeneralModel from "../models/GeneralModel";
import HttpResponseResult from "../models/httpResponseResult";
import SearchModel from "../models/Search/SearchModel";
import { WebApiService } from "../webApiService";
import BaseRequestService from "./baseRequestService";

export default class AuthorService extends BaseRequestService{
    constructor(api: WebApiService) {
        super(api, "Author");
    }
    
    public async AddAuthor(request: AllAuthorModel): Promise<HttpResponseResult<AuthorModel>> {
        let res = await this.createRequestPromise<any>('/Add', 'POST', request);
        return res;
    }
    public async Search(request: SearchModel): Promise<HttpResponseResult<GeneralModel<Array<SearchAuthorResponseModel>>>> {
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
}