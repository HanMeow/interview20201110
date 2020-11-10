// 紀錄、讀取各頁面資料的 modules
/* eslint-disable no-shadow */
/* eslint-disable import/extensions */
/* eslint-disable no-restricted-globals */
import imagesStates from '@/plugins/imagesStates.js';

const hasAllSettled = typeof Promise.allSettled === 'function';

// 讀取圖片
const loadImg = (src) => new Promise((resolve, reject) => {
  try {
    const img = new Image();
    img.onload = () => { resolve(img); };
    img.onerror = () => { reject(img); };
    img.src = src;
  } catch (error) {
    reject(error);
  }
});

// 將物件拆解成 { src, loaded } 的陣列
const resolveItems = (item) => {
  if (typeof item !== 'object') return [];
  if (Object.prototype.hasOwnProperty.call(item, 'src') && Object.prototype.hasOwnProperty.call(item, 'loaded')) {
    return [item];
  }
  const items = [];
  Object.keys(item).forEach((key) => {
    items.push(resolveItems(item[key]));
  });
  return items.flat(Infinity);
};

// 依設定檔產生 state
const generateState = (params) => {
  if (typeof params !== 'object') {
    return {
      src: typeof params === 'string' ? params : '',
      loaded: false,
      img: null,
    };
  }
  const items = Array.isArray(params) ? [] : {};
  Object.keys(params).forEach((key) => {
    items[key] = generateState(params[key]);
  });
  return items;
};
const state = generateState(imagesStates);

// 盡量不要直接動用 mutations，此處註解省略
const mutations = {
};

const actions = {
  /**
   * 讀取
   * @param {Number|String} payload - 要讀取的圖片key。 ex. 'index/countiesPatterns/0'
   * @param {Number[] | String[]} payload - 要讀取的圖片key陣列。
   */
  load({ commit, dispatch, state }, payload) {
    const keys = Array.isArray(payload) ? payload : [payload];
    // console.log('debug : load -> keys', keys);
    const promiseList = [];
    keys.forEach((str) => {
      // if (!(typeof str === 'string' || typeof str === 'number')) return;
      const nestedKeys = (typeof str === 'string' || typeof str === 'number')
        ? `${str}`.split('/')
        : [];
      let key;
      let item = state;
      let limit = 100;
      // eslint-disable-next-line no-cond-assign
      while (key = nestedKeys.shift()) {
        // console.log('debug : load -> key', key);
        item = item[key] || {};
        // eslint-disable-next-line no-plusplus
        if (--limit < 0) break;
      }
      const items = resolveItems(item);
      // console.log('debug : load -> items', JSON.stringify(items));
      items.forEach((imageItem) => {
        if (!imageItem.loaded || !imageItem.img) {
          promiseList.push(loadImg(imageItem.src)
            .then((img) => {
              imageItem.loaded = true;
              imageItem.img = img;
              return img;
            }));
        }
      });
    });
    if (promiseList.length) {
      dispatch('setImageLoading', true, {
        root: true,
      });
    }
    // iOS 13 以下沒有 Promise.allSettle
    if (hasAllSettled) {
      return Promise.allSettled(promiseList).then((list) => {
        dispatch('setImageLoading', false, {
          root: true,
        });
        return list;
      });
    }
    return Promise.all(promiseList.map((p) => p.then((r) => r, (r) => r))).then((list) => {
      dispatch('setImageLoading', false, {
        root: true,
      });
      return list;
    });
  },
};
// app.$store._actions["images/loag"][0]()

// 依 state 有的資料產生 getter
const resolveGetters = (item) => {
  const result = [];
  Object.keys(item).forEach((key) => {
    result.push({
      key,
      // fun: (state) => state[key],
      fun: () => item[key],
    });
    if (typeof item[key] === 'object' && !item[key].src) {
      resolveGetters(item[key]).forEach(({ key: nestedKey, fun }) => {
        result.push({ key: `${key}/${nestedKey}`, fun });
      });
    }
  });
  return result;
};
const generateGetters = (item) => {
  const result = {};
  resolveGetters(item).flat(Infinity).forEach(({ key, fun }) => {
    result[key] = fun;
  });
  return result;
};

const getters = {
  // state: (state) => state,
  ...generateGetters(state),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {},
};
