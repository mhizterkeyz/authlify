const AuthService = require("../service/auth-service");
const { HTTP_STATUS } = require("../shared/constants");
const Response = require("../shared/response");

class AuthController {
  static async login(req, res) {
    const loggedInUser = await AuthService.login(req.body);

    Response.data(res, HTTP_STATUS.OK, "log in successful", loggedInUser);
  }

  static async signUp(req, res) {
    const loggedInUser = await AuthService.signup(req.body);

    Response.data(res, HTTP_STATUS.CREATED, "signup successful", loggedInUser);
  }
}

module.exports = AuthController;
