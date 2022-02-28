import RequestService from "./requestsService";
import PointListRequest from "../models/controllersModels/points/PointListRequest";
import PointListItem from "@/api/dataSource/api/plugins/models/controllersModels/points/PointListItem";
import PointDetailItem from "@/api/dataSource/api/plugins/models/controllersModels/points/PointDetailItem";
import PointUpsertItem from "@/api/dataSource/api/plugins/models/controllersModels/points/PointUpsertItem";
import { WebApiService } from "../webApiService";
import HttpResponseResult from "@/api/dataSource/api/plugins/models/httpResponseResult"
import GetListRequest from "../models/getListRequest";
import GetListResponse from "../models/getListResponse";
import ModelIN from "@/api/dataSource/api/plugins/models/controllersModels/common/ModelIN"
import Name from "@/api/dataSource/api/plugins/models/controllersModels/common/Name"
export default class PointOfSalesService extends RequestService<PointListRequest, PointListItem, PointDetailItem, PointUpsertItem>{
    /**
     *
     */
    constructor(api: WebApiService) {
        super(api, "PointOfSales");

    }
    public GetTechStateList(): Promise<HttpResponseResult<Array<any>>> {

        return this.createRequestPromise<Array<any>>('/TechState/DropDownList', 'GET');
    }
    public GetSettlementType(): Promise<HttpResponseResult<Array<any>>> {

        return this.createRequestPromise<Array<any>>('/SettlementType/DropDownList', 'GET');
    }
    public GetStreetType(): Promise<HttpResponseResult<Array<any>>> {

        return this.createRequestPromise<Array<any>>('/StreetType/DropDownList', 'GET');
    }
    public GetBuildingType(): Promise<HttpResponseResult<Array<any>>> {

        return this.createRequestPromise<Array<any>>('/BuildingType/DropDownList', 'GET');
    }
    public GetAppartmentType(): Promise<HttpResponseResult<Array<any>>> {

        return this.createRequestPromise<Array<any>>('/ApartmentType/DropDownList', 'GET');
    }
    public async GetRegionsList(request?: GetListRequest<any>): Promise<HttpResponseResult<GetListResponse<any>>> {

        var url = '/Region/DropDownList'
        if (request)
            url += '?' + this.getListQueryParams(request);
        console.log('url', url);
        let resp = await this.createRequestPromise<Array<any>>(url, 'GET');
        let contentRangeSplit = resp.ResponseHeaders['content-range']?.split('/')

        return {
            IsSuccess: resp.IsSuccess,
            ResponseHeaders: resp.ResponseHeaders,
            StatusCode: resp.StatusCode,
            StatusText: resp.StatusText,
            Response: {
                Items: resp.Response,
                Count: contentRangeSplit && contentRangeSplit.length > 1 ? Number(contentRangeSplit[1]) : undefined
            }
        }
    }

    public GetColor(): Promise<HttpResponseResult<Array<any>>> {

        return this.createRequestPromise<Array<any>>('/Color/DropDownList', 'GET');
    }
    public GetPosType(): Promise<HttpResponseResult<Array<any>>> {

        return this.createRequestPromise<Array<any>>('/PosType/DropDownList', 'GET');
    }
    public GetDeviceType(): Promise<HttpResponseResult<Array<any>>> {

        return this.createRequestPromise<Array<any>>('/DeviceType/DropDownList', 'GET');
    }
}