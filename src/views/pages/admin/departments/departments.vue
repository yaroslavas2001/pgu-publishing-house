<template>
  <content title="Кафедры и факультеты">
    <div class="column">
      <label-input
        nameLabel="Факультет"
        placeholder="Введите название факультета"
        v-model="faculty"
      />
      <btn
        isSmall
        title="Добавить факультет"
        @click="addFaculty"
        class="mb-10"
      />

      <label for="departmentId">
        <b> Выберите факультет к которому хотите добавить кафедру</b>
      </label>
      <select-autocomplete
        keyField="id"
        valueField="name"
        :items="facultyList"
        v-model="facultyId"
        defaultText="Выберите факультет"
        id="departmentId"
        class="mt-2 mb-8"
      />
      <label-input
        nameLabel="Кафедра"
        placeholder="Введите название кафедры"
        v-model="departmentName"
      />
      <btn
        isSmall
        title="Добавить кафедру к факультету"
        @click="addDepartments"
      />
    </div>
  </content>
</template>
<script lang="ts">
import ResponseGetAllModel from "@/api/plugins/models/Faculty/ResponseGetAllModel";
import GeneralModel from "@/api/plugins/models/GeneralModel";
import HttpResponseResult from "@/api/plugins/models/httpResponseResult";
import { Options, Vue } from "vue-property-decorator";

@Options({})
export default class Departments extends Vue {
  department: string = null;
  faculty: string = null;
  facultyId: number = null;
  facultyList: Array<ResponseGetAllModel> = [];
  departmentName: string = null;
  created() {
    this.getAllFaculty();
  }
  async addFaculty() {
    await this.$api.FacultyService.Add({ name: this.faculty });
    this.faculty = null;
    this.getAllFaculty();
  }
  async getAllFaculty() {
    let res: HttpResponseResult<GeneralModel<Array<ResponseGetAllModel>>> =
      await this.$api.FacultyService.GetAll();
    this.facultyList = res.data.items;
  }
  addDepartments() {
    this.$api.DepartmentService.Add({
      departmentName: this.departmentName,
      facultyId: this.facultyId,
    });
    this.departmentName = null;
  }
}
</script>
<style scoped >
</style>