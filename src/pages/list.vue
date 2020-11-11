<template lang="pug">
.w-100.h-100.style-page.list-page.py-9(
  ref="page"
  @scroll="onScroll"
)
  van-nav-bar.van-nav-bar-fixed.w-100.position-top(
    left-text="Back"
    left-arrow
    @click.native="$router.back()"
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
      @click="setPopup(item)"
    )
      van-image(slot="icon", :src="item.image_url")
    //- template(v-slot:error) FFFF
  van-grid(
    v-if="!list.length"
    :column-num="1"
  )
    van-grid-item(
      icon="clear"
      text="無收藏品"
    )

  van-popup.item-popup(
    v-model="showPopup"
    round
    closeable
    close-icon-position="top-left"
    position="bottom"
  )
    van-nav-bar.w-100(
      :title="choosenItem.name"
    )
    van-image(:src="choosenItem.image_url")
    van-nav-bar.w-100(
      :title="choosenItem.collectionName"
    )
    p(v-text="choosenItem.description")
    a(:href="choosenItem.permalink" target="_blank" rel="noopener noreferrer")
      van-button(
        type="info"
        size="small"
        round
        text="permalink"
        :url="choosenItem.permalink"
      )

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
// import vanCard from 'vant/lib/card';
import vanButton from 'vant/lib/button';
import vanCell from 'vant/lib/cell';
import vanPopup from 'vant/lib/popup';
import vanGrid from 'vant/lib/grid';
import vanGridItem from 'vant/lib/grid-item';
import vanImage from 'vant/lib/image';
import vanNavBar from 'vant/lib/nav-bar';
import vanSticky from 'vant/lib/sticky';

const env = JSON.parse(JSON.stringify(process.env));

export default {
  name: 'List',
  components: {
    vanButton,
    vanCell,
    vanGrid,
    vanGridItem,
    vanImage,
    vanNavBar,
    vanPopup,
    vanSticky,
  },
  mixins: [
  ],
  data() {
    return {
      test: 1,
      showPopup: false,
      choosenItem: {
        name: '',
        image_url: '',
        description: '',
        permalink: '',
        collectionName: '',
      },
    };
  },
  computed: {
    ...mapGetters([
      'loading',
    ]),
    ...mapGetters({
      assets: 'list/assets',
      noMore: 'list/noMore',
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
    ...mapActions({
      read: 'list/read',
    }),
    async init() {
      // this.setLoading('資源載入中');
      // this.setLoading(false);
      await this.wait(1);
      this.getList();
    },
    onScroll(e) {
      const { $refs } = this;
      const { page } = $refs;
      const { scrollTop, clientHeight, scrollHeight } = page;
      // console.log('debug: onScroll -> scrollTop, clientHeight, scrollHeight', scrollTop, clientHeight, scrollHeight);
      if (scrollHeight - scrollTop - clientHeight < 100) {
        this.getList();
      }
    },
    async getList() {
      const { noMore, assets } = this;
      if (!noMore) {
        this.setLoading('讀取中');
        await this.read({ offset: assets.length });
        this.setLoading(false);
      }
    },
    setPopup({ name, image_url, description, permalink, collection: { name: collectionName } }) {
      const { choosenItem } = this;
      choosenItem.name = name;
      choosenItem.image_url = image_url;
      choosenItem.description = description;
      choosenItem.permalink = permalink;
      choosenItem.collectionName = collectionName;
      this.showPopup = true;
    },
  },
};
</script>
<style lang="stylus">
@require '~@/css/mixins/_funs'

.van-nav-bar-fixed
  position fixed
  max-width 750px

.list-page
  .van-grid-item
    .van-grid-item__icon-wrapper
      margin auto
    // .van-grid-item__text
    //   margin-top auto

.item-popup
  // max-height 50%
  height 80%
  max-width 750px
  left calc((100vw - min(100vw, 750px))/2)
  text-align center
  .van-image
    height: 100%;
    max-height: 50%;
  .van-image__img
    object-fit contain
  a
    position relative
    display block
    margin-top 3em

</style>
