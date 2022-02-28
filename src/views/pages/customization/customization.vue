<template>
  <div class="mcw">
    <div class="center">
      <div class="block w-70">
        <page-template>
          <template #header>
            <div class="table-title">Смена текущего пароля</div>
          </template>
          <template #body>
            <div class="row">
              <div class="col-7">
                <div class="form-group">
                  <ui-label-input
                    nameLabel="Текущий пароль"
                    placeholder="Введите текущий пароль"
                    v-model="currentPassword"
                    id="currentPassword"
                  />
                </div>
              </div>
              <div class="col-7">
                <div class="form-group">
                  <ui-label-input
                    nameLabel="Новый пароль"
                    placeholder="Введите новый пароль"
                    v-model="newPassword"
                    id="newPassword"
                  />
                </div>
              </div>
              <div class="col-7">
                <div class="form-group">
                  <ui-label-input
                    nameLabel="Подтвердите пароль"
                    placeholder="Подтвердите новый пароль"
                    v-model="confirmPassword"
                    id="confirmPassword"
                  />
                </div>
              </div>
            </div>
          </template>
          <template #footer>
            <div class="row">
              <div class="col-6">
                <button class="btn btn-success">Сохранить</button>
              </div>
              <div class="col-6 text-right">
                <button class="btn btn-default">Отменить</button>
              </div>
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
export default class CustomizationPageComponent extends Vue {
  currentPassword = null;
  newPassword = null;
  confirmPassword = null;
}
</script>
<style scoped>
</style>
