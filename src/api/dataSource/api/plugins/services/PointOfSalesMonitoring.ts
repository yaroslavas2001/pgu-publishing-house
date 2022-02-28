import RequestService from "./requestsService";
import { WebApiService } from "../webApiService";
import HttpResponseResult from "@/api/dataSource/api/plugins/models/httpResponseResult"
import GetListRequest from "../models/getListRequest";
import GetListResponse from "../models/getListResponse";
import PointOfSalesMonitoringListRequest from "../models/controllersModels/pointOfSalesMonitoring/PointOfSalesMonitoringListRequest";
import PointOfSalesMonitoringListItem from "../models/controllersModels/pointOfSalesMonitoring/PointOfSalesMonitoringListItem";
import PointOfSalesMonitoringDetailItem from "../models/controllersModels/pointOfSalesMonitoring/PointOfSalesMonitoringDetailItem";
import PointOfSalesMonitoringUpsertItem from "../models/controllersModels/pointOfSalesMonitoring/PointOfSalesMonitoringUpsertItem";
import StateHistoryListItem from "@/api/dataSource/api/plugins/models/controllersModels/pointOfSalesMonitoring/StateHistory/StateHistoryListItem"
import StateHistoryListRequest from "@/api/dataSource/api/plugins/models/controllersModels/pointOfSalesMonitoring/StateHistory/StateHistoryListRequest"
export default class PointOfSalesMonitoring extends RequestService<PointOfSalesMonitoringListRequest, PointOfSalesMonitoringListItem, PointOfSalesMonitoringDetailItem, PointOfSalesMonitoringUpsertItem>{
    /**
     *
     */
    constructor(api: WebApiService) {
        super(api, "PointOfSalesMonitoring");

    }
    public async GetStateHistory(request?: GetListRequest<StateHistoryListRequest>): Promise<HttpResponseResult<GetListResponse<StateHistoryListItem>>> {

        var url = '/StateHistory'
        if (request)
            url += '?' + this.getListQueryParams(request);
        console.log('url', url);
        let resp = await this.createRequestPromise<Array<StateHistoryListItem>>(url, 'GET');
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
    public async GetPaymentsHistory(request?: GetListRequest<any>): Promise<HttpResponseResult<GetListResponse<any>>> {

        var url = '/PaymentsHistory'
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
    public async GetResponsibleUsers(request?: GetListRequest<any>): Promise<HttpResponseResult<GetListResponse<any>>> {

        var url = '/ResponsibleUsers'
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
    public async GetStatusHistory(request?: GetListRequest<any>): Promise<HttpResponseResult<GetListResponse<any>>> {

        var url = '/StatusHistory'
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
}