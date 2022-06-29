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
    <btn
      isSmall
      @click="updateTable"
      title="Обновить таблицу кафедр и факультетов"
      class="mt-10 mb-10"
    />
    <div class="faculty">
      <div
        v-for="(item, index) in departments"
        :key="index"
        class="faculty-block"
      >
        <div class="faculty-block-name">{{ item.facultyName }}</div>
        <div class="faculty-block-dep">
          <div
            v-for="(dep, index) in item.departments"
            :key="index"
            class="dep-item"
          >
            {{ dep.departmentName }}
          </div>
        </div>
      </div>
    </div>
  </content>
</template>
<script lang="ts">
import ResponseGetAllModel from "@/api/plugins/models/Faculty/ResponseGetAllModel";
import GeneralModel from "@/api/plugins/models/GeneralModel";
import HttpResponseResult from "@/api/plugins/models/httpResponseResult";
import { Options, Vue } from "vue-property-decorator";
import DepartmentTableModel from "@/models/general/DepartmentTableModel";
import ResponseGetAllDepartmentModel from "@/api/plugins/models/Department/ResponseGetAllDepartmentModel";
@Options({})
export default class Departments extends Vue {
  department: string = null;
  faculty: string = null;
  facultyId: number = null;
  facultyList: Array<ResponseGetAllModel> = [];
  departmentName: string = null;
  departments: Array<DepartmentTableModel> = [];
  created() {
    this.updateTable();
  }
  async addFaculty() {
    let res = await this.$api.FacultyService.Add({ name: this.faculty });
    if (res.isSuccess) this.faculty = null;
  }
  async addDepartments() {
    this.$api.DepartmentService.Add({
      departmentName: this.departmentName,
      facultyId: this.facultyId,
    });
    this.departmentName = null;
  }
  async getAllFaculty() {
    let res: HttpResponseResult<GeneralModel<Array<ResponseGetAllModel>>> =
      await this.$api.FacultyService.GetAll({
        skip: 0,
        take: 20,
      });
    this.facultyList = res.data.items;
  }
  updateTable() {
    this.getAllFaculty();
    this.getAllDepartments();
  }
  async getAllDepartments() {
    this.departments = [];
    for (let i = 0; i < this.facultyList.length; i++) {
      let el = this.facultyList[i];
      let res: HttpResponseResult<
        GeneralModel<Array<ResponseGetAllDepartmentModel>>
      > = await this.$api.DepartmentService.GetAll({ facultyId: el.id });
      this.departments.push({
        facultyId: el.id,
        facultyName: el.name,
        departments: res.data.items,
      });
    }
  }
}
</script>
<style scoped lang="less">
.faculty {
  display: flex;
  flex-direction: column;
  .faculty-block {
    display: flex;
    border: 1px solid #cd8458;
    justify-content: space-between;
    padding: 10px 5px;
    .faculty-block-name {
      max-width: 300px;
      width: 100%;
      margin-right: 20px;
    }
    .faculty-block-dep {
      display: flex;
      flex-direction: column;
      width: 100%;
      .dep-item {
        border-bottom: 1px solid #cd8458;
        padding: 5px 0px;
        &:first-child {
          padding: 0px 0px 5px 0px;
        }
        &:last-child {
          border-bottom: 0px;
          padding: 5px 0px 0px 0px;
        }
      }
    }
  }
}
</style>