<template>
  <template v-if="blockedContacts.length == 0">
    <v-card width="1600px" :elevation="12" class="pa-5 ma-8">
      <v-card-text class="text-h4 text-red text-center"
        >No contacts in blocked List</v-card-text
      >
    </v-card>
  </template>
  <template v-else>
    <div class="d-flex flex-column justify-center align-center ga-5 ma-8">
      <v-card
        class="pa-8"
        width="1600px"
        :elevation="12"
        v-for="contact in blockedContacts"
        :key="contact.id"
        @click="showUnblockDialog(contact.id)"
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
            <v-card-text class="text-h5">Blocked Tap to unblock</v-card-text>
          </div>
        </div>
      </v-card>
      <v-dialog width="800px" v-model="unblockAlert">
        <v-card class="pa-8">
          <v-card-text class="text-center text-h4"
            >Are You sure you want unblock contact</v-card-text
          >
          <div class="d-flex flex-row justify-center align-center ga-5">
            <v-btn varaint="outlined" @click="unblock">Yes</v-btn>
            <v-btn varaint="outlined" @click="unblockAlert = false">No</v-btn>
          </div>
        </v-card>
      </v-dialog>
    </div>
  </template>
</template>
<script setup>
import { useStore } from "vuex";
import { onMounted, computed, ref } from "vue";
import { axiosPost } from "../services/service";
const store = useStore();
const blockedContacts = computed(() => {
  return store.state.contacts.blockedContacts;
});
const contactId = ref(null);
const unblockAlert = ref(false);
function showUnblockDialog(contact_id) {
  console.log("contact_id " + contact_id);
  contactId.value = contact_id;
  unblockAlert.value = true;
}
async function unblock() {
  const result = await axiosPost("/unBlockContact", {
    contact_id: contactId.value,
  });
  if (result.status == 200) {
    unblockAlert.value = false;
    await store.dispatch("triggerSetBlockedContacts");
  }
}
onMounted(async () => {
  await store.dispatch("triggerSetBlockedContacts");
  console.log(blockedContacts.value);
});
</script>
<style scoped></style>
