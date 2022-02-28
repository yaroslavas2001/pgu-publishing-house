import moment from "moment";

export default class SearchPaymentsAccepted {
    EnterpriseId: number = null;
    ContractId: number = null;
    RegionId: number = null;
    ShopId: number = null;
    PosCode: number = null;
    StatusId: number = 1;
    OperatorId: number = null;
    IsControlFinance: boolean = false;
    ExcludeCanceledPayments: boolean = false;
    fromDate: Date = moment(
        moment(new Date().setDate(new Date().getDate() -14)).format("YYYY-MM-DD 00:00")
    ).toDate();
    toDate: Date = moment(
        moment(new Date()).format("YYYY-MM-DD 00:00")
    ).toDate();
}