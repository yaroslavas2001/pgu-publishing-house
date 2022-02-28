<template>
  <div class="mcw">
    <div class="center">
      <div class="block w-70">
        <div class="block-title">Новости</div>
        <div class="block-body">
          <div class="news-list">
            <div class="one-news">
              <div class="date">5 марта 2021</div>
              <div class="title">Профилактические работы</div>
              <div class="descr">
                <p>
                  Приносим свои извинения за предоставленные неудобства, и
                  надеемся на ваше понимание.
                </p>
                <p>
                  С 5 марта по 9 марта 2021 года, в связи с проведением
                  профилактических работ Интернет банкинг и Мобильный банкинг
                  будут недоступны.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
@Options({
  components: {},
})
export default class NewsPageComponent extends Vue {}
</script>
<style >
.block-title {
  font-weight: 600 !important;
  font-size: 18px !important;
  line-height: 110%;
}
</style>
