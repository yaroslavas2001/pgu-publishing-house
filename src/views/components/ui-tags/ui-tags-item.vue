<template>
  <div class="ui-tags-item" @click="close(item)">
    <slot name="default" v-bind="item.Value">
      <div class="default">{{title}}</div>
    </slot>
  </div>
</template>
<script lang="ts">
import { Options, Vue, Prop, Watch } from "vue-property-decorator";
import ListTags from "./listtags";

@Options({
  name: "ui-tags-item"
})
export default class UITagsItem extends Vue {
  @Prop({ default: null, type: String })  title!: String;
  @Prop({ default: null, type: Object })   item!: ListTags;
  @Prop({ default: true, type: Boolean })   edit: Boolean;

  close(value: any) {
    if (this.edit) 
      console.log("close ui-tags-item")
      this.$emit("close", value);
    return false;
  }
}
</script>
<style lang="less" scoped>
.ui-tags-item {
  .default {
    cursor: pointer;
    padding: 5px 10px;
    background-color: #203250;
    margin: 0 5px 0 0;
  }
}
</style>