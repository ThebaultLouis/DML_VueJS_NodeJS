const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ["_id", "username"]);
};

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = "auth";
  var token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET).toString();

  user.tokens = [{ access, token }];

  return user.save().then(user => {
    return user;
  });
};

UserSchema.statics.findByToken = function(token) {
  // var User = this;
  var decoded;

  // try {
  // } catch (e) {
  //   return Promise.reject();
  // }
  // token = token.replace(/^JWT\s/, "");
  // console.log(token);
  // decoded = jwt.verify(token, new Buffer(process.env.JWT_SECRET, "base64"));
  decoded = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(decoded);
  user = User.findOne({
    _id: decoded._id
    // "tokens.token": token,
    // "tokens.access": "auth"
  });
  if (!user) {
    return Promise.reject();
  }
  return user;
};

UserSchema.statics.findByCredentials = function(username, password) {
  var User = this;

  return User.findOne({ username }).then(user => {
    if (!user) {
      return Promise.reject({ err: "User not found" });
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject({ err: "Credentials don't match" });
        }
      });
    });
  });
};

UserSchema.statics.removeToken = function(token) {
  var user = this;

  return user.update({
    $pull: {
      tokens: { token }
    }
  });
};

UserSchema.pre("save", function(next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  }
});

var User = mongoose.model("User", UserSchema);
module.exports = {
  User
};
