<template>
  <content title="Указать статус материалу">
    <info-block title="Название" :description="publication.name" />
    <info-block title="Ключевые слова" :description="publication.tags" />
    <info-block title="УДК" :description="publication.udc" />
    <info-block title="Тип издания" :description="getType(publication.type)" />

    <info-block title="Авторы">
      <div v-for="(item, index) in AuthorsText" :key="index">
        {{ item }}
      </div>
    </info-block>
    Материалы
    <div v-if="files.length > 0">
      <div v-for="(item, index) in files" :key="index">
        {{ item.url }}
        <a :href="item.url" target="_blank">Посмотреть</a>
      </div>
    </div>
    <btn isSmall isActive @click="Save" title="Отправить" class="mt-10" />
  </content>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import FileInput from "@/views/components/rio-psy/ui-file-input/FileModel";

import { NEWMATERIALADMIN } from "@/router/routerNames";
import NewMaterialModel from "@/models/new-material/NewMaterialModel";
import FileGetResponseModel from "@/api/plugins/models/File/FileGetResponseModel";
import HttpResponseResult from "@/api/plugins/models/httpResponseResult";
import GeneralModel from "@/api/plugins/models/GeneralModel";
import GetPublicationResponseModel from "@/api/plugins/models/Publication/GetPublicationResponseModel";
import AllAuthorModel from "@/models/author/AllAuthorModel";
import MaterialType from "@/common/MaterialType";
@Options({})
export default class NewMaterialDetailed extends Vue {
  id: number = null;
  Authors: any = null;
  newArticle: NewMaterialModel = new NewMaterialModel();
  publication: GetPublicationResponseModel = new GetPublicationResponseModel();
  AuthorsText: Array<string> = [];
  MaterialType = MaterialType;
  files: Array<FileGetResponseModel> = [];

  async created() {
    console.log(this.$route.params.id);
    this.id = Number(this.$route.params.id);
    if (this.id) {
      let publication: HttpResponseResult<
        GeneralModel<Array<GetPublicationResponseModel>>
      > = await this.$api.PublicationService.Get({
        publicationId: this.id,
      });
      this.publication = publication.data.items.find((el) => el.id == this.id);
      if (this.publication) this.additionalMethods();
    }
  }
  async additionalMethods() {
    console.log("id", this.id);
    let res: HttpResponseResult<Array<FileGetResponseModel>> =
      await this.$api.FileService.Get({
        publicationId: this.id,
        isReviewer: false,
      });
    if (res.isSuccess) {
      console.log("res", res.data);
    }
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
  }
  async getDocument() {
    let res = await this.$api.FileService.Get({ publicationId: this.id });
    this.files = res.data;
    console.log("res", res.data);
  }
  onChangeArticle(data: Array<FileInput>) {
    this.newArticle.material = data;
  }
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
  Save() {}
  onChangeAntiPl(data: Array<FileInput>) {
    this.newArticle.antiPlagiarism = data;
  }
  onChangeExtract(data: Array<FileInput>) {
    this.newArticle.excerpt = data;
  }
  getType(id: number): string {
    if (id) return this.MaterialType.find((el) => el.Id == id).Name;
  }
  clickBack() {
    this.$router.push({ name: NEWMATERIALADMIN });
  }
}
</script>
<style scoped >
</style>