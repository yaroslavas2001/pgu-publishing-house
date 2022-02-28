import { WebApiService } from "../webApiService";
import HttpResponseResult from "../models/httpResponseResult";
import GetListRequest from "../models/getListRequest";
import BaseRequestService from "./baseRequestService";
import GetListResponse from "../models/getListResponse";
interface Items {
    Items:Array<any>
    Count: number
}
export default class RequestService<TListRequest, TListItem, TDetailItem, TUpsertItem> extends BaseRequestService {    
    /**
     *
     */
    constructor(api:WebApiService, controllerName:string) {
        super(api,controllerName);
    }

    public async getList(request?: GetListRequest<TListRequest>): Promise<HttpResponseResult<GetListResponse<TListItem>>> //Array<TListItem>
    // Promise<HttpResponseResult<Array<TListItem>>>
    // Promise<HttpResponseResult<GetListResponse<Array<TListItem>>>> 
    {        
        var url = '/'
        if(request)
        url += '?'+this.getListQueryParams(request);
        console.log('url', url);
        
        let resp = await this.createRequestPromise<Array<TListItem>>(url,'GET'); 
        let contentRangeSplit = resp.ResponseHeaders['content-range']?.split('/')   
        // console.log('contentRangeSplit',contentRangeSplit,resp.ResponseHeaders['content-range']);
        
        // let count = undefined
        // if(!(contentRangeSplit && contentRangeSplit.length>1)){
        //     count = Math.ceil(resp.Response.length/10)
        // }
        return {
            IsSuccess: resp.IsSuccess,
            ResponseHeaders: resp.ResponseHeaders,
            StatusCode:resp.StatusCode,
            StatusText:resp.StatusText,
            Response: {
                Items : resp.Response,
                Count : contentRangeSplit && contentRangeSplit.length>1 ?Number(contentRangeSplit[1]):undefined
            }
        }
    }
    
    public getOne(id: number): Promise<HttpResponseResult<TDetailItem>> 
    {
        return this.createRequestPromise<TDetailItem>('/'+id,'GET');        
    }

    public getMany(ids: Array<number>): Promise<HttpResponseResult<Array<TDetailItem>>> 
    {
        var req = JSON.stringify({
            IdList:ids
        });
        return this.createRequestPromise<Array<TDetailItem>>('/?_filters='+req,'GET');        
    }
    public create(requestBody: TUpsertItem): Promise<HttpResponseResult<any>> 
    {        
        return this.createRequestPromise('/','POST',JSON.stringify(requestBody));        
    }
    public update(id:number,requestBody: TDetailItem): Promise<HttpResponseResult<any>> 
    {
        return this.createRequestPromise('/'+id,'PUT',JSON.stringify(requestBody));        
    }
    public delete(id: number): Promise<HttpResponseResult<any>> 
    {
        return this.createRequestPromise('/'+id,'DELETE');        
    }
    public deleteMany(ids: Array<number>): Promise<HttpResponseResult<any>> 
    {
        var req = JSON.stringify({
            IdList:ids
        });
        return this.createRequestPromise('/?_filters='+req,'DELETE');        
    }


    protected getListQueryParams<TRequest>(listRequest: GetListRequest<TRequest>): string{
        let params = [];
        
        if(listRequest._filters)
            params.push('_filters='+JSON.stringify(listRequest._filters));
        
        if(listRequest._page!=undefined)
            params.push('_page='+listRequest._page);

        if(listRequest._perPage!=undefined)
            params.push('_perPage='+listRequest._perPage);

        if(listRequest._sortDir!=undefined)
            params.push('_sortDir='+listRequest._sortDir);

        if(listRequest._sortField!=undefined)
            params.push('_sortField='+listRequest._sortField);
        
        let result = params.join('&');

        return result;
    }
    public toQueryParamsItem?(listRequest:Items): string {
        let params = [];

        if (listRequest.Items)
            params.push('Items' + JSON.stringify(listRequest.Items));

        if (listRequest)
            params.push('Count' + JSON.stringify(listRequest.Count));
        
        let result = params.join('&');

        return result;
    }
}



