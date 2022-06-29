<template>
  <content title="Детальная автора" isBack @clickBack="clickBack">
    <info-block title="Фамилия" :description="author.secondName" />
    <info-block title="Имя" :description="author.firstName" />
    <info-block title="Отчество" :description="author.sureName" />
    <info-block title="Почта" :description="author.email" />
    <info-block title="Контакты" :description="author.contacts" />
    <!-- <info-block title="Контакты" :description="author.contacts" /> -->
    <div v-if="!author.isTeacher">
      <info-block
        title="Место работы"
        :description="author.nonStuffWorkPlace"
      />
      <info-block title="Должность" :description="author.nonStuffPosition" />
    </div>
    <div v-else>
      <info-block
        title="Должность"
        :description="getPosition(author.employerPosition)"
      />
      <info-block
        title="Научная степень"
        :description="getAcademicDegree(author.academicDegree)"
      />
      <!-- <info-block title="Факультет" :description="faculty" /> -->
      <info-block
        title="Кафедра"
        :description="Department"
      />
    </div>
  </content>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { AUTHORSGROUP } from "@/router/routerNames";
import HttpResponseResult from "@/api/plugins/models/httpResponseResult";
import GeneralModel from "@/api/plugins/models/GeneralModel";
import AllAuthorModel from "@/models/author/AllAuthorModel";
import EmployeePosition from "@/common/EmployeePosition";
import AcademicDegree from "@/common/AcademicDegree";
import DepartmentTableModel from "@/models/general/DepartmentTableModel";
import ResponseGetAllModel from "@/api/plugins/models/Faculty/ResponseGetAllModel";
import ResponseGetAllDepartmentModel from "@/api/plugins/models/Department/ResponseGetAllDepartmentModel";
import AllAuthorModelSecondName from "@/models/author/AllAuthorModelSecondName";
@Options({})
export default class AuthorsDetailed extends Vue {
  id: number = null;
  author: AllAuthorModelSecondName = new AllAuthorModelSecondName();
  EmployeePosition = EmployeePosition;
  AcademicDegree = AcademicDegree;
  departments: Array<DepartmentTableModel> = [];
  Department: string = "";
  created() {
    this.author = new AllAuthorModelSecondName();
    this.id = Number(this.$route.params.id);
    this.getAutor();
  }
  async getAutor() {
    let res: HttpResponseResult<GeneralModel<Array<AllAuthorModelSecondName>>> =
      await this.$api.AuthorService.Get({
        authorId: this.id,
      });
    this.author = res.data.items.find((el) => el.id == this.id);
 this.getDepartmentId(this.author.departmentId)
    console.log("autor", res.data.items);
  }
  clickBack() {
    this.$router.push({ name: AUTHORSGROUP });
  }
  getPosition(pos: number) {
    if (pos) return this.EmployeePosition.find((el) => el.Id == pos).Name;
  }
  getAcademicDegree(degree: number) {
    if (degree) return this.AcademicDegree.find((el) => el.Id == degree).Name;
  }

  async getDepartmentId(dep: number) {
    if (dep) {
      let res: HttpResponseResult<
        GeneralModel<Array<ResponseGetAllDepartmentModel>>
      > = await this.$api.DepartmentService.GetDepartment({
        departmanetId: dep,
      });
      let department: string = res.data.items.find(
        (el) => el.id == dep
      ).departmentName;
      this.Department= department;
    }
  }
}
</script>
<style scoped >
</style>