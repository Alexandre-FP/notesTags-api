import express from "express";
import UsersController from "../controllers/UsersControllers.js";
import AcessoRotas from "../middlewares/AcessoRotas.js";
import multer from "multer";
import { Multer } from "../config/upload.js";
import UserAvatarController from "../controllers/UserAvatarController.js";

const usersControllers = new UsersController();
const usersRouter = express.Router();
const upload = multer(Multer);
const userAvatar = new UserAvatarController()

// CRUD
usersRouter.get('/', AcessoRotas, usersControllers.index);  
usersRouter.get('/user/:id', AcessoRotas, usersControllers.show);  
usersRouter.post('/users', usersControllers.create);
usersRouter.put('/user/:id', AcessoRotas, usersControllers.update);
usersRouter.delete('/user/:id', AcessoRotas, usersControllers.delete); 
usersRouter.patch("/avatar", AcessoRotas, upload.single("avatar"), userAvatar.updateImg) // patch atualizar um campo especifico


export default usersRouter;

// não guardamos img dentro do banco, guardamos as img dentro de uma pasta, mais fazemos a referencia da img que esta guardada na pasta no banco pra assim recupera a img