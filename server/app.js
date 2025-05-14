import express from "express";
import morgan from "morgan";
import cors from "cors";
import { PORT } from "./config/env.js";
import useRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
const app = express();
connectDB();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/", useRoutes);

app.use("*", (req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal server error",
  });
});
app.listen(5000, () => {
  console.log(`Server is running on port ${PORT}`);
});
