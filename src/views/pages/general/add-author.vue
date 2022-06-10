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
        :items="test"
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
      :items="test"
      v-model="newAuthor.departmentId"
      defaultText="Выберите кафедру"
      id="departmentId"
      class="mt-2 mb-8"
    />
    <label for="Position">Научная степень</label>
    <select-autocomplete
      keyField="Id"
      valueField="Name"
      :items="test"
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
  test: Array<IdNameModel> = [
    { Id: 1, Name: "34" },
    { Id: 2, Name: "342" },
    { Id: 3, Name: "343" },
    { Id: 4, Name: "3424" },
    { Id: 5, Name: "3425" },
    { Id: 6, Name: "346" },
    { Id: 7, Name: "3427" },
    { Id: 8, Name: "34258" },
    { Id: 9, Name: "3469" },
    { Id: 10, Name: "342710" },
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