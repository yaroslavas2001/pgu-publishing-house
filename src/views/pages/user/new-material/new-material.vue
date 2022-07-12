<template>
  <content title="Добавить новый материал">
    <file-input @onChange="onChangeArticle($event)">
      <btn isSmall title="Добавить материал" />
    </file-input>
    <file-input @onChange="onChangeAntiPl($event)">
      <btn isSmall title="Добавить антиплагиат" />
    </file-input>
    <file-input @onChange="onChangeExtract($event)">
      <btn isSmall title="Добавить выписку с кафедры" />
    </file-input>
    <label for="Type">Тип печатного издания</label>
    <select-autocomplete
      keyField="Id"
      valueField="Name"
      :items="MaterialType"
      v-model="newMaterial.type"
      defaultText="Выберите тип"
      id="Type"
      class="mt-2 mb-8"
    />
    <label-input
      nameLabel="Название"
      placeholder="Введите название"
      v-model="newMaterial.nameArticle"
    />
    <label-input
      nameLabel="УДК"
      placeholder="Введите УДК"
      v-model="newMaterial.udc"
    />
    <label-input
      nameLabel="Ключевые слова"
      placeholder="Введите клчевые слова"
      v-model="newMaterial.tags"
    />
    <div
      for="autors"
      title="Если вы не нашли автора в списке, его нужно вначале добавить."
      class="mb-3"
    >
      Авторы
    </div>

    <autocomplete-multiselect
      class="autocomplete-multiselect"
      selectText="Выберите авторов"
      keyField="id"
      valueField="name"
      v-model="Authors"
      id="autors"
      :SearchAsyncFunc="GetAuthors"
    />
    <btn isSmall isActive @click="Submit" title="Отправить" class="mt-10" />
  </content>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import FileInput from "@/views/components/rio-psy/ui-file-input/FileModel";
import NewMaterialModel from "@/models/new-material/NewMaterialModel";
import { ADDAUTHOR, ALLUSERMATERIALS } from "@/router/routerNames";
import MaterialType from "@/common/MaterialType";
import SearchModel from "@/api/plugins/models/Search/SearchModel";
import SearchAuthorResponseModel from "@/api/plugins/models/Author/SearchAuthorResponseModel";
import GeneralModel from "@/api/plugins/models/GeneralModel";
import HttpResponseResult from "@/api/plugins/models/httpResponseResult";
import IdNameSmallModel from "@/models/general/IdNameSmallModel";
import FileType from "@/Enum/FileType";
import AuthorModel from "@/models/author/AuthorModel";
@Options({})
export default class NewArticle extends Vue {
  MaterialType = MaterialType;
  antiplagiat: Array<FileInput> = [];
  newMaterial: NewMaterialModel = new NewMaterialModel();
  Authors: Array<IdNameSmallModel> = null;
  FileType = FileType;
  SearchModel: SearchModel = new SearchModel();
  created() {
    this.SearchModel = {
      search: "",
      page: {
        skip: 0,
        take: 6,
      },
    };
    this.newMaterial = new NewMaterialModel();
  }
  onChangeArticle(data: Array<FileInput>) {
    this.newMaterial.material = data;
  }
  onChangeAntiPl(data: Array<FileInput>) {
    this.newMaterial.antiPlagiarism = data;
  }
  onChangeExtract(data: Array<FileInput>) {
    this.newMaterial.excerpt = data;
  }
  addAuthor() {
    this.$router.push({ name: ADDAUTHOR });
  }
  async GetAuthors(search?: string) {
    // console.log("search", search);
    this.SearchModel.search = search;
    let res: HttpResponseResult<
      GeneralModel<Array<SearchAuthorResponseModel>>
    > = await this.$api.AuthorService.Search(this.SearchModel);

    let mas: Array<IdNameSmallModel> = [];
    for (let i = 0; i < res.data.items.length; i++) {
      let item = res.data.items[i];
      let fio = item.firstName + " " + item.secondName + " " + item.sureName;
      mas.push({
        id: item.id,
        name: fio,
      });
    }
    // console.log("mas", mas, "search", search);
    return mas;
  }
  async Submit() {
    let submit = await this.$api.PublicationService.Add({
      udc: this.newMaterial.udc,
      name: this.newMaterial.nameArticle,
      tags: this.newMaterial.tags,
      type: this.newMaterial.type,
      userId: this.$store.state.UserId,
    });
    let resAvtor: HttpResponseResult<AuthorModel>;
    let resDoc: HttpResponseResult<any>;

    if (submit.isSuccess) {
      for (let i = 0; i < this.Authors.length; i++) {
        let el = this.Authors[i];
        resAvtor = await this.$api.PublicationAuthorService.Add({
          publicationId: submit.data,
          authorId: el.id,
        });
      }
      for (let i = 0; i < this.newMaterial.antiPlagiarism.length; i++) {
        let ela = this.newMaterial.antiPlagiarism[i];
        await this.$api.FileService.UploadFileForPublication({
          name: ela.fileName,
          fileBase64: this.$store.state.getBase64Only(ela.fileBody),
          isVisibleForReviewers: false,
          fileType: FileType.AntiPlagiarism,
          publicationId: submit.data,
        });
      }
      for (let i = 0; i < this.newMaterial.excerpt.length; i++) {
        let ele = this.newMaterial.excerpt[i];
        await this.$api.FileService.UploadFileForPublication({
          name: ele.fileName, //el.path,
          fileBase64: this.$store.state.getBase64Only(ele.fileBody),
          isVisibleForReviewers: false,
          fileType: FileType.Extract,
          publicationId: submit.data,
        });
      }
      for (let i = 0; i < this.newMaterial.material.length; i++) {
        let elm = this.newMaterial.material[i];
        await this.$api.FileService.UploadFileForPublication({
          name: elm.fileName,
          fileBase64: this.$store.state.getBase64Only(elm.fileBody),
          isVisibleForReviewers: false,
          fileType: this.newMaterial.type,
          publicationId: submit.data,
        });
      }

      if ( resAvtor.isSuccess)
        this.$router.push({ name: ALLUSERMATERIALS });
      else {
        //todo ошибка
      }
    }
  }
}
</script>
<style scoped >
</style>