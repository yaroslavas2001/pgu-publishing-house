import RequestAddDepartmentModel from "../models/Department/RequestAddDepartmentModel";
import RequestGetAllDepartmentModel from "../models/Department/RequestGetAllDepartmentModel";
import RequestGetDepartmentModel from "../models/Department/RequestGetDepartmentModel";
import ResponseGetAllDepartmentModel from "../models/Department/ResponseGetAllDepartmentModel";
import GeneralModel from "../models/GeneralModel";
import HttpResponseResult from "../models/httpResponseResult";
import { WebApiService } from "../webApiService";
import BaseRequestService from "./baseRequestService";

export default class DepartmentService extends BaseRequestService{
    constructor(api: WebApiService) {
        super(api, "Department");
    }

    public async Add(request: RequestAddDepartmentModel): Promise<HttpResponseResult<any>> {
        let res = await this.createRequestPromise<any>('/Add', 'POST', request,true);
        return res;
    }
    public async GetAll(request: RequestGetAllDepartmentModel): Promise<HttpResponseResult<GeneralModel<Array<ResponseGetAllDepartmentModel>>>> {
        let res = await this.createRequestPromise<any>('/GetAll', 'GET', request,false);
        return res;
    }
    public async GetDepartment(request: RequestGetDepartmentModel): Promise<HttpResponseResult<GeneralModel<Array<ResponseGetAllDepartmentModel>>>> {
        let res = await this.createRequestPromise<any>('/GetDepartment', 'GET', request,false);
        return res;
    }
    public async Rename(request: any): Promise<HttpResponseResult<any>> {
        let res = await this.createRequestPromise<any>('/Rename', 'PATCH', request,false);
        return res;
    }
    public async Delete(request: any): Promise<HttpResponseResult<any>> {
        let res = await this.createRequestPromise<any>('/Delete', 'DELETE', request,false);
        return res;
    }
}