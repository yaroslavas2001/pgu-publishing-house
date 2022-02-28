<template>
  <div class="mcw">
    <div class="center">
      <div class="block w-70">
        <page-template>
          <template #header>
            <div class="table-title">Баланс предприятий</div>
          </template>
          <template #body>
            <div class="table-cont big">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">
                      Субагент<a href="#" class="table-ord"></a>
                    </th>
                    <th scope="col">Куратор</th>
                    <th scope="col">Нормер договора (Партнер)</th>
                    <th scope="col">Баланс</th>
                    <th scope="col">Доступно</th>
                    <th scope="col">Сумма страховки</th>
                    <th scope="col">Дата действия страховки</th>
                    <th scope="col">Сумма по договору</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Paymaster</td>
                    <td></td>
                    <td>дог. № empty от 2013.12.17 г.</td>
                    <td>-7182083,91</td>
                    <td>12817916,09</td>
                    <td>0,00</td>
                    <td>2020.12.10</td>
                    <td>0,00</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td>Итого</td>
                    <td></td>
                    <td></td>
                    <td>-7182083,91</td>
                    <td>12817916,09</td>
                    <td>0,00</td>
                    <td>2020.12.10</td>
                    <td>0,00</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </template>
        </page-template>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
@Options({
  components: {},
})
export default class BalanceOfEnterprisesPageComponent extends Vue {}
</script>
<style scoped>

</style>
