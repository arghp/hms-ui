export const actions = {
  setTotalGuests({ commit }, nGuests) {
      commit("SET_TOTAL_GUESTS", nGuests)
  },
  loginUser({commit}, payload) {
      commit("LOGIN_USER", payload)
  },
}
