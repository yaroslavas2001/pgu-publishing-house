import Address from "../mapCommon/Address"
import Color from "../mapCommon/Color"
import Editor from "../mapCommon/Editor"
import entityIdNumber from "../mapCommon/entityIdNumber"
import ModelIN from "../mapCommon/ModelIN"
import Shop from "../mapCommon/Shop"

export default class PointDetailMapper {
    Id:number
    Address: Address = new Address()
    DeviceType: ModelIN = new ModelIN()
    Editor: Editor = new Editor()
    Shop: Shop = new Shop()
    Type: ModelIN = new ModelIN()
    PosType: entityIdNumber = new entityIdNumber() 
    IsBrsPoint: boolean
    BusinessHours: string = ""
    Weekends: string[]
    RegistrationStatus: number 
    ShopPosCode: string = ""
    BeepayPosCode: string = ""
    Online: number
    BillingType: number = 0
    N4AliveTimeout: number 
    DayLimit: number 
    WeekLimit: number 
    MonthLimit: number 
    JurAdress: string = ""
    TopAdvertise: string = ""
    Longtitude: string = ""
    Latitude: string = ""
    TechnicianId: number 
    ManagerId: number 
    CollectorId: number
    Notes: string = ""
    SerialNum: number = null
    SoftVersion: string = ""
    N4GWVersion: string = ""
    Mobile: string = ""
    Color: Color = new Color()
    pos_LAST_N4UPLOAD_DATE: Date
    TerminalState: number
    BanknotesMaxCount: number
    DispenserUse: boolean
    TerminalStateComment: string = ""
    TerminalPlaceComment1: string = ""
    CalculatedAddress: string = null
    CoinsMaxCount: number 
    Curator: string = ""
    DateChange: Date
    IsMonitoring: number 
    Name: string = ""
    Password: any
    PrevPosId: number 
    RejectPercent: any
    Rssi: any
    State: number 
    ReportSendTime: string =""
    constructor(obj?: Partial<PointDetailMapper>) {
        if (obj != null) {
            Object.assign(this, obj);
        }
    }
}