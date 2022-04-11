<template>
  <content title="Добавить автора">
    <label-input
      nameLabel="Имя"
      placeholder="placeholder"
      v-model="newAuthor.firstName"
    />
    <label-input
      nameLabel="фамилия"
      placeholder="placeholder"
      v-model="newAuthor.lastName"
    />
    <label-input
      nameLabel="Отчество"
      placeholder="placeholder"
      v-model="newAuthor.fatherName"
    />
    <label-input
      nameLabel="Email"
      placeholder="placeholder"
      v-model="newAuthor.email"
    />
     <label-input
      nameLabel="contacts"
      placeholder="placeholder"
      v-model="newAuthor.contacts"
    />

    <div>
      <toggle-switcher v-model="newAuthor.isTeacher" />
      {{
        newAuthor.isTeacher ? "Да, я преаодаватель" : "Нет, я не преподаватель"
      }}
    </div>
    <!-- <label-input
      nameLabel="Место работы"
      placeholder="placeholder"
      v-model="newAuthor.PlaceWork"
      v-if="!newAuthor.isTeacher"
    />
    <label for="Position">Должность, может инпут</label> -->
    <select-autocomplete
      keyField="Id"
      valueField="Name"
      :items="test"
      v-model="newAuthor.positionId"
      defaultText="Выберите должность"
      id="Position"
    />
    <!-- <label for="Position">Факультет</label>
    <select-autocomplete
      keyField="Id"
      valueField="Name"
      :items="test"
      v-model="newAuthor.IdDepartment"
      defaultText="Выберите должность"
      id="Position"
    /> -->
    <label for="Position">Кафедра</label>
    <select-autocomplete
      keyField="Id"
      valueField="Name"
      :items="test"
      v-model="newAuthor.departmentId"
      defaultText="Выберите должность"
      id="Position"
    />
    <label for="Position">Научная степень</label>
    newAuthor.degreeId :{{ newAuthor.degreeId }}
    <select-autocomplete
      keyField="Id"
      valueField="Name"
      :items="test"
      v-model="newAuthor.degreeId"
      defaultText="Выберите должность"
      id="Position"
    />
    <button @click="saveAuthor">Сохранить автора</button>
    <button>Отмена</button>
  </content>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import AllAuthorModel from "@/models/author/AllAuthorModel";
import IdNameModel from "@/models/general/IdNameModel";
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
    console.log("this.newAuthor",this.newAuthor,this.$api)
    let res = await this.$api.AuthorService.AddAuthor(this.newAuthor);
    console.log("newAuthor", this.newAuthor, res);
  }
}
</script>
<style scoped >
</style>