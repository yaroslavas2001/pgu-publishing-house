import PageModel from "../Page/PageModel"

export default class GetReviewerRequestModel {
   search?:string
   publicationId?:number
   reviewerId?:number
   page:PageModel
}