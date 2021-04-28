import Vue from "vue";
import Vuex from "vuex";
import api from "../apis";

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
			contribute: []
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
		},
		actions: {
			async fetchTalents({ commit }, params) {
				try {
					let res = await api.get('article/active', params)
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
					let res = await api.get('article/slug/:slug', params)
					commit('SET_TALENTS', res.data)
					return 1
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
			async fetchContribute({ commit }, form) {
				try {
					let res = await api.post('order',form)
					commit('SET_CONTRIBUTE', res.data)
					return res.data
				} catch (e) {
					throw e
				}
			},
		},

	});

export default store;
