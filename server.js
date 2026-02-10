import express from "express";
import dotenv from "dotenv";

import bfhlRouter from "./src/routes/bhflRoute.js"
import errorHandler from "./src/middleware/errorHandler.js";
import { healthCheck } from "./src/controllers/bhflController.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "10kb" }));

app.use("/bfhl", bfhlRouter);

app.get("/health", healthCheck);

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running...");
});
