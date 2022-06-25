import PageModel from "@/api/plugins/models/Page/PageModel";

export default class FilterModel<T>{
    page:PageModel
    search?:string
    common:T
}