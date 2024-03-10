import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { Response } from "express";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARYNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
});

export const UploadToCloud = async (file: Express.Multer.File, res: Response) => {
  try {
    const profilePicture = await cloudinary.uploader.upload(file.path, {
      folder: "image",
      use_filename: true,
    });
    return profilePicture;
  } catch (error:any) {
    return res.status(400).json({
      message: error.message || "Error uploading to Cloudinary",
    });
  }
};
