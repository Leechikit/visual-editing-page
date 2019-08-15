import Vue from 'vue';
import Vuex from 'vuex';
import userModule from './user_module';
import VuexPersistence from 'vuex-persist';
// import mutation from './mutations.js';
// import state from './state.js';
// import action from './actions.js';
import app from './modules/app';
import user from './modules/user';
import listview from './modules/listview';
// import {saveState, restoreState, customStorge} from '../helper/storge_helper.js';
import participant from './participant.js';
import report from './modules/report.js';
import controls from '@/rebuild/store/controls'
import childControls from '@/rebuild/store/childControls'
import controlsCache from '@/rebuild/store/controlsCache'
import nav from '@/rebuild/store/nav'

Vue.use(Vuex);

// const vuexLocal = new VuexPersistence({
//     storage: customStorge,
//     modules: ['user'],
//     saveState,
//     restoreState
// });

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['user', 'report']
});

const store = new Vuex.Store({
  modules: {
    userModule,
    app,
    user,
    listview,
    participant,
    report,
    controls,
    childControls,
    controlsCache,
    nav
  },
  plugins: [vuexLocal.plugin]
});

export default store;
