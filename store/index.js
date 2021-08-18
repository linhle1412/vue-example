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
			contactMeta: {
				vi: {
					address: 'xxxx Hoàng Diệu, phường 16, Quận 4, TP.HCM',
					email: 'xxxx@gmail.com',
					phone: 'xxxxxxxxxx',
					bankNumber: '100000xxxxxx',
					bankName: 'xxxxx xxx xxx',
					bank: 'xxxxxxxx',
					bankBranch: 'xxxxxx'
				},
				en: {
					address: '331 Hoàng Diệu, phường 16, Quận 4, TP.HCM',
					email: 'xxxx@gmail.com',
					phone: 'xxxxxxxxxx',
					bankNumber: '100000xxxxxx',
					bankName: 'xxxxx xxx xxx',
					bank: 'xxxxxxxx',
					bankBranch: 'xxxxxx'
				}
			}
		}),
		mutations: {
			SET_TALENTS(state, data) {
				state.talents = data
			},
			SET_SUGGESTIONS(state, data) {
				state.suggestions = data
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
			async fetchSuggestions({ commit }, params) {
				try {
					let res = await api.get('article/active' + buildQuery({...params, category: 'suggested_talent'}))
					commit('SET_SUGGESTIONS', res.data)
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
				console.log(this.$i18n.locale)
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
