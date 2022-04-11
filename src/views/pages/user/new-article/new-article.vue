<template>
  <content title="Добавить статью">
    <file-input @onChange="onChangeArticle($event)">
      <button>Добавить статью</button>
    </file-input>
    <file-input @onChange="onChangeAntiPl($event)">
      <button>Добавить антиплагиат</button>
    </file-input>
    <file-input @onChange="onChangeExtract($event)">
      <button>Добавить выписку с кафедры</button>
    </file-input>
    <label-input
      nameLabel="Название статьи"
      placeholder="placeholder"
      v-model="newArticle.NameArticle"
    />
    <label-input
      nameLabel="УДК"
      placeholder="placeholder"
      v-model="newArticle.UDC"
    />
    <label-input
      nameLabel="Ключевые слова"
      placeholder="placeholder"
      v-model="newArticle.Keywords"
    />
    <label-input
      nameLabel="Комментарии"
      placeholder="placeholder"
      v-model="newArticle.Comments"
    />
    <label for="autors">Авторы</label>
    <button @click="addAuthor">Добавить автора</button>

    <autocomplete-multiselect
      class="autocomplete-multiselect"
      selectText="Выберите авторов"
      keyField="Id"
      valueField="Name"
      v-model="Authors"
      id="autors"
      :SearchAsyncFunc="GetAuthors"
    />

    <button @click="Submit">Отправить</button>
  </content>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import FileInput from "@/views/components/rio-psy/ui-file-input/FileModel";
import NewArticleModel from "@/models/new-article/NewArticleModel";
import { ADDAUTHOR } from "@/router/routerNames";
@Options({
  // emits: ["goToAdmin"],
})
export default class NewArticle extends Vue {
  antiplagiat: Array<FileInput> = [];
  newArticle: NewArticleModel = new NewArticleModel();
  Authors: any = null;
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