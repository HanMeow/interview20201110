<script>
// import cloud from './cloud.vue'
// import { checkStatus, SaveData } from '@/services/api.js'
// import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'HamburgerMenu',
  components: {
  },
  data() {
    return {
      // loading: false,
      page: 0,
      // noticeTexts,
    };
  },
  computed: {
    // ...mapGetters({
    //   soundLoadStatus: 'soundLoadStatus',
    // }),
    // facebookImage() {
    //   return require('@/assets/img_Nescafe/facebook.png')
    //   return '';
    // },
  },
  watch: {
    $route(oldVal, newVal) {
      // console.log(`debug: $route -> oldVal, newVal`, oldVal, newVal)
    },
  },
  async mounted() {
    this.init();
  },
  updated() {
  },
  beforeDestroy() {
  },
  methods: {
    ...mapActions('popup', {
      setPopup: 'set',
    }),
    ...mapActions('analytics', [
      'callGaButton',
    ]),
    async init() {
      this.$root.$on('openMenu', (i) => {
        console.log('debug : openMenu -> i', i);
        const index = +i;
        if (isNaN(index)) return;
        this.$emit('open');
        this.page = index;
      });
    },
    onProduct() {
      this.callGaButton('/menu_btn_product');
      this.closeMenu();
      this.setPopup({
        expanded: true,
        type: 'product',
      });
    },
    onActivity() {
      this.callGaButton('/menu_btn_rule');
      this.closeMenu();
      this.setPopup({
        expanded: true,
        type: 'activity',
      });
    },
    closeMenu() {
      if (this.page !== 0) {
        this.page = 0;
      } else {
        this.$emit('close');
      }
    },
  },
};
</script>

<template lang="pug">
.d-flex.flex-column.align-items-end.menu-content

  .flex-blocker-1(
    style="min-height: 50px"
  )

  //- 菜單首頁
  //- template(
  //-   v-if="page === 0"
  //- )
  template
    .flex-blocker-1

    //- router-link.menu-link.d-flex.align-items-center.flex-content-center(
    //-   :to="{ name: 'intro', }"
    //-   @click.native="closeMenu"
    //-   replace
    //- )
    //-   span 回首頁

    router-link.menu-link.d-flex.align-items-end(
      :to="{}"
      @click.native="onActivity"
    )
      span 活動辦法

    //- a.menu-link.d-flex.align-items-center(
    //-   href="javascript:void(0)"
    //-   target="_blank"
    //- )
    router-link.menu-link.d-flex.align-items-end(
      :to="{}"
      @click.native="onProduct"
    )
      span LC CONVERTIBLE#[br] 性能介紹

    .flex-blocker-6

  //- 活動辦法
  //- template(
  //-   v-for="(texts, index) in noticeTexts"
  //-   v-if="page === 1 + index"
  //- )

  .flex-blocker-1(
    style="min-height: 20px"
  )

</template>

<style lang="stylus">
</style>
