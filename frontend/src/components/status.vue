<template>
  <v-card>
    <p class="text-teal-darken-3 text-h4 pl-7">Your Status</p>

    <div class="d-flex flex-column justify-center pa-5">
      <v-img
        v-if="userDetails.u_img != null"
        style="border: 2px solid black"
        max-width="150px"
        max-height="200px"
        contain
        class="rounded-circle ml-5"
        :src="'http://localhost:3000' + userDetails.u_img"
      ></v-img>
      <v-icon v-else color="green" size="150"> mdi-account-circle</v-icon>
      <div class="d-flex flex-row align-center pl-10">
        <template v-for="status in userStatus" :key="status.id">
          <v-icon
            size="30px"
            color="green"
            @click="
              showUserStatus(
                status.id,
                status.image_path,
                status.createdAt,
                status.views
              )
            "
          >
            mdi-minus-thick
          </v-icon>
        </template>
      </div>
      <p>{{ userDetails.caption }}</p>
    </div>
    <div class="d-flex flex-row align-center ga-5 float-right pa-5">
      <div>
        <v-btn class="bg-teal-darken-4" @click="captionDialog = true"
          >Add Caption</v-btn
        >
      </div>
      <div>
        <v-btn class="bg-teal-darken-4" @click="dpDialog = true">Add Dp</v-btn>
      </div>
      <div class="d-flex flex-column">
        <v-icon
          class="ma-5"
          color="teal-darken-4"
          size="80px"
          @click="showInput = !showInput"
          >mdi-camera-plus-outline</v-icon
        >
        <div v-show="showInput">
          <div class="d-flex flex-row">
            <v-file-input
              variant="solo-filled"
              width="300px"
              id="fileInput"
              label="select image"
              v-model="image"
            ></v-file-input>
            <v-btn
              class="bg-teal-darken-4"
              width="100px"
              height="55px"
              @click="addStatus"
              >Add</v-btn
            >
          </div>
        </div>
      </div>
    </div>
  </v-card>
  <v-divider></v-divider>
  <v-card class="1600px">
    <p class="text-teal-darken-3 text-h4 pl-7">Updates</p>
    <div class="d-flex flex-row pa-5" max-width="1400px">
      <div v-for="contact in contacts" :key="contact.id">
        <div class="d-flex flex-column pa-5">
          <v-icon
            v-if="contact.userDetail.u_img == null"
            color="grey"
            size="150"
          >
            mdi-account-circle</v-icon
          >
          <v-img
            v-else
            max-height="200px"
            max-width="200px"
            contain
            class="rounded-circle ml-5"
            style="border: 2px solid black"
            :src="'http://localhost:3000' + contact.userDetail.u_img"
          ></v-img>
          <p>{{ contact.userDetail.u_name }}</p>

          <div class="d-flex flex-row justify-center align-center">
            <template v-for="status in contact.statusDetail" :key="status.id"
              ><v-icon
                v-if="status.view == null"
                size="30px"
                color="green"
                @click="
                  showStatusAddView(
                    status.id,
                    status.image_path,
                    status.createdAt
                  )
                "
              >
                mdi-minus-thick
              </v-icon>
              <v-icon
                v-else
                size="30px"
                @click="showStatus(status.image_path, status.createdAt)"
              >
                mdi-minus-thick
              </v-icon>
            </template>
          </div>
        </div>
      </div>
    </div>
    <v-dialog width="auto" v-model="statusDialog">
      <v-card width="800px" height="800px">
        <div class="float-right">
          <v-icon @click="statusDialog = false">mdi-close</v-icon>
        </div>
        <v-card-title>{{ getTime() }}</v-card-title>
        <v-img cover :src="'http://localhost:3000' + imagePath"></v-img>
      </v-card>
    </v-dialog>

    <v-dialog width="auto" v-model="userStatusDialog">
      <v-card width="800px" height="800px">
        <v-card-item>
          <p class="float-left">
            {{ getTime() }}
          </p>
          <v-icon class="float-right" @click="userStatusDialog = false"
            >mdi-close</v-icon
          >
        </v-card-item>
        <v-img cover :src="'http://localhost:3000' + userStatusImg"></v-img>
        <v-card-item>
          <div>
            <div
              v-if="views.data != null"
              class="float-left d-flex flex-row align-center ga-3"
            >
              <p>{{ views.data.length }} viewers</p>
              <v-icon>mdi-eye</v-icon>
            </div>
            <div class="float-left d-flex flex-row align-center ga-3" v-else>
              <p>0 viewers</p>
              <v-icon>mdi-eye</v-icon>
            </div>
            <div class="float-right">
              <v-icon @click="deleteStatus">mdi-trash-can-outline</v-icon>
            </div>
          </div>

          <v-divider></v-divider>

          <div class="d-flex flex-column justify-center ga-5 mt-8">
            <template v-for="view in views.data" :key="view.id">
              <div class="d-flex flex-column">
                <p class="float-left text-h6">{{ view.u_name }}</p>
                <p class="float-right text-h6">
                  {{ getViewedTime(view.createdAt) }}
                </p>
              </div>
            </template>
          </div>
        </v-card-item>
      </v-card>
    </v-dialog>
    <v-dialog width="auto" v-model="captionDialog">
      <v-card height="300px" width="500px" class="pa-8">
        <v-icon
          class="float-right"
          @click="captionDialog = false"
          icon="mdi-close"
        ></v-icon>
        <div class="d-flex flex-column justify-center py-5">
          <v-text-field
            v-model="caption"
            variant="solo-filled"
            label="Caption"
          ></v-text-field>
          <v-btn variant="outlined" @click="addCaption">Add</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog width="auto" v-model="dpDialog">
      <v-card height="300px" width="500px" class="pa-8">
        <v-icon
          class="float-right"
          @click="dpDialog = false"
          icon="mdi-close"
        ></v-icon>
        <div class="d-flex flex-column justify-center py-5">
          <v-file-input
            variant="solo-filled"
            label="Add Image"
            v-model="dp"
          ></v-file-input>
          <v-btn variant="outlined" @click="addDp">Add</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script setup>
import { useStore } from "vuex";
import { computed, onMounted, ref, reactive } from "vue";
import { axiosPost } from "../services/service";

const store = useStore();
const userDetails = computed(() => {
  return store.state.users.userDetail;
});
const contacts = computed(() => {
  return store.state.contacts.statusOfContacts;
});
const userStatus = computed(() => {
  return store.state.contacts.usersStatus;
});
const image = ref(null);
const userStatusDialog = ref(false);
const userStatusImg = ref(null);
const imagePath = ref(null);
const statusTime = ref(null);
const statusDialog = ref(false);
const showInput = ref(false);
const captionDialog = ref(false);
const dpDialog = ref(false);
const caption = ref(null);
const dp = ref(null);
const status_id = ref(null);
const views = reactive({ data: [] });
async function showStatusAddView(status_id, imagepath, stateTimestamp) {
  imagePath.value = imagepath;
  statusTime.value = stateTimestamp;
  statusDialog.value = true;
  console.log(status_id);
  const result = await axiosPost("/addView", { status_id: status_id });
  if (result.status == 200) {
    console.log(result.data);
    await store.dispatch("triggerSetStatusOfContacts");
  }
}

async function showStatus(imagepath, stateTimestamp) {
  imagePath.value = imagepath;
  statusTime.value = stateTimestamp;
  statusDialog.value = true;
}

function getTime() {
  const currentDate = new Date();
  const sDate = new Date(statusTime.value);
  console.log(statusTime);
  const currentTime = currentDate.getTime();
  const sTime = sDate.getTime();
  console.log(currentTime, sTime);
  let hrs = 0;
  let mins = 0;
  const h = sDate.getHours();
  const m = sDate.getMinutes();
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
  const days = Math.floor((currentTime - sTime) / (1000 * 60 * 60 * 24));

  if (days > 0) {
    return `yesturday ${hrs}:${mins}`;
  } else {
    return `today ${hrs}:${mins}`;
  }
}

function getViewedTime(viewedTime) {
  const currentDate = new Date();
  const sDate = new Date(viewedTime);
  console.log(statusTime);
  const currentTime = currentDate.getTime();
  const sTime = sDate.getTime();
  console.log(currentTime, sTime);
  let hrs = 0;
  let mins = 0;
  const h = sDate.getHours();
  const m = sDate.getMinutes();
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
  const days = Math.floor((currentTime - sTime) / (1000 * 60 * 60 * 24));

  if (days > 0) {
    return `yesturday ${hrs}:${mins}`;
  } else {
    return `today ${hrs}:${mins}`;
  }
}

function showUserStatus(id, statusImage, createdAt, view) {
  userStatusImg.value = statusImage;
  statusTime.value = createdAt;
  status_id.value = id;
  views.data = view;
  userStatusDialog.value = true;
}

async function addStatus() {
  const formData = new FormData();
  formData.append("status", image.value);
  const result = await axiosPost("/addStatus", formData);
  if (result.status == 200) {
    showInput.value = false;
    await store.dispatch("triggerSetUsersStatus");
  }
}
async function addCaption() {
  const result = await axiosPost("/addCaption", { caption: caption.value });
  if (result.status == 200) {
    await store.dispatch("triggerSetUserDetail");
    captionDialog.value = false;
  }
}
async function addDp() {
  const formData = new FormData();
  formData.append("img", dp.value);
  const result = await axiosPost("/addDp", formData);
  if (result.status == 200) {
    await store.dispatch("triggerSetUserDetail");
    dpDialog.value = false;
  }
}
async function deleteStatus() {
  const result = await axiosPost("/deleteStatus", {
    status_id: status_id.value,
  });
  if (result.status == 200) {
    userStatusDialog.value = false;
    await store.dispatch("triggerSetUsersStatus");
  }
}
onMounted(async () => {
  await store.dispatch("triggerSetStatusOfContacts");
  await store.dispatch("triggerSetUsersStatus");
  await store.dispatch("triggerSetUserDetail");
  console.log("contacts status ", contacts.value);
  console.log("users status ", userStatus.value);
  console.log("userDetails  ", userDetails.value);
});
</script>
<style scoped></style>
