<template>
  <div class="d-flex flex-column justify-center align-center ga-5 ma-8">
    <v-card
      class="pa-8"
      width="1600px"
      :elevation="12"
      v-for="contact in contacts"
      :key="contact.id"
      @click="
        showMsg(
          contact.name,
          contact.img,
          contact.user_id,
          contact.contactDeletedAt,
          contact.isDeletedByContact
        )
      "
    >
      <div class="d-flex flex-row">
        <v-icon size="100px" v-if="contact.img == null"
          >mdi-account-circle</v-icon
        >
        <v-img
          max-height="100px"
          max-width="100px"
          contain
          class="rounded-circle"
          v-else
          :src="'http://localhost:3000' + contact.img"
        ></v-img>
        <div>
          <v-card-title class="text-h4"
            ><b>{{ contact.name }}</b></v-card-title
          >
          <v-card-text class="text-h5">{{ contact.messages }}</v-card-text>
        </div>
      </div>
    </v-card>
  </div>
</template>
<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { axiosPost } from "../services/service";
const store = useStore();
const router = useRouter();
const contacts = computed(() => {
  return store.state.contacts.contactsByMsg;
});

async function showMsg(
  name,
  img,
  user_id,
  contactDeletedAt,
  isDeletedByContact
) {
  const result = await axiosPost("/checkSeen", { sender_id: user_id });
  if (result.status == 200) {
    router.push({
      name: "Messages",
      query: {
        name: name,
        img: img,
        user_id: user_id,
        contactDeletedAt: contactDeletedAt,
        isDeletedByContact: isDeletedByContact,
      },
    });
  }
}

onMounted(async () => {
  await store.dispatch("triggerSetContactsByMsg");
  console.log(contacts.value);
});
</script>
<style scoped></style>
