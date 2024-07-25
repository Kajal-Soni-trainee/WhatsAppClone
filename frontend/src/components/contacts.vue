<template>
  <div class="d-flex flex-column justify-center align-center ga-5 ma-8">
    <v-card
      class="pa-8"
      width="1600px"
      v-for="contact in contacts"
      :key="contact.id"
      :elevation="12"
      @click="
        showMsg(
          contact.name,
          contact.user.u_img,
          contact.user.id,
          contact.deletedAt
        )
      "
    >
      <div class="d-flex flex-row">
        <v-icon size="100px" v-if="contact.user.u_img == null"
          >mdi-account-circle</v-icon
        >
        <v-img
          max-height="100px"
          max-width="100px"
          contain
          class="rounded-circle"
          v-else
          :src="'http://localhost:3000' + contact.user.u_img"
        ></v-img>
        <div>
          <v-card-title class="text-h4"
            ><b>{{ contact.name }}</b></v-card-title
          >
          <v-card-text v-if="contact.user.caption != null" class="text-h5">{{
            contact.user.caption
          }}</v-card-text>
          <v-card-text v-else class="text-h5">
            Hey! there I am using this app
          </v-card-text>
        </div>
      </div>
    </v-card>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { axiosPost } from "../services/service";
import { onMounted, computed } from "vue";
const store = useStore();
const router = useRouter();
const contacts = computed(() => {
  return store.state.contacts.allContacts;
});

async function showMsg(name, img, user_id, contactDeletedAt) {
  const result = await axiosPost("/checkSeen", { sender_id: user_id });
  if (result.status == 200) {
    router.push({
      name: "Messages",
      query: {
        name: name,
        img: img,
        user_id: user_id,
        contactDeletedAt: contactDeletedAt,
      },
    });
  }
}
onMounted(async () => {
  await store.dispatch("triggerSetAllContacts");
  console.log(contacts.value);
});
</script>
<style scoped></style>
