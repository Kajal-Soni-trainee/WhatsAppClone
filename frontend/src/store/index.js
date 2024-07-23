import { createStore } from "vuex";
import users from "./modules/users";
import contacts from "./modules/contacts";
const store = createStore({
  modules: {
    users,
    contacts,
  },
});

export default store;
