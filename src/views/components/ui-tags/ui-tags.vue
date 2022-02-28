<template>
  <div class="ui-tags">
    <ui-tags-item  v-for="(item, index) in items " :key="index" :item="item" :title="item.Value.ToString()" :edit="edit" @close="close(item)"></ui-tags-item>
  </div>
</template>

<script lang="ts">
import { Options, Vue, Prop, Watch } from "vue-property-decorator";
import ListTags from "./listtags";

@Options({
  name: "ui-tags"
})
export default class UiTagsComponent extends Vue {
  @Prop({ default: () => {}, type: Array })
  items!: Array<ListTags>;
  @Prop({ default: true, type: Boolean })
  edit: Boolean;

  close(value: ListTags) {
    console.log("ui-tags  close");
    value.Selected = false;
    this.$emit("close", value);
  }

  //   mounted() {
  //      this.$children.forEach(item => item.$on("close",this.close))
  //   }
}
</script>

<style lang="less" scoped>
.ui-tags {
  flex-direction: row;
  display: flex;
  flex-wrap: wrap;
}
</style>


