const mutations = {
  SET_CONTACTS_BY_MSG(state, payload) {
    state.contactsByMsg = payload.data;
  },
  SET_MESSAGES_BY_CONTACT_ID(state, payload) {
    state.messagesByContactId = payload.data;
  },
  SET_STATUS_OF_CONTACTS(state, payload) {
    state.statusOfContacts = payload.data;
  },
  SET_USERS_STATUS(state, payload) {
    state.usersStatus = payload.data;
  },
  SET_ALL_CONTACTS(state, payload) {
    state.allContacts = payload.data;
  },
  SET_BLOCKED_CONTACTS(state, payload) {
    state.blockedContacts = payload.data;
  },
};
export default mutations;
