import IPaginationResponse from "@/api/dataSource/api/plugins/models/IPaginationResponse"
export default class GetListResponse<T> implements IPaginationResponse{
//
    public Items: Array<T>
    public Count: number

    
}