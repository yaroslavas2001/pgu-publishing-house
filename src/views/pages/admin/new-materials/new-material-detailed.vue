<template>
  <content title="Указать статус материалу">
    <info-block title="Название" :description="publication.name" />
    <info-block title="Ключевые слова" :description="publication.tags" />
    <info-block title="УДК" :description="publication.udc" />
    <info-block
      title="Тип издания"
      :description="$store.state.getType(publication.type)"
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
    <div v-if="publication.reviewerId == null">
      <div for="autors" class="mb-3">Рецензент</div>
      <ui-autocomplete
        class="autocomplete-multiselect mb-10"
        selectText="Выберите рецензента"
        keyField="Id"
        valueField="Name"
        v-model="Reviewer"
        id="autors"
        :SearchAsyncFunc="GetReviewer"
      />
      <btn
        isSmall
        isActive
        @click="SaveReviewer"
        title="Сохранить рецензента"
        class="mt-10"
      />
    </div>
    <div v-else>
      <info-block title="Рецензент" :description="ReviewerName" />
    </div>
    <div v-if="ReviewerDocument.length == 0">
      <file-input @onChange="onChangeArticle($event)">
        <btn isSmall title="Добавить материал без авторов для рецензента" />
      </file-input>
      <btn
        isSmall
        isActive
        @click="SaveReviewerDoc"
        title="Сохранить материал без авторов"
        class="mt-10"
      />
    </div>
    <div for="Type" class="mt-10">Выберите статус материала</div>
    <select-autocomplete
      keyField="Id"
      valueField="Name"
      :items="PublicationStatus"
      v-model="publicationStatus"
      defaultText="Выберите статус"
      id="Type"
      class="mt-2 mb-8"
    />
    <!-- Добавить документ для ревьювера -->
    <btn
      isSmall
      isActive
      @click="SaveStatus"
      title="Сохранить статус материала"
      class="mt-10"
    />
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
import MaterialType from "@/common/MaterialType";
import PublicationStatus from "@/common/PublicationStatus";
import IdNameModel from "@/models/general/IdNameModel";
import AllAuthorModelSecondName from "@/models/author/AllAuthorModelSecondName";
import IdNameSmallModel from "@/models/general/IdNameSmallModel";
import GetReviewerRequestModel from "@/api/plugins/models/Reviewer/GetReviewerRequestModel";
import GetReviewerResponseModel from "@/api/plugins/models/Reviewer/GetReviewerResponseModel";
@Options({})
export default class NewMaterialDetailed extends Vue {
  id: number = null;
  reviewer: NewMaterialModel = new NewMaterialModel();
  publication: GetPublicationResponseModel = new GetPublicationResponseModel();
  AuthorsText: Array<string> = [];
  MaterialType = MaterialType;
  PublicationStatus = PublicationStatus;
  publicationStatus: number = null;
  files: Array<FileGetResponseModel> = [];
  Reviewer: number = null;
  ReviewerName: string = null;
  ReviewerDocument: Array<FileGetResponseModel> = [];
  Authors: Array<IdNameSmallModel> = null;
  SearchModel: GetReviewerRequestModel = new GetReviewerRequestModel();
  async created() {
    console.log(this.$route.params.id);
    this.SearchModel = {
      search: "",
      page: {
        skip: 0,
        take: 6,
      },
    };
    this.id = Number(this.$route.params.id);
    if (this.id) {
      let publication: HttpResponseResult<
        GeneralModel<Array<GetPublicationResponseModel>>
      > = await this.$api.PublicationService.Get({
        publicationId: this.id,
      });
      this.publication = publication.data.items.find((el) => el.id == this.id);
      if (this.publication) {
        this.additionalMethods();
        if (this.publication.reviewerId != null) this.getReviewer();
        this.checkReviewerDocument();
      }
    }
  }
  async checkReviewerDocument() {
    let res: HttpResponseResult<Array<FileGetResponseModel>> =
      await this.$api.FileService.Get({
        publicationId: this.publication.id,
        isReviewer: true,
      });
    this.ReviewerDocument = res.data;
    console.log("checkReviewerDocument", res.data);
  }
  async getReviewer() {
    let res: HttpResponseResult<GeneralModel<Array<GetReviewerResponseModel>>> =
      await this.$api.ReviewerService.Get({
        reviewerId: this.publication.reviewerId,
        publicationId: this.publication.id,
        page: {
          skip: 0,
          take: 10,
        },
      });
    let reviewer: GetReviewerResponseModel = res.data.items.find(
      (el) => el.id == this.publication.reviewerId
    );
    this.ReviewerName =
      reviewer.lastName + " " + reviewer.firstName + " " + reviewer.sureName;
  }
  async additionalMethods() {
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
      let autor: HttpResponseResult<
        GeneralModel<Array<AllAuthorModelSecondName>>
      > = await this.$api.AuthorService.Get({
        authorId: pubAutors.data[i],
      });
      this.AuthorsText.push(this.$store.state.getAvtor(autor.data.items[0]));
    }
    this.getDocument();
  }
  async getDocument() {
    let res = await this.$api.FileService.Get({
      publicationId: this.id,
      isReviewer: false,
    });
    this.files = res.data;
  }
  onChangeArticle(data: Array<FileInput>) {
    this.reviewer.material = data;
  }

  async GetReviewer(search?: string) {
    this.SearchModel.search = search;
    let res: HttpResponseResult<GeneralModel<Array<GetReviewerResponseModel>>> =
      await this.$api.ReviewerService.Get(this.SearchModel);

    let mas: Array<IdNameModel> = [];
    for (let i = 0; i < res.data.items.length; i++) {
      let item = res.data.items[i];
      let fio = item.lastName + " " + item.firstName + " " + item.sureName;
      mas.push({
        Id: item.id,
        Name: fio,
      });
    }
    return mas;
  }
  clickBack() {
    this.$router.push({ name: NEWMATERIALADMIN });
  }
  async SaveReviewer() {
    if (this.Reviewer != null) {
      await this.$api.PublicationService.Update({
        udc: this.publication.udc,
        name: this.publication.name,
        tags: this.publication.tags,
        type: this.publication.type,
        userId: this.publication.userId,
        publicationId: this.publication.id,
        reviewerId: this.Reviewer,
      });
    }
  }
  async SaveReviewerDoc() {
    if (this.reviewer.material.length > 0) {
      for (let i = 0; i < this.reviewer.material.length; i++) {
        let el = this.reviewer.material[i];
        console.log("el", el);
        await this.$api.FileService.UploadFileForPublication({
          name: el.fileName,
          fileBase64: this.$store.state.getBase64Only(el.fileBody),
          isVisibleForReviewers: true,
          fileType: this.publication.type,
          publicationId: this.publication.id,
        });
      }
    }
  }
  async SaveStatus() {
    let res = await this.$api.PublicationService.SetStatus({
      id: this.publication.id,
      status: this.publicationStatus,
    });
  }
}
</script>
<style lang="less" >
.files {
  display: flex;
  flex-direction: column;
  .files-item {
    height: auto;
    min-height: 30px;
  }
}
</style>