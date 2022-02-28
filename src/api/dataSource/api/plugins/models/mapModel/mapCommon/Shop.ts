import entityIdNumber from "@/api/dataSource/api/plugins/models/mapModel/mapCommon/entityIdNumber"
import EnterpriseForOthers from "../enterprises/EnterpriseForOthers"

export default class Shop{
    Id:number = null
    Code:number = null
    Name:string = ""
    FullName:string = ""
    Enterprise:EnterpriseForOthers = new  EnterpriseForOthers() 
    Agent:entityIdNumber = new entityIdNumber()
    Represantative:entityIdNumber =new entityIdNumber()
    BrendName:string
    Address:string
    Phone:string
    Fax:string
    BillingType:number
    Notes:string
    DateAdd:Date
    DateChange:Date
    Editor: any= null
    State:number
}