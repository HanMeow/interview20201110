// 追蹤分析
/* eslint-disable no-shadow */
/* eslint-disable import/extensions */
/* eslint-disable no-restricted-globals */
// import router from '@/router';

const GoogleAnalyticId = 'UA-116251394-1';

const GAScript = document.createElement('script');
GAScript.src = `https://www.googletagmanager.com/gtag/js?id=${GoogleAnalyticId}`;
GAScript.async = true;

const initScript = document.createElement('script');
initScript.innerHTML = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`;

const head = document.querySelector('head');
head.insertBefore(initScript, head.firstChild);
head.insertBefore(GAScript, head.firstChild);
head.appendChild(GAScript);
head.appendChild(initScript);

const state = {
};

const mutations = {
};

const actions = {
  /** Google Analytics */
  callGaPage({ commit, dispatch, state }, payload = {}) {
    // eslint-disable-next-line no-useless-escape
    const path = window.location.href.replace(/https?:\/\/[\w.:]+\//, '/');
    console.log('\x1b[34m%s\x1b[0m', 'debug : callGaPage -> payload', payload); // blue
    if (typeof window?.gtag === 'function') {
      window.gtag('config', GoogleAnalyticId, {
        page_title: payload.title || path,
        page_path: payload.path || path,
      });
    }
  },
  callGaButton({ commit, dispatch, state }, payload) {
    console.log('\x1b[32m%s\x1b[0m', 'debug : callGaButton -> payload', payload); // green
    if (typeof window?.gtag === 'function') {
      window.gtag('event', 'click', {
        // event_category: 'web',
        // event_category: 'click',
        event_category: payload,
        event_label: payload,
      });
    }
  },
  /** Google Analytics */
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
