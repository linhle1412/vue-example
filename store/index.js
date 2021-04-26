import Vue from "vue";
import Vuex from "vuex";
import api from "../apis";

import talent from './talent'

Vue.use(Vuex);

const store = () =>
  new Vuex.Store({
    state: () => ({
        totalFund: 1000000,
        talents: [],
        talentDetail: null
    }),
    mutations: {
        SET_TALENTS(state, data) {
            state.talents = data
        },
        SET_TALENT(state, data) {
            state.talentDetail = data
        }
    },
    actions: {
        async fetchTalents({commit}, params) {
            try {
                // let res = api.get('article', params)
                // console.log(res)
                commit('SET_TALENTS', [{
                    id: 1,
                    name: "Nguyễn Thanh Hải",
                    link: "#",
                    price: 100000000
                }])
            } catch(e) {
                throw e
            }
         }
    },
    
  });

export default store;
