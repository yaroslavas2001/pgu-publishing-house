 <template>
  <div class="header">
    <div class="header-publishing-house">
      Издательство ПГУ <br />им. Т.Г. Шевченок
    </div>
    <div class="header-block">
      <div class="header-name">{{ userName }} {{ UserSureName }}</div>
      <btn isSmall @click="goOut" title="Выход" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import UiSelectLang from "@components/ui-select-option-lang.vue";
import { LOGIN } from "@/router/routerNames";
import Cookies from "js-cookie";
import AuthService from "@/api/plugins/services/AuthService";

@Options({
  components: { UiSelectLang },
  name: "LayoutHeader",
})
export default class LayoutHeaderUser extends Vue {
  userName: string;
  UserSureName: string;
  created() {
    this.userName = Cookies.get(AuthService.FirstName);
    this.UserSureName = Cookies.get(AuthService.LastName);
  }
  goOut() {
    this.$api.AuthService.logout();
    this.$router.push({ name: LOGIN });
  }
}
</script>
<style lang="less">
@import "../../../assets/less/main.less";

.header {
  height: 65px;
  background-color: @BcLayoutHeader;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
  .header-publishing-house {
    font-family: @fontFamily !important;
    font-size: 15px;
  }
  .header-block {
    display: flex;
    align-items: center;
    .header-name {
      font-size: 18px;
      margin-right: 10px;
      font-family: @fontFamily !important;
      color: @CLayoutHeader;
    }
  }
}
</style>