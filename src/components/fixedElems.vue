<script>
import menuContent from '@/components/menu.vue';
// import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Icons',
  components: {
    menuContent,
  },
  props: [
    'value',
  ],
  data() {
    return {
      loading: false,
      showMenu: false,
    };
  },
  computed: {
    // ...mapGetters('images', {
    //   logo: 'common/logo',
    //   home: 'common/home',
    // }),
    logoIamge() {
      // return this.logo.src;
      return '';
    },
  },
  watch: {
  },
  async mounted() {
    // this.loadImamges('common');
  },
  updated() {
  },
  methods: {
    // ...mapActions('analytics', [
    //   'callGaButton',
    //   'callGaPage',
    // ]),
    // ...mapActions('images', {
    //   loadImamges: 'load',
    // }),
    onLogo() {
      // this.callGaButton('btn_logo');
      if (this.$route.name !== 'index') {
        this.$router.push({ name: 'index' }, (...p) => {
          console.log('debug : onLogo onComplete -> p', p);
        }, (...p) => {
          console.log('debug : onLogo onAbort -> p', p);
        });
      }
    },
  },
};
</script>

<template lang="pug">
.fixed-group.position-top-left.h-100.transition-2

  //- 左上 logo
  img.header-logo.logo(
    v-show="!$route.meta.hideLogo"
    :src="logoIamge"
    @error="$event.target.style.display = 'none'"
    @click="onLogo"
  )

</template>

<style lang="stylus">
</style>
