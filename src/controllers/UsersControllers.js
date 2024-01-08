import AppError from "../utils/AppError.js";
import sqliteConnection from "../database/sqlite/index.js";
import bcrypt from "bcrypt";

const database = await sqliteConnection();

class UsersController {
     
  async index(req, res) {
    const result = await database.all('SELECT * FROM users');

    return res.status(200).json({ content: result });
  }

  async show(req, res) {
    const { params } = req

    const user = await database.get('SELECT * FROM users WHERE id = (?)', [params.id]);

    if(!user){
        throw new AppError("Usuário não encontrado")
    }

    const result = user;

    return res.status(200).json({ content: result });
  }

  async create(req, res) {
    const { name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 8);

    const checkUserExists = await database.get(
      `SELECT * FROM users WHERE email = (?)`,
      [email]
    );

    if (checkUserExists) {
      throw new AppError("Email já está em uso");
    }

    await database.run(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      [name, email, hashPassword]
    );

    return res.status(201).json({ content: { name, email, hashPassword } });
  }

  async update(req, res) {
    const { name, email, password, old_password } = req.body;
    const { id } = req.params;

    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if (!user) {
      res.status(401).json({ menssage: "Usuário não encontrado" });
    }

    const userWithUpdatedEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este e-mail já está em uso.");
    }

    user.name = name ?? user.name; // ?? para que no corpo do body se passar vazio ele nao ir para o bd vazio e continua com e valor que ja existia
    user.email = email ?? user.email;

    if(password && !old_password){
        throw new AppError("Voce precisa informar a senha antiga para definr a nova senha")
    } 

    if(password && old_password){
        const checkOldPassword = await bcrypt.compare(old_password, user.password);

        if(!checkOldPassword){
            throw new AppError("A senha antiga não confere");
        }

        user.password = await bcrypt.hash(password, 8);
    }

    await database.run(
      `UPDATE users SET
             name = (?),
             email = (?),
             password = (?),
             updated_at = DATETIME('now')
             WHERE id = (?)`,
      [user.name, user.email, user.password, id] 
    );

    return res.status(200).json({ menssage: "Usuário atualizado com sucesso" });
  }

  async delete(req, res) {
    const { params } = req

    const  user = await database.get('SELECT * FROM users WHERE id = (?)', [params.id]);

    await database.get('DELETE FROM users WHERE id = (?)', [params.id]);

        if(!user){
            throw new AppError("Usuário não encontrado")
        } 

    return res.status(200).json({ content: "Usuário deletado com sucesso" });
  }
}

export default UsersController; 
