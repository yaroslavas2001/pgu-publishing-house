<template>
  <content
    title="Детальная"
    isBack
    @clickBack="clickBack"
    v-if="material.status == 0"
  >
    <info-block title="Название" :description="material.name" />
    <info-block title="Ключевые слова" :description="material.tags" />
    <info-block title="УДК" :description="material.udc" />

    <info-block title="Тип издания" :description="getType(material.type)" />
    <info-block title="Статус" :description="getStatus(material.status)" />

    <info-block title="Авторы">
      <div v-for="(item, index) in AuthorsText" :key="index">
        {{ item }}
      </div>
    </info-block>

  </content>
  <content
    title="Редактирование материала"
    isBack
    @clickBack="clickBack"
    v-if="material.status == 1"
  >
    <label for="Type">Тип печатного издания</label>

    <!-- <file-input @onChange="onChangeExtract($event)">
      <btn isSmall title="Добавить выписку с кафедры" />
    </file-input>
    <label-input
      nameLabel="Название статьи"
      placeholder="Введите название статьи"
      v-model="material.nameArticle"
    /> -->
    <label-input
      nameLabel="УДК"
      placeholder="Введите УДК"
      v-model="material.udc"
    />
    <label-input
      nameLabel="Ключевые слова"
      placeholder="Введите клчевые слова"
      v-model="material.tags"
    />
    <!-- <label-input
      nameLabel="Комментарии"
      placeholder="Добавте комментарий для проверяющего"
      v-model="material.comments"
    /> -->
    <div
      for="autors"
      title="Если вы не нашли автора в списке, его нужно вначале добавить."
      class="mb-3"
    >
      Авторы
    </div>
 
  
    <!-- <autocomplete-multiselect
      class="autocomplete-multiselect"
      selectText="Выберите авторов"
      keyField="Id"
      valueField="Name"
      v-model="Authors"
      id="autors"
      :SearchAsyncFunc="GetAuthors"
    /> -->
    --------------------------------------------
    <info-block title="Комментарии рецензиата" :description="answer.Comm" />
    <div v-for="(item, index) in answer.File" :key="index">
      <!-- <file-input @onChange="onChangeArticle($event)">
        <btn isSmall title="Добавить материал" />
      </file-input> -->
    </div>
  </content>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { USERMATERIALS } from "@/router/routerNames";
import FileInput from "@/views/components/rio-psy/ui-file-input/FileModel";

import NewMaterialModel from "@/models/new-material/NewMaterialModel";
import IdNameModel from "@/models/general/IdNameModel";
import GeneralModel from "@/api/plugins/models/GeneralModel";
import HttpResponseResult from "@/api/plugins/models/httpResponseResult";
import GetPublicationResponseModel from "@/api/plugins/models/Publication/GetPublicationResponseModel";
import AllAuthorModel from "@/models/author/AllAuthorModel";
import MaterialType from "@/common/MaterialType";
import PublicationStatus from "@/common/PublicationStatus";
import FileGetResponseModel from "@/api/plugins/models/File/FileGetResponseModel";

export default class UserMaterialDetailed extends Vue {
  id: number = null;
  material: GetPublicationResponseModel = new GetPublicationResponseModel();
  MaterialType = MaterialType;
  PublicationStatus = PublicationStatus;
  // Authors: Array<AllAuthorModel> = [];
  AuthorsText: Array<string> = [];
  files: Array<FileGetResponseModel> = [];
  answer: any = {
    Id: 123,
    Comm: "Не правильно заполенно что-то там",
    File: [],
  };
  async created() {
    console.log(this.$route.params.id);
    this.id = Number(this.$route.params.id);
    this.material = new GetPublicationResponseModel();
    let res: HttpResponseResult<
      GeneralModel<Array<GetPublicationResponseModel>>
    > = await this.$api.PublicationService.Get({
      publicationId: this.id,
    });
    this.material = res.data.items.find((el) => el.id == this.id);
    let pubAutors: HttpResponseResult<Array<number>> =
      await this.$api.PublicationAuthorService.Get({ publicationId: this.id });
    for (let i = 0; i < pubAutors.data.length; i++) {
      let autor: HttpResponseResult<GeneralModel<Array<AllAuthorModel>>> =
        await this.$api.AuthorService.Get({
          authorId: pubAutors.data[i],
        });
      this.AuthorsText.push(this.getAvtor(autor.data.items[0]));
    }
    this.getDocument();
    // сделать запрос на получение комментария и документа
  }
  async getDocument() {
    let res: HttpResponseResult<Array<FileGetResponseModel>> =
      await this.$api.FileService.Get({ publicationId: this.id });
    this.files = res.data;
    console.log("res", res.data);
  }
  // onChangeArticle(data: Array<FileInput>) {
  //   this.material.material = data;
  // }
  // onChangeAntiPl(data: Array<FileInput>) {
  //   this.material.antiPlagiarism = data;
  // }
  // onChangeExtract(data: Array<FileInput>) {
  //   this.material.excerpt = data;
  // }
  getAvtor(item: AllAuthorModel): string {
    return (
      this.ucFirst(item.secondName) +
      " " +
      this.ucFirst(item.firstName) +
      " " +
      this.ucFirst(item.sureName)
    );
  }
  ucFirst(str: string): string {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
  }
  clickBack() {
    this.$router.push({ name: USERMATERIALS });
  }
  async GetAuthors(search?: string) {
    //получение по search субагентов
    return [];
    // return await this.$api.EnterpriseService.getList({
    //   _filters: { Name: search },
    //   _page: 1,
    //   _perPage: 6,
    // });
  }
  getType(id: number): string {
    return this.MaterialType.find((el) => el.Id == id).Name;
  }
  getStatus(id: number): string {
    return this.PublicationStatus.find((el) => el.Id == id).Name;
  }
}
</script>
<style scoped  lang="less">
</style>