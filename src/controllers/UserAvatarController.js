import knex from "../database/knex/index.js";
import AppError from "../utils/AppError.js";
import DiskStorage from "../providers/DiskStorage.js"
import jwt from "jsonwebtoken";

class UserAvatarController {
  async updateImg(req, res){
    const { headers } = req;
    const avatarFileName = req.file.filename;
    const [, tokenEncriptado] = headers.authorization.split(" ");
    const token = jwt.verify(tokenEncriptado, `${process.env.SECRET_PASS_JWT}`);  

    const disk = new DiskStorage();

    const [ userId ] = await knex("users").where({
      id: token.id
    });

    if(!userId){
      throw new AppError("Somente usuários autenticados podem mudar a avatar", 401);
    }
 
    if(userId.avatar){
      await disk.deleteFile(userId.avatar) // se existe uma foto vinculada ao usuario e deletando a que existe e envio a nova para o banco
    }

    const filename = await disk.saveFile(avatarFileName);
    userId.avatar = filename; 

    await knex("users").update(userId).where({ id: token.id });  

    return res.status(200).json({ content: userId }); 
  }
}

export default UserAvatarController;