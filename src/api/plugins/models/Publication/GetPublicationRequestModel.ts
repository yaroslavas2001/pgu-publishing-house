import SearchModel from "../Search/SearchModel"

export default class GetPublicationRequestModel extends SearchModel{
    publicationId?:number
    status?:number
    type?:number
    userId?:number
    reviewerId?:number
}