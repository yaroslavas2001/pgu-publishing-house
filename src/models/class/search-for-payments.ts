import moment from "moment";

export default class Search {
  phoneNumber: string = null;
  idInSystem = null;
  Note:string = null;
  IdOperator: number = null;
  IdN4Check:number = null;
  OperatorID: number = null;
  IdFiscal:number = null;
  PosTypeId: number = null;
  StatusId: number = null;
  ManualTransactionsOnly = false;
  EnterpriseId: number = null;
  ShopId: number = null;
  GatewayId: number = null;
  PosCode: any = null;
  StatusDateTypeId: number = 2;
  OnlyTranCopies: boolean = false;
  OperatorId: number = null;
  posPaymentType: number = null;
  PaymentStatus: Array<any> = [];
  NumbeRecords: Array<any> = [];
  StatusDateType: Array<any> = [];
  PosType: Array<any> = [];
  numbeRecordsId :number= 10;

  fromDate: Date = moment(
    moment(new Date().setDate(new Date().getDate()-14)).format("YYYY-MM-DD 00:00")
  ).toDate();
  toDate: Date = moment(
    moment(new Date()).format("YYYY-MM-DD 00:00")
  ).toDate();
}