import { axiosGet } from "../../../services/service";
const actions = {
  async triggerSetContactsByMsg({ commit }) {
    const getContacts = await axiosGet("/getMessages");
    commit("SET_CONTACTS_BY_MSG", { data: getContacts.data });
  },
  async triggerSetMessagesByContactId({ commit }, payload) {
    console.log(payload);
    console.log(payload.blockedAt);
    const result = await axiosGet(
      `/getAllMsgs/?receiver_id=${payload.user_id}&blockedAt=${payload.blockedAt}`
    );
    console.log(result.data);
    commit("SET_MESSAGES_BY_CONTACT_ID", { data: result.data });
  },
  async triggerSetStatusOfContacts({ commit }) {
    const result = await axiosGet("/getStatus");
    commit("SET_STATUS_OF_CONTACTS", { data: result.data });
  },
  async triggerSetUsersStatus({ commit }) {
    const result = await axiosGet("/getUsersStatus");
    commit("SET_USERS_STATUS", { data: result.data });
  },
  async triggerSetAllContacts({ commit }) {
    const result = await axiosGet("/getContacts");
    commit("SET_ALL_CONTACTS", { data: result.data });
  },
  async triggerSetBlockedContacts({ commit }) {
    const result = await axiosGet("/getBlockedContacts");
    commit("SET_BLOCKED_CONTACTS", { data: result.data });
  },
};

export default actions;
