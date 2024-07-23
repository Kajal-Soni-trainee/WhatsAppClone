<template>
  <v-app>
    <v-main>
      <template v-if="isLoggedIn">
        <Navbar />
      </template>

      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import { useStore } from "vuex";
import { onMounted, computed } from "vue";
const store = useStore();
const isLoggedIn = computed(() => {
  return store.state.users.isLoggedIn;
});
onMounted(() => {
  if (localStorage.getItem("token")) {
    store.commit("SET_AUTH", {
      data: {
        name: localStorage.getItem("name"),
        token: localStorage.getItem("token"),
        user_id: localStorage.getItem("user_id"),
      },
    });
  }
});
</script>
