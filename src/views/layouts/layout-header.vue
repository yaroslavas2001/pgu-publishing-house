 <template>
  <div class="header"></div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { NEWS } from "@/router/routerNames";
import Cookies from "js-cookie";
import UiSelectLang from "@components/ui-select-option-lang.vue";
@Options({
  components: { UiSelectLang },
  name: "LayoutHeader",
})
export default class LayoutHeaderUser extends Vue {}
</script>
<style lang="less">
.header{
  height: 65px;
  background-color: #062634;
}
// @media (max-width: 550px) {
//   .mobile500 {
//     display: none;
//   }
// }
</style>