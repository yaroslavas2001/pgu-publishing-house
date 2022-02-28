import Editor from "../common/Editor"
import entityIdNumber from "../common/entityIdNumber"
import EnterpriseDetailItem from "../enterprises/EnterpriseDetailItem"

export default class Shop{
    Id?:number
    Code?:number
    Name?:string
    FullName?:string
    Enterprise?:EnterpriseDetailItem
    Agent?:entityIdNumber
    Represantative?:entityIdNumber
    BrendName?:string
    Address?:string
    Phone?:string
    Fax?:string
    BillingType?:number
    Notes?:string
    DateAdd?:Date
    DateChange?:Date
    Editor?:Editor
    State?:number
}