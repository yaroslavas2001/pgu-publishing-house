import { WebApiService } from './plugins/webApiService';
import RequestService from './plugins/services/requestsService';
import AuthService from './plugins/services/authService';
//модельки
import EnterpriseListItem from './plugins/models/controllersModels/enterprises/EnterpriseListItem';
import EnterpriseUpsertItem from './plugins/models/controllersModels/enterprises/EnterpriseUpsertItem';
import ReportListItem from './plugins/models/controllersModels/reports/ReportListItem';
import ReportUpsertItem from './plugins/models/controllersModels/reports/ReportUpsertItem';
import ShopListItem from './plugins/models/controllersModels/shops/ShopListItem';
import ShopUpsertItem from './plugins/models/controllersModels/shops/ShopUpsertItem';
import LocalizationListItem from './plugins/models/controllersModels/localizations/LocalizationListItem';
import LocalizationUpsertItem from './plugins/models/controllersModels/localizations/LocalizationUpsertItem';

import PaymentsUpsertItem from './plugins/models/controllersModels/payments/PaymentsUpsertItem';
import PaymentsListItem from './plugins/models/controllersModels/payments/PaymentsListItem';
import ReportDetailItem from './plugins/models/controllersModels/reports/ReportDetailItem';
import PaymentsDetailItem from './plugins/models/controllersModels/payments/PaymentsDetailItem';
import EnterpriseDetailItem from './plugins/models/controllersModels/enterprises/EnterpriseDetailItem';
import ShopDetailItem from './plugins/models/controllersModels/shops/ShopDetailItem';
import LocalizationDetailItem from './plugins/models/controllersModels/localizations/LocalizationDetailItem';
import ReportListRequest from './plugins/models/controllersModels/reports/ReportListRequest';
import EnterpriseListRequest from './plugins/models/controllersModels/enterprises/EnterpriseListRequest';
import PaymentsListRequest from './plugins/models/controllersModels/payments/PaymentsListRequest';
import ShopListRequest from './plugins/models/controllersModels/shops/ShopListRequest';
import LocalizationListRequest from './plugins/models/controllersModels/localizations/LocalizationListItem';
import ContractListRequest from './plugins/models/controllersModels/contracts/ContractListRequest';
import ContractListItem from './plugins/models/controllersModels/contracts/ContractListItem';
import ContractDetailItem from './plugins/models/controllersModels/contracts/ContractDetailItem';
import ContractUpsertItem from './plugins/models/controllersModels/contracts/ContractUpsertItem';
import OperatorRequest from './plugins/models/controllersModels/operator/OperatorRequest';
import OperatorListItem from './plugins/models/controllersModels/operator/OperatorListItem';
import OperatorDetailItem from './plugins/models/controllersModels/operator/OperatorDetailItem';
import OperatorUpsertItem from './plugins/models/controllersModels/operator/OperatorUpsertItem';
import PointOfSalesService from './plugins/services/pointOfSalesService';
import UserService from './plugins/services/UserService';
import CashRegisterUpsertItem from './plugins/models/controllersModels/cashRegister/CashRegisterUpsertItem';
import CashRegisterListRequest from "@/api/dataSource/api/plugins/models/controllersModels/cashRegister/CashRegisterListRequest"
import CashRegisterListItem from "@/api/dataSource/api/plugins/models/controllersModels/cashRegister/CashRegisterListItem"
import CashRegisterDetailItem from "@/api/dataSource/api/plugins/models/controllersModels/cashRegister/CashRegisterDetailItem"
import PosPaymentTypeServiceListItem from "@/api/dataSource/api/plugins/models/controllersModels/PosPaymentTypeService/PosPaymentTypeServiceListItem"
import PosPaymentTypeServiceUpsertItem from "@/api/dataSource/api/plugins/models/controllersModels/PosPaymentTypeService/PosPaymentTypeServiceUpsertItem"
import PosPaymentTypeServiceDetailItem from "@/api/dataSource/api/plugins/models/controllersModels/PosPaymentTypeService/PosPaymentTypeServiceDetailItem"
import PosPaymentTypeServiceRequest from "@/api/dataSource/api/plugins/models/controllersModels/PosPaymentTypeService/PosPaymentTypeServiceRequest"
import PointOfSalesMonitoring from './plugins/services/PointOfSalesMonitoring';


export default class ApiDataSource {
	webApiService: WebApiService;
	ReportService: RequestService<ReportListRequest,ReportListItem,ReportDetailItem, ReportUpsertItem>; // вроде как все совпадает
	PaymentsService:RequestService<PaymentsListRequest,PaymentsListItem,PaymentsDetailItem, PaymentsUpsertItem>;//нет деталей, item такое 
	EnterpriseService: RequestService<EnterpriseListRequest,EnterpriseListItem,EnterpriseDetailItem, EnterpriseUpsertItem>;// в реквесте нужен сервис
	ShopService:RequestService<ShopListRequest,ShopListItem,ShopDetailItem, ShopUpsertItem>; //все вроде ок
	PointOfSalesService:PointOfSalesService//RequestService<PointListRequest,PointListItem, PointDetailItem,PointUpsertItem>;//тоже норм
	LocalizationService:RequestService<LocalizationListRequest,LocalizationListItem,LocalizationDetailItem, LocalizationUpsertItem>;
	PointOfSalesMonitoringService:  PointOfSalesMonitoring//RequestService<>;
	ContractService:RequestService<ContractListRequest,ContractListItem,ContractDetailItem, ContractUpsertItem>;
	CashRegisterService:RequestService<CashRegisterListRequest,CashRegisterListItem,CashRegisterDetailItem, CashRegisterUpsertItem>;
	UserService :  UserService//RequestService<any,any,any, any>;
	OperatorService : RequestService<OperatorRequest,OperatorListItem,OperatorDetailItem, OperatorUpsertItem>;
	PosPaymentTypeService : RequestService<PosPaymentTypeServiceRequest,PosPaymentTypeServiceListItem,PosPaymentTypeServiceDetailItem, PosPaymentTypeServiceUpsertItem>;
	GetewayService: RequestService<any,any,any,any>
	// ShopService: RequestService<any,any,any,any>
	AuthService:AuthService;
	constructor(webApiUrl: string) {
		this.webApiService = new WebApiService(webApiUrl);
		this.AuthService = new AuthService(this.webApiService);
		this.ReportService = new RequestService(this.webApiService,"Report");
		this.EnterpriseService = new RequestService(this.webApiService,"Enterprise");
		this.PaymentsService = new RequestService(this.webApiService,"Payments");
		this.ShopService = new RequestService(this.webApiService,"Shop");
		this.PointOfSalesService = new PointOfSalesService(this.webApiService);  
		this.LocalizationService = new RequestService(this.webApiService,"Localization");//Localization язык
		this.PointOfSalesMonitoringService = new PointOfSalesMonitoring(this.webApiService);
		this.CashRegisterService = new RequestService(this.webApiService,"CashRegister");
		this.OperatorService = new  RequestService(this.webApiService,"Operator");
		this.UserService = new UserService(this.webApiService) 
		this.PosPaymentTypeService = new  RequestService(this.webApiService,"PosPaymentType");
		this.GetewayService = new  RequestService(this.webApiService,"Gateway/DropDownList");

		this.ContractService = new RequestService(this.webApiService,"Contract");
	}
}