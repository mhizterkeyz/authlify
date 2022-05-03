const { compare, hash, genSalt } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const config = require("../../config");
const UnauthorizedException = require("../shared/exceptions/unauthorized-exception");
const ValidationException = require("../shared/exceptions/validation-exception");
const UserService = require("./user-service");

class AuthService {
  static async signup(payload) {
    const { email, username, password } = payload;
    const [emailExists, usernameExists] = await Promise.all([
      UserService.emailExists(email),
      UserService.usernameExists(username),
    ]);
    if (emailExists || usernameExists) {
      const errors = {};
      if (emailExists) {
        errors.email = "email exists";
      }
      if (usernameExists) {
        errors.username = "username exists";
      }

      throw new ValidationException(errors);
    }

    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    const user = await UserService.createUser({
      ...payload,
      password: hashedPassword,
    });

    return AuthService.getLoggedInUser(user);
  }

  static async login(payload) {
    const { username, password } = payload;
    const user = await UserService.getUserByUsernameOrEmail(username);
    const exception = new UnauthorizedException("invalid credentials");
    if (!user) {
      throw exception;
    }

    const incorrectPassword = !(await compare(password, user.password));
    if (incorrectPassword) {
      throw exception;
    }

    return this.getLoggedInUser(user);
  }

  static getLoggedInUser(user) {
    const { secretKey, expiresIn } = config().jwt;
    const token = sign(
      {
        id: user.id,
        password: user.password,
        email: user.email,
        phone: user.phone,
      },
      secretKey,
      { expiresIn }
    );
    const userCopy = { ...user };
    delete userCopy.password;

    return { user: userCopy, token };
  }
}

module.exports = AuthService;
