//#region import
import { createRouter, createWebHistory, RouteRecordRaw, RouterView } from "vue-router";

import LoginPageComponent from "@/views/pages/login/login.vue"
import ForgotPasswordPageComponent from "@/views/pages/login/forgot-password.vue"
import ErrorPageComponent from "@/views/pages/login/404-page.vue"
import NewsPageComponent from "@/views/pages/news/news.vue"
const Layout = () => import("@/views/layouts/layout.vue");
const BaseTemplate = () => import("@/views/layouts/base-layout.vue");
const HomePage = () => import("@/views/pages/home.vue");
//#region search-for-payments
// import TerminalMonitoringPageComponent from "@/views/pages/search-for-payments/terminal-monitoring/terminal-monitoring.vue"
// import TerminalQueriesPageComponent from "@/views/pages/search-for-payments/terminal-queries.vue"
// import TerminalServicePageComponent from "@/views/pages/search-for-payments/terminal-service.vue"
// import TerminalManagementPageComponent from "@/views/pages/search-for-payments/terminal-management.vue"
// import CertificateRequestsPageComponent from "@/views/pages/search-for-payments/certificate-requests.vue"
// import BuyersCabinetPageComponent from "@/views/pages/search-for-payments/buyer's-cabinet.vue"
// import IncidentsPageComponent from "@/views/pages/search-for-payments/incidents.vue"
// import FiscalDataPageComponent from "@/views/pages/search-for-payments/fiscal-data.vue"
// import FiscalTransactionRecoveryPageComponent from "@/views/pages/search-for-payments/fiscal-transaction-recovery.vue"
// import AgentRegistrationWinAppPageComponent from "@/views/pages/search-for-payments/agent-registration-win-app.vue"
//#endregion

// //#region отчеты
// import BalanceForThePeriodPageComponent from "@/views/pages/reports/balance-for-the-period.vue"
// import PaymentsAcceptedGroupingPageComponent from "@/views/pages/reports/payments-accepted-grouping.vue"
// import PaymentsAcceptedPageComponent from "@/views/pages/reports/payments-accepted.vue"
// //#endregion 

// //#region финансы
// import RefundPaymentsPageComponent from "@/views/pages/finance/refund-payments.vue"
// import EnterpriseLimitsPageComponent from "@/views/pages/finance/enterprise-limits.vue"
// import BalanceOfEnterprisesPageComponent from "@/views/pages/finance/balance-of-enterprises.vue"
// //#endregion 

// //#region терминалы
// import TerminalMonitoringPageComponentTerminal from "@/views/pages/terminals/terminal-monitoring/terminal-monitoring.vue"
// import TerminalQueriesPageComponentTerminal from "@/views/pages/terminals/terminal-queries.vue"
// import TerminalServicePageComponentTerminal from "@/views/pages/terminals/terminal-service.vue"
// import TerminalManagementPageComponentTerminal from "@/views/pages/terminals/terminal-management.vue"
// import CertificateRequestsPageComponentTerminal from "@/views/pages/terminals/certificate-requests.vue"
// import BuyersCabinetPageComponentTerminal from "@/views/pages/terminals/buyer's-cabinet.vue"
// import IncidentsPageComponentTerminal from "@/views/pages/terminals/incidents.vue"
// import FiscalDataPageComponentTerminal from "@/views/pages/terminals/fiscal-data.vue"
// import FiscalTransactionRecoveryPageComponentTerminal from "@/views/pages/terminals/fiscal-transaction-recovery.vue"
// import AgentRegistrationWinAppPageComponentTerminal from "@/views/pages/terminals/agent-registration-win-app.vue"
// import TerminalDetailsPageComponent from "@/views/pages/terminals/terminal-monitoring/terminal-monitoring-detail.vue"
// //#endregion 

//#region настройки
// import CustomizationPageComponent from "@/views/pages/customization/customization.vue"
//#endregion 

//#region справочники
// import BindingCertificatesPageComponent from "@/views/pages/reference-books/binding-certificates.vue"
// import BlacklistOfPhonesPageComponent from "@/views/pages/reference-books/blacklist-of-phones.vue"
// import CashRegistersPageComponent from "@/views/pages/reference-books/cash-registers.vue"
// import CertificatesPageComponent from "@/views/pages/reference-books/certificates.vue"
// import ContractsPageComponent from "@/views/pages/reference-books/contracts.vue"
// import EnterprisesPageComponent from "@/views/pages/reference-books/enterprises/enterprises.vue"
// import FinancialCategoriesPageComponent from "@/views/pages/reference-books/financial-categories.vue"
// import GatewaysPageComponent from "@/views/pages/reference-books/gateways.vue"
// import MappingErrorsPageComponent from "@/views/pages/reference-books/mapping-errors.vue"
// import OperatorsPageComponent from "@/views/pages/reference-books/operators.vue"
// import PointsPageComponent from "@/views/pages/reference-books/points/points.vue"
// import ShopsPageComponent from "@/views/pages/reference-books/shops/shops.vue"
// import EnterprisesDetailsPageComponent from "@/views/pages/reference-books/enterprises/enterprises-detail.vue"
// import ShopDetailsPageComponent from "@/views/pages/reference-books/shops/shops-detail.vue"
// import PointDetailsPageComponent from "@/views/pages/reference-books/points/points-detail.vue"
// import HomePageComponent from "@/views/pages/home.vue"
import RegistrationPage from "@views/pages/login/registration.vue"
//#endregion 

import {
  DEFAULT, TERMINALMONITORING, TERMINALQUERIES, TERMINALSERVICE,
  TERMINALMANAGEMENT, CERTIFICATEREQUESTS, BUYERSCABINET, INCIDENTS, FISCALDATA,
  AGENTREGISTRATIONWINAPP, FISCALTRANSACTIONRECOVERY, BALANCEOFENTERPRISES, ENTERPRISELIMITS, REFUNDPAYMENTS,
  CUSTOMIZATION, BINDINGCERTIFICATES, BLACKLISTOFPHONES, CASHREGISTERS, CERTIFICATES, CONTRACTS, ENTERPRISES, FINANCIALCATEGORIES,
  GATEWAYS, MAPPINGERRORS, OPERATORS, POINTS, SHOPS,
  PAYMENTS, FINANCE, TERMINALS, REFERENCEBOOKS, SHOPSDETAIL,
  TERMINALMONITORINGTERMINAL, TERMINALQUERIESTERMINAL, ENTERPRISESDETAIL,
  TERMINALSERVICETERMINAL, TERMINALMANAGEMENTTERMINAL, CERTIFICATEREQUESTSTERMINAL,
  BUYERSCABINETTERMINAL, INCIDENTSTERMINAL, FISCALDATATERMINAL, FISCALTRANSACTIONRECOVERYTERMINAL, AGENTREGISTRATIONWINAPPTERMINAL,
  POINTSDETAIL,POINTSCREATE,REPORTS,
  LOGIN, FORGOTPESSWORD, NEWS,ENTERPRISESCREATE,SHOPSCREATE,TERMINALMONITORINGTERMINALDETAIL,BALANCEFORTHEPERIOD,PAYMENTSACCEPTEDGROUPING,PAYMENTSACCEPTED
 , REGISTRATION
} from "./routerNames";

//#endregion
const routes: Array<RouteRecordRaw> = [
  //LoginPageComponent
  {
    name: LOGIN,
    path: "/login",
    component: LoginPageComponent,
    meta: {
      title: "Авторизация",
      allowAnonymous: true,
      // middleware: [
      //   new DocumentTitleMiddleware()
      // ]
    }
  },
  {
    name: DEFAULT,
    path: "/",
    redirect: "login"
  },

  {
    name: FORGOTPESSWORD,
    path: '/forgot-password',
    component: ForgotPasswordPageComponent,
    meta: {
      allowAnonymous: true,
    }
  },
  {
    name: REGISTRATION,
    path: '/registration',
    component: RegistrationPage,
    meta: {
      allowAnonymous: true,
      title: "registration" 
    }
  },
  // {
  //   name: "new-password", path: '/new-password', props: true,
  //   component: NewPassword, meta: {
  //     allowAnonymous: true,
  //   }
  // },
  {
    path: '/',
    component: Layout,
    children: [
      {
        name: NEWS,
        path: '/news',
        component: NewsPageComponent,
      }
    ]
  },
  // {
  //   path: "/",
  //   component: Layout,
  //   meta: {
  //   },
  //   children: [
  //     {
  //       name: PAYMENTS,
  //       path: "payments",
  //       redirect: { name: TERMINALMONITORING },
  //       component: BaseTemplate,
  //       children: [
  //         {
  //           name: TERMINALMONITORING,
  //           path: "search-terminal-monitoring",
  //           component: TerminalMonitoringPageComponent,
  //           meta: { title: "Мониторинг терминалов" }
  //         },
  //         {
  //           name: TERMINALQUERIES,
  //           path: "search-terminal-queries",
  //           component: TerminalQueriesPageComponent,
  //           props: true,
  //           meta: { title: "Запросы к терминалам" }
  //         },
  //         {
  //           name: TERMINALSERVICE,
  //           path: "search-terminal-service",
  //           component: TerminalServicePageComponent,
  //           props: true,
  //           meta: { title: "Сервис терминалов" }
  //         },
  //         {
  //           name: TERMINALMANAGEMENT,
  //           path: "search-terminal-management",
  //           component: TerminalManagementPageComponent,
  //           props: true,
  //           meta: { title: "Управление терминалами" }
  //         },
  //         {
  //           name: CERTIFICATEREQUESTS,
  //           path: "search-certificate-requests",
  //           component: CertificateRequestsPageComponent,
  //           props: true,
  //           meta: { title: "Запросы сертификатов" }
  //         },
  //         {
  //           name: BUYERSCABINET,
  //           path: "search-buyer's-cabinet",
  //           component: BuyersCabinetPageComponent,
  //           props: true,
  //           meta: { title: "Кабинет покупателя" }
  //         },
  //         {
  //           name: INCIDENTS,
  //           path: "search-incidents",
  //           component: IncidentsPageComponent,
  //           props: true,
  //           meta: { title: "Инциденты" }
  //         },
  //         {
  //           name: FISCALDATA,
  //           path: "search-fiscal-data",
  //           component: FiscalDataPageComponent,
  //           props: true,
  //           meta: { title: "Фискальные данные" }
  //         }, {
  //           name: FISCALTRANSACTIONRECOVERY,
  //           path: "search-fiscal-transaction-recovery",
  //           component: FiscalTransactionRecoveryPageComponent,
  //           props: true,
  //           meta: { title: "Восстановление фискальной транзакции" }
  //         },
  //         {
  //           name: AGENTREGISTRATIONWINAPP,
  //           path: "search-agent-registration-win-app",
  //           component: AgentRegistrationWinAppPageComponent,
  //           props: true,
  //           meta: { title: "Регистрация WIN/APP агента" }
  //         },
  //       ]
  //     },
  //     // {
  //     //   path: "reports",
  //     //   component: BaseTemplate,
  //     //   children: [
  //     //     {
  //     //       name: REPORTS,
  //     //       path: "",
  //     //       component: ReportsPageComponent,
  //     //       meta: { title: "Отчеты" }
  //     //     },
  //     //   ]
  //     // },
  //     {
  //       name: REPORTS,
  //       path: "reports",
  //       redirect: { name: PAYMENTSACCEPTED },
  //       component: BaseTemplate,
  //       children: [
  //         {
  //           name: PAYMENTSACCEPTED,
  //           path: "payments-accepted",
  //           component: PaymentsAcceptedPageComponent,
  //           meta: { title: "Принятые платежы" }
  //         },
  //         {
  //           name: PAYMENTSACCEPTEDGROUPING,
  //           path: "payments-accepted-grouping",
  //           component: PaymentsAcceptedGroupingPageComponent,
  //           props: true,
  //           meta: { title: "Принятые платежы с группировкой" }
  //         },
  //         {
  //           name: BALANCEFORTHEPERIOD,
  //           path: "balance-for-the-period",
  //           component: BalanceForThePeriodPageComponent,
  //           props: true,
  //           meta: { title: "Баланс за период" }
  //         },
  //       ]
  //     },


  //     {
  //       name: FINANCE,
  //       path: "finance",
  //       redirect: { name: REFUNDPAYMENTS },

  //       component: BaseTemplate,
  //       children: [
  //         {
  //           name: BALANCEOFENTERPRISES,
  //           path: "balance-of-enterprises",
  //           component: BalanceOfEnterprisesPageComponent,
  //           meta: { title: "Баланс предприятий" }
  //         },
  //         {
  //           name: ENTERPRISELIMITS,
  //           path: "enterprise-limits",
  //           component: EnterpriseLimitsPageComponent,
  //           props: true,
  //           meta: { title: "Лимиты предприятий" }
  //         },
  //         {
  //           name: REFUNDPAYMENTS,
  //           path: "refund-payments",
  //           component: RefundPaymentsPageComponent,
  //           props: true,
  //           meta: { title: "Платежи возмещения" }
  //         },
  //       ]
  //     },
  //     {
  //       name: TERMINALS,
  //       path: "terminals",
  //       redirect: { name: TERMINALMONITORINGTERMINAL },
  //       component: BaseTemplate,
  //       children: [
  //         //TERMINALMONITORINGTERMINALDETAIL
  //         {
  //           path: "terminal-monitoring",
  //           component: BaseTemplate,
  //           children: [
  //             {
  //               name: TERMINALMONITORINGTERMINAL,
  //               path: "",
  //               props: true,
  //               component: TerminalMonitoringPageComponentTerminal,
  //               meta: { title: "Мониторинг терминалов" }
  //             },
  //             {
  //               name: TERMINALMONITORINGTERMINALDETAIL,
  //               path: ":id",
  //               component: TerminalDetailsPageComponent,
  //               props: true,
  //               meta: { title: "Детали терминала" }
  //             },
              
  //           ]
  //         },
  //         // {
  //         //   name: TERMINALMONITORINGTERMINAL,
  //         //   path: "terminal-monitoring",
  //         //   component: TerminalMonitoringPageComponentTerminal,
  //         //   meta: { title: "Мониторинг терминалов" }
  //         // },
  //         {
  //           name: TERMINALQUERIESTERMINAL,
  //           path: "terminal-queries",
  //           component: TerminalQueriesPageComponentTerminal,
  //           props: true,
  //           meta: { title: "Запросы к терминалам" }
  //         },
  //         {
  //           name: TERMINALSERVICETERMINAL,
  //           path: "terminal-service",
  //           component: TerminalServicePageComponentTerminal,
  //           props: true,
  //           meta: { title: "Сервис терминалов" }
  //         },
  //         {
  //           name: TERMINALMANAGEMENTTERMINAL,
  //           path: "terminal-management",
  //           component: TerminalManagementPageComponentTerminal,
  //           props: true,
  //           meta: { title: "Управление терминалами" }
  //         },
  //         {
  //           name: CERTIFICATEREQUESTSTERMINAL,
  //           path: "certificate-requests",
  //           component: CertificateRequestsPageComponentTerminal,
  //           props: true,
  //           meta: { title: "Запросы сертификатов" }
  //         },
  //         {
  //           name: BUYERSCABINETTERMINAL,
  //           path: "buyer's-cabinet",
  //           component: BuyersCabinetPageComponentTerminal,
  //           props: true,
  //           meta: { title: "Кабинет покупателя" }
  //         },
  //         {
  //           name: INCIDENTSTERMINAL,
  //           path: "incidents",
  //           component: IncidentsPageComponentTerminal,
  //           props: true,
  //           meta: { title: "Инциденты" }
  //         },
  //         {
  //           name: FISCALDATATERMINAL,
  //           path: "fiscal-data",
  //           component: FiscalDataPageComponentTerminal,
  //           props: true,
  //           meta: { title: "Фискальные данные" }
  //         }, {
  //           name: FISCALTRANSACTIONRECOVERYTERMINAL,
  //           path: "fiscal-transaction-recovery",
  //           component: FiscalTransactionRecoveryPageComponentTerminal,
  //           props: true,
  //           meta: { title: "Восстановление фискальной транзакции" }
  //         },
  //         {
  //           name: AGENTREGISTRATIONWINAPPTERMINAL,
  //           path: "agent-registration-win-app",
  //           component: AgentRegistrationWinAppPageComponentTerminal,
  //           props: true,
  //           meta: { title: "Регистрация WIN/APP агента" }
  //         },
  //       ]
  //     },
  //     {
  //       path: "customization",
  //       component: BaseTemplate,
  //       children: [
  //         {
  //           name: CUSTOMIZATION,
  //           path: "",
  //           component: CustomizationPageComponent,
  //           meta: { title: "Настройки" }
  //         },
  //       ]
  //     },
  //     {
  //       name: REFERENCEBOOKS,
  //       path: "reference-books",
  //       redirect: { name: ENTERPRISES },
  //       component: BaseTemplate,
  //       children: [
  //         {
  //           path: "enterprises",
  //           component: BaseTemplate,
  //           children: [
  //             {
  //               name: ENTERPRISES,
  //               path: "",
  //               props: true,
  //               component: EnterprisesPageComponent,
  //               meta: { title: "Предприятия" }
  //             },
  //             {
  //               name: ENTERPRISESCREATE,
  //               path: "create",
  //               component: EnterprisesDetailsPageComponent,
  //               props: true,
  //               meta: { title: "Создать предприятие" }
  //             },
  //             {
  //               name: ENTERPRISESDETAIL,
  //               path: ":id",
  //               component: EnterprisesDetailsPageComponent,
  //               props: true,
  //               meta: { title: "Детали предприятия" }
  //             },
              
  //           ]
  //         },
  //         {
  //           path: "shops",
  //           component: BaseTemplate,
  //           children: [
  //             {
  //               name: SHOPS,
  //               path: "",
  //               props: true,
  //               component: ShopsPageComponent,
  //               meta: { title: "Магазины" }
  //             },
  //             {
  //               name: SHOPSCREATE,
  //               path: "create",
  //               component: ShopDetailsPageComponent,
  //               props: true,
  //               meta: { title: "Создать магазин" }
  //             },
  //             {
  //               name: SHOPSDETAIL,
  //               path: ":id",
  //               component: ShopDetailsPageComponent,
  //               props: true,
  //               meta: { title: "Детали магазина" }
  //             },
  //           ]
  //         },
  //         {
  //           path: "points",
  //           component: BaseTemplate,
  //           children: [
  //             {
  //               name: POINTS,
  //               path: "",
  //               props: true,
  //               component: PointsPageComponent,
  //               meta: { title: "Точки" }
  //             },
  //             {
  //               name: POINTSDETAIL,
  //               path: ":id",
  //               component: PointDetailsPageComponent,
  //               props: true,
  //               meta: { title: "Детали точки" }
  //             },
  //             {
  //               name: POINTSCREATE,
  //               path: "create",
  //               component: PointDetailsPageComponent,
  //               props: true,
  //               meta: { title: "Создание точки" }
  //             },
  //           ]
  //         },
  //         {
  //           name: CERTIFICATES,
  //           path: "certificates",
  //           component: CertificatesPageComponent,
  //           props: true,
  //           meta: { title: "Сертификаты" }
  //         },
  //         {
  //           name: BINDINGCERTIFICATES,
  //           path: "binding-certificates",
  //           component: BindingCertificatesPageComponent,
  //           meta: { title: "Привязка сертификатов" }
  //         },

  //         {
  //           name: CONTRACTS,
  //           path: "contracts",
  //           component: ContractsPageComponent,
  //           props: true,
  //           meta: { title: "Договоры" }
  //         },
  //         {
  //           name: GATEWAYS,
  //           path: "gateways",
  //           component: GatewaysPageComponent,
  //           meta: { title: "Шлюзы" }
  //         },
  //         {
  //           name: OPERATORS,
  //           path: "operators",
  //           component: OperatorsPageComponent,
  //           props: true,
  //           meta: { title: "Операторы" }
  //         },
  //         {
  //           name: MAPPINGERRORS,
  //           path: "mapping-errors",
  //           component: MappingErrorsPageComponent,
  //           props: true,
  //           meta: { title: "Маппинг ошибок" }
  //         },
  //         {
  //           name: FINANCIALCATEGORIES,
  //           path: "financial-categories",
  //           component: FinancialCategoriesPageComponent,
  //           props: true,
  //           meta: { title: "Финансовые категории" }
  //         },
  //         {
  //           name: CASHREGISTERS,
  //           path: "cash-registers",
  //           component: CashRegistersPageComponent,
  //           props: true,
  //           meta: { title: "Кассовые аппараты" }
  //         },
  //         {
  //           name: BLACKLISTOFPHONES,
  //           path: "blacklist-of-phones",
  //           component: BlacklistOfPhonesPageComponent,
  //           meta: { title: "Черный список телефонов" }
  //         },
  //       ]
  //     },
  //   ]
  // },
  { path: '/:pathMatch(.*)*', component: ErrorPageComponent },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


export default router;
