<template>
  <content title="Указать статус материалу">
    <info-block title="Название" :description="publication.name" />
    <info-block title="Ключевые слова" :description="publication.tags" />

    <!-- <file-input @onChange="onChangeArticle($event)">
      <btn isSmall title="Добавить материал" />
    </file-input>
    <file-input @onChange="onChangeAntiPl($event)">
      <btn isSmall title="Добавить антиплагиат" />
    </file-input> -->
    <!-- <label for="Type">Тип печатного издания</label> -->
    <!-- <select-autocomplete
      keyField="Id"
      valueField="Name"
      :items="testMaterial"
      v-model="newArticle.type"
      defaultText="Выберите тип"
      id="Type"
      class="mt-2 mb-8"
    /> -->
    <!-- <file-input @onChange="onChangeExtract($event)">
      <btn isSmall title="Добавить выписку с кафедры" />
    </file-input> -->


    <label-input
      nameLabel="Ключевые слова"
      placeholder="Введите клчевые слова"
      v-model="newArticle.tags"
    />
    <label-input
      nameLabel="Комментарии"
      placeholder="Добавте комментарий для проверяющего"
      v-model="newArticle.comments"
    />
    <div
      for="autors"
      title="Если вы не нашли автора в списке, его нужно вначале добавить."
      class="mb-3"
    >
      Авторы
    </div>
    <info-block title="Авторы">
      <autocomplete-multiselect
        class="autocomplete-multiselect"
        keyField="Id"
        valueField="Name"
        v-model="newArticle.authors"
        id="autors"
        :SearchAsyncFunc="GetAuthors"
        :closeOnSelect="true"
      />
    </info-block>
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
@Options({})
export default class NewMaterialDetailed extends Vue {
  id: number = null;
  Authors: any = null;
  newArticle: NewMaterialModel = new NewMaterialModel();
  publication: GetPublicationResponseModel = new GetPublicationResponseModel();
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
    console.log("id",this.id)
    let res: HttpResponseResult<Array<FileGetResponseModel>> =
      await this.$api.FileService.Get({
        publicationId: this.id,
        isReviewer: false,
      });
    if (res.isSuccess) {
      console.log("res",res.data)
    }
    // let autors = await this.$api.PublicationAuthorService.Get({
    //   publicationId: this.id,
    // });
    // console.log("авторы",autors)
  }
  onChangeArticle(data: Array<FileInput>) {
    this.newArticle.material = data;
  }
  Save() {}
  onChangeAntiPl(data: Array<FileInput>) {
    this.newArticle.antiPlagiarism = data;
  }
  onChangeExtract(data: Array<FileInput>) {
    this.newArticle.excerpt = data;
  }

  clickBack() {
    this.$router.push({ name: NEWMATERIALADMIN });
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
}
</script>
<style scoped >
</style>