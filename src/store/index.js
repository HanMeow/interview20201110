// @flow
/* eslint-disable import/extensions */
/* eslint-disable no-restricted-globals */
import Vuex, { MutationTree, ActionTree } from 'vuex';
import Vue from 'vue';

import analytics from './modules/analytics.js';

import images from './modules/images.js';
// import game from './modules/game.js';
import storage from './modules/storage.js';

import list from './modules/list.js';

Vue.use(Vuex);

export type StateType = {
  loading: boolean;
  loadingMsg: String,
  imageLoading: boolean,
  pageLoading: boolean,
  accessed: boolean,
}

const defaultState:StateType = {
  loading: false,
  loadingMsg: '',
  imageLoading: false,
  pageLoading: false,
  accessed: false,
};

// 盡量不要直接動用 mutations，此處註解省略
const mutations:MutationTree<StateType> = {
  setLoading(state:StateType, payload:boolean) {
    state.loading = !!payload;
    if (typeof payload === 'string') {
      state.loadingMsg = payload;
    } else {
      state.loadingMsg = '';
    }
  },
  setImageLoading(state:StateType, payload:boolean) {
    state.imageLoading = !!payload;
    if (!state.loadingMsg) {
      // state.loadingMsg = '資源載入中';
      state.loadingMsg = '';
    }
  },
  setPageLoading(state:StateType, payload:boolean) {
    console.log('debug : setPageLoading -> payload', payload);
    state.pageLoading = !!payload;
  },
};

const actions:ActionTree<StateType> = {
  /**
   * @method setLoading 手動設定讀取遮罩是否開啟
   * @param {Boolean|String} payload - 開/關讀取遮罩，若為字串則會顯示在讀取圈底下
   */
  setLoading({ commit, dispatch, state }, payload) {
    commit('setLoading', payload);
  },
  /**
   * @method setImageLoading 圖片讀取狀態
   * @param {Boolean|String} payload - 開/關讀取遮罩
   */
  setImageLoading({ commit, dispatch, state }, payload) {
    commit('setImageLoading', payload);
  },
  /**
   * @method setPageLoading 頁面讀取狀態
   * @param {Boolean|String} payload - 開/關讀取遮罩
   */
  setPageLoading({ commit, dispatch, state }, payload) {
    commit('setPageLoading', payload);
  },
};

const getters = {
  setLoading: (state) => state.loading,
  loading: (state) => state.loading || state.imageLoading || state.pageLoading,
  loadingMsg: (state) => state.loadingMsg,
  // 圖片
  images: (state) => state.images,
};

export default new Vuex.Store<StateType>({
  state: defaultState,
  getters,
  actions,
  mutations,
  modules: {
    analytics,
    images,
    // game,
    storage,
    list,
  },
});
