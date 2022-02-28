<template>
  <div class="mcw">
    <div class="center">
      <div class="block w-70">
        <page-template>
          <template #header>
            <div class="table-title">
              Лимиты предприятия Paymaster
              <span
                >с {{ $filterService.formatDate(fromDate) }} до
                {{ $filterService.formatDate(toDate) }}</span
              >
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
              </div>
              <div class="col-6">
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
              </div>
            </div>
          </template>
          <template #footer>
            <div class="row">
              <div class="col-6">
                <button class="btn btn-success">Добавить запись</button>
              </div>
              <div class="col-6 text-right">
                <button class="btn btn-default">Установить фильтр</button>
              </div>
            </div>
          </template>
        </page-template>
      </div>
      <div class="block block-error w-70" v-if="wrong">
        <div class="block-body">
          <p>Не найдено записей соответствующих запросу</p>
        </div>
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
export default class EnterpriseLimitsPageComponent extends Vue {
  test = [
    { id: 0, name: "Paymaster1" },
    { id: 1, name: "Paymaster2" },
    { id: 2, name: "Paymaster3" },
  ];
  wrong = true;
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
