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
        :items="test"
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
    <btn isSmall @click="addAuthor" title="Добавить автора" class="mb-5" />
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
      keyField="Id"
      valueField="Name"
      v-model="Authors"
      id="autors"
      :SearchAsyncFunc="GetAuthors"
    />
    <btn
      isSmall
      isActive
      @click="Submit"
      title="Отправить"
      class="mt-10"
    />
  </content>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import FileInput from "@/views/components/rio-psy/ui-file-input/FileModel";
import NewArticleModel from "@/models/new-article/NewArticleModel";
import { ADDAUTHOR } from "@/router/routerNames";
import IdNameModel from "@/models/general/IdNameModel";
@Options({
  // emits: ["goToAdmin"],
})
export default class NewArticle extends Vue {
  antiplagiat: Array<FileInput> = [];
  newArticle: NewArticleModel = new NewArticleModel();
  Authors: any = null;
   test: Array<IdNameModel> = [
    { Id: 1, Name: "34" },
    { Id: 2, Name: "342" },
    { Id: 3, Name: "343" },
    { Id: 4, Name: "3424" },
    { Id: 5, Name: "3425" },
    { Id: 6, Name: "346" },
    { Id: 7, Name: "3427" },
    { Id: 8, Name: "34258" },
    { Id: 9, Name: "3469" },
    { Id: 10, Name: "342710" },
  ];
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
    //получение по search субагентов
    return [];
    // return await this.$api.EnterpriseService.getList({
    //   _filters: { Name: search },
    //   _page: 1,
    //   _perPage: 6,
    // });
  }
  Submit() {
    // проверка на заполнения полей
  }
  // cansel() {}
}
</script>
<style scoped >

</style>