import Vue from "vue";
import Vuex from "vuex";
import api from "../apis";

function buildQuery(params) {
  if (!params) {
    return '';
  }
  if (typeof params === 'string') {
    return params;
  }
  if (typeof params !== 'object') {
    return '';
  }
  let arr = [];
  for (let key of Object.keys(params)) {
    arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
  }
  return '?' + arr.join('&');
}

Vue.use(Vuex);

const store = () =>
	new Vuex.Store({
		state: () => ({
			totalFund: 0,
			sponsored: 0,
			remained: 0,
			talents: [],
			talentDetail: null,
			sponsorships: [],
			contribute: [],
			rankPersons: [],
			rankStores: [],
		}),
		mutations: {
			SET_TALENTS(state, data) {
				state.talents = data
			},
			SET_TALENT(state, data) {
				state.talentDetail = data
			},
			SET_SPONSORSHIPS(state, data) {
				state.sponsorships = data
			},
			SET_FUND(state, data) {
				state.totalFund = data.total
				state.sponsored = data.sponsored
				state.remained = data.remained
			},
			SET_CONTRIBUTE(state, data) {
				state.contribute = data
			},
			SET_RANK_PERSONS(state, data) {
				state.rankPersons = data
			},
			SET_RANK_STORE(state, data) {
				state.rankStores = data
			},
		},
		actions: {
			async fetchTalents({ commit }, params) {
				try {
					let res = await api.get('article/active' + buildQuery(params))
					commit('SET_TALENTS', res.data)
					return res.total
				} catch (e) {
					throw e
				}
			},
			async fetchTalentDetail({ commit }, slug) {
				try {
					let res = await api.get('article/slug/' + slug)
					commit('SET_TALENT', res.data)

				} catch (e) {
					throw e
				}
			},
			async fetchSponsorships({ commit }, params) {
				try {
					let res = await api.get('fund/sponsored' + buildQuery(params))
					commit('SET_SPONSORSHIPS', res.data)
					return res.total
				} catch (e) {
					throw e
				}
			},
			async fetchFund({ commit }) {
				try {
					let res = await api.get('fund/summary')
					commit('SET_FUND', res.data)
					return res.data
				} catch (e) {
					throw e
				}
			},

			async fetchRankPerson({ commit }, params) {
				try {
					// let res = await api.get('fund/summary')
					commit('SET_RANK_PERSONS', [
						{
							name: 'Linh Lê',
							code: '0963254380',
							created_at: new Date(),
							amount: 100000
						},
						{
							name: 'Phúc Hồng',
							code: '0934324213',
							created_at: new Date(),
							amount: 500000
						}
					])
					return 10
				} catch (e) {
					throw e
				}
			},
			async fetchRankStore({ commit }, params) {
				try {
					// let res = await api.get('fund/summary')
					commit('SET_RANK_STORE', [
					])
					return 10
				} catch (e) {
					throw e
				}
			},
			async createContribute({ commit }, form) {
				try {
					let res = await api.post('order',form)
					return res.data
				} catch (e) {
					throw e
				}
			},
		},

	});

export default store;
