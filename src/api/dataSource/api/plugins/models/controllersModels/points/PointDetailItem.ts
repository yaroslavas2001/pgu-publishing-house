import Address from "../common/Address"
import Color from "../common/Color"
import Editor from "../common/Editor"
import entityIdNumber from "../common/entityIdNumber"
import ModelIN from "../common/ModelIN"
import Shop from "../common/Shop"

export default class PointDetailItem {
    Address?: Address
    DeviceType?: ModelIN
    Editor?: Editor
    Shop?: Shop
    Type?:ModelIN
    PosType?: entityIdNumber
    IsBrsPoint?: boolean
    BusinessHours?: string
    Weekends?: string[]
    RegistrationStatus?: number
    ShopPosCode?: string
    BeepayPosCode?: string
    Online?: number
    BillingType?: number
    N4AliveTimeout?: number
    DayLimit?: number
    WeekLimit?: number
    MonthLimit?: number
    JurAdress?: string
    TopAdvertise?: string
    Longtitude?: string
    Latitude?: string
    TechnicianId?: number
    ManagerId?: number
    CollectorId?: number
    Notes?: string
    SerialNum?: number
    SoftVersion?: string
    N4GWVersion?: string
    Mobile?: string
    Color?: Color
    pos_LAST_N4UPLOAD_DATE?: Date
    TerminalState?: number
    BanknotesMaxCount?: number
    DispenserUse?: boolean
    TerminalStateComment?: string
    TerminalPlaceComment1?: string
    CalculatedAddress?:string
    CoinsMaxCount?:number
    Curator?:string
    DateChange?:Date
    IsMonitoring?:number
    Name?:string
    Password?:any
    PrevPosId?:number
    RejectPercent?:any
    Rssi?:any
    State?:number
}