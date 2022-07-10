import blockApi from "../../api/blockApi"
// state
export const state = {
    blocks: [],
    steps: [],
    block: {},
    loading: true,
}

// getters
export const getters = {
    blocks: state => state.blocks,
    block: state => state.block,
    steps: state => state.steps,
}
// mutations
export const mutations = {
    SAVE_BLOCK(state, { block }) {
        state.block = block;
        state.loading = false;
    },
    FETCH_BLOCKS(state, { blocks, stages }) {
        state.blocks = blocks;
        state.stages = stages;
        state.loading = false;
    },
    FETCH_STEPS(state, { steps }) {
        state.steps = steps;
    }

}

// actions
export const actions = {

    async save({ commit, dispatch }, payload) {
        await blockApi.save(payload).then((res) => {
            // console.log('estatus',res)
            if (res.status === 201) {
                console.log(res.data.card)
                commit('SAVE_BLOCK', { block: res.data.card });

                return res.data;
            }
            // return res.data.card;
        });
    },
    async fetch({ commit }, payload) {
        await blockApi.get(payload).then((res) => {
            console.log('estatus',res)
            if (res.status === 200) {
                // console.log('blocks desde store',res.data)
                commit('FETCH_BLOCKS', { blocks: res.data.cards});
                commit('FETCH_STEPS', { steps: res.data.stages});
            }
            return res.data;
        });
    },

}
