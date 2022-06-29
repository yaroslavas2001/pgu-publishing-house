import FileGetRequestModel from "../models/File/FileGetRequestModel";
import FileGetResponseModel from "../models/File/FileGetResponseModel";
import UploadFileForPublicationRequestModel from "../models/File/UploadFileForPublicationRequestModel";
import HttpResponseResult from "../models/httpResponseResult";
import { WebApiService } from "../webApiService";
import BaseRequestService from "./baseRequestService";

export default class FileService extends BaseRequestService{
    constructor(api: WebApiService) {
        super(api, "File");
    }

    public async UploadFileForPublication(request: UploadFileForPublicationRequestModel): Promise<HttpResponseResult<any>> {
        let res = await this.createRequestPromise<any>('/UploadFileForPublication', 'PUT', request);
        return res;
    }
    public async Get(request: FileGetRequestModel): Promise<HttpResponseResult<Array<FileGetResponseModel>>> {
        let res = await this.createRequestPromise<any>('/Get', 'GET', request,false);
        return res;
    }
}