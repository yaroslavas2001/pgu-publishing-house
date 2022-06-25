 <template>
  <div class="header">
    <div class="header-publishing-house">
      Издательство ПГУ <br>им. Т.Г. Шевченок
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

@Options({
  components: { UiSelectLang },
  name: "LayoutHeader",
})
export default class LayoutHeaderUser extends Vue {
  userName: string;
  UserSureName: string;
  created() {
    this.userName = this.$store.state.FirstName;
    this.UserSureName = this.$store.state.SureName;
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
  background-color: #dbd2c2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
  .header-publishing-house {
    font-family: "Open Sans", sans-serif !important;
          font-size: 15px;

  }
  .header-block {
    display: flex;
    align-items: center;
    .header-name {
      color: #000;
      font-size: 18px;
      margin-right: 10px;
      font-family: "Open Sans", sans-serif !important;
      color: #241205;
    }
  }
}

// @media (max-width: 550px) {
//   .mobile500 {
//     display: none;
//   }
// }
</style>