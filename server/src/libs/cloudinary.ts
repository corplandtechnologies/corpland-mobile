import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.v2.config({
  cloud_name: "ddhdyuktu",
  api_key: "866744843578931",
  api_secret: "lgDyPJCWXQ8UDNd1cRNVdvqHUWo",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "corpland",
    format: async (req: any, file: any) => "png", // You should replace 'any' with the appropriate types
  } as any,
});

const parser = multer({ storage: storage });

export default parser;
