<template>
  <modal-block title="Рецензирование" :isBask="false">
    <info-block title="Название" :description="material.name" />
    <info-block title="Ключевые слова" :description="material.tags" />
    <info-block title="УДК" :description="material.udc" />

    <info-block
      title="Тип издания"
      :description="$store.state.getType(material.type)"
    />

    <div v-if="files.length > 0">
      <div v-for="(item, index) in files" :key="index">
        {{ item.name }}
        <a :href="item.url" target="_blank">Посмотреть</a>
      </div>
    </div>
    <file-input @onChange="onChangeArticle($event)">
      <btn isSmall title="Добавить рецензию" />
    </file-input>
  </modal-block>
</template>
<script lang="ts">
import FileGetResponseModel from "@/api/plugins/models/File/FileGetResponseModel";
import GetPublicationResponseModel from "@/api/plugins/models/Publication/GetPublicationResponseModel";
import UiFileInput from "@/views/components/rio-psy/ui-file-input/file-input.vue";
import { Options, Vue } from "vue-property-decorator";
@Options({})
export default class Reviewer extends Vue {
  publicationId: number = null;
  material: GetPublicationResponseModel = new GetPublicationResponseModel();
  AuthorsText: Array<string> = [];
  files: Array<FileGetResponseModel> = [];

  created() {
    this.publicationId = Number(this.$route.params.id);
    // console.log("publicationId", this.publicationId);
    this.getArticle();
    this.getDocument();
  }
  onChangeArticle(data: Array<UiFileInput>) {
    console.log("data", data);
    // this.newMaterial.material = data;
  }
  async getArticle() {
    let res = await this.$api.PublicationService.Get({
      publicationId: this.publicationId,
    });
    this.material = res.data.items.find((el) => el.id == this.publicationId);
    console.log("res", res);
  }
  async getDocument() {
    let res = await this.$api.FileService.Get({
      publicationId: this.publicationId,
      isReviewer: true,
    });
    this.files = res.data;
    console.log("res", res.data);
  }
}
</script>
<style scoped >
</style>