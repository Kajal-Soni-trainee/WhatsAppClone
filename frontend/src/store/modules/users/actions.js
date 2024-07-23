import { axiosGet } from "@/services/service";

const actions = {
  async triggerSetIsOnline({ commit }, payload) {
    console.log(" dfggdfh fghfgh ");
    console.log(payload.user_id);
    const result = await axiosGet(`/isOnline/?user_id=${payload.user_id}`);
    console.log("user online status", result.data);
    commit("SET_IS_ONLINE", { data: result.data });
  },

  async triggerSetUserDetail({ commit }) {
    const result = await axiosGet("/getUserDetails");
    commit("SET_USER_DETAIL", { data: result.data });
  },
};

export default actions;
