import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import multer from 'multer';
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

export const TMP_FOLDER = resolve(__dirname, "..", "..", "tmp");
export const UPLOADS_FOLDER = resolve(TMP_FOLDER, "uploads");

export const Multer = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(req, file, callback){
      const fileHash = crypto.randomBytes(10).toString("hex"); // fazer hash da img para não ter erro de ter uma img com o mesmo nome
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName);
    }
  })
}

