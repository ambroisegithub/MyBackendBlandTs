
import bodyParser from "body-parser";
import morgan from "morgan";
import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import commentRoutes from "./src/Routes/commentRoutes";
import userRoutes from "./src/Routes/UserRoute";
import blogRoutes from "./src/Routes/BlogRoute";
import contactUsRoutes from "./src/Routes/contactUsRoutes";
import subscribeRoutes from "./src/Routes/subscribeRoute";
import swaggerUI from "swagger-ui-express";
import cors from "cors";
import helmet from "helmet";

dotenv.config();
let docs:any;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err: Error) => {
    console.log(err);
  });

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use('/api/user', userRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/comlike', commentRoutes);
app.use('/api/contactus', contactUsRoutes);
app.use('/api/subscribe', subscribeRoutes);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(docs));

app.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Welcome To My portfolio API" });
});

const PORT: number = Number(process.env.PORT);
app.listen(PORT, () => {
  console.log(`The Server is connected on ${PORT}`);
});


