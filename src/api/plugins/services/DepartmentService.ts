import RequestAddDepartmentModel from "../models/Department/RequestAddDepartmentModel";
import RequestGetAllDepartmentModel from "../models/Department/RequestGetAllDepartmentModel";
import ResponseGetAllDepartmentModel from "../models/Department/ResponseGetAllDepartmentModel";
import HttpResponseResult from "../models/httpResponseResult";
import { WebApiService } from "../webApiService";
import RequestService from "./requestsService";

export default class DepartmentService extends RequestService<any, any, any, any>{
    constructor(api: WebApiService) {
        super(api, "Departmane");

    }

    public async Add(request: RequestAddDepartmentModel): Promise<HttpResponseResult<any>> {
        let res = await this.createRequestPromise<any>('/Add', 'POST', request);
        return res;
    }
    public async GetAll(request: RequestGetAllDepartmentModel): Promise<HttpResponseResult<Array<ResponseGetAllDepartmentModel>>> {
        let res = await this.createRequestPromise<any>('/GetAll', 'GET', request);
        return res;
    }
    public async Rename(request: any): Promise<HttpResponseResult<any>> {
        let res = await this.createRequestPromise<any>('/Rename', 'PATCH', request);
        return res;
    }
    public async Delete(request: any): Promise<HttpResponseResult<any>> {
        let res = await this.createRequestPromise<any>('/Delete', 'DELETE', request);
        return res;
    }
}