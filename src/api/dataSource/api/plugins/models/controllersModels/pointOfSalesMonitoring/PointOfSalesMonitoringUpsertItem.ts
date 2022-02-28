import Name from "../common/Name"

export default class PointOfSalesMonitoringUpsertItem {
    Enterprise?: Name
    Shop?: Name
    ShopPosCode?: string
    CalcState?: string
    Balance?: string
    PrinterState?: string
    CashinerState?: string
    RejectPercent?: number
    DispencerCashOut1?: string
    DispencerCashOut2?: string
    Date?: Date
    SoftwareVersion?: string
    N4GwsrvVersion?: string
    AppInfo?: string
    LastErrors?: string
}