import PageModel from "./Page/PageModel"

export default class GeneralModel<T>{
    count: number
    items: T
    page: PageModel
}