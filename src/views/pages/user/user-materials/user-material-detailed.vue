<template>
  <content
    title="Детальная"
    isBack
    @clickBack="clickBack"
    v-if="material.Status == 0"
  >
    <info-block title="Название" :description="material.NameArticle" />
    <info-block title="Тип издания" :description="material.Type.toString()" />
    <info-block title="УДК" :description="material.UDC" />
    <info-block title="Ключевые слова" :description="material.Keywords" />
    <info-block title="Авторы">
      <autocomplete-multiselect
        class="autocomplete-multiselect"
        keyField="Id"
        valueField="Name"
        v-model="material.Authors"
        id="autors"
        :SearchAsyncFunc="GetAuthors"
        :closeOnSelect="true"
      />
    </info-block>
  </content>
  <content
    title="Редактирование материала"
    isBack
    @clickBack="clickBack"
    v-if="(material.Status = 1)"
  >
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
      v-model="material.Type"
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
      v-model="material.NameArticle"
    />
    <label-input
      nameLabel="УДК"
      placeholder="Введите УДК"
      v-model="material.UDC"
    />
    <label-input
      nameLabel="Ключевые слова"
      placeholder="Введите клчевые слова"
      v-model="material.Keywords"
    />
    <label-input
      nameLabel="Комментарии"
      placeholder="Добавте комментарий для проверяющего"
      v-model="material.Comments"
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
      keyField="Id"
      valueField="Name"
      v-model="Authors"
      id="autors"
      :SearchAsyncFunc="GetAuthors"
    />
    --------------------------------------------
    <info-block title="Комментарии рецензиата" :description="answer.Comm" />
    <div v-for="(item,index) in answer.File" :key="index">
    <file-input @onChange="onChangeArticle($event)">
      <!-- <btn isSmall title="Добавить материал" /> -->
    </file-input>
    </div>
  </content>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { USERMATERIALS } from "@/router/routerNames";
import FileInput from "@/views/components/rio-psy/ui-file-input/FileModel";

import NewArticleModel from "@/models/new-article/NewArticleModel";
import IdNameModel from "@/models/general/IdNameModel";
@Options({
  // emits: ["goToAdmin"],
})
export default class UserMaterialDetailed extends Vue {
  id: number = null;
  material: NewArticleModel = new NewArticleModel();
  testMaterial: Array<IdNameModel> = [
    { Id: 1, Name: "Статья" },
    { Id: 2, Name: "Книга" },
    { Id: 3, Name: "Методическое пособие" },
    { Id: 4, Name: "Бланк" },
  ];

  Authors: any = null;
  answer: any = {
    Id: 123,
    Comm: "Не правильно заполенно что-то там",
    File: [],
  };
  created() {
    console.log(this.$route.params.id);
    this.id = Number(this.$route.params.id);
    // запрос статьи по id
    this.material = new NewArticleModel();
    this.material = {
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
    // сделать запрос на получение комментария и документа
  }
  onChangeArticle(data: Array<FileInput>) {
    this.material.Article = data;
  }
  onChangeAntiPl(data: Array<FileInput>) {
    this.material.AntiPlagiarism = data;
  }
  onChangeExtract(data: Array<FileInput>) {
    this.material.Excerpt = data;
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