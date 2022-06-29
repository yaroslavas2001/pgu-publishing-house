<template>
  <content title="Добавить автора">
    <label-input
      nameLabel="Фамилия"
      placeholder="Введите фамилию автора"
      v-model="newAuthor.lastName"
    />
    <label-input
      nameLabel="Имя"
      placeholder="Введите имя автора"
      v-model="newAuthor.firstName"
    />
    <label-input
      nameLabel="Отчество"
      placeholder="Введите отчество автора"
      v-model="newAuthor.sureName"
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
        {{ newAuthor.isTeacher ? "Преподаватель" : "Нет, не преподаватель" }}
      </p>
    </div>
    <div v-if="!newAuthor.isTeacher">
      <label-input
        nameLabel="Место работы"
        placeholder="Введите ваше место работы"
        v-model="newAuthor.nonStuffWorkPlace"
      />
      <label-input
        nameLabel="Должность"
        placeholder="Введите вашу должность"
        v-model="newAuthor.nonStuffPosition"
      />
    </div>

    <div v-else>
      <label for="Position">Должность</label>
      <select-autocomplete
        keyField="Id"
        valueField="Name"
        :items="EmployeePosition"
        v-model="newAuthor.positionId"
        defaultText="Выберите должность"
        id="Position"
        class="mt-2 mb-8"
      />
      <label for="departmentId">Факультет</label>
      <select-autocomplete
        keyField="id"
        valueField="name"
        :items="facultyList"
        v-model="facultyId"
        defaultText="Выберите факультет"
        id="departmentId"
        class="mt-2 mb-8"
      />
      <label for="departmentId">Кафедра</label>
      <select-autocomplete
        keyField="id"
        valueField="departmentName"
        :items="DepartmentList"
        v-model="newAuthor.departmentId"
        defaultText="Выберите кафедру"
        id="departmentId"
        class="mt-2 mb-8"
      />
      <label for="Position">Научная степень</label>
      <select-autocomplete
        keyField="Id"
        valueField="Name"
        :items="AcademicDegree"
        v-model="newAuthor.degreeId"
        defaultText="Выберите научную степень"
        id="Position"
        class="mt-2"
      />
    </div>
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
import { Options, Vue, Watch } from "vue-property-decorator";
import AllAuthorModel from "@/models/author/AllAuthorModel";
import { NEWMATERIALADD } from "@/router/routerNames";
import AcademicDegree from "@/common/AcademicDegree";
import EmployeePosition from "@/common/EmployeePosition";
import HttpResponseResult from "@/api/plugins/models/httpResponseResult";
import ResponseGetAllModel from "@/api/plugins/models/Faculty/ResponseGetAllModel";
import GeneralModel from "@/api/plugins/models/GeneralModel";
import ResponseGetAllDepartmentModel from "@/api/plugins/models/Department/ResponseGetAllDepartmentModel";
@Options({})
export default class AddAuthor extends Vue {
  newAuthor: AllAuthorModel = new AllAuthorModel();
  AcademicDegree = AcademicDegree;
  EmployeePosition = EmployeePosition;
  facultyList: Array<ResponseGetAllModel> = [];
  facultyId: number = null;
  DepartmentList: Array<ResponseGetAllDepartmentModel> = [];
  @Watch("facultyId")
  async update() {
    this.newAuthor.departmentId = null;
    let res: HttpResponseResult<
      GeneralModel<Array<ResponseGetAllDepartmentModel>>
    > = await this.$api.DepartmentService.GetAll({
      facultyId: this.facultyId,
    });
    this.DepartmentList = res.data.items;
  }
  async created() {
    this.newAuthor = new AllAuthorModel();
    let res: HttpResponseResult<GeneralModel<Array<ResponseGetAllModel>>> =
      await this.$api.FacultyService.GetAll({
        skip: 0,
        take: 20,
      });
    this.facultyList = res.data.items;
  }
  async saveAuthor() {
    let res = await this.$api.AuthorService.AddAuthor(this.newAuthor);
    if (res.isSuccess) this.$router.push({ name: NEWMATERIALADD });
    else console.log("newAuthor", this.newAuthor, res);
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