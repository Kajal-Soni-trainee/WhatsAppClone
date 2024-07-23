const mutations = {
  SET_IS_ONLINE(state, payload) {
    state.isOnline = payload.data;
  },
  SET_AUTH(state, payload) {
    state.isLoggedIn = true;
    state.user_jd = payload.data.user_id;
    state.token = payload.data.token;
    state.name = payload.data.name;
    localStorage.setItem("token", payload.data.token);
    localStorage.setItem("user_id", payload.data.user_id);
    localStorage.setItem("name", payload.data.name);
  },
  RESET_AUTH(state) {
    state.isLoggedIn = false;
    state.user_id = null;
    state.token = null;
    state.name = null;
  },
  SET_USER_DETAIL(state, payload) {
    state.userDetail = payload.data;
  },
};
export default mutations;
