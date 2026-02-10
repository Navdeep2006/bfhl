import express from "express";
import {
  handleBFHL,
  healthCheck
} from "../controllers/bhflController.js";

const router = express.Router();

router.post("/", handleBFHL);

// router.get("/", healthCheck);

export default router;
