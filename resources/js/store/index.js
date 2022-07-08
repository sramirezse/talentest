import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions.js'
import getters from './getters.js'
import index from './index.js'
import mutations from './mutations.js'
import state from './state.js'

Vue.use(Vuex)

// Load store modules dynamically.
const requireContext = require.context('./modules', false, /.*\.js$/)

const modules = requireContext.keys()
  .map(file =>
    [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)]
  )
  .reduce((modules, [name, module]) => {
    if (module.namespaced === undefined) {
      module.namespaced = true
    }

    return { ...modules, [name]: module }
  }, {})

export default new Vuex.Store({
    actions,
    getters,
    index,
    mutations,
    state,
    modules,
})
