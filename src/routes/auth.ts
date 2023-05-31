import express from "express";

import { validateSchemes } from "../validation";
import { authSignUpScheme } from "../validation/auth"; // authSignInScheme
import { AuthController } from "../controllers/auth.controller";

const router = express.Router();

const prefix = "/auth";

router.post(`${prefix}/sign-in`, AuthController.signIn); // validateSchemes(authSignInScheme)
router.post(`${prefix}/sign-up`, validateSchemes(authSignUpScheme), AuthController.signUp);
router.get(`${prefix}/info`, AuthController.getUserInfo);

export default router;
