import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
Vue.use(Vuex)
let store=new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
export default store;