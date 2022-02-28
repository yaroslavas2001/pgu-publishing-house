<template>
    <div class="ui-tags-simple-list">
        <div v-for="(item, index) in Items" :key="index">
            {{item.Value.toString()}}<template v-if="index<count()"></template>
        </div>
    </div>

</template>
<script lang="ts">
import {Vue, Options, Prop} from 'vue-property-decorator'
import ListTags from './listtags';



@Options({name:"ui-tags-simple-list"})
export default class UiTagsSimpleList extends Vue{
  @Prop({ default: () => {}, type: Array })
  Items!: Array<ListTags>;  
  
  count(){
    
      return this.Items.length-1;
  }
}
</script>
<style lang="less" scoped>
.ui-tags-simple-list{
    display:flex;
    flex-wrap: wrap;
}
</style>
