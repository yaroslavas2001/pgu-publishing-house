 <template>
  <div class="header">
    <div class="header-name">
      {{userName}}  {{UserFatherName}}
    </div>
    
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
  userName:string
  UserFatherName:string
  created(){
    this.userName =this.$store.state.FirstName
    this.UserFatherName = this.$store.state.FatherName
  }
  goOut() {
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
.header-name{
  color: aliceblue;
  font-size: 20px;
}
// @media (max-width: 550px) {
//   .mobile500 {
//     display: none;
//   }
// }
</style>