import moment from "moment";

export default class SearchTerminal {
    EnterpriseId:number=null
    ShopId:number= null
    PosCode:any =null
    PosTypeId:number = null
    StateId:number=null
    PosStateId:number=1
    TerminalStatusId:number= null
  fromDate: Date = moment(
    moment(new Date()).format("YYYY-MM-DD 00:00")
  ).toDate();
}