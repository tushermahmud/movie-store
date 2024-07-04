import express from "express";
import userRoutes from "./routes/user.route";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import movieRoutes from "./routes/movie.route";
import "dotenv/config";
import commentRoutes from "./routes/comment.route";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import connectDB from "./config/dbConfig";
const app = express();
export { app };
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/user", userRoutes);
app.use("/movies", movieRoutes);
app.use("/comments", commentRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(process.env.MONGO_URL);
  console.log(`server is running on port ${PORT}`);
});
