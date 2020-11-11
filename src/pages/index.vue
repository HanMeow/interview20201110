<template lang="pug">
.w-100.h-100.style-page.flex-center.flex-column.py-5(
  ref="page"
)
  van-cell(
    title="使用預設地址 (0x96..2e91)"
    is-link
    @click="onDefault"
  )
  van-cell(
    title="使用 MetaMask"
    is-link
    @click="onMetaMask"
  )

</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import vanCell from 'vant/lib/cell';
import Toast from 'vant/lib/toast';
// import youtube from '@/components/youtube.vue';

const env = JSON.parse(JSON.stringify(process.env));

export default {
  name: 'Index',
  components: {
    vanCell,
  },
  mixins: [
  ],
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'loading',
    ]),
  },
  watch: {
  },
  created() {
  },
  async mounted() {
    console.log('debug : env', env);
    console.log('debug : mounted -> window.idx = this;', window.idx = this);
    this.init();
  },
  updated() {
  },
  beforeDestroy() {
    // this.clearTimer();
  },
  methods: {
    ...mapActions([
      'setLoading',
    ]),
    ...mapMutations({
      reset: 'list/reset',
      setAddress: 'list/setAddress',
    }),
    async init() {
      // this.setLoading('資源載入中');
      this.setLoading(false);
    },
    onDefault() {
      this.reset();
      // this.$router.replace('list');
      this.$router.push('list');
    },
    onMetaMask() {
      if (typeof window?.ethereum?.request === 'function') {
        this.setLoading('授權中');
        window.ethereum
          .request({ method: 'eth_requestAccounts' })
          .then(this.handleAccounts)
          .catch((error) => {
            Toast(error?.message ?? '未知錯誤');
            this.setLoading(false);
          });
      } else {
        Toast('MetaMask 未安裝');
      }
    },
    handleAccounts([address]) {
      console.log('debug: handleAccounts -> address', address);
      if (typeof address !== 'string') {
        Toast('錢包錯誤');
      } else {
        this.reset();
        this.setAddress(address);
        this.$router.push('list');
      }
    },
  },
};
</script>

<style lang="stylus">
@require '~@/css/mixins/_funs'

</style>
