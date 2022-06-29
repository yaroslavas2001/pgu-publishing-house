<template>
  <content :title="title" isBack @clickBack="clickBack">
    <div v-if="!isId">
      <info-block title="Имя" :description="reviewer.firstName" />
      <info-block title="Фамилия" :description="reviewer.lastName" />
      <info-block title="Отчество" :description="reviewer.sureName" />
      <info-block title="Почта" :description="reviewer.email" />
    </div>
    <div v-else>
      <label-input
        nameLabel="Имя"
        placeholder="Введите имя"
        v-model="reviewer.firstName"
      />
      <label-input
        nameLabel="Фамилия"
        placeholder="Введите фамилию"
        v-model="reviewer.lastName"
      />
      <label-input
        nameLabel="Отчество"
        placeholder="Введите отчество"
        v-model="reviewer.sureName"
      />
      <label-input
        nameLabel="Почта"
        placeholder="Введите почту"
        v-model="reviewer.email"
      />
      <btn
        isSmall
        isActive
        @click="addReviewer"
        title="Сохранить"
        class="active-btn"
      />
      <btn isSmall @click="cancel" title="Отмена" />
    </div>
    <div v-if="wrong">{{ wrong }}</div>
  </content>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { REVIEWER } from "@/router/routerNames";
import AddReviewerRequestModel from "@/api/plugins/models/Reviewer/AddReviewerRequestModel";
@Options({})
export default class ReviewerDetailed extends Vue {
  id: number = null;
  reviewer: AddReviewerRequestModel = new AddReviewerRequestModel();
  wrong: string = null;
  get isId(): any {
    return this.id == undefined || this.id == null || isNaN(this.id);
  }
  get title(): string {
    return this.isId ? "Добавление рецензента" : "Деальная рецензента";
  }
  created() {
    this.id = Number(this.$route.params.id);
    //запрос
    if (this.isId) this.reviewer = new AddReviewerRequestModel();
    else
      this.reviewer = {
        id: 1,
        sureName: "test",
        lastName: "test",
        firstName: "test",
        email: "test",
      };
  }
  clickBack() {
    this.$router.push({ name: REVIEWER });
  }
  async addReviewer() {
    let res = await this.$api.ReviewerService.Add(this.reviewer);
    if (res.isSuccess) this.$router.push({ name: REVIEWER });
    else this.wrong = res.errorMessage;
  }
  cancel() {
    this.$router.push({ name: REVIEWER });
  }
}
</script>
<style scoped >
.active-btn {
  margin-right: 10px;
}
</style>
