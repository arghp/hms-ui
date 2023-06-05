export const getters = {
  getCheckInDate:(state) => {
    return state.guestCheckInDate;
  },
  getCheckOutDate:(state) => {
    return state.guestCheckOutDate;
  },
  getChoosenRooms: (state) => {
    return state.choosenRooms;
  },
  getTotalGuests: (state) => {
    return state.totalGuests;
  },
}
