const UserRepository = require("../database/user-repository");

class UserService {
  static async usernameExists(username) {
    const user = await UserRepository.getUserByUsername(username);

    return !!user;
  }

  static async emailExists(email) {
    const user = await UserRepository.getUserByEmail(email);

    return !!user;
  }

  static async createUser(payload) {
    return UserRepository.addUser(payload);
  }

  static async getUserByUsernameOrEmail(param) {
    return UserRepository.mathUsernameOrEmail(param);
  }
}

module.exports = UserService;
