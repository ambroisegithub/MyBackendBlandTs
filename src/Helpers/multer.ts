import multer from "multer";
import path from "path";
import { Request } from "express"; 

const storage = multer.diskStorage({});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const ext = path.extname(file.originalname);
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".tif", ".webp", ".bmp"]; 

  if (!allowedExtensions.includes(ext)) {
    cb(new Error("Invalid file type") as any, false);
    return;
  }

  cb(null, true);
};

const upload = multer({ storage, fileFilter });

export default upload;