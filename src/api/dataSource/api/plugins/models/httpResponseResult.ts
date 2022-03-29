import ErrorResponse from "./ErrorResponse"

export default class HttpResponseResult<T>{
    // IsSuccess: boolean
    // Response?: T
    // StatusCode: number
    // StatusText: string
    // ResponseHeaders: any
    // ErrorInfo?: ErrorResponse

    TypeName?: string
    isSuccess: boolean
    errorMessage: string
    stackTrace: string
    data: T
}