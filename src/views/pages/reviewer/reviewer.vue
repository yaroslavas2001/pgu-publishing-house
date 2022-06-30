<template>
  <modal-block title="Рецензирование" :isBask="false">
    <info-block title="Название" :description="material.name" />
    <info-block title="Ключевые слова" :description="material.tags" />
    <info-block title="УДК" :description="material.udc" />

    <info-block
      title="Тип издания"
      :description="$store.state.getType(material.type)"
    />
    <div class="mt-10 mb-5"><b>Материалы</b></div>
    <div v-if="files.length > 0">
      <div v-for="(item, index) in files" :key="index">
        {{ item.name }}
        <a :href="item.url" target="_blank">Посмотреть</a>
      </div>
    </div>

    <file-input @onChange="onChangeArticle($event)">
      <btn isSmall title="Добавить рецензию" />
    </file-input>
        <label-input
      nameLabel="Комментарий к статье"
      placeholder="Введите коментарий к статье"
      v-model="comment"
    />
    <btn isSmall isActive @click="Submit" title="Отправить" class="mt-10" />
  </modal-block>
</template>
<script lang="ts">
import FileGetResponseModel from "@/api/plugins/models/File/FileGetResponseModel";
import HttpResponseResult from "@/api/plugins/models/httpResponseResult";
import GetPublicationResponseModel from "@/api/plugins/models/Publication/GetPublicationResponseModel";
import FileModel from "@/views/components/rio-psy/ui-file-input/FileModel";
import { Options, Vue } from "vue-property-decorator";
import FileType from "@/Enum/FileType";
import { ReviewerGratitude } from "@/router/routerNames";

@Options({})
export default class Reviewer extends Vue {
  publicationId: number = null;
  material: GetPublicationResponseModel = new GetPublicationResponseModel();
  Review: Array<FileModel> = [];

  AuthorsText: Array<string> = [];
  files: Array<FileGetResponseModel> = [];
  comment: string = "";
  wrong: string = "";
  created() {
    this.publicationId = Number(this.$route.params.id);
    this.getArticle();
    this.getDocument();
  }
  onChangeArticle(data: Array<FileModel>) {
    this.Review = data;
  }
  async getArticle() {
    let res = await this.$api.PublicationService.Get({
      publicationId: this.publicationId,
    });
    this.material = res.data.items.find((el) => el.id == this.publicationId);
  }
  async getDocument() {
    let res = await this.$api.FileService.Get({
      publicationId: this.publicationId,
      isReviewer: true,
    });
    this.files = res.data;
  }
  async Submit() {
    let res: HttpResponseResult<any> = await this.$api.ReviewService.Add({
      publicationId: this.publicationId,
      comment: this.comment,
    });
    let sucses: Array<boolean> = [];
    for (let i = 0; i < this.Review.length; i++) {
      let el = this.Review[i];
      let resDoc: HttpResponseResult<any> =
        await this.$api.FileService.UploadFileForPublication({
          name: el.fileName,
          fileBase64: this.$store.state.getBase64Only(el.fileBody),
          isVisibleForReviewers: false,
          fileType: FileType.Review,
          publicationId: this.publicationId,
        });
      sucses.push(resDoc.isSuccess);
    }
    if (res.isSuccess && !sucses.includes(false)) {
      this.$router.push({name:ReviewerGratitude})
    } else {
      this.wrong = "Возникла ошибка с добавлением рецензии";
    }
  }
}
</script>
<style scoped >
</style>