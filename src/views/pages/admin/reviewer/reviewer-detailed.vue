<template>
  <content :title="title" isBack @clickBack="clickBack">
    <div v-if="!isId">
      <info-block title="Имя" :description="reviewer.firstName" />
      <info-block title="Фамилия" :description="reviewer.secondName" />
      <info-block title="Отчество" :description="reviewer.fatgerName" />
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
        v-model="reviewer.secondName"
      />
      <label-input
        nameLabel="Отчество"
        placeholder="Введите отчество"
        v-model="reviewer.fatgerName"
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
  </content>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { REVIEWER } from "@/router/routerNames";
import ReviewerModel from "@models/reviewer/ReviewerModel";
@Options({
  // emits: ["goToAdmin"],
})
export default class ReviewerDetailed extends Vue {
  id: number = null;
  reviewer: ReviewerModel = new ReviewerModel();
  get isId(): any {
    return this.id == undefined || this.id == null || isNaN(this.id);
  }
  get title(): string {
    return this.isId ? "Добавление рецензента" : "Деальная рецензента";
  }
  created() {
    this.id = Number(this.$route.params.id);
    //запрос
    if (this.isId) this.reviewer = new ReviewerModel();
    else
      this.reviewer = {
        Id: 1,
        fatgerName: "terd",
        secondName: "23",
        firstName: "2",
        email: "45",
      };
  }
  clickBack() {
    this.$router.push({ name: REVIEWER });
  }
  addReviewer() {
    //запрос на создание
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
