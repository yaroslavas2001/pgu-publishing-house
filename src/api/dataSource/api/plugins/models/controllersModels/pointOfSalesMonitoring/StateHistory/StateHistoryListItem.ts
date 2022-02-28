import AppInfo from "../../common/AppInfo"
import DiskFreeSpaces from "../../common/DiskFreeSpaces"
import SimList from "../../common/SimList"
import PointDetailItem from "../../points/PointDetailItem"

export default class StateHistoryListItem {
    AvailabilityStatus?: string
    AvgPaperLenght?: number
    Balance?: any
    BankNotesCount?: number
    BankNotesMaxCount?: number
    BankNotesSumma?: number
    CalculatedState?: number
    CashinnerState?: number
    CashinnerStatus?: string
    CoinsCount?: number
    CoinsMaxCount?: number
    CoinsSumma?: number
    CountActivities?: number
    CountTranNotFinished?: number
    CountTranOK?: number
    CurrentPaperLenghtAlarm?: number
    Date?: Date
    DeviceState?: number
    DispenserCaseDownCount?: number
    DispenserCaseDownNominal?: number
    DispenserCaseUpCount?: number
    DispenserCaseUpNominal?: number
    DispenserState?: number
    EntSstateId?: number
    Id?: number
    IsMonitoring?: boolean
    LastCashValidatorError?: any
    LastCoinValidatorError?: any
    LastDiskError?: any
    LastErrors?: any
    LastPrinterError?: any
    LastStart?: Date
    N4GwsrvVersion?: any
    OpenedDate?: Date
    PaperLength?: number
    PosStateId?: number
    PrinterState?: number
    RejectCountLowerCase?: number
    RejectCountUpperCase?: number
    ShopStateId?: number
    SimCount?: number
    SoftwareVersion?: any
    WatchdogState?: number
    AppInfo?:AppInfo
    DiskFreeSpaces?:DiskFreeSpaces
    PointOfSales?:PointDetailItem
    SimList?:Array<SimList>
}