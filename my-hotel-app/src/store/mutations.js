export const mutations = {
  SET_CHOSEN_GUESTS(state, rooms) {
    state.choosenRooms = rooms;
  },
  SET_TOTAL_GUESTS(state, nGuests) {
    state.totalGuests = nGuests;
  },
  LOGIN_USER(state, payload){
    state.isLoggedIn = true;
  },
}
