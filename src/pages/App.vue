<script>
// import fixedElems from '@/components/fixedElems.vue';
// import youtube from '@/components/youtube.vue';
import { mapActions, mapGetters } from 'vuex';
// import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

// import random from '@/utils/random';

let eventAdded = false;

export default {
  name: 'APP',
  components: {
    // fixedElems,
    // youtube,
  },
  data() {
    return {
      showMenu: false,
      // hideScroll: false,
      scrollLocked: false,
      goingToHome: false,
    };
  },
  computed: {
    ...mapGetters({
      loading: 'loading',
      loadingMsg: 'loadingMsg',
    }),
    containerClasses() {
      return {
        'has-nav': !this.$route.meta.noNavbar,
        'is-white': this.$route.meta.isWhite,
      };
    },
  },
  watch: {
    $route(to, from) {
      if (to.name === 'Home') {
        this.goingToHome = true;
      } else {
        this.goingToHome = false;
      }
      const { classList } = document.body;
      if (to.name === 'index') {
        classList.add('intro-bg');
      } else {
        classList.remove('intro-bg');
      }
    },
  },
  updated() {
    // const { routerView } = this.$refs;
    // if (this.goingToHome && routerView && this.$route.name === 'Home') {
    //   this.goingToHome = false;
    //   routerView.init();
    // }
  },
  mounted() {
    console.log('debug : mounted -> window.app = this', window.app = this);
    this.$root.$on('lockScroll', (payload) => {
      console.log('debug : mounted -> payload', payload);
      this.scrollLocked = !!payload;
    });
    if (!eventAdded) {
      try {
        const body = document.querySelector('body');
        // 防止 iphone 雙指縮放
        [
          'gesturestart',
          'gesturechange',
          'gestureend',
        ].forEach((eventName) => {
          body.addEventListener(eventName, (event) => {
            event.preventDefault();
          });
        });
        // 防止 iphone 雙擊縮放
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (event) => {
          const now = (new Date()).getTime();
          if (now - lastTouchEnd <= 300) {
            event.preventDefault();
          }
          lastTouchEnd = now;
        }, false);
        // 防止事件重複註冊
        eventAdded = true;
      } catch (error) {}
    }
  },
  methods: {
  },
};
</script>

<template lang="pug">
#app.app(
  ref="app"
)
  //- 主要頁面
  transition(
    name="fadePage"
  )
    router-view.router-view.zi-1(
      ref="routerView"
    )
  //- 讀擋遮罩
  template(
    v-if="loading"
  )
    transition(
      name="fade"
    )
      .position-top-left.full-screen-loading
        span.loading-message(
          v-if="loadingMsg"
        ) {{ loadingMsg }}
</template>

<style lang="stylus">

</style>
