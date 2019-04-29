const navHeader = {
  state: {
    nav: '/course'
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.nav = !state.sidebar
    }
  },
  actions: {
    ToggleSideBar ({ commit }) {
      commit('TOGGLE_SIDEBAR')
    }
  }
}

export default navHeader
