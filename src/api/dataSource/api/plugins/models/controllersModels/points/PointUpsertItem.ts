import Address from "../common/Address"
import Editor from "../common/Editor"
import entityIdNumber from "../common/entityIdNumber"
import Shop from "../common/Shop"

export default class PointUpsertItem {    
    Enterprise?:entityIdNumber
    ShopId?: number
    PosType?: entityIdNumber
    IsBrsPoint?: boolean
    BusinessHours?: string
    Weekends?: string[]
    RegistrationStatus?: number
    ShopPosCode?: string
    BeepayPosCode?: string
    Online?: number
    DeviceType?: entityIdNumber
    BillingType?: number
    N4AliveTimeout?: number
    DayLimit?: number
    WeekLimit?: number
    MonthLimit?: number
    Address?: Address
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
    Color?: entityIdNumber
    pos_LAST_N4UPLOAD_DATE?: Date
    TerminalState?: number
    BanknotesMaxCount?: number
    DispenserUse?: boolean
    TerminalStateComment?: string
    TerminalPlaceComment1?: string
    Editor?:Editor
    Shop?:Shop
}