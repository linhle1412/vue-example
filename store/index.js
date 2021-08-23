import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = () =>
	new Vuex.Store({
		state: () => ({
			isLogin: false,
			user: {
				'avatar': '',
				'fullname': ''
			},
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
			LOGIN(state, token) {
				state.isLogin = true
			},
			CHECK_TOKEN(state, value) {
				state.isLogin = value
			},
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
					let res = await this.$get('article/active', params)
					commit('SET_TALENTS', res.data)
					return res.total
				} catch (e) {
					console.log(e)
					throw e
				}
			},
			async fetchTalentsRelated({ commit }, params) {
				try {
					let res = await this.$get('article/related', params)
					return res.data
				} catch (e) {
					throw e
				}
			},
			async fetchTalentDetail({ commit }, id) {
				try {
					let res = await this.$get('article/' + id + '/public')
					commit('SET_TALENT', res.data)
				} catch (e) {
					throw e
				}
			},
			async fetchSponsorships({ commit }, params) {
				try {
					let res = await this.$get('fund/sponsored', params)
					commit('SET_SPONSORSHIPS', res.data)
					return res.total
				} catch (e) {
					throw e
				}
			},
			async fetchSuggestions({ commit }, params) {
				try {
					let res = await this.$get('article/active', {...params, filters: [{rule: 'category', op: '=', value: 'suggested_talent'}]})
					commit('SET_SUGGESTIONS', res.data)
					return res.total
				} catch (e) {
					throw e
				}
			},
			async fetchInformations({ commit }) {
				try {
					let res = await this.$get('article/active', {perpage: 50, filters: [{rule: 'category', op: '=', value: 'information'}]})
					commit('SET_INFORMATIONS', res.data)
				} catch (e) {
					throw e
				}
			},
			async fetchPartners({ commit }) {
				try {
					let res = await this.$get('article/active', {perpage: 50, filters: [{rule: 'category', op: '=', value: 'partner'}]})
					commit('SET_PARTNERS', res.data)
				} catch (e) {
					throw e
				}
			},
			async fetchFund({ commit }) {
				try {
					let res = await this.$get('fund/summary')
					commit('SET_FUND', res.data)
					return res.data
				} catch (e) {
					throw e
				}
			},

			async fetchRankPerson({ commit }, params) {
				try {
					let res = await this.$get('fund/customer', params)
					commit('SET_CUSTOMERS', res.data)
					return res.total
				} catch (e) {
					throw e
				}
			},
			async fetchRankStore({ commit }, params) {
				try {
					let res = await this.$get('fund/shop', params)
					commit('SET_SHOPS', res.data)
					return res.total
				} catch (e) {
					throw e
				}
			},
			async createContribute({ commit }, form) {
				try {
					let res = await this.$post('order',form)
					return res.data
				} catch (e) {
					throw e
				}
			},
			async fetchContactMeta({ commit }) {
				try {
					let res = await this.$get('meta/contact')
					commit('SET_CONTACT_META', res.data.meta_value)
				} catch (e) {
					throw e
				}
			},
			async sendSuggestion({commit}, form) {
				try {
					await this.$post('talent-recommendation',form)
				} catch (e) {
					throw e
				}
			},
			async sendContact({ commit }, form) {
				try {
					let res = await this.$post('contact-form',form)
					return res.data
				} catch (e) {
					throw e
				}
			},
			async sendComment({ commit }, form) {
				try {
					let res = await this.$post(`article/${form.id}/comment`,{
						content: form.content
					})
					return res.data
				} catch (e) {
					throw e
				}
			},
			async vote({ commit }, id) {
				try {
					await this.$post(`article/${id}/vote`)
				} catch (e) {
					throw e
				}
			},
			async loginFacebook({commit}, accessToken) {
				try {
					let res = await this.$post(`auth/facebook/token`, {
						'access_token': accessToken
					})
					this.$cookies.set('token', res.data.token)
  				this.$axios.setToken(res.data.token, 'Bearer')
					commit('LOGIN', res.data.token)
				} catch(e) {
					throw e
				}
			},
			async checkToken({commit}) {
				try {
					if (!this.$cookies.get('token')) {
						commit('CHECK_TOKEN', false)
					} else {
						await this.$post(`auth/check-token`, {})
						commit('CHECK_TOKEN', true)
					}
				} catch(e) {
					commit('CHECK_TOKEN', false)
				}
			}
		},
	
	});

export default store;
