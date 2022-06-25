import PageModel from "../Page/PageModel"

export default class GetReviewerRequestModel {
   search?:string
   publicationId?:string
   reviewerId?:number
   page:PageModel
}