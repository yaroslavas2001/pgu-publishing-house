<template>
  <content title="Указать статус материалу">
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
      :items="testMaterial"
      v-model="newArticle.Type"
      defaultText="Выберите тип"
      id="Type"
      class="mt-2 mb-8"
    />
    <file-input @onChange="onChangeExtract($event)">
      <btn isSmall title="Добавить выписку с кафедры" />
    </file-input>
    <info-block title="Название" :description="newArticle.NameArticle" />

    <info-block title="УДК" :description="newArticle.UDC" />

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
        v-model="newArticle.Authors"
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
import { ADMINMATERIALS } from "@/router/routerNames";
import IdNameModel from "@/models/general/IdNameModel";
import NewArticleModel from "@/models/new-article/NewArticleModel";
import FileInput from "@/views/components/rio-psy/ui-file-input/FileModel";

@Options({
  // emits: ["goToAdmin"],
})
export default class MaterialDetailed extends Vue {
  id: number = null;
  Authors: any = null;
  newArticle: NewArticleModel = new NewArticleModel();

  testMaterial: Array<IdNameModel> = [
    { Id: 1, Name: "Статья" },
    { Id: 2, Name: "Книга" },
    { Id: 3, Name: "Методическое пособие" },
    { Id: 4, Name: "Бланк" },
  ];
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
  created() {
    console.log(this.$route.params.id);
    this.id = Number(this.$route.params.id);
    this.newArticle = new NewArticleModel();
    this.newArticle = {
      Article: [],
      AntiPlagiarism: [],
      Excerpt: [],
      NameArticle:
        "СОВРЕМЕННЫЕ ТЕХНОЛОГИИ ПРОГРАММИРОВАНИЯ. РАЗРАБОТКА ПРИЛОЖЕНИЙ НА БАЗЕ WPF И SILVERLIGHT",
      UDC: "978-5-7972-1779-4",
      Keywords:
        "	ВЫЧИСЛИТЕЛЬНАЯ ТЕХНИКА, ВЫЧИСЛИТЕЛЬНЫЕ МАШИНЫ ЭЛЕКТРОННЫЕ ЦИФРОВЫЕ, АВТОМАТИЧЕСКАЯ ОБРАБОТКА ИНФОРМАЦИИ, ИНФОРМАЦИОННЫЕ СИСТЕМЫ И СЕТИ, ПРОГРАММИРОВАНИЕ, АВТОМАТИЗАЦИЯ, УЧЕБНИК ДЛЯ ВЫСШЕЙ ШКОЛЫ, БИЗНЕС-ПРИЛОЖЕНИЯ",
      Authors: [],
      Comments: "string",
      Type: 1,
      Status: 1,
    };
  }
  Save() {}
  clickBack() {
    this.$router.push({ name: ADMINMATERIALS });
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