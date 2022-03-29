//#region import
import { createRouter, createWebHistory, RouteRecordRaw, RouterView } from "vue-router";

import LoginPageComponent from "@/views/pages/login/login.vue"
import ForgotPasswordPageComponent from "@/views/pages/login/forgot-password.vue"
import ErrorPageComponent from "@/views/pages/login/404-page.vue"
const BaseTemplate = () => import("@/views/layouts/base-layout.vue");
const AdminLayout = () => import("@views/layouts/admin/admin-layout.vue");

//#region search-for-payments

// import HomePageComponent from "@/views/pages/home.vue"
import RegistrationPage from "@views/pages/login/registration.vue"
//#endregion 


import Reviewer from "@views/pages/reviewer/reviewer.vue"
import Admin from "@views/pages/admin/admin.vue"
import AuthorsPage from "@views/pages/admin/authors/authors.vue"
import ArticlesPage from "@views/pages/admin/articles/articles.vue"
// import AdminLayout from "@views/layouts/admin/admin-layout.vue"


import UserPage from "@views/pages/user/user.vue"
import {
  DEFAULT, LOGIN, FORGOTPESSWORD, REGISTRATION,
  REVIEWER, ADMIN, USER, AUTHORS, ARTICLES
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
    name: REVIEWER,
    path: '/reviewer',
    component: Reviewer,
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

  {
    path: '/',
    component: BaseTemplate,
    children: [
      {
        name: ADMIN,
        path: ADMIN,
        component: AdminLayout,
        redirect: { name: AUTHORS },
        children: [
          {
            name: AUTHORS,
            path: AUTHORS,
            component: AuthorsPage,
            meta: { title: "авторы" }
          },
          {
            name: ARTICLES,
            path: ARTICLES,
            component: ArticlesPage,
            meta: { title: "Статьи" }
          },
        ]
      }
    ]
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   children: [
  //     {
  //       name: USER,
  //       path: '/user',
  //       component: UserPage,
  //     }
  //   ]
  // },
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
