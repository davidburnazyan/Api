import express from "express";

import { Read, Create } from "../controllers/crud";

const router = express.Router();
const prefix = "/messages";

router.get(`${prefix}`, Read);
router.post(`${prefix}`, Create);

export default router;
