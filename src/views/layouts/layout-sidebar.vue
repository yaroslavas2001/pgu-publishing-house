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
            <router-link class="lev1" :to="{ name: TerminalMonitoring }">
              <i class="icon search"></i>
              Поиск <br v-if="minimized" />
              платежей
            </router-link>
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
            </ul>
          </li>

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

              <li>
                <router-link class="menu-item" :to="{ name: Points }">
                  Точки</router-link
                >
              </li>
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
</style>
