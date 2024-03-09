import bodyParser from "body-parser";
import morgan from "morgan";
import  { Application, Request, Response } from "express";
import userRoutes from "./src/Routes/UserRoute"
import cors from "cors";
import express  from "express";
import helmet from "helmet";
const app:Application = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use('/api/user', userRoutes);
app.get("/", (req: Request, res: Response) => {
    return res.json({ message: "Welcome  To My portfolio API" });
  });

export default app;
