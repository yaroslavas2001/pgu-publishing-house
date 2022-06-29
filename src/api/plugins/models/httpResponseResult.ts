import ErrorResponse from "./ErrorResponse"

export default class HttpResponseResult<T>{
    isSuccess: boolean
    errorMessage: string
    stackTrace: string
    TypeName?: string
    data: T
}