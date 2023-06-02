import express from "express";

import { create, get, DeleteAll } from "../controllers/todo";

const router = express.Router();
const prefix = "/v1";

router.get(`${prefix}/todo`, get);
router.post(`${prefix}/todo`, create);
router.delete(`${prefix}/todo`, DeleteAll);

export default router;
