<template>
  <v-toolbar class="bg-teal-darken-4">
    <v-toolbar-title class="text-h5"><b>ChatApp</b></v-toolbar-title>
    <v-btn class="text-h5" @click="home">Home</v-btn>
    <v-btn class="text-h5" @click="showStatus">Status</v-btn>
    <v-btn class="text-h5" @click="showContacts">Contacts</v-btn>
    <v-btn class="text-h5" @click="addContact">New Contact</v-btn>
    <v-btn class="text-h5" @click="logout">Logout</v-btn>
  </v-toolbar>
</template>
<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
//import { axiosGet } from "../services/service";
const router = useRouter();
const store = useStore();
function showStatus() {
  router.push({ name: "Status" });
}
function showContacts() {
  router.push({ name: "Contacts" });
}
function addContact() {
  router.push({ name: "AddContact" });
}
function home() {
  router.push({ name: "HomePage" });
}
async function logout() {
  //const result = await axiosGet("/logout");
  localStorage.removeItem("token");
  localStorage.removeItem("user_id");
  localStorage.removeItem("name");
  store.commit("RESET_AUTH");
  router.push({ name: "Login" });
}
</script>
<style scoped></style>
