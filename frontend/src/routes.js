import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    name: "Register",
    component: () => import("./components/registerForm.vue"),
    path: "/",
  },
  {
    name: "Login",
    component: () => import("./components/loginForm.vue"),
    path: "/login",
  },
  {
    name: "HomePage",
    component: () => import("./components/homePage.vue"),
    path: "/home",
  },
  {
    name: "Messages",
    component: () => import("./components/messages.vue"),
    path: "/messages",
  },
  {
    name: "Status",
    component: () => import("./components/status.vue"),
    path: "/status",
  },
  {
    name: "Contacts",
    component: () => import("./components/contacts.vue"),
    path: "/contacts",
  },
  {
    name: "AddContact",
    component: () => import("./components/addContact.vue"),
    path: "/addToContact",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
