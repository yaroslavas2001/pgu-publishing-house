 <template>
  <div class="header">
    admim
    <button @click="goOut">Выход</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import UiSelectLang from "@components/ui-select-option-lang.vue";
import { LOGIN } from "@/router/routerNames";

@Options({
  components: { UiSelectLang },
  name: "LayoutHeader",
})
export default class LayoutHeaderUser extends Vue {
  goOut() {
    console.log("выход");
    this.$api.AuthService.logout();
    this.$router.push({ name: LOGIN });
  }
}
</script>
<style lang="less">
.header {
  height: 65px;
  background-color: #062634;
}
// @media (max-width: 550px) {
//   .mobile500 {
//     display: none;
//   }
// }
</style>