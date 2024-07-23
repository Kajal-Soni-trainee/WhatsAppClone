const { Sequelize, Op } = require("sequelize");
const { users, sessions } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  const { name, email, password, contact } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);
  const result = await users.create({
    u_name: name,
    u_email: email,
    contact: contact,
    password: hashPass,
  });
  res.json(result);
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await users.findOne({ where: { u_email: email } });
    if (result != null) {
      const isSame = bcrypt.compare(password, result.password);
      if (isSame) {
        const token = jwt.sign({ user_id: result.id }, process.env.SECRET_KEY);
        console.log(token);
        res.cookie("token", token, { maxAge: 1000 * 60 * 60, httpOnly: true });
        const getSession = await sessions.findOne({
          where: { user_id: result.id },
          raw: true,
        });
        if (getSession == null) {
          const addSession = await sessions.create({
            user_id: result.id,
            token: token,
            status: 0,
          });
          res.json(true);
        } else {
          const updateSession = await sessions.update(
            { status: 0 },
            {
              where: { user_id: result.id },
            }
          );
          res.json({ name: result.u_name, user_id: result.id, token: token });
        }
      } else {
        res.json(false);
      }
    } else {
      res.json(false);
    }
  } catch (err) {
    console.log(err);
  }
};

const addDp = async (req, res) => {
  const user_id = req.user.id;
  const imgPath = "/uploads/" + req.file.filename;
  const result = await users.update(
    { u_img: imgPath },
    { where: { id: user_id } }
  );
  res.json(result);
};

const removeDp = async (req, res) => {
  const user_id = req.user.id;
  const result = await users.update(
    { u_img: null },
    { where: { id: user_id } }
  );
  res.json(result);
};

const addCaption = async (req, res) => {
  const user_id = req.user.id;
  const caption = req.body.caption;
  try {
    const result = await users.update(
      { caption: caption },
      { where: { id: user_id } }
    );
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

const logout = async (req, res) => {
  const user_id = req.user.id;
  try {
    const result = await sessions.update(
      { status: 1 },
      { where: { user_id: user_id } }
    );
    res.clearCookie("token");
    res.json(user_id);
  } catch (err) {
    console.log(err);
  }
};

const isOnline = async (req, res) => {
  const user_id = req.query.user_id;
  try {
    const result = await sessions.findOne({
      where: {
        user_id: user_id,
      },
      raw: true,
    });
    console.log(result);
    if (result != null) {
      res.json(result);
    }
  } catch (err) {
    console.log(err);
  }
};

const getUserDetails = async (req, res) => {
  const user_id = req.user.id;
  try {
    const result = await users.findByPk(user_id);
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
  addDp,
  removeDp,
  addCaption,
  logout,
  isOnline,
  getUserDetails,
};
