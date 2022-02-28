import enterprise_id from "../common/enterprise_id"

export default class PointListItem {    
    Id?: number
    ShopPosCode?: string
    Shop?:enterprise_id
    ShopId?:number
    Address?:string
    SerialNum?:string
    RegistrationStatus?:number
    SoftVersion?:string
}