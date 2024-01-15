import fs from "fs";
import { Multer, TMP_FOLDER, UPLOADS_FOLDER } from "../config/upload.js";
import { resolve } from "path";

class DiskStorage{
  async saveFile(file){
    await fs.promises.rename(
      resolve(TMP_FOLDER, file),
      resolve(UPLOADS_FOLDER, file)
    )
 
    return file
  }

  async deleteFile(file){
    const filePath = resolve(UPLOADS_FOLDER, file);

    try{
      await fs.promises.stat(filePath) // stat retorna o status que esse arquivo está
    }catch{
      return;
    }

    await fs.promises.unlink(filePath); // unlink remove o arquivo
  }
}

export default DiskStorage;