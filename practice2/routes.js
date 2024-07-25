const express = require("express");
const route = express.Router();
const passport = require("passport");
require("./middleware/passport");
const multer = require("multer");
const storage = require("./middleware/multer");
const upload = multer({ storage: storage });
const {
  registerUser,
  loginUser,
  logout,
  addDp,
  removeDp,
  addCaption,
  isOnline,
  getUserDetails,
} = require("./controllers/users");
const {
  addToContact,
  sendMsg,
  getMessages,
  getContacts,
  getAllMsgs,
  setSeen,
  deleteContact,
  delMsg,
  checkSeen,
  deleteForMe,
  getBlockedContacts,
  unblockContact,
} = require("./controllers/messages");
const {
  addStatus,
  getStatus,
  deleteStatus,
  addView,
  getViews,
  getViewByUserId,
  usersStatus,
} = require("./controllers/status");
route.post("/registerUser", registerUser);
route.post("/loginUser", loginUser);
route.post(
  "/addToContact",
  passport.authenticate("jwt", { session: false }),
  addToContact
);
route.post(
  "/addDp",
  passport.authenticate("jwt", { session: false }),
  upload.single("img"),
  addDp
);
route.get(
  "/removeDp",
  passport.authenticate("jwt", { session: false }),
  removeDp
);
route.post(
  "/sendMsg",
  passport.authenticate("jwt", { session: false }),
  sendMsg
);
route.post(
  "/addCaption",
  passport.authenticate("jwt", { session: false }),
  addCaption
);
route.get(
  "/getMessages",
  passport.authenticate("jwt", { session: false }),
  getMessages
);
route.get(
  "/getContacts",
  passport.authenticate("jwt", { session: false }),
  getContacts
);
route.get(
  "/getAllMsgs",
  passport.authenticate("jwt", { session: false }),
  getAllMsgs
);
route.post(
  "/setSeen",
  passport.authenticate("jwt", { session: false }),
  setSeen
);
route.post(
  "/deleteContact",
  passport.authenticate("jwt", { session: false }),
  deleteContact
);
route.post("/delMsg", passport.authenticate("jwt", { session: false }), delMsg);
route.get("/logout", passport.authenticate("jwt", { session: false }), logout);
route.post(
  "/addStatus",
  passport.authenticate("jwt", { session: false }),
  upload.single("status"),
  addStatus
);
route.get(
  "/getStatus",
  passport.authenticate("jwt", { session: false }),
  getStatus
);
route.post(
  "/deleteStatus",
  passport.authenticate("jwt", { session: false }),
  deleteStatus
);
route.post(
  "/addView",
  passport.authenticate("jwt", { session: false }),
  addView
);
route.get(
  "/getViews",
  passport.authenticate("jwt", { session: false }),
  getViews
);
route.get(
  "getViewsByUserId",
  passport.authenticate("jwt", { session: false }),
  getViewByUserId
);
route.get(
  "/getUsersStatus",
  passport.authenticate("jwt", { session: false }),
  usersStatus
);
route.get(
  "/isOnline",
  passport.authenticate("jwt", { session: false }),
  isOnline
);

route.post(
  "/checkSeen",
  passport.authenticate("jwt", { session: false }),
  checkSeen
);
route.post(
  "/deleteForMe",
  passport.authenticate("jwt", { session: false }),
  deleteForMe
);
route.get(
  "/getUserDetails",
  passport.authenticate("jwt", { session: false }),
  getUserDetails
);
route.get(
  "/getBlockedContacts",
  passport.authenticate("jwt", { session: false }),
  getBlockedContacts
);
route.post(
  "/unblockContact",
  passport.authenticate("jwt", { session: false }),
  unblockContact
);
module.exports = route;
