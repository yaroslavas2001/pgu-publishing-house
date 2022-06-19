<template>
  <content title="Кафедры и факультеты">
    <label-input
      nameLabel="Кафедра"
      placeholder="Введите название кафедры"
      v-model="faculty"
    />
    <btn isSmall title="Добавить факультет" @click="addFaculty" />
    <btn isSmall title="Получить все факультеты" @click="getAllFaculty" />
 res : {{res}}
 </content>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";

@Options({})
export default class Departments extends Vue {
  department: string = null;
  faculty: string = null;
  facultyId: number = null;
  res:any
  addFaculty() {
    this.$api.FacultyService.Add({ name: this.faculty });
  }
  getAllFaculty() {
    this.res = this.$api.FacultyService.GetAll();
    console.log("res", this.res);
  }
}
</script>
<style scoped >
</style>