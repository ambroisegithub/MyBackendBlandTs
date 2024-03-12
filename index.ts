import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";
import  { Request, Response } from "express";

dotenv.config();

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err:Error) => {
    console.log(err);
  });
  const PORT:number = Number(process.env.PORT);
  app.listen(PORT,()=>{
    console.log(`The Server is connected on ${PORT}`)
  })


  export default app;