import express from "express";

import { Read, Create } from "../controllers/message";

const router = express.Router();
const prefix = "/messages";

router.get(`${prefix}/123`, (req, res) => {
  res.json({
    status: 200,
    message: "done",
  });
});
router.get(`${prefix}`, Read);
router.post(`${prefix}`, Create);

export default router;
