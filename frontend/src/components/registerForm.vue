<template>
  <div class="mainDiv">
    <v-card style="width: 1000px" :elevation="12" class="pa-5 rounded-xl">
      <v-card-title class="text-teal-darken-4 text-h4 text-center py-5"
        >Registeration From</v-card-title
      >
      <v-form>
        <v-text-field
          v-model="userData.name"
          variant="solo-filled"
          label="Name"
        ></v-text-field>

        <v-text-field
          v-model="userData.email"
          variant="solo-filled"
          label="Email"
        ></v-text-field>

        <v-text-field
          v-model="userData.contact"
          variant="solo-filled"
          label="Contact"
        ></v-text-field>

        <v-text-field
          variant="solo-filled"
          v-model="userData.password"
          :type="showPass ? 'text' : 'password'"
          label="Password"
          :append-inner-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPass = !showPass"
        ></v-text-field>

        <v-text-field
          variant="solo-filled"
          v-model="userData.cpassword"
          label="Confirm Password"
          :type="showConfirmPass ? 'text' : 'password'"
          :append-inner-icon="showConfirmPass ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showConfirmPass = !showConfirmPass"
        ></v-text-field>

        <div class="d-flex flex-row justify-center align-center">
          <v-btn class="bg-teal-darken-4 text-h5" @click="submit">Submit</v-btn>
        </div>
      </v-form>
      <div class="d-flex justify-center align-center pa-5">
        <p>Already Register?</p>
        <p class="text-teal-darken-4" @click="login">Login</p>
      </div>
    </v-card>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { axiosPost } from "../services/service";
import { useRouter } from "vue-router";
const router = useRouter();
const showPass = ref(false);
const showConfirmPass = ref(false);
const userData = reactive({
  name: null,
  email: null,
  contact: null,
  password: null,
  cpassword: null,
});

async function submit() {
  const result = await axiosPost("/registerUser", userData);
  if (result.status == 200) {
    router.push({ name: "Login" });
  }
}
function login() {
  router.push({ name: "Login" });
}
</script>
<style scoped>
.mainDiv {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 300px;
}
body {
  background-color: rgb(19, 61, 61);
}
</style>
