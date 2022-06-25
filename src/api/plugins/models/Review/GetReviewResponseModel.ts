import FileGetResponseModel from "../File/FileGetResponseModel"

export default class GetReviewResponseModel{
   id:number
   comment:string
   files:Array<FileGetResponseModel>
}