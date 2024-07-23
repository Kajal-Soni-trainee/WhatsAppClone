const { Sequelize, Op } = require("sequelize");
const {
  status,
  users,
  messages,
  sessions,
  views,
  contactList,
  sequelize,
} = require("../models");
const addStatus = async (req, res) => {
  const user_id = req.user.id;
  const imageFile = req.file;
  const imagePath = "/uploads/" + imageFile.filename;
  try {
    const setStatus = await status.create({
      user_id: user_id,
      image_path: imagePath,
    });
    res.json(setStatus);
  } catch (err) {
    console.log(err);
  }
};

const getStatus = async (req, res) => {
  const personal_id = req.user.id;
  try {
    const getAllContacts = await contactList.findAll({
      attributes: ["contact_id"],
      where: {
        personal_id: personal_id,
      },
      raw: true,
    });
    console.log(getAllContacts);

    const statusIds = await status.findAll({
      attributes: ["user_id"],
      group: ["user_id"],
      raw: true,
    });

    const usersStatusIds = await Promise.all(
      statusIds.filter((element) => {
        let isContain = false;
        getAllContacts.forEach((contacts) => {
          if (element.user_id == contacts.contact_id) {
            isContain = true;
          }
        });
        return isContain;
      })
    );

    const statusDetails = await Promise.all(
      usersStatusIds.map(async (element) => {
        const userDetail = await users.findByPk(element.user_id);
        const statusDetail = await status.findAll({
          where: { user_id: element.user_id },
          raw: true,
        });
        const statusWithView = await Promise.all(
          statusDetail.map(async (item) => {
            const statusViews = await views.findOne({
              where: {
                viewer_id: personal_id,
                status_id: item.id,
              },
              raw: true,
            });

            return { ...item, view: statusViews };
          })
        );
        return {
          ...element,
          userDetail: userDetail,
          statusDetail: statusWithView,
        };
      })
    );

    res.json(statusDetails);
  } catch (err) {
    console.log(err);
  }
};

const deleteStatus = async (req, res) => {
  const status_id = req.body.status_id;
  try {
    const delStatus = await status.destroy({
      where: {
        id: status_id,
      },
    });
    const delViews = await views.destroy({
      where: {
        status_id: status_id,
      },
    });
    res.json("deleted");
  } catch (err) {
    console.log(err);
  }
};

const addView = async (req, res) => {
  const status_id = req.body.status_id;
  const user_id = req.user.id;
  try {
    const result = await views.create({
      viewer_id: user_id,
      status_id: status_id,
    });
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

const getViews = async (req, res) => {
  const status_id = req.query.status_id;
  try {
    const result = await views.findAll({
      where: {
        status_id: status_id,
      },
      include: {
        model: users,
      },
    });
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

const getViewByUserId = async (req, res) => {
  const status_id = req.query.status_id;
  const user_id = req.user.id;
  try {
    const result = await views.count({
      viewer_id: user_id,
      status_id: status_id,
    });
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

const usersStatus = async (req, res) => {
  const user_id = req.user.id;
  try {
    const statuses = await status.findAll({
      where: {
        user_id: user_id,
      },
      raw: true,
    });

    const statusWithView = await Promise.all(
      statuses.map(async (element) => {
        const view = await views.findAll({
          attributes: ["views.createdAt", "user.u_name", "views.id"],
          where: {
            status_id: element.id,
          },
          include: {
            model: users,
            required: true,
          },
          raw: true,
        });
        return { ...element, views: view };
      })
    );
    res.json(statusWithView);
  } catch (err) {
    console.log(err);
  }
};

const autoDelStatus = async () => {
  const res = await status.destroy({
    where: {
      createdAt: {
        $lte: Sequelize.fn(
          "DATE_SUB",
          Sequelize.literal("NOW()"),
          Sequelize.literal("INTERVAL 1 DAY")
        ),
      },
    },
  });
};

module.exports = {
  addStatus,
  getStatus,
  deleteStatus,
  addView,
  getViews,
  getViewByUserId,
  usersStatus,
  autoDelStatus,
};
