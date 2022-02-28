import Agent from "../../mapModel/mapCommon/Agent"
import Editor from "../common/Editor"
import entityIdNumber from "../common/entityIdNumber"
import EnterpriseDetailItem from "../enterprises/EnterpriseDetailItem"

export default class ShopDetailItem {
    Id?: number 
    Code?: string 
    Name?: string
    FullName?: string
    Enterprise?: EnterpriseDetailItem
    Agent?: Agent
    Represantative?: entityIdNumber
    BrendName?: string
    Address?: string
    Phone?: string
    Fax?: string
    BillingType?: number
    Notes?: string
    DateAdd?: Date
    DateChange?: Date
    Editor?: Editor
    CassaSoft?:any
    State ? : number

}