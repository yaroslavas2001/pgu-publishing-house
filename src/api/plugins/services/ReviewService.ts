import HttpResponseResult from "../models/httpResponseResult";
import AddReviewRequestModel from "../models/Review/AddReviewRequestModel";
import DeleteReviewRequestModel from "../models/Review/DeleteReviewRequestModel";
import GetReviewRequestModel from "../models/Review/GetReviewRequestModel";
import GetReviewResponseModel from "../models/Review/GetReviewResponseModel";
import { WebApiService } from "../webApiService";
import BaseRequestService from "./baseRequestService";

export default class ReviewService extends BaseRequestService{
    constructor(api: WebApiService) {
        super(api, "Reviewer");
    }
    
    public async Add(request: AddReviewRequestModel): Promise<HttpResponseResult<any>> {
        let res = await this.createRequestPromise<any>('/Add', 'POST', request);
        return res;
    }
    public async Get(request: GetReviewRequestModel): Promise<HttpResponseResult<GetReviewResponseModel>> {
        let res = await this.createRequestPromise<any>('/Get', 'GET', request,false);
        return res;
    }
    public async Delete(request: DeleteReviewRequestModel): Promise<HttpResponseResult<any>> {
        let res = await this.createRequestPromise<any>('/Delete', 'GET', request,false);
        return res;
    }
   
}