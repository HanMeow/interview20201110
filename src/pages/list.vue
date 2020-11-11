<template lang="pug">
.w-100.h-100.style-page.py-9(
  ref="page"
  @scroll="onScroll"
)
  van-nav-bar.van-nav-bar-fixed.w-100.position-top(
    left-text="Back"
    @click-left="$router.back()"
  )
  van-grid(
    v-for="(subList, i) in list"
    :key="i"
    clickable,
    :column-num="2"
  )
    van-grid-item(
      v-for="(item, j) in subList"
      :key="`${i}-${j}`"
      :text="item.name"
    )
      van-image(slot="icon", :src="item.image_url")
    //- template(v-slot:error) FFFF

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
// import vanCard from 'vant/lib/card';
// import vanCell from 'vant/lib/cell';
import vanGrid from 'vant/lib/grid';
import vanGridItem from 'vant/lib/grid-item';
import vanImage from 'vant/lib/image';
import vanNavBar from 'vant/lib/nav-bar';
import vanSticky from 'vant/lib/sticky';

const env = JSON.parse(JSON.stringify(process.env));

export default {
  name: 'List',
  components: {
    vanGrid,
    vanGridItem,
    vanImage,
    vanNavBar,
    vanSticky,
  },
  mixins: [
  ],
  data() {
    return {
      test: 1,
    };
  },
  computed: {
    ...mapGetters([
      'loading',
    ]),
    ...mapGetters({
      assets: 'list/assets',
    }),
    list() {
      const list = [];
      this.assets.forEach((item, index) => {
        if (index % 2 === 0) {
          list.push([item]);
        } else {
          list[list.length - 1].push(item);
        }
      });
      return list;
    },
  },
  watch: {
  },
  created() {
  },
  async mounted() {
    console.log('debug : env', env);
    console.log('debug : mounted -> window.list = this;', window.list = this);
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
    onScroll(e) {
      console.log('debug: onScroll -> e', e);
    },
  },
};
</script>
<style lang="stylus">
@require '~@/css/mixins/_funs'

.van-nav-bar-fixed
  position fixed
  max-width 750px

</style>
