import moment from "moment";

export default class SearchBalanceForThePeriod {
    EnterpriseId: number = null;
    ContractId: number = null;
    PaymentTypeId:number = null;
    IncludeExternalPayments:boolean=false

    fromDate: Date = moment(
        moment(new Date().setDate(new Date().getDate() -14)).format("YYYY-MM-DD 00:00")
    ).toDate();
    //new Date().setDate(new Date().getDate()-14)
    toDate: Date = moment(
        moment(new Date()).format("YYYY-MM-DD 00:00")
    ).toDate();
}