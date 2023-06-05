export const mutations = {
  SET_CHECKIN_DATE(state, checkInDate) {
    state.guestCheckInDate = checkInDate;
  },
  SET_CHECKOUT_DATE(state, checkOutDate) {
    state.guestCheckOutDate = checkOutDate;
  },
  SET_CHOSEN_ROOMS(state, rooms) {
    state.choosenRooms = rooms;
  },
  SET_EMAIL(state, email){
    state.guestEmail = email;
  },
  SET_TOTAL_GUESTS(state, nGuests) {
    state.totalGuests = nGuests;
  },
  LOGIN_USER(state, email){
    state.isLoggedIn = true;
    state.userEmail = email
  },
}
