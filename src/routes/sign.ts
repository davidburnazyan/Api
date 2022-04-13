const express = require("express");
const router = express.Router();

const signController = require("../controllers/sign");

const prefix = "/auth";

router.post(prefix + "/sign-in", signController.SignIn);
router.post(prefix + "/auth/sign-up", signController.SignUp);

module.exports = router;
