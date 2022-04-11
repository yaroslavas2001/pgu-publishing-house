import { WebApiService } from './plugins/webApiService';
import RequestService from './plugins/services/requestsService';
import AuthService from './plugins/services/authService';
//модельки

// import PointOfSalesService from './plugins/services/pointOfSalesService';
import AuthorService from './plugins/services/AuthorService';
// import PointOfSalesMonitoring from './plugins/services/PointOfSalesMonitoring';


export default class ApiDataSource {
	webApiService: WebApiService;
	// ReportService: RequestService<ReportListRequest,ReportListItem,ReportDetailItem, ReportUpsertItem>; // вроде как все совпадает
	// PaymentsService:RequestService<PaymentsListRequest,PaymentsListItem,PaymentsDetailItem, PaymentsUpsertItem>;//нет деталей, item такое 
	// EnterpriseService: RequestService<EnterpriseListRequest,EnterpriseListItem,EnterpriseDetailItem, EnterpriseUpsertItem>;// в реквесте нужен сервис
	// ShopService:RequestService<ShopListRequest,ShopListItem,ShopDetailItem, ShopUpsertItem>; //все вроде ок
	// PointOfSalesService:PointOfSalesService//RequestService<PointListRequest,PointListItem, PointDetailItem,PointUpsertItem>;//тоже норм
	// LocalizationService:RequestService<LocalizationListRequest,LocalizationListItem,LocalizationDetailItem, LocalizationUpsertItem>;
	// PointOfSalesMonitoringService:  PointOfSalesMonitoring//RequestService<>;
	// ContractService:RequestService<ContractListRequest,ContractListItem,ContractDetailItem, ContractUpsertItem>;
	// CashRegisterService:RequestService<CashRegisterListRequest,CashRegisterListItem,CashRegisterDetailItem, CashRegisterUpsertItem>;
	// UserService :  UserService//RequestService<any,any,any, any>;
	// OperatorService : RequestService<OperatorRequest,OperatorListItem,OperatorDetailItem, OperatorUpsertItem>;
	// PosPaymentTypeService : RequestService<PosPaymentTypeServiceRequest,PosPaymentTypeServiceListItem,PosPaymentTypeServiceDetailItem, PosPaymentTypeServiceUpsertItem>;
	GetewayService: RequestService<any,any,any,any>
	// ShopService: RequestService<any,any,any,any>
	AuthService:AuthService
	AuthorService:AuthorService
	constructor(webApiUrl: string) {
		this.webApiService = new WebApiService(webApiUrl);
		this.AuthService = new AuthService(this.webApiService);
		this.AuthorService = new AuthorService(this.webApiService);

		// this.UserService = new UserService(this.webApiService) 

		// this.ReportService = new RequestService(this.webApiService,"Report");

		
		// this.EnterpriseService = new RequestService(this.webApiService,"Enterprise");
		// this.PaymentsService = new RequestService(this.webApiService,"Payments");
		// this.ShopService = new RequestService(this.webApiService,"Shop");
		// this.PointOfSalesService = new PointOfSalesService(this.webApiService);  
		// this.LocalizationService = new RequestService(this.webApiService,"Localization");//Localization язык
		// this.PointOfSalesMonitoringService = new PointOfSalesMonitoring(this.webApiService);
		// this.CashRegisterService = new RequestService(this.webApiService,"CashRegister");
		// this.OperatorService = new  RequestService(this.webApiService,"Operator");
		// this.PosPaymentTypeService = new  RequestService(this.webApiService,"PosPaymentType");
		this.GetewayService = new  RequestService(this.webApiService,"Gateway/DropDownList");
// 
		// this.ContractService = new RequestService(this.webApiService,"Contract");
	}
}