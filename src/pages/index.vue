<script>
import { mapActions, mapGetters } from 'vuex';
// import youtube from '@/components/youtube.vue';

const env = JSON.parse(JSON.stringify(process.env));

export default {
  name: 'Index',
  components: {
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
    async init() {
      // this.setLoading('資源載入中');
      this.setLoading(false);
    },
  },
};
</script>

<template lang="pug">
.w-100.h-100.style-page.flex-center.flex-column.py-5(
  ref="page"
)

</template>

<style lang="stylus">
@require '~@/css/mixins/_funs'

</style>
