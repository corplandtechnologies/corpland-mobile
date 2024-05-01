// index.ts
import express from "express";
import logger from "./logger";
import { PORT } from "./env";
import useRoutes from "./routes/routes";
import cors from "cors";
import morgan from "morgan";
import dbConnect from "./libs/dbConnect";

const app = express();

app.get("/", (req, res) => {
  logger.info("Hello, TypeScript with Express!");
  res.send("Hello, TypeScript with Express!");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("common"));

useRoutes(app);

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
  dbConnect();
});
