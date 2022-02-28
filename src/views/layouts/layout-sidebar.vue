<template>
  <div class="msb" id="msb" :class="{ minimized: minimized }">
    <nav class="navbar navbar-default" role="navigation">
      <!-- Main Menu -->
      <div class="side-menu-container">
        <a href="#" id="menuCollapse" @click="toggleMinimize">
          <span v-if="!minimized" class="roll__up">Свернуть меню</span>
          <div class="expand__img" v-else></div>
        </a>
        <ul class="nav navbar-nav">
          <!-- поиск платежей ===================================================================================== -->
          <li>
            <!-- <a
              href="#"
              class="lev1"
              v-on:click="showSearch = !showSearch"
              :class="{ lev1: showSearch }"
              ><i class="icon search"></i> Поиск платежей</a
            > -->
            <!-- class="sub-level" -->
            <router-link class="lev1" :to="{ name: TerminalMonitoring }">
              <i class="icon search"></i>
             Поиск <br v-if="minimized"> платежей
              </router-link>
            <!-- 
            <ul class="sub-level" v-if="!minimized">
              <li>
                <router-link
                  class="menu-item"
                  :to="{ name: TerminalMonitoring }"
                >
                  Мониторинг терминалов</router-link
                >
              </li> -->
            <!-- <li>
                <router-link class="menu-item" :to="{ name: TerminalQueries }">
                  Запросы к терминалам</router-link
                >
              </li>
              <li>
                <router-link class="menu-item" :to="{ name: TerminalService }">
                  Сервис терминалов</router-link
                >
              </li>
              <li>
                <router-link
                  class="menu-item"
                  :to="{ name: TerminalManagement }"
                >
                  Управление терминалами
                </router-link>
              </li>
              <li>
                <router-link
                  class="menu-item"
                  :to="{ name: CertificateRequests }"
                >
                  Запросы сертификатов</router-link
                >
              </li>
              <li>
                <router-link class="menu-item" :to="{ name: BuyersCabinet }">
                  Кабинет покупателя</router-link
                >
              </li>

              <li>
                <router-link class="menu-item" :to="{ name: Incidents }">
                  Инциденты</router-link
                >
              </li>
              <li>
                <router-link class="menu-item" :to="{ name: FiscalData }">
                  Фискальные данные</router-link
                >
              </li>
              <li>
                <router-link
                  class="menu-item"
                  :to="{ name: FiscalTransactionRecovery }"
                >
                  Восстановление фискальной транзакции</router-link
                >
              </li>
              <li>
                <router-link
                  class="menu-item"
                  :to="{ name: AgentRegistrationWinApp }"
                >
                  Регистрация WIN/APP агента</router-link
                >
              </li> -->
            <!-- </ul>-->
          </li>
          <!--отчеты ===================================================================================== -->

          <li>
            <router-link class="lev1" :to="{ name: Reports }">
              <i class="icon orders"></i> Отчеты
              </router-link>
            <ul class="sub-level" v-if="!minimized">
              <li>
                <router-link class="menu-item" :to="{ name: PaymentsAccepted }">
                  Принятые платежы</router-link
                >
              </li>
              <li>
                <router-link
                  class="menu-item"
                  :to="{ name: PaymentsAcceptedGrouping }"
                >
                  Принятые платежы с группировкой</router-link
                >
              </li>
              <li>
                <router-link
                  class="menu-item"
                  :to="{ name: BalanceForThePeriod }"
                >
                  Баланс за период</router-link
                >
              </li>
            </ul>
          </li>
          <!-- Финансы ===================================================================================== -->
          <!-- <li>
            <router-link class="lev1" :to="{ name: Finance }">
              <i class="icon fin"></i> Финансы</router-link
            >
            <ul class="sub-level" v-if="!minimized">
              <li>
                <router-link class="menu-item" :to="{ name: RefundPayments }">
                  Платежи возмещения</router-link
                >
              </li>
              <li>
                <router-link class="menu-item" :to="{ name: EnterpriseLimits }">
                  Лимиты предприятий</router-link
                >
              </li>
              <li>
                <router-link
                  class="menu-item"
                  :to="{ name: BalanceOfEnterprises }"
                >
                  Баланс предприятий</router-link
                >
              </li>
            </ul>
          </li> -->
          <!-- Терминалы ===================================================================================== -->
          <li>
            <router-link class="lev1" :to="{ name: Terminals }">
              <i class="icon term"></i>
              Терминалы
            </router-link>
            <ul class="sub-level" v-if="!minimized">
              <li>
                <router-link
                  class="menu-item"
                  :to="{ name: TerminalMonitoringTerminal }"
                >
                  Мониторинг терминалов</router-link
                >
              </li>
              <!-- <li>
                <router-link class="menu-item" :to="{ name: TerminalQueriesTerminal  }">
                  Запросы к терминалам</router-link
                >
              </li>
              <li>
                <router-link class="menu-item" :to="{ name: TerminalServiceTerminal  }">
                  Сервис терминалов</router-link
                >
              </li>
              <li>
                <router-link
                  class="menu-item"
                  :to="{ name: TerminalManagementTerminal  }"
                >
                  Управление терминалами
                </router-link>
              </li>
              <li>
                <router-link
                  class="menu-item"
                  :to="{ name: CertificateRequestsTerminal  }"
                >
                  Запросы сертификатов</router-link
                >
              </li>
              <li>
                <router-link class="menu-item" :to="{ name: BuyersCabinetTerminal  }">
                  Кабинет покупателя</router-link
                >
              </li>

              <li>
                <router-link class="menu-item" :to="{ name: IncidentsTerminal  }">
                  Инциденты</router-link
                >
              </li>
              <li>
                <router-link class="menu-item" :to="{ name: FiscalDataTerminal  }">
                  Фискальные данные</router-link
                >
              </li>
              <li>
                <router-link
                  class="menu-item"
                  :to="{ name: FiscalTransactionRecoveryTerminal  }"
                >
                  Восстановление фискальной транзакции</router-link
                >
              </li>
              <li>
                <router-link
                  class="menu-item"
                  :to="{ name: AgentRegistrationWinAppTerminal  }"
                >
                  Регистрация WIN/APP агента</router-link
                >
              </li> -->
            </ul>
          </li>
          <!-- Настройки ===================================================================================== -->
          <!-- <li>
            <router-link class="lev1" :to="{ name: Customization }">
              <i class="icon set"></i> Настройки</router-link
            >
          </li> -->
          <!-- Справочники ===================================================================================== -->
          <li>
            <!-- <a href="#" class="lev1"><i class="icon spr"></i> Справочники</a> -->
            <router-link class="lev1" :to="{ name: ReferenceBooks }">
              <i class="icon spr"></i> Справочники</router-link
            >
            <ul class="sub-level" v-if="!minimized">
              <li>
                <router-link class="menu-item" :to="{ name: Enterprises }">
                  Предприятия</router-link
                >
              </li>
              <li>
                <router-link class="menu-item" :to="{ name: Shops }">
                  Магазины</router-link
                >
              </li>
              <!-- <li>
                <router-link class="menu-item" :to="{ name: Certificates }">
                  Сертификаты</router-link
                >
              </li>
              <li>
                <router-link
                  class="menu-item"
                  :to="{ name: BindingCertificates }"
                >
                  Привязка сертификатов</router-link
                >
              </li> -->

              <li>
                <router-link class="menu-item" :to="{ name: Points }">
                  Точки</router-link
                >
              </li>
              <!-- <li>
                <router-link class="menu-item" :to="{ name: Contracts }">
                  Договоры</router-link
                >
              </li> -->
              <!-- <li>
                <router-link class="menu-item" :to="{ name: Gateways }">
                  Шлюзы</router-link
                >
              </li>
              <li>
                <router-link class="menu-item" :to="{ name: Operators }">
                  Операторы</router-link
                >
              </li>
              <li>
                <router-link class="menu-item" :to="{ name: MappingErrors }">
                  Маппинг ошибок</router-link
                >
              </li>
              <li>
                <router-link
                  class="menu-item"
                  :to="{ name: FinancialCategories }"
                >
                  Финансовые категории</router-link
                >
              </li>
              <li>
                <router-link class="menu-item" :to="{ name: CashRegisters }">
                  Кассовые аппараты</router-link
                >
              </li>
              <li>
                <router-link
                  class="menu-item"
                  :to="{ name: BlacklistOfPhones }"
                >
                  Черный список телефонов</router-link
                >
              </li> -->
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import {
  REPORTS,
  TERMINALMONITORING,
  TERMINALQUERIES,
  TERMINALSERVICE,
  TERMINALMANAGEMENT,
  CERTIFICATEREQUESTS,
  BUYERSCABINET,
  INCIDENTS,
  FISCALDATA,
  AGENTREGISTRATIONWINAPP,
  FISCALTRANSACTIONRECOVERY,
  BALANCEOFENTERPRISES,
  ENTERPRISELIMITS,
  REFUNDPAYMENTS,
  CUSTOMIZATION,
  BINDINGCERTIFICATES,
  BLACKLISTOFPHONES,
  CASHREGISTERS,
  CERTIFICATES,
  CONTRACTS,
  ENTERPRISES,
  FINANCIALCATEGORIES,
  GATEWAYS,
  MAPPINGERRORS,
  OPERATORS,
  POINTS,
  SHOPS,
  PAYMENTS,
  FINANCE,
  TERMINALS,
  REFERENCEBOOKS,
  TERMINALMONITORINGTERMINAL,
  TERMINALQUERIESTERMINAL,
  TERMINALSERVICETERMINAL,
  TERMINALMANAGEMENTTERMINAL,
  CERTIFICATEREQUESTSTERMINAL,
  BUYERSCABINETTERMINAL,
  INCIDENTSTERMINAL,
  FISCALDATATERMINAL,
  FISCALTRANSACTIONRECOVERYTERMINAL,
  AGENTREGISTRATIONWINAPPTERMINAL,
  TERMINALMONITORINGTERMINALDETAIL,
  BALANCEFORTHEPERIOD,
  PAYMENTSACCEPTEDGROUPING,
  PAYMENTSACCEPTED,
} from "@/router/routerNames";

@Options({
  components: {},
  name: "LayoutSidebar",
})
export default class LayoutSidebar extends Vue {
  Payments = PAYMENTS;
  Finance = FINANCE;
  Terminals = TERMINALS;
  ReferenceBooks = REFERENCEBOOKS;
  Customization = CUSTOMIZATION;
  BindingCertificates = BINDINGCERTIFICATES;
  BlacklistOfPhones = BLACKLISTOFPHONES;
  CashRegisters = CASHREGISTERS;
  Certificates = CERTIFICATES;
  Contracts = CONTRACTS;
  Enterprises = ENTERPRISES;
  FinancialCategories = FINANCIALCATEGORIES;
  Gateways = GATEWAYS;
  MappingErrors = MAPPINGERRORS;
  Operators = OPERATORS;
  Points = POINTS;
  Shops = SHOPS;
  RefundPayments = REFUNDPAYMENTS;
  EnterpriseLimits = ENTERPRISELIMITS;
  BalanceOfEnterprises = BALANCEOFENTERPRISES;
  TerminalMonitoring = TERMINALMONITORING;
  TerminalQueries = TERMINALQUERIES;
  TerminalService = TERMINALSERVICE;
  TerminalManagement = TERMINALMANAGEMENT;
  CertificateRequests = CERTIFICATEREQUESTS;
  BuyersCabinet = BUYERSCABINET;
  Incidents = INCIDENTS;
  FiscalData = FISCALDATA;
  FiscalTransactionRecovery = FISCALTRANSACTIONRECOVERY;
  AgentRegistrationWinApp = AGENTREGISTRATIONWINAPP;
  Reports = REPORTS;
  TerminalMonitoringTerminal = TERMINALMONITORINGTERMINAL;
  TerminalQueriesTerminal = TERMINALQUERIESTERMINAL;
  TerminalServiceTerminal = TERMINALSERVICETERMINAL;
  TerminalManagementTerminal = TERMINALMANAGEMENTTERMINAL;
  CertificateRequestsTerminal = CERTIFICATEREQUESTSTERMINAL;
  BuyersCabinetTerminal = BUYERSCABINETTERMINAL;
  IncidentsTerminal = INCIDENTSTERMINAL;
  FiscalDataTerminal = FISCALDATATERMINAL;
  FiscalTransactionRecoveryTerminal = FISCALTRANSACTIONRECOVERYTERMINAL;
  AgentRegistrationWinAppTerminal = AGENTREGISTRATIONWINAPPTERMINAL;
  PaymentsAccepted = PAYMENTSACCEPTED;
  PaymentsAcceptedGrouping = PAYMENTSACCEPTEDGROUPING;
  BalanceForThePeriod = BALANCEFORTHEPERIOD;

  minimized: boolean = false;

  toggleMinimize() {
    this.minimized = !this.minimized;
  }
}
</script>
<style lang="less">
.msb .navbar .nav > li a.lev1 {
  color: #0e357e;
  padding: 10px 12px;
  display: block;
  font-weight: 600;
}
.msb .navbar .nav > li a.lev1:hover {
  color: #71b92f;
}
.msb{
  z-index: 999;
}

.menu-item {
  font-family: "Montserrat", serif;
  white-space: normal;
  display: inline-block;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #0e357e;
  margin: 5px 0px;
}
.router-link-active {
  font-family: "Montserrat", serif;
  color: #71b92f !important;
  background: #fff;
  border-radius: 8px;
  padding: 10px 10px;
  font-weight: bold;
  .icon.term,
  .icon.fin,
  .icon.orders,
  .icon.search,
  .icon.set,
  .icon.spr {
    background-color: #71b92f;
  }
}
.msb .navbar .router-link-active + .sub-level {
  display: block;
}
.lev1 {
  font-family: "Montserrat", serif !important;
  display: flex !important;
  align-items: center;
  // flex-wrap: wrap;
}
.minimized {
  width: 115px;
  #menuCollapse {
    padding: 1px 47px !important;
  }
  li {
    padding: 0 !important;
    margin: 0 !important;
    .lev1 {
      flex-direction: column;
      margin: 0px auto;
      max-width: 100px;
      font-size: 12px;
      text-align: center;
    }
  }
}
.expand {
  margin-bottom: 13px;
  display: block;
  background: #8797af;
  font-size: 12px;
  line-height: 15px;
  color: #fff;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.expand__img {
  -webkit-mask: url("~@assets/img/side-out.svg") no-repeat 0 0;
  display: inline-block;
  width: 24px;
  height: 24px;
  background-color: #fff;
}
.minimized + .content .mcw {
  margin-left: 115px !important;
}
.roll__up {
  font-family: "Montserrat", serif;
}
</style>
