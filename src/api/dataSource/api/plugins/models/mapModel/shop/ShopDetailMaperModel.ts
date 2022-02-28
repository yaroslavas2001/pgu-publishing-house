import Editor from "@/api/dataSource/api/plugins/models/mapModel/mapCommon/Editor"
import entityIdNumber from "@/api/dataSource/api/plugins/models/mapModel/mapCommon/entityIdNumber"
import EnterpriseForOthers from "../enterprises/EnterpriseForOthers"
import Agent from "../mapCommon/Agent"

export default class ShopDetailMapper {
    
    Id: number = undefined
    Code: string = ""
    Name: string = ""
    FullName: string = ""
    Enterprise: EnterpriseForOthers = new EnterpriseForOthers()
    Agent: Agent = new Agent()
    Represantative: entityIdNumber = new entityIdNumber()
    BrendName: string = ""
    Address: string = ""
    Phone: string = ""
    Fax: string = ""
    BillingType: number = 0
    Notes: string = ""
    DateAdd: Date
    DateChange: Date
    Editor: Editor// = new Editor()
    State: number 
    CassaSoft: any 
    constructor(obj?: Partial<ShopDetailMapper>) {
        if (obj != null) {
            Object.assign(this, obj);
        }
    }
}