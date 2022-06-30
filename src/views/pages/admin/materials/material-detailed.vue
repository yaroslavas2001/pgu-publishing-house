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
    <div v-if="answer">
      <info-block title="Ответ рецензента" :description="comment" />
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

import { ADMINMATERIALS, NEWMATERIALADMIN } from "@/router/routerNames";
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
import GetReviewResponseModel from "@/api/plugins/models/Review/GetReviewResponseModel";
@Options({})
export default class MaterialDetailed extends Vue {
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
  answer: GetReviewResponseModel = new GetReviewResponseModel();
  comment: string = "";
  async created() {
    this.SearchModel = {
      search: "",
      page: {
        skip: 0,
        take: 6,
      },
    };
    this.id = Number(this.$route.params.id);
    this.answer = new GetReviewResponseModel();

    if (this.id) {
      let publication: HttpResponseResult<
        GeneralModel<Array<GetPublicationResponseModel>>
      > = await this.$api.PublicationService.Get({
        publicationId: this.id,
      });
      this.publication = publication.data.items.find((el) => el.id == this.id);
      if (this.publication) {
        this.publicationStatus = this.publication.status;
        this.additionalMethods();
        if (this.publication.reviewerId != null) this.getReviewer();
        this.checkReviewerDocument();
      }
    }
    this.getRevie()
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
  async getRevie() {
    let res: HttpResponseResult<Array<GetReviewResponseModel>> =
      await this.$api.ReviewService.Get({
        publicationId: this.publication.id,
      });
    this.answer = res.data[0];
    this.comment = res.data[0].comment;
  }
  // получить фио рецензента
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
  clickBack() {
    this.$router.push({ name: ADMINMATERIALS });
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