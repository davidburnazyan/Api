const express = require("express");
const router = express.Router();

const signController = require("../controllers/sign");
// const { validateSchemes } = require("../validation/index");
// const { authScheme } = require("../validation/auth");

const prefix = "/auth";

router.post(
  prefix + "/sign-in",
  //   validateSchemes(authScheme),
  signController.SignIn
);
router.post(prefix + "/auth/sign-up", signController.SignUp);

module.exports = router;
