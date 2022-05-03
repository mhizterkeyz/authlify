const Util = require("../shared/util");

const users = new Map();

class UserRepository {
  static async getUserByUsername(username) {
    return Util.findInMap(users, (_user) => _user.username === username);
  }

  static async getUserByEmail(email) {
    return Util.findInMap(users, (_user) => _user.email === email);
  }

  static async mathUsernameOrEmail(param) {
    return Util.findInMap(
      users,
      (_user) => _user.email === param || _user.username === param
    );
  }

  static async addUser(payload) {
    const id = users.size + 1;

    payload.id = id;
    users.set(`${id}`, payload);

    return payload;
  }
}

module.exports = UserRepository;
