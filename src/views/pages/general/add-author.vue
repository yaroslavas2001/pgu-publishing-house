<template>
  <content title="Добавить автора">
    <label-input
      nameLabel="Имя"
      placeholder="Введите имя автора"
      v-model="newAuthor.firstName"
    />
    <label-input
      nameLabel="Фамилия"
      placeholder="Введите фамилию автора"
      v-model="newAuthor.lastName"
    />
    <label-input
      nameLabel="Отчество"
      placeholder="Введите отчество автора"
      v-model="newAuthor.fatherName"
    />
    <label-input
      nameLabel="Email"
      placeholder="Введите email автора"
      v-model="newAuthor.email"
    />
    <label-input
      nameLabel="Контакты"
      placeholder="Введите контакты автора"
      v-model="newAuthor.contacts"
    />

    <div class="toggle-switcher-block">
      <toggle-switcher v-model="newAuthor.isTeacher" />
      <p>
        {{
          newAuthor.isTeacher
            ? "Да, я преаодаватель"
            : "Нет, я не преподаватель"
        }}
      </p>
    </div>
    <label-input
      nameLabel="Место работы"
      placeholder="Введите ваше место работы"
      v-model="newAuthor.placeWork"
      v-if="!newAuthor.isTeacher"
    />
    <div v-else>
      <label for="Position">Должность</label>
      <select-autocomplete
        keyField="Id"
        valueField="Name"
        :items="testPosition"
        v-model="newAuthor.positionId"
        defaultText="Выберите должность"
        id="Position"
        class="mt-2 mb-8"
      />
    </div>
    <label for="departmentId">Кафедра</label>
    <select-autocomplete
      keyField="Id"
      valueField="Name"
      :items="testKaf"
      v-model="newAuthor.departmentId"
      defaultText="Выберите кафедру"
      id="departmentId"
      class="mt-2 mb-8"
    />
    <label for="Position">Научная степень</label>
    <select-autocomplete
      keyField="Id"
      valueField="Name"
      :items="testDegree"
      v-model="newAuthor.degreeId"
      defaultText="Выберите научную степень"
      id="Position"
      class="mt-2"
    />

    <btn
      isSmall
      isActive
      title="Сохранить автора"
      @click="saveAuthor"
      class="btn-active"
    />
    <btn isSmall title="Отмена" @click="cansel" />
  </content>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import AllAuthorModel from "@/models/author/AllAuthorModel";
import IdNameModel from "@/models/general/IdNameModel";
import NewArticle from "../user/new-article/new-article.vue";
import { NEWMATERIALADD } from "@/router/routerNames";
@Options({
  emits: ["goToAdmin"],
})
export default class AddAuthor extends Vue {
  newAuthor: AllAuthorModel = new AllAuthorModel();
  testPosition: Array<IdNameModel> = [
    { Id: 1, Name: "Профессор" },
    { Id: 2, Name: "Доцент" },
    { Id: 3, Name: "Старший преподаватель" },
    { Id: 4, Name: "Преподаватель" },
    { Id: 5, Name: "Глаавный научный сотрудник" },

  ];
  testKaf: Array<IdNameModel> = [
    { Id: 1, Name: "Электронный бизнес" },
    { Id: 2, Name: "Кафедра биологии и физиологии человека" },
    { Id: 3, Name: "Кафедра автоматизированных технологий и промышленных комплексов" },
    { Id: 4, Name: "Кафедра электротехнического оборудования" },
    { Id: 5, Name: "Кафедра электротехнического оборудования" },

  ];
  testDegree: Array<IdNameModel> = [
    { Id: 1, Name: "Кандидат наук" },
    { Id: 2, Name: "Доктор наук" },
    { Id: 3, Name: "Без степени" },
  ];
  created() {
    this.newAuthor = new AllAuthorModel();
  }
  async saveAuthor() {
    console.log("this.newAuthor", this.newAuthor, this.$api);
    let res = await this.$api.AuthorService.AddAuthor(this.newAuthor);
    this.$router.push({ name: NEWMATERIALADD });

    console.log("newAuthor", this.newAuthor, res);
  }
  cansel() {
    this.$router.push({ name: NEWMATERIALADD });
  }
}
</script>
<style scoped lang="less">
.btn-active {
  margin-top: 15px;
  margin-right: 6px;
}
.toggle-switcher-block {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  p {
    margin-left: 10px;
  }
}
</style>