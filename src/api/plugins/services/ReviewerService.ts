import GeneralModel from "../models/GeneralModel";
import HttpResponseResult from "../models/httpResponseResult";
import AddReviewerRequestModel from "../models/Reviewer/AddReviewerRequestModel";
import GetPublicationsReviewerRequestModel from "../models/Reviewer/GetPublicationsReviewerRequestModel";
import GetReviewerRequestModel from "../models/Reviewer/GetReviewerRequestModel";
import GetReviewerResponseModel from "../models/Reviewer/GetReviewerResponseModel";
import { WebApiService } from "../webApiService";
import BaseRequestService from "./baseRequestService";

export default class ReviewerService extends BaseRequestService{
    constructor(api: WebApiService) {
        super(api, "Reviewer");
    }
    
    public async Add(request: AddReviewerRequestModel): Promise<HttpResponseResult<any>> {
        let res = await this.createRequestPromise<any>('/Add', 'POST', request);
        return res;
    }
    public async Get(request: GetReviewerRequestModel): Promise<HttpResponseResult<GeneralModel<Array<GetReviewerResponseModel>>>> {
        let res = await this.createRequestPromise<any>('/Get', 'GET', request,false);
        return res;
    }
    public async GetPublications(request: GetPublicationsReviewerRequestModel): Promise<HttpResponseResult<any>> {
        let res = await this.createRequestPromise<any>('/GetPublications', 'GET', request,false);
        return res;
    }
}