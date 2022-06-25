<template>
  <content title="Добавить новый материал">
    <file-input @onChange="onChangeArticle($event)">
      <btn isSmall title="Добавить материал" />
    </file-input>
    <file-input @onChange="onChangeAntiPl($event)">
      <btn isSmall title="Добавить антиплагиат" />
    </file-input>
    <label for="Type">Тип печатного издания</label>
    <select-autocomplete
      keyField="Id"
      valueField="Name"
      :items="MaterialType"
      v-model="newArticle.Type"
      defaultText="Выберите тип"
      id="Type"
      class="mt-2 mb-8"
    />
    <file-input @onChange="onChangeExtract($event)">
      <btn isSmall title="Добавить выписку с кафедры" />
    </file-input>
    <label-input
      nameLabel="Название статьи"
      placeholder="Введите название статьи"
      v-model="newArticle.NameArticle"
    />
    <label-input
      nameLabel="УДК"
      placeholder="Введите УДК"
      v-model="newArticle.UDC"
    />
    <label-input
      nameLabel="Ключевые слова"
      placeholder="Введите клчевые слова"
      v-model="newArticle.Keywords"
    />
    <label-input
      nameLabel="Комментарии"
      placeholder="Добавте комментарий для проверяющего"
      v-model="newArticle.Comments"
    />
    <!-- <btn isSmall @click="addAuthor" title="Добавить автора" class="mb-5" /> -->
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
import NewArticleModel from "@/models/new-article/NewArticleModel";
import { ADDAUTHOR } from "@/router/routerNames";
import MaterialType from "@/common/MaterialType";
import SearchModel from "@/api/plugins/models/Search/SearchModel";
import SearchAuthorResponseModel from "@/api/plugins/models/Author/SearchAuthorResponseModel";
import GeneralModel from "@/api/plugins/models/GeneralModel";
import HttpResponseResult from "@/api/plugins/models/httpResponseResult";
import IdNameSmallModel from "@/models/general/IdNameSmallModel";
@Options({
  // emits: ["goToAdmin"],
})
export default class NewArticle extends Vue {
  MaterialType = MaterialType;
  antiplagiat: Array<FileInput> = [];
  newArticle: NewArticleModel = new NewArticleModel();
  Authors: any = null;
  SearchModel: SearchModel = new SearchModel();
  created() {
    this.SearchModel = {
      search: "",
      page: {
        skip: 0,
        take: 6,
      },
    };
  }
  onChangeArticle(data: Array<FileInput>) {
    this.newArticle.Article = data;
  }
  onChangeAntiPl(data: Array<FileInput>) {
    this.newArticle.AntiPlagiarism = data;
  }
  onChangeExtract(data: Array<FileInput>) {
    this.newArticle.Excerpt = data;
  }
  addAuthor() {
    this.$router.push({ name: ADDAUTHOR });
  }
  async GetAuthors(search?: string) {
    console.log("search",search)
    this.SearchModel.search = search;
    let res: HttpResponseResult<
      GeneralModel<Array<SearchAuthorResponseModel>>
    > = await this.$api.AuthorService.Search(this.SearchModel);
    
    let mas: Array<IdNameSmallModel> = [];
    for (let i = 0; i < res.data.items.length; i++) {
      let item = res.data.items[i];
      let fio = item.firstName + " " + item.secondName + " " + item.sureName
      mas.push({
        id: item.id,
        name: fio,
      });
    }
    console.log("mas",mas,"search",search)
    return mas;
  }
  Submit() {
    // проверка на заполнения полей
  }
  // cansel() {}
}
</script>
<style scoped >
</style>