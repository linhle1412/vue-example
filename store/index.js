import Vue from "vue";
import Vuex from "vuex";
import api from "../apis";

Vue.use(Vuex);

const store = () =>
	new Vuex.Store({
		state: () => ({
			totalFund: 1000000000,
			talents: [],
			talentDetail: null,
			sponsorships: []
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
			}
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
			async fetchTalentDetail({ commit }, id) {
				try {
					let res = await api.get('article/slug/' + id)
					commit('SET_TALENT', res.data)
					console.log('id',id);
					// commit('SET_TALENT', {
					// 	title: 'LÊ ĐÌNH LINH',
					// 	description: 'description',
					// 	content: 'ihihihiihh',
					// 	image: {
					// 		small: 'https://tnv.eyeteam.vn/file/1619249459145-91d11afb-6d47-4b52-bc76-60cbfe6bedd7-unnamed_460.jpg'
					// 	}
					// })

				} catch (e) {
					throw e
				}
			},
			async fetchSponsorships({ commit }, params) {
				try {
					let res = await api.get('article/slug/:slug', params)
					commit('SET_TALENTS', res.data)
					// commit('SET_SPONSORSHIPS', [
					// 	{
					// 		name: 'Lê Đình Linh',
					// 		amount: 1000000,
					// 		link: 'http://localhost:3000/tai-nang/1-le-dinh-linh-hoc-sinh-guong-mau'
					// 	}
					// ])
					return 1
				} catch (e) {
					throw e
				}
			},
		},

	});

export default store;
