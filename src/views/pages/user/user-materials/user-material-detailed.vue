<template>
  <content title="Детальная" isBack @clickBack="clickBack">
    <info-block title="Название" :description="newArticle.NameArticle" />
    <info-block title="Тип издания" :description="newArticle.Type.toString()" />
    <info-block title="УДК" :description="newArticle.UDC" />
    <info-block title="Ключевые слова" :description="newArticle.Keywords" />
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
  </content>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { USERMATERIALS } from "@/router/routerNames";
import NewArticleModel from "@/models/new-article/NewArticleModel";
@Options({
  // emits: ["goToAdmin"],
})
export default class UserMaterialDetailed extends Vue {
  id: number = null;
  newArticle: NewArticleModel = new NewArticleModel();

  created() {
    console.log(this.$route.params.id);
    this.id = Number(this.$route.params.id);
    // запрос статьи по id
    this.newArticle = new NewArticleModel();
    this.newArticle = {
      Article: [],
      AntiPlagiarism: [],
      Excerpt: [],
      NameArticle: "СОВРЕМЕННЫЕ ТЕХНОЛОГИИ ПРОГРАММИРОВАНИЯ. РАЗРАБОТКА ПРИЛОЖЕНИЙ НА БАЗЕ WPF И SILVERLIGHT",
      UDC: "978-5-7972-1779-4",
      Keywords: "	ВЫЧИСЛИТЕЛЬНАЯ ТЕХНИКА, ВЫЧИСЛИТЕЛЬНЫЕ МАШИНЫ ЭЛЕКТРОННЫЕ ЦИФРОВЫЕ, АВТОМАТИЧЕСКАЯ ОБРАБОТКА ИНФОРМАЦИИ, ИНФОРМАЦИОННЫЕ СИСТЕМЫ И СЕТИ, ПРОГРАММИРОВАНИЕ, АВТОМАТИЗАЦИЯ, УЧЕБНИК ДЛЯ ВЫСШЕЙ ШКОЛЫ, БИЗНЕС-ПРИЛОЖЕНИЯ",
      Authors: [],
      Comments: "string",
      Type: 1,
    };
  }
  clickBack() {
    this.$router.push({ name: USERMATERIALS });
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
<style scoped  lang="less">
</style>