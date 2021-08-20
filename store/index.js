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
		arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(JSON.stringify(params[key])))
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
			suggestions: [],
			informations: [],
			partners: [],
			talentDetail: null,
			sponsorships: [],
			contribute: [],
			shops: [],
			customers: [],
			fundInfo: {
				'y_nghia': '',
				'ton_chi': '',
				'tieu_chi': '',
				'hinh_thuc': '',
			},
			contactMeta: null,
		}),
		mutations: {
			SET_TALENTS(state, data) {
				state.talents = data
			},
			SET_SUGGESTIONS(state, data) {
				state.suggestions = data
			},
			SET_INFORMATIONS(state, data) {
				state.informations = data
			},
			SET_PARTNERS(state, data) {
				state.partners = data
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
			SET_SHOPS(state, data) {
				state.shops = data
			},
			SET_CUSTOMERS(state, data) {
				state.customers = data
			},
			SET_CONTACT_META(state, data) {
				state.contactMeta = data
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
			async fetchTalentDetail({ commit }, id) {
				try {
					let res = await api.get('article/' + id + '/public')
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
			async fetchSuggestions({ commit }, params) {
				try {
					let res = await api.get('article/active' + buildQuery({...params, filters: [{rule: 'category', op: '=', value: 'suggested_talent'}]}))
					commit('SET_SUGGESTIONS', res.data)
					return res.total
				} catch (e) {
					throw e
				}
			},
			async fetchInformations({ commit }) {
				try {
					let res = await api.get('article/active' + buildQuery({perpage: 50, filters: [{rule: 'category', op: '=', value: 'information'}]}))
					commit('SET_INFORMATIONS', res.data)
				} catch (e) {
					throw e
				}
			},
			async fetchPartners({ commit }) {
				try {
					let res = await api.get('article/active' + buildQuery({perpage: 50, filters: [{rule: 'category', op: '=', value: 'partner'}]}))
					commit('SET_PARTNERS', res.data)
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
					let res = await api.get('fund/customer' + buildQuery(params))
					commit('SET_CUSTOMERS', res.data)
					return res.total
				} catch (e) {
					throw e
				}
			},
			async fetchRankStore({ commit }, params) {
				try {
					let res = await api.get('fund/shop' + buildQuery(params))
					commit('SET_SHOPS', res.data)
					return res.total
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
			async fetchContactMeta({ commit }) {
				try {
					let res = await api.get('meta/contact')
					commit('SET_CONTACT_META', res.data.meta_value)
				} catch (e) {
					throw e
				}
			},
			async sendContact({ commit }, form) {
				try {
					let res = await api.post('contact',form)
					return res.data
				} catch (e) {
					throw e
				}
			},
		},

	});

export default store;
