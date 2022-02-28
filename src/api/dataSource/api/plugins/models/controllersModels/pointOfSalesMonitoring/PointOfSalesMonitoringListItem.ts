import AppInfo from "../common/AppInfo"
import DiskFreeSpaces from "../common/DiskFreeSpaces"
import SimList from "../common/SimList"
import PointDetailItem from "../points/PointDetailItem"

export default class PointOfSalesMonitoringListItem {
    AppInfo?: AppInfo
    AvailabilityStatus?: string
    AvgPaperLenght?: number
    BankNotesCount?: number
    BankNotesMaxCount?: number
    Balance?:string
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
    DiskFreeSpaces?: Array<DiskFreeSpaces>
    DispenserCaseDownCount?: number
    DispenserCaseDownNominal?: number
    DispenserCaseUpCount?: number
    DispenserCaseUpNominal?: number
    DispenserState?: number
    EntSstateId?: number
    Id?: number
    IsMonitoring?: boolean
    LastCashValidatorError?: string
    LastCoinValidatorError?: string
    LastDiskError?: any
    LastPrinterError?: string
    LastStart?: Date
    OpenedDate?: Date
    PaperLength?: number
    PointOfSales?:PointDetailItem
    PosStateId?: number
    PrinterState?: number
    RejectCountLowerCase?: number
    RejectCountUpperCase?: number
    ShopStateId?: number
    SimCount?: number
    SimList?: Array<SimList>
    WatchdogState?: number
}