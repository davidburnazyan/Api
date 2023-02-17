import express from "express";

import { Read, Create, Delete } from "../controllers/word";

const router = express.Router();
const prefix = "/v1";

router.get(`${prefix}/words`, Read);
router.post(`${prefix}/word`, Create);
router.delete(`${prefix}/word`, Delete);


export default router;
