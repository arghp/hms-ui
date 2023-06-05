// Utilities
import { createStore } from 'vuex'

import { getters }  from "@/store/getters.js";
import { mutations } from "@/store/mutations.js";
import { actions } from "@/store/actions";
/*
import { actions } from "@/store/actions.js";*/

const store = createStore({
  state:{
    api_uri: '', //todo add API URI
    guestCheckInDate: null,
    guestCheckOutDate: null,
    choosenRooms: {},
    isLoggedIn: false,
    token: '',
    totalGuests: 0,

  },
  getters: getters,
  mutations: mutations,
  actions: actions,

})

export default store
