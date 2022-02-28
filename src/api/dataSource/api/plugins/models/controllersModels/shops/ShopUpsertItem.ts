import entityIdNumber from "../common/entityIdNumber"

export default class ShopUpsertItem{
    Id?:number
    Code?:string
    Name?:string
    FullName?:string
    Enterprise?:entityIdNumber
    BillingType?:number
}