const { Sequelize, Op } = require("sequelize");
const { users } = require("../models");
const passport = require("passport");
require("dotenv").config();

let JwtStrategy = require("passport-jwt").Strategy;

const getToken = (req) => {
  return req.cookies.token;
};

let opts = {};

opts.jwtFromRequest = getToken;
opts.secretOrKey = process.env.SECRET_KEY;

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await users.findByPk(jwt_payload.user_id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error);
    }
  })
);
