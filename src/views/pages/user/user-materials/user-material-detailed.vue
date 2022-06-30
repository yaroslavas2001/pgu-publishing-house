<template>
  <content title="Детальная" isBack @clickBack="clickBack">
    <info-block title="Название" :description="material.name" />
    <info-block title="Ключевые слова" :description="material.tags" />
    <info-block title="УДК" :description="material.udc" />

    <info-block
      title="Тип издания"
      :description="$store.state.getType(material.type)"
    />
    <info-block
      title="Статус"
      :description="$store.state.getStatus(material.status)"
    />

    <info-block title="Авторы">
      <div v-for="(item, index) in AuthorsText" :key="index">
        {{ item }}
      </div>
    </info-block>
    <div class="title-text">Материалы</div>

    <div v-if="files.length > 0" class="files">
      <div v-for="(item, index) in files" :key="index" class="files-item">
        {{ item.name }}
        <a :href="item.url" :download="item.name" class="link">Скачать</a>
      </div>
    </div>
    <div v-if="material.status == 0"></div>

    <div v-if="answer">
      <info-block title="Ответ рецензента" :description="comment" />
    </div>
    <div v-if="material.status == 1">
      <file-input @onChange="onChangeArticle($event)">
        <btn isSmall title="Добавить материал" />
      </file-input>
      <btn isSmall isActive @click="Submit" title="Отправить" class="mt-10" />
    </div>
  </content>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { USERMATERIALS } from "@/router/routerNames";
import FileInput from "@/views/components/rio-psy/ui-file-input/FileModel";

import GeneralModel from "@/api/plugins/models/GeneralModel";
import HttpResponseResult from "@/api/plugins/models/httpResponseResult";
import GetPublicationResponseModel from "@/api/plugins/models/Publication/GetPublicationResponseModel";

import FileGetResponseModel from "@/api/plugins/models/File/FileGetResponseModel";
import AllAuthorModelSecondName from "@/models/author/AllAuthorModelSecondName";
import GetReviewResponseModel from "@/api/plugins/models/Review/GetReviewResponseModel";
import FileType from "@/Enum/FileType";

export default class UserMaterialDetailed extends Vue {
  id: number = null;
  material: GetPublicationResponseModel = new GetPublicationResponseModel();
  AuthorsText: Array<string> = [];
  files: Array<FileGetResponseModel> = [];
  answer: GetReviewResponseModel = new GetReviewResponseModel();
  dopFile: Array<FileInput> = [];
  comment: string = "";
  async created() {
    this.id = Number(this.$route.params.id);
    this.material = new GetPublicationResponseModel();
    this.answer = new GetReviewResponseModel();
    let res: HttpResponseResult<
      GeneralModel<Array<GetPublicationResponseModel>>
    > = await this.$api.PublicationService.Get({
      publicationId: this.id,
    });
    this.material = res.data.items.find((el) => el.id == this.id);
    // if (this.material.status == 1) {
    // }
    let pubAutors: HttpResponseResult<Array<number>> =
      await this.$api.PublicationAuthorService.Get({ publicationId: this.id });
    for (let i = 0; i < pubAutors.data.length; i++) {
      let autor: HttpResponseResult<
        GeneralModel<Array<AllAuthorModelSecondName>>
      > = await this.$api.AuthorService.Get({
        authorId: pubAutors.data[i],
      });
      this.AuthorsText.push(this.$store.state.getAvtor(autor.data.items[0]));
    }
    this.getDocument();
   this.getRevie()
    // сделать запрос на получение комментария и документа
  }
  onChangeArticle(data: Array<FileInput>) {
    this.dopFile = data;
  }
  async getRevie() {
    let res: HttpResponseResult<Array<GetReviewResponseModel>> =
      await this.$api.ReviewService.Get({
        publicationId: this.material.id,
      });
    this.answer = res.data[0];
    this.comment = res.data[0].comment;
    console.log("comment", this.comment);
  }
  async getDocument() {
    let res: HttpResponseResult<Array<FileGetResponseModel>> =
      await this.$api.FileService.Get({ publicationId: this.id });
    this.files = res.data;
    console.log("res", res.data);
  }
  async Submit() {
    for (let i = 0; i < this.dopFile.length; i++) {
      let el = this.dopFile[i];
      let resDoc = await this.$api.FileService.UploadFileForPublication({
        name: el.fileName,
        fileBase64: this.$store.state.getBase64Only(el.fileBody),
        isVisibleForReviewers: false,
        fileType: FileType.Abstract,
        publicationId: this.material.id,
      });
    }
  }
  clickBack() {
    this.$router.push({ name: USERMATERIALS });
  }
}
</script>
<style scoped  lang="less">
.files {
  display: flex;
  flex-direction: column;
  .files-item {
    height: auto;
    min-height: 30px;
  }
}
.title-text {
  font-size: 16px;
  margin: 20px 0 10px 0;
  font-family: "Open Sans", sans-serif !important;
  font-weight: bold;
}
</style>