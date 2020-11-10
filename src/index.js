import Vue from 'vue';
import App from '@/pages/App.vue';
// import 'common';
import '@/css/index.styl';
import smoothscroll from 'smoothscroll-polyfill';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/all';
import router from './router';
import store from './store';
// import vueGlobalPlugins from './utils/vueGlobalPlugins';

gsap.registerPlugin(ScrollToPlugin);

smoothscroll.polyfill();
// eslint-disable-next-line no-underscore-dangle
window.__forceSmoothScrollPolyfill__ = true;

Vue.config.productionTip = false;

// eslint-disable-next-line max-len
Vue.prototype.wait = (millisecond = 1) => new Promise((resolve) => setTimeout(resolve, +millisecond));

// Vue.use(vueGlobalPlugins);

// Promise.allSettled polyfill
Promise.allSettled = Promise.allSettled || function (arr) {
  const P = this;
  return new P(((resolve, reject) => {
    if (Object.prototype.toString.call(arr) !== '[object Array]') {
      return reject(new TypeError(`${typeof arr} ${arr
      } is not iterable(cannot read property Symbol(Symbol.iterator))`));
    }
    const args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    let arrCount = args.length;

    function resolvePromise(index, value) {
      if (typeof value === 'object') {
        const { then } = value;
        if (typeof then === 'function') {
          then.call(value, (val) => {
            args[index] = { status: 'fulfilled', value: val };
            // eslint-disable-next-line no-plusplus
            if (--arrCount === 0) {
              resolve(args);
            }
          }, (e) => {
            args[index] = { status: 'rejected', reason: e };
            // eslint-disable-next-line no-plusplus
            if (--arrCount === 0) {
              resolve(args);
            }
          });
        }
      }
    }

    for (let i = 0; i < args.length; i++) {
      resolvePromise(i, args[i]);
    }
  }));
};

const $vue = new Vue({
  el: '#app',
  // el: 'body',
  router,
  store,
  data() {
    return {};
  },
  mounted() {
    // smoothscroll.polyfill();
    // gsap.to(body, { duration: 0.3, scrollTo: 0 });
  },
  methods: {
    // scrollTo(feature) {
    //   document.querySelector(`.scroll-${feature}`).scrollIntoView({ behavior: 'smooth' });
    // },
  },
  render(h: CreateElement) {
    return h(App);
  },
});
