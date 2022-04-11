import FileModel from "@/views/components/rio-psy/ui-file-input/FileModel"
import AuthorModel from "../author/AuthorModel"
export default class NewArticleModel {
    Article: Array<FileModel>
    AntiPlagiarism: Array<FileModel>
    Excerpt: Array<FileModel>
    NameArticle: string
    UDC: string
    Keywords:string
    Authors: Array<AuthorModel>
    Comments: string
    constructor(obj?: Partial<NewArticleModel>) {
        obj && Object.assign(this, obj);
    }
}