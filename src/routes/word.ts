import express from "express";

import { Read, Create, Delete, Update } from "../controllers/word";

const router = express.Router();
const prefix = "/v1";

router.post(`${prefix}/word`, Create);
router.get(`${prefix}/words`, Read);
router.patch(`${prefix}/word`, Update);
router.delete(`${prefix}/word`, Delete);


export default router;
