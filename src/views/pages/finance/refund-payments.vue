<template>
  <div class="mcw">
    <div class="center">
      <div class="block w-70">
        <page-template>
          <template #header>
            <div class="table-title">
              Платежи возмещения с
              <span>
                {{ $filterService.formatDate(fromDate) }} до
                {{ $filterService.formatDate(toDate) }}
              </span>
            </div>
            <ui-datetime-range-picker
              @inputRage="onInputRange"
              v-model:fromDate="fromDate"
              v-model:toDate="toDate"
            />
          </template>
          <template #body>
            <div class="row row-50">
              <div class="col-6">
                <div class="form-group">
                  <ui-select-label
                    :items="test"
                    keyField="id"
                    valueField="name"
                    v-model="testId"
                    
                    defaultText="Субагент"
                    label="Субагент"
                  />
                </div>
                <div class="form-group">
                  <ui-select-label
                    :items="test"
                    keyField="id"
                    valueField="name"
                    v-model="testId"
                    
                    defaultText="Шлюз"
                    label="Шлюз"
                  />
                </div>
                <div class="form-group">
                  <ui-select-label
                    :items="test"
                    keyField="id"
                    valueField="name"
                    v-model="testId"
                    
                    defaultText="Договор"
                    label="Договор"
                  />
                </div>
                <div class="form-group">
                  <ui-select-label
                    :items="test"
                    keyField="id"
                    valueField="name"
                    v-model="testId"
                    
                    defaultText="Региональный менеджер"
                    label="Региональный менеджер"
                  />
                </div>
                <ui-checkbox v-model="control">
                  Контроль фин. потоков
                </ui-checkbox>
                <ui-checkbox v-model="excludePayments">
                  Исключать отмененные и удаленные платежи
                </ui-checkbox>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <ui-select-label
                    :items="test"
                    keyField="id"
                    valueField="name"
                    v-model="testId"
                    
                    defaultText="Тип платежа"
                    label="Тип платежа"
                  />
                </div>
                <div class="form-group">
                  <ui-select-label
                    :items="test"
                    keyField="id"
                    valueField="name"
                    v-model="testId"
                    
                    defaultText="Банк"
                    label="Банк"
                  />
                </div>
                <div class="form-group">
                  <ui-select-label
                    :items="test"
                    keyField="id"
                    valueField="name"
                    v-model="testId"
                    
                    defaultText="Партнер"
                    label="Партнер"
                  />
                </div>
                <div class="form-group">
                  <ui-select-label
                    :items="test"
                    keyField="id"
                    valueField="name"
                    v-model="testId"
                    
                    defaultText="Тип платежа"
                    label="Тип платежа"
                  />
                </div>
                <div class="form-group">
                  <ui-select-label
                    :items="test"
                    keyField="id"
                    valueField="name"
                    v-model="testId"
                    
                    defaultText="Проверено бухгалтером"
                    label="Проверено бухгалтером"
                  />
                </div>
                <div class="form-group">
                  <ui-select-label
                    :items="test"
                    keyField="id"
                    valueField="name"
                    v-model="testId"
                    
                    defaultText="Тип инкассацци"
                    label="Тип инкассацци"
                  />
                </div>
                <div class="form-group">
                  <ui-select-label
                    :items="test"
                    keyField="id"
                    valueField="name"
                    v-model="testId"
                    
                    defaultText="Примечание"
                    label="Примечание"
                  />
                </div>
                <div class="form-group">
                  <ui-select-label
                    :items="numbeRecords"
                    keyField="id"
                    valueField="name"
                    v-model="numbeRecordsId"
                    
                    defaultText="Тест"
                    label="Количество записей"
                  />
                </div>
              </div>
            </div>
          </template>
          <template #footer>
            <div class="row">
              <div class="col-9">
                <button class="btn btn-success mr-3">создать новый</button>
                <button class="btn btn-info">Подтвердить бухгалтером</button>
              </div>
              <div class="col-3 text-right">
                <button class="btn btn-default">Установить фильтр</button>
              </div>
            </div>
          </template>
        </page-template>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import moment from "moment";
import { Options, Vue } from "vue-property-decorator";
@Options({
  components: {},
})
export default class RefundPaymentsPageComponent extends Vue {
  test = [
    { id: 0, name: "Paymaster1" },
    { id: 1, name: "Paymaster2" },
    { id: 2, name: "Paymaster3" },
  ];
  excludePayments = true;
  control = false;
  numbeRecords = [
    { id: 0, name: "10" },
    { id: 1, name: "20" },
    { id: 2, name: "30" },
    { id: 3, name: "40" },
    { id: 4, name: "50" },
  ];
  testId = 1;
  numbeRecordsId = 4;
  fromDate: Date = moment(
    moment(new Date()).format("YYYY-MM-DD 00:00")
  ).toDate();
  toDate: Date = moment(moment(new Date()).format("YYYY-MM-DD 00:00")).toDate();
  async onInputRange(value: any) {
    console.log(value);

    // this.newFilter.FromDate = value.firstData;
    // this.newFilter.ToDate = value.SecondData;
    // await this.contentTable.fetchData();
  }
}
</script>
<style scoped>
</style>
