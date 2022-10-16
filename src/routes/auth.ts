import express from "express";

import { signIn, signUp, getUserInfo } from "../controllers/auth";
import { validateSchemes } from "../validation";
import { authSignInScheme, authSignUpScheme } from "../validation/auth";
// import { verifyToken } from "./middleware/verifyToken";

const router = express.Router();

const prefix = "/auth";

router.post(`${prefix}/sign-in`, signIn); // validateSchemes(authSignInScheme)
router.post(`${prefix}/sign-up`, validateSchemes(authSignUpScheme), signUp);
router.get(`${prefix}/info`, getUserInfo);

export default router;
