import express from "express";

import { SignIn, SignUp } from "../controllers/auth";
import { validateSchemes } from "../validation";
import { authSignInScheme, authSignUpScheme } from "../validation/auth";

const router = express.Router();

const prefix = "/auth";

router.post(`${prefix}/sign-in`, validateSchemes(authSignInScheme), SignIn);
router.post(`${prefix}/sign-up`, validateSchemes(authSignUpScheme), SignUp);

export default router;
