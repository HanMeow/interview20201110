// 儲存資料 modules
/* eslint-disable no-shadow */
/* eslint-disable import/extensions */
/* eslint-disable no-restricted-globals */
// import router from '@/router';

export const decode = (str) => decodeURIComponent(atob(decodeURIComponent(str)));
export const encode = (str) => encodeURIComponent(btoa(encodeURIComponent(str)));

const state = {
};

const mutations = {
  // shareImgResult(state, payload) {
  loadStorage(state, { rootState }) {
    if (localStorage.share) {
      try {
        const share = JSON.parse(decode(localStorage.share));
        Object.keys(share).forEach((key) => {
          rootState.share.share[key] = share[key];
        });
      } catch (error) {}
    }
    if (localStorage.shared) {
      try {
        const shared = JSON.parse(decode(localStorage.shared));
        rootState.video.shared = shared;
      } catch (error) {}
    }
  },
};

const actions = {
  loadStorage({ commit, dispatch, state, rootState }, payload) {
    commit('loadStorage', { rootState });
  },
};

const getters = {
  // shareimg: (state) => state.share.shareimg,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {},
};
