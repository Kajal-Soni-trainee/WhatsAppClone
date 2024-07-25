<template>
  <div class="mainDiv">
    <v-card width="1400px" :elevation="12">
      <v-toolbar width="1400px" class="pa-5">
        <v-icon
          size="x-large"
          width="50px"
          color="green-darken-2"
          icon="mdi-arrow-left"
          @click="back"
        ></v-icon>

        <!-- <div class="d-flex flex-row"> -->
        <v-icon size="74" @click="blockContact" v-if="img == null"
          >mdi-account-circle</v-icon
        >
        <v-img
          max-height="85px"
          max-width="85px"
          contain
          class="rounded-circle"
          v-else
          :src="'http://localhost:3000' + img"
        ></v-img>
        <div class="d-flex flex-column pa-3">
          <p class="text-h6">{{ name }}</p>
          <template v-if="isDeletedByContact != null">
            <p class="float-left"><b>Offline</b></p>
          </template>
          <template v-else-if="isOnline != null">
            <p class="float-left" v-if="isOnline.status == 0">Online</p>
            <p class="float-left" v-else><b>Offline</b></p>
          </template>
        </div>
        <!-- </div> -->
        <v-spacer></v-spacer>
        <v-icon size="30px" class="float-right pa-4" @click="blockContact"
          >mdi-block-helper</v-icon
        >
      </v-toolbar>
      <div class="scroll bg-green-lighten-4" style="height: 1000px">
        <template v-for="message in messages" :key="message.id">
          <template v-if="message.isDeleted == null">
            <div
              v-if="message.sender_id == user_id"
              @click="showDelOption(message.id, message.sender_id)"
              class="float-left pa-3 ma-3 bg-yellow-accent-1 rounded-xl"
              style="max-width: 400px; clear: both"
            >
              <p v-if="message.deletedAt == null" class="text-h6">
                {{ message.messages }}
              </p>
              <v-card-subtitle
                class="text-h6"
                append-icon="mdi-block-helper"
                v-else
                >this message was deleted</v-card-subtitle
              >
              <div class="d-flex flex-row align-center float-right">
                <p class="text-subtitle-2">
                  {{ getCreatedTime(message.createdAt) }}
                </p>
              </div>
            </div>
            <div
              v-else
              style="max-width: 400px; clear: both"
              class="pa-3 ma-3 text-h6 float-right bg-light-green-darken-2 rounded-xl"
              @click="showDelOption(message.id, message.sender_id)"
            >
              <p v-if="message.deletedAt == null" class="text-h6">
                {{ message.messages }}
              </p>
              <v-card-subtitle
                append-icon="mdi-block-helper"
                class="text-h6"
                v-else
                >this message was deleted</v-card-subtitle
              >

              <div class="d-flex flex-row align-center float-right">
                <p class="text-subtitle-2">
                  {{ getCreatedTime(message.createdAt) }}
                </p>
                <v-icon v-if="message.isSeen == 0">mdi-check-all</v-icon>
                <v-icon v-else color="primary">mdi-check-all</v-icon>
              </div>
            </div>
          </template>
        </template>
      </div>
      <div class="d-flex flex-row">
        <v-text-field
          variant="solo-filled"
          v-model="message"
          label="message"
        ></v-text-field>
        <v-btn class="bg-green-darken-2" height="56px" @click="sendMsg"
          >Send</v-btn
        >
      </div>
    </v-card>
    <v-dialog width="auto" v-model="delDialog">
      <v-card width="500px" height="200px" class="pa-5">
        <v-card-item class="d-flex flex-column justify-center align-center">
          <v-icon size="80px">mdi-trash-can-outline</v-icon>
          <div
            v-if="sender_id != user_id"
            class="d-flex flex-row justify-center align-center ga-5"
          >
            <v-btn variant="outlined" @click="deleteForMe">Delete for me</v-btn>
            <v-btn variant="outlined" @click="deleteForEveryone"
              >Delete for everyone
            </v-btn>
          </div>
          <div v-else>
            <v-btn variant="outlined" @click="deleteForMe">Delete for me</v-btn>
          </div>
        </v-card-item>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, onUpdated } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { axiosPost } from "@/services/service";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");
const router = useRouter();
const store = useStore();
const route = useRoute();
const message = ref(null);
const sender_id = ref(null);
const name = ref(route.query.name);
const img = ref(route.query.img);
const user_id = ref(route.query.user_id);
const contactDeletedAt = ref(route.query.contactDeletedAt);
const isDeletedByContact = ref(route.query.isDeletedByContact);
const messages = computed(() => {
  return store.state.contacts.messagesByContactId;
});
const msgDeletedId = ref(null);
const delDialog = ref(false);
const isOnline = computed(() => {
  return store.state.users.isOnline;
});
function getCreatedTime(time) {
  const date = new Date(time);
  let hrs = 0;
  let mins = 0;
  const h = date.getHours();
  const m = date.getMinutes();
  if (h < 10) {
    hrs = "0" + h;
  } else {
    hrs = h;
  }
  if (m < 10) {
    mins = "0" + m;
  } else {
    mins = m;
  }

  return `${hrs}:${mins}`;
}

async function sendMsg() {
  if (contactDeletedAt.value != null) {
    alert("You have deleted the contact unblock to send message");
  } else {
    if (message.value != "") {
      const result = await axiosPost("/sendMsg", {
        receiver_id: user_id.value,
        msg: message.value,
      });
      if (result.status == 200) {
        message.value = "";
        socket.emit("sentMsg", message.value);
        await store.dispatch("triggerSetMessagesByContactId", {
          user_id: user_id.value,
          blockedAt: contactDeletedAt.value,
        });
      }
    }
  }
}

function back() {
  router.push({ name: "HomePage" });
}
function showDelOption(message_id, senderId) {
  msgDeletedId.value = message_id;
  sender_id.value = senderId;
  delDialog.value = true;
  console.log(
    "sender id :" + sender_id.value + " , user_id : " + user_id.value
  );
}

async function deleteForMe() {
  console.log("delete for me");

  const result = await axiosPost("/deleteForMe", {
    message_id: msgDeletedId.value,
  });
  if (result.status == 200) {
    delDialog.value = false;
    await store.dispatch("triggerSetMessagesByContactId", {
      user_id: user_id.value,
      blockedAt: contactDeletedAt.value,
    });
  }
}
async function deleteForEveryone() {
  const result = await axiosPost("/delMsg", { message_id: msgDeletedId.value });
  if (result.status == 200) {
    socket.on("sentMsg", 1);
    await store.dispatch("triggerSetMessagesByContactId", {
      user_id: user_id.value,
      blockedAt: contactDeletedAt.value,
    });
  }
}

async function blockContact() {
  console.log("blocking aaaaaaaaaaaaaaaaaaa");
  const result = await axiosPost(`/deleteContact`, {
    contact_id: user_id.value,
  });
  if (result.status == 200) {
    console.log(result.data);
    router.push({ name: "HomePage" });
  }
}
onMounted(async () => {
  console.log(user_id.value);
  console.log("blocked at " + contactDeletedAt.value);
  await store.dispatch("triggerSetMessagesByContactId", {
    user_id: user_id.value,
    blockedAt: contactDeletedAt.value,
  });
  await store.dispatch("triggerSetIsOnline", { user_id: user_id.value });
  console.log("cv cvbcvb", store.state.users.isOnline);
  socket.on("receiveMsg", async (event) => {
    console.log(event);
    await store.dispatch("triggerSetMessagesByContactId", {
      user_id: user_id.value,
      blockedAt: contactDeletedAt.value,
    });
  });
});

onUpdated(async () => {
  console.log("updating");
  console.log("blocked at " + contactDeletedAt.value);
  const result = await axiosPost("/checkSeen", { sender_id: user_id.value });
  await store.dispatch("triggerSetMessagesByContactId", {
    user_id: user_id.value,
    blockedAt: contactDeletedAt.value,
  });
  console.log(result);
});
</script>
<style scoped>
.mainDiv {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}
.scroll {
  overflow-y: auto;
}
</style>
