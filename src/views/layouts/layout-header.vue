 <template>
  <div class="top-panel">
    <div class="container-fluid">
      <div class="logo mobile500">
        <a href="index.html"><img src="" alt="index" title="" /></a>
        <span class="logo-text">Serviciu de plăți</span>
      </div>
      <ul class="nav left-menu mobile500">
        <li>
          <a href="tel: +37222855888" class="phone"> +(372) 22 855 888</a>
        </li>
        <li>
          <a href="mailto:support@paymaster.md" class="mail">
            support@paymaster.md
          </a>
        </li>
      </ul>
      <div class="select-city">
        <ui-select-option-lang @changeLang="changeLang" />
      </div>
      <ul class="nav right-menu">
        <li>
          <span class="name">{{ $store.state.CurrentUser }}</span>
        </li>
        <li class="mobile">
          <span class="balance">
            Баланс:
            <strong>0.<sup>0</sup></strong>
            TND
          </span>
          <a href="#" class="refresh" title="Обновить" />
        </li>
        <li class="mobile">
          <span class="balance">
            Сальдо:
            <strong>0.<sup>0</sup></strong>
            TND
          </span>
          <a href="#" class="refresh" title="Обновить" />
        </li>
        <li class="lk_l mobile">
          <a href="#" class="lk">(215) 21882528</a>
        </li>
        <li>
          <a href="#" class="logout" title="Выйти" @click="Logout"></a>
        </li>
      </ul>
    </div>
  </div>
  <header>
    <div class="container-fluid">
      <div class="row">
        <div class="col-6">
          <div class="logo">
            <!-- на новости -->
            <router-link :to="{ name: News }">
              <a href="#">
                <img src="@assets/img/logo.svg" alt="logo" title="" />
              </a>
            </router-link>
            <span class="logo-text">Serviciu de plăți</span>
          </div>
        </div>
      </div>
    </div>
  </header>
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
export default class LayoutHeaderUser extends Vue {
  News = NEWS;
  async created() {
    const cookie = Cookies.get("userName");
    this.$store.state.CurrentUser = cookie;
  }
  async Logout() {
    this.$api.AuthService.logout();
    this.$router.push({ name: "login" });
  }
  changeLang(lang: string) {
    console.log("lang", lang);
  }
}
</script>
<style lang="less">
.top-panel {
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1500;
  padding: 5px 0 7px 0;
  background: #253238;
  color: #fff;
}
.top-panel .select-city {
  float: right;
  margin-left: 5px;
}
.top-panel .select-city .current-val.open:after {
  display: block;
  content: "";
  height: 3px;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 100;
  position: absolute;
  bottom: -2px;
}
.top-panel .logo {
  display: none;
}
.top-panel .links {
  float: left;
}
.top-panel .left-menu {
  float: left;
}
.top-panel .right-menu {
  float: right;
  padding-top: 9px;
  margin-right: 12px;
}
.top-panel .right-menu .btn {
  font-size: 12px !important;
  line-height: 18px;
  padding: 10px 15px;
  height: 38px;
}
.top-panel .left-menu {
  padding: 10px 0 0 0;
}
.top-panel .left-menu a,
.top-panel .right-menu a,
.top-panel .left-menu span,
.top-panel .right-menu span {
  line-height: 20px;
  display: inline-block;
}
.top-panel .left-menu a,
.top-panel .right-menu a {
  color: #fff;
  text-decoration: none;
}
.top-panel .left-menu li,
.top-panel .right-menu li {
  margin-left: 30px;
}
.top-panel .left-menu li:first-child,
.top-panel .right-menu li:first-child {
  margin: 0;
}

.top-panel .nav .name {
  font-weight: bold;
  padding-top: 3px;
}
.top-panel .nav .lk_l {
  font-weight: bold;
  padding-left: 25px;
  background: url("~@assets/img/icon/usr.svg") no-repeat 0 50%;
}

.select-city {
  position: relative;
  z-index: 100;
}
.select-city .current-val {
  cursor: pointer;
  position: relative;
  height: 38px;
  padding: 8px 15px;
  width: 75px;
  font-size: 14px;
  background: #fff;
  border-radius: 8px;
  color: #4f5e74;
}
.select-city .current-val span {
  margin-top: 3px;
  color: #0e357e;
  width: 95%;
  line-height: 100%;
  padding-left: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.select-city .current-val i {
  background: url("~@assets/img/icon/m2down.png") no-repeat 0 0;
  background-size: 12px;
  width: 12px;
  height: 7px;
  position: absolute;
  right: 15px;
  margin-top: -4px;
  top: 50%;
}
.select-city .current-val.open {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.select-city .down {
  width: 130px;
  right: 0;
  padding: 15px 15px 0 20px;
  top: 100%;
  z-index: 1005;
  color: #4f5e74;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 16px 16px rgba(162, 162, 162, 0.2);
  border-top-right-radius: 0;
  position: absolute;
  display: none;
}
.select-city .down a {
  font-weight: normal;
  margin-bottom: 15px;
  color: #4f5e74;
  display: block;
}
.select-city .down a:hover {
  color: #71b92f;
}
.select-city .down label {
  font-size: 14px;
  display: block;
}
.select-city .down .nice-select {
  width: 100%;
  margin-bottom: 10px;
}
a.phone,
span.phone {
  font-family: "Montserrat", serif;
  padding-left: 28px;
  background: url("~@assets/img/icon/phone.png") no-repeat 0 50%;
  background-size: 20px;
  line-height: 20px;
  display: inline-block;
}
a.mail,
span.mail {
  font-family: "Montserrat", serif;
  padding-left: 28px;
  background: url("~@assets/img/icon/mail.png") no-repeat 0 50%;
  background-size: 20px;
  line-height: 20px;
  display: inline-block;
}
a.time,
span.time {
  padding-left: 28px;
  background: url("~@assets/img/icon/clock.png") no-repeat 0 50%;
  background-size: 20px;
  line-height: 20px;
  display: inline-block;
}
a.map,
span.map {
  padding-left: 28px;
  background: url("~@assets/img/icon/map.png") no-repeat 0 50%;
  background-size: 20px;
  line-height: 20px;
  display: inline-block;
}
a.case,
span.case {
  padding-left: 28px;
  background: url("~@assets/img/icon/case.png") no-repeat 0 50%;
  background-size: 20px;
  line-height: 20px;
  display: inline-block;
}
a.lk,
span.lk {
  margin-right: 12px;
  border-bottom: 1px dashed #fff;
}
a.lk:hover,
span.lk:hover {
  border-bottom: 1px dashed #71b92f;
}
a.logout,
span.logout {
  background: url("~@assets/img/icon/logout.png") no-repeat 50% 50%;
  width: 14px;
  height: 16px;
  background-size: 14px;
  vertical-align: middle;
  display: inline-block;
}
a.refresh,
span.refresh {
  background: url("~@assets/img/icon/refresh.png") no-repeat 50% 50%;
  width: 16px;
  height: 16px;
  margin-left: 9px;
  background-size: 16px;
  vertical-align: middle;
  display: inline-block;
  margin-top: -7px;
}
.logo .logo-text {
  font-family: "Montserrat", serif;
  margin-left: 24px;
  display: inline-block;
  padding: 15px 20px;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  vertical-align: middle;
  border-left: 1px solid #d0d9de;
}
.container-fluid {
  padding-left: 20px;
  padding-right: 20px;
  z-index: 1500;
}

.row {
  margin-right: -10px;
  margin-left: -10px;
}
.row > div {
  padding-left: 10px;
  padding-right: 10px;
}
.row-50 {
  margin-right: -25px;
  margin-left: -25px;
}
.row-50 > div {
  padding-left: 25px;
  padding-right: 25px;
}
header {
  background: #fff;
  padding: 15px 0;
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  z-index: 1000;
}
header .logo img {
  max-height: 46px;
}
@media (max-width: 1200px) {
  .top-panel {
    font-size: 12px;
  }
  .top-panel .left-menu li,
  .top-panel .right-menu li {
    margin-left: 15px;
  }
}
@media (max-width: 1100px) {
  .top-panel span.balance {
    width: auto;
    font-size: 12px;
    background: url("~@assets/img/icon/profile.svg") no-repeat 12px 50%;
    padding-left: 40px !important;
    line-height: 20px;
    border-left: 1px solid #d0d9de;
    margin-left: 12px;
  }
  .top-panel span.balance strong {
    font-size: 16px;
    letter-spacing: 1px;
  }
  .top-panel span.balance sup {
    font-size: 12px;
  }
  .top-panel a.refresh {
    display: none;
  }
  .mobile {
    display: none !important;
  }
  .top-panel {
    box-shadow: 0px 4px 30px rgba(162, 162, 162, 0.3);
  }
  .select-city .current-val {
    padding-top: 9px;
  }
  .logo .logo-text {
    padding: 0 0 0 11px;
    font-size: 10px;
    margin-left: 7px;
    line-height: 12px;
  }
}

@media (max-width: 550px) {
  .mobile500 {
    display: none;
  }
}
</style>