const AuthController = require("../../controller/auth-controller");
const Util = require("../../shared/util");
const validate = require("../../shared/validate");
const {
  LoginValidation,
  SignUpValidation,
} = require("../../shared/validation-schema");

const router = require("express").Router();

router.post(
  "/login",
  validate({ body: LoginValidation }),
  Util.catchError(AuthController.login)
);
router.post(
  "/signup",
  validate({ body: SignUpValidation }),
  Util.catchError(AuthController.signUp)
);

module.exports = router;
