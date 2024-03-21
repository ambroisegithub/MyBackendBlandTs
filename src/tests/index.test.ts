import bodyParser from "body-parser";
import morgan from "morgan";
import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "../Routes/UserRoute";

dotenv.config();
import blogRoutes from "../Routes/BlogRoute";
import contactUsRoutes from "../Routes/contactUsRoutes";
import subscribeRoutes from "../Routes/subscribeRoute";
mongoose.set("strictQuery", false);

// Exporting a function to establish the database connection
export const connectToDatabase = async () => {
  await mongoose.connect(process.env.MONGODB_URL_TEST as string);
  console.log("DB CONNECTED");
};

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use('/api/user', userRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contactus', contactUsRoutes);
app.use('/api/subscribe', subscribeRoutes);

app.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Welcome To My portfolio API" });
});

const server = app.listen(process.env.PORT_TEST, () => {
  console.log(`The Server is connected on ${process.env.PORT_TEST}`);
});

export { app, server };