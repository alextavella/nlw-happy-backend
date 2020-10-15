import multer from "multer";
import path from "path";

export default {
  baseUrl: process.env.BASE_URL || "http://localhost:3333",
  storage: multer.diskStorage({
    destination: path.join(__dirname, "..", "..", "uploads"),
    filename: (request, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;

      cb(null, fileName);
    },
  }),
};
