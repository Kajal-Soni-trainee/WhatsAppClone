const { Sequelize, Op } = require("sequelize");
const {
  contactList,
  messages,
  users,
  chanels,
  sessions,
  deletedMsgs,
} = require("../models");
const deletedmsgs = require("../models/deletedmsgs");

const addToContact = async (req, res) => {
  const personal_id = req.user.id;
  console.log("personal id " + personal_id);
  const { name, contact } = req.body;
  try {
    const result = await users.findOne({ where: { contact: contact } });
    if (result != null) {
      const addContact = await contactList.create({
        personal_id: personal_id,
        contact_id: result.id,
        name: name,
      });

      const getChannel = await chanels.findOne({
        where: {
          user1_id: {
            [Op.or]: [personal_id, result.id],
          },
          user2_id: {
            [Op.or]: [personal_id, result.id],
          },
        },
      });
      if (getChannel == null) {
        const addChannel = await chanels.create({
          user1_id: personal_id,
          user2_id: result.id,
        });
      }
      res.json(addContact);
    } else {
      res.json("user not found");
    }
  } catch (err) {
    console.log(err);
  }
};

const sendMsg = async (req, res) => {
  const sender_id = req.user.id;
  try {
    const { receiver_id, msg } = req.body;
    const chanel = await chanels.findOne({
      attribures: ["id"],
      where: {
        user1_id: {
          [Op.or]: [sender_id, receiver_id],
        },
        user2_id: {
          [Op.or]: [sender_id, receiver_id],
        },
      },
    });

    const result = await messages.create({
      sender_id: sender_id,
      receiver_id: receiver_id,
      messages: msg,
      chanel_id: chanel.id,
    });
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

const getMessages = async (req, res) => {
  const personal_id = req.user.id;
  const lastestMsg = await messages.findAll({
    attributes: [
      "chanel_id",
      [Sequelize.fn("max", Sequelize.col("createdAt")), "lastCreatedAt"],
    ],
    where: {
      [Op.or]: {
        sender_id: personal_id,
        receiver_id: personal_id,
      },
    },
    group: ["chanel_id"],
    raw: true,
    paranoid: false,
  });

  const resultMsg = await Promise.all(
    lastestMsg.map(async (element) => {
      const msgObj = await messages.findOne({
        where: {
          createdAt: element.lastCreatedAt,
        },
        raw: true,
        paranoid: false,
      });
      return msgObj;
    })
  );

  const result = await Promise.all(
    resultMsg.map(async (element) => {
      if (element.sender_id == personal_id) {
        const user = await users.findByPk(element.receiver_id);
        const deletedByContact = await contactList.findOne({
          where: {
            personal_id: element.receiver_id,
            contact_id: personal_id,
          },
          raw: true,
          paranoid: false,
        });

        const contactDetails = await contactList.findOne({
          where: {
            personal_id: personal_id,
            contact_id: element.receiver_id,
          },
          paranoid: false,
          raw: true,
        });
        console.log(contactDetails);
        let name = "";
        let isDeletedByContact = "";
        let deletedAt = "";
        if (contactDetails == null) {
          name = user.contact;
          deletedAt = null;
        } else {
          name = contactDetails.name;
          deletedAt = contactDetails.deletedAt;
        }
        if (deletedByContact == null) {
          isDeletedByContact = null;
        } else {
          isDeletedByContact = deletedByContact.deletedAt;
        }
        return {
          ...element,
          name: name,
          img: user.u_img,
          user_id: user.id,
          number: user.contact,
          contactDeletedAt: deletedAt,
          isDeletedByContact: isDeletedByContact,
        };
      } else {
        const user = await users.findByPk(element.sender_id);

        const deletedByContact = await contactList.findOne({
          where: {
            personal_id: element.sender_id,
            contact_id: personal_id,
          },
          raw: true,
          paranoid: false,
        });

        const contactDetails = await contactList.findOne({
          where: {
            personal_id: personal_id,
            contact_id: element.sender_id,
          },
          paranoid: false,
          raw: true,
        });
        console.log(contactDetails);
        let name = "";
        let deletedAt = "";
        let isDeletedByContact = "";
        if (contactDetails == null) {
          name = user.contact;
          deletedAt = null;
        } else {
          name = contactDetails.name;
          deletedAt = contactDetails.deletedAt;
        }
        if (deletedByContact == null) {
          isDeletedByContact = null;
        } else {
          isDeletedByContact = deletedByContact.deletedAt;
        }
        return {
          ...element,
          name: name,
          img: user.u_img,
          user_id: user.id,
          number: user.contact,
          contactDeletedAt: deletedAt,
          isDeletedByContact: isDeletedByContact,
        };
      }
    })
  );

  res.json(result);
};

const getContacts = async (req, res) => {
  const personal_id = req.user.id;
  const result = await contactList.findAll({
    where: {
      personal_id: personal_id,
    },
    order: ["name"],
    include: {
      model: users,
      include: {
        model: sessions,
        required: true,
      },
      required: true,
    },
  });
  res.json(result);
};

const getAllMsgs = async (req, res) => {
  const sender_id = req.user.id;
  const receiver_id = req.query.receiver_id;
  const blockedAt = req.query.blockedAt;
  console.log("blocked At " + blockedAt);
  console.log("blockedAt " + blockedAt);
  const chanel = await chanels.findOne({
    attribures: ["id"],
    where: {
      user1_id: {
        [Op.or]: [sender_id, receiver_id],
      },
      user2_id: {
        [Op.or]: [sender_id, receiver_id],
      },
    },
  });
  if (chanel != null) {
    if (blockedAt == "null") {
      const allMsgs = await messages.findAll({
        where: {
          chanel_id: chanel.id,
        },
        raw: true,
        paranoid: false,
      });

      const allNonDeletedMsg = await Promise.all(
        allMsgs.map(async (element) => {
          let isDeleted = false;
          const delMsg = await deletedMsgs.findOne({
            where: {
              message_id: element.id,
              deletedBy: sender_id,
            },
            raw: true,
          });
          return { ...element, isDeleted: delMsg };
        })
      );

      res.json(allNonDeletedMsg);
    } else {
      const allMsgs = await messages.findAll({
        where: {
          chanel_id: chanel.id,
          createdAt: {
            [Op.lt]: blockedAt,
          },
        },
        raw: true,
        paranoid: false,
      });

      const allNonDeletedMsg = await Promise.all(
        allMsgs.map(async (element) => {
          let isDeleted = false;
          const delMsg = await deletedMsgs.findOne({
            where: {
              message_id: element.id,
              deletedBy: sender_id,
            },
            raw: true,
          });
          return { ...element, isDeleted: delMsg };
        })
      );

      res.json(allNonDeletedMsg);
    }
  } else {
    res.json("chanel blocked");
  }
};

const setSeen = async (req, res) => {
  const personal_id = req.user.id;
  const contact_id = req.body.contact_id;
  const result = await messages.update(
    {
      isSeen: true,
    },
    {
      where: {
        receiver_id: personal_id,
        sender_id: contact_id,
      },
    }
  );
  res.json(result);
};

const deleteContact = async (req, res) => {
  const contact_id = req.body.contact_id;
  const personal_id = req.user.id;
  try {
    const delContactList = await contactList.destroy({
      where: {
        contact_id: contact_id,
        personal_id: personal_id,
      },
    });
    // const getChanel = await chanels.findOne({
    //   where: {
    //     user1_id: {
    //       [Op.or]: [contact_id, personal_id],
    //     },
    //     user2_id: {
    //       [Op.or]: [contact_id, personal_id],
    //     },
    //   },
    // });
    // const delChanel = await chanels.destroy({
    //   where: {
    //     id: getChanel.id,
    //   },
    // });
    // const deleteMsg = await messages.destroy({
    //   where: {
    //     chanel_id: getChanel.id,
    //   },
    // });
    res.json(true);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

const delMsg = async (req, res) => {
  const msg_id = req.body.message_id;
  try {
    const result = await messages.destroy({
      where: {
        id: msg_id,
      },
    });
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

const checkSeen = async (req, res) => {
  const sender_id = req.body.sender_id;
  const receiver_id = req.user.id;
  try {
    const result = await messages.update(
      { isSeen: 1 },
      {
        where: {
          sender_id: sender_id,
          receiver_id: receiver_id,
        },
      }
    );
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

const deleteForMe = async (req, res) => {
  const user_id = req.user.id;
  const message_id = req.body.message_id;
  try {
    const result = await deletedMsgs.create({
      message_id: message_id,
      deletedBy: user_id,
    });
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};
const getBlockedContacts = async (req, res) => {
  const personal_id = req.user.id;
  try {
    const result = await contactList.findAll({
      paranoid: false,
      where: {
        personal_id: personal_id,
        deletedAt: {
          [Op.ne]: null,
        },
      },
      include: {
        model: users,
        required: true,
      },
    });
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

const unblockContact = async (req, res) => {
  const contact_id = req.body.contact_id;
  try {
    const result = await contactList.update(
      {
        deletedAt: null,
      },
      {
        paranoid: false,
        where: {
          id: contact_id,
        },
      }
    );
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
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
};
