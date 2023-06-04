import axios from "axios";

export const actions = {
  setTotalGuests({ commit }, nGuests) {
      commit("SET_TOTAL_GUESTS", nGuests)
  },
  setRequestedRooms({ commit }, rooms) {
      commit("SET_CHOSEN_ROOMS", rooms)
  },
  loginUser({commit}, payload) {
      commit("LOGIN_USER", payload)
  },
/*
  sendRequestedRooms({state, dispatch}, payload){
    return  new Promise((resolve, reject) => {
      const api_uri = state.api_uri + "/account/profile/";
      axios({
        method: "post",
        url: api_uri,
        params: {
          organization: payload.org_uid,
          profile: payload.gap_uid,
        },
        headers: {
          "X-ACCESS-TOKEN": state.token,
        },
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.error(error);
          dispatch("errorHandler", error.response.status);
          reject(error);
        });
    });
  }*/
}
