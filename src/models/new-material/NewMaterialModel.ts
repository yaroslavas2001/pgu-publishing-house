import FileModel from "@/views/components/rio-psy/ui-file-input/FileModel"
import AuthorModel from "../author/AuthorModel"
export default class NewMaterialModel {
    material: Array<FileModel>
    antiPlagiarism: Array<FileModel>
    excerpt: Array<FileModel>
    nameArticle: string
    udc: string
    tags:string
    authors: Array<AuthorModel>
    comments: string
    type:number
    status:number
    userId:number
    constructor(obj?: Partial<NewMaterialModel>) {
        obj && Object.assign(this, obj);
    }
}