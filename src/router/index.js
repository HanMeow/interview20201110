import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

// 深拷貝
import deepClone from '@/utils/deepClone';

// const Home = () =>
//     import ('@/pages/Home');

// const Home = (r) => require.ensure([], () => r(require('@/pages/Home')), 'HomeContent');

Vue.use(VueRouter);

export const routes = [
  {
    path: '/',
    redirect: {
      name: 'index',
    },
  },
  {
    path: '/index',
    name: 'index',
    component: (r) => require.ensure([], () => r(require('@/pages/index.vue')), 'HomeContent'),
    // component: Home,
    meta: {
      noNavbar: true,
      // isWhite: true,
    },
  },
  {
    path: '/*',
    redirect: {
      name: 'index',
    },
  },
];

const env = JSON.parse(JSON.stringify(process.env));
const { publicPath: base, mode } = {
  publicPath: '/',
  mode: 'history',
  ...process.env,
};
console.log('debug : env', env);
console.log('debug : base', base);
console.log('debug : mode', mode);

const references = [];

const saveReferences = (to) => {
  const item = deepClone(to, 2);
  references.push(item);
};

VueRouter.prototype.references = references;

const router = new VueRouter({
  mode,
  base,
  routes,
});

const vuexDispatch = (action, payload) => {
  if (typeof store?.dispatch === 'function') {
    return store.dispatch(action, payload);
  }
};

// const vuexCommit = (action, payload) => {
//   if (typeof store?.commit === 'function') {
//     store.commit(action, payload);
//   }
// };

router.beforeEach(async (to, from, next) => {
  const state = store?.state ?? {};
  // const getters = store?.getters ?? {};

  const { accessed } = state;

  // 第一次進入網頁進行讀檔
  if (!accessed && to?.name !== 'index') {
    vuexDispatch('storage/loadStorage');
    next({ name: 'index' });
  } else {
    next();
  }
});

router.afterEach((to, from, next) => {
  // console.log('debug : to', to);
  saveReferences(to);

  setTimeout(() => {
    vuexDispatch('setPageLoading', false);
  }, 0);

  const state = store?.state ?? {};
  state.accessed = true;
});

export default router;
