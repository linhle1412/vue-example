const state = () => ({
    talents: [],
    talentDetail: null
})

const mutations = () => ({
    SET_TALENTS(state, data) {
        state.talents = data
    },
    SET_TALENT(state, data) {
        state.talentDetail = data
    }
})

const actions = () => ({
    async fetchTalents({commit}, params) {
        try {
            commit.SET_TALENTS([{
                id: 1,
                name: "Nguyễn Thanh Hải",
                link: "#",
                price: 100000000
            }])
        } catch(e) {
            throw e
        }
     }
})

export default {
    namespaced: true,
    state,
    mutations,
    actions
}