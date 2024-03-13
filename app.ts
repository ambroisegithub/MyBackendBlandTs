import bodyParser from "body-parser";
import morgan from "morgan";
import  { Application, Request, Response } from "express";
import commentRoutes from "./src/Routes/commentRoutes";
// import upload from "./src/Helpers/multer";
import userRoutes from "./src/Routes/UserRoute"
import blogRoutes from "./src/Routes/BlogRoute";
import contactUsRoutes from "./src/Routes/contactUsRoutes";
import subscribeRoutes from "./src/Routes/subscribeRoute";
import cors from "cors";
import express  from "express";
import helmet from "helmet";
// import { Blog } from "./src/Models/BlogModel";
const app:Application = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
// app.use(upload.single("image"));
app.use('/api/user', userRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/blog', commentRoutes);
app.use('/api/contactus', contactUsRoutes);
app.use('/api/subscribe', subscribeRoutes);


app.get("/", (req: Request, res: Response) => {
    return res.json({ message: "Welcome  To My portfolio API" });
  });

export default app;
