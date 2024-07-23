<template>
  <div class="d-flex flex-row justify-center align-center mainDiv">
    <v-card style="width: 1000px" :elevation="12" class="pa-5 rounded-xl">
      <v-card-title class="text-teal-darken-4 text-h4 text-center py-5"
        >Login Form</v-card-title
      >
      <v-form>
        <v-text-field
          variant="solo-filled"
          label="email"
          v-model="loginData.email"
        ></v-text-field>
        <v-text-field
          variant="solo-filled"
          :type="showPass ? 'text' : 'password'"
          label="Password"
          v-model="loginData.password"
          :append-inner-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPass = !showPass"
        ></v-text-field>
        <div class="d-flex flex-row justify-center align-center">
          <v-btn class="bg-teal-darken-4 text-h5" @click="login">Login</v-btn>
        </div>
      </v-form>
      <!-- <div class="d-flex justify-center align-center pa-5">
      <p>Forget Password?</p>
      <p class="text-teal-darken-4" @click="forgetPassword">reset password</p>
    </div> -->
    </v-card>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { axiosPost } from "@/services/service";
import { useStore } from "vuex";
const store = useStore();
const showPass = ref(false);
const router = useRouter();
const loginData = reactive({
  email: null,
  password: null,
});

async function login() {
  const result = await axiosPost("/loginUser", loginData);
  console.log(result.data);

  if (result.status == 200) {
    store.commit("SET_AUTH", { data: result.data });
    router.push({ name: "HomePage" });
  }
}
</script>
<style style>
body {
  background-color: rgb(19, 61, 61);
}
.mainDiv {
  margin-top: 300px;
}
</style>
