// 儲存資料 modules
/* eslint-disable no-shadow */
/* eslint-disable import/extensions */
/* eslint-disable no-restricted-globals */
// import router from '@/router';
import { ajax } from '@/services/api.js';

const defaultAddress = '0x960DE9907A2e2f5363646d48D7FB675Cd2892e91';

const state = {
  address: '',
  assets: [],
  noMore: false,
};

const mutations = {
  setList(state, payload) {
    const { assets } = state;
    const ids = assets.map(({ id }) => id);
    payload.forEach((item) => {
      const { id } = item;
      if (!ids.includes(id)) {
        assets.push(item);
      }
    });
  },
  setAddress(state, payload) {
    state.address = payload;
  },
  setNoMore(state, payload) {
    state.noMore = !!payload;
  },
  reset(state, payload) {
    state.address = defaultAddress;
    state.assets.splice(0);
    state.noMore = false;
  },
};

const actions = {
  read({ commit, dispatch, state, rootState }, payload) {
    const { address, assets: { length } } = state;
    const {
      offset,
      limit,
    } = {
      offset: 0,
      limit: 20,
      ...payload,
    };
    ajax({
      method: 'get',
      // url: `https://api.opensea.io/api/v1/assets?owner=${address}&offset=${offset}&limit=${limit}&order_direction=desc`,
      url: 'https://api.opensea.io/api/v1/assets/',
      payload: {
        owner: `${address}`,
        offset: `${offset}`,
        limit: `${limit}`,
        order_direction: 'desc',
      },
    })
      .then((result) => {
        const { data } = result ?? {};
        const { assets } = data ?? {};
        if (Array.isArray(assets)) {
          commit('setList', assets);
          if (length === state.assets.length) {
            commit('setNoMore', true);
          }
        }
      })
      .catch((err) => err);
  },
};

const getters = {
  assets: (state) => state.assets,
  noMore: (state) => state.noMore,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {},
};
