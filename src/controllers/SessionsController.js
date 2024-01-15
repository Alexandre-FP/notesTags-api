import knex from "../database/knex/index.js";
import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import _ from "lodash"

export class SessionsController {
  async login(req, res) {
    const { body } = req;

      const userExist  = await knex("users").where({
        email: body.email
      }).first(); // FIRST VAI GARANTIR QUE O RETORNO DESSA CONSULTA ME ROTORNA O PRIMEIRO USUARIO CORRESPODENTE A ESSA CLAUSULA

      if (!userExist) {
        throw new AppError("E-mail e/ou senha incorreta", 401); 
      }

      const passwordIgual = await bcrypt.compare(
        body.password,
        userExist.password
      );

      if (!passwordIgual) {
        throw new AppError("E-mail e/ou senha incorreta", 401);
      }

      const token = jwt.sign({..._.omit(userExist, "password")}, `${process.env.SECRET_PASS_JWT}`, {
        subject: String(userExist.id), // SUBJECT É O CONTEUDO QUE QUERO INSERIR DENTRO DESSE MEU TOKEN
        expiresIn: 60 * 60 * 3, // É O TEMPO QUE VAI LEVAR PARA EXPIRAR ESSE TOKEN
      });

      return res.status(200).json({ content: { token: token, session: _.omit(userExist, "password") }} ); 
  }
}
