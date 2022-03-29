import HttpResponseResult from "@/api/plugins/models/httpResponseResult";

export default interface getListInt<T>{
    IsSuccess?: boolean
    StatusCode?: number
    StatusText?: string
    ResponseHeaders?: any
    Response?: {
        Items ?:HttpResponseResult<T[]>,
        Count ?: number | undefined
    }
}