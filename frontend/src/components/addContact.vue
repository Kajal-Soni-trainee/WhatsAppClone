<template>
  <div class="mainDiv d-flex flex-row justify-center align-center">
    <v-card width="1500px" height="500px" :elevation="12" class="pa-8">
      <v-card-title class="text-center text-teal-darken-4 text-h4"
        >Add To Contact</v-card-title
      >
      <v-card-item>
        <v-text-field
          label="Phone Number"
          variant="solo-filled"
          v-model="number"
        ></v-text-field>
        <v-text-field
          label="Name"
          variant="solo-filled"
          v-model="name"
        ></v-text-field>
      </v-card-item>
      <div class="d-flex flex-row align-center justify-center">
        <v-btn width="150px" class="bg-teal-darken-4 text-h5" @click="submit"
          >Submit</v-btn
        >
      </div>
    </v-card>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { axiosPost } from "../services/service";
const number = ref(null);
const name = ref(null);

async function submit() {
  console.log("object");
  if (number.value.value != "" && name.value != "") {
    const result = await axiosPost("/addToContact", {
      name: name.value,
      contact: number.value,
    });
    if (result.status == 200) {
      if (result.data == "user not found") {
        alert("User not found Invalid number");
      } else {
        alert("Successfully add to contact");
        number.value = null;
        name.value = null;
      }
    }
  }
}
</script>
<style scoped>
.mainDiv {
  margin-top: 200px;
}
</style>
