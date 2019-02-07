const { refreshToken } = require("./refreshToken");
const { userSignup } = require("./user/userSignup");
const { userLogin } = require("./user/userLogin");

const auth = {
  async refreshToken(parent, args, ctx, info) {
    return await refreshToken(parent, args, ctx, info);
  },
  async userSignup(parent, args, ctx, info) {
    return await userSignup(parent, args, ctx, info);
  },
  async userLogin(parent, args, ctx, info) {
    return await userLogin(parent, args, ctx, info);
  },
};

module.exports = { auth };
