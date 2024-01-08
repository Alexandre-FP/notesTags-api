import express from "express";
import UsersController from "../controllers/UsersControllers.js";
import AcessoRotas from "../middlewares/AcessoRotas.js";

const usersControllers = new UsersController();
const usersRouter = express.Router()

// CRUD
usersRouter.get('/', AcessoRotas, usersControllers.index);  
usersRouter.get('/user/:id', AcessoRotas, usersControllers.show);  
usersRouter.post('/users', usersControllers.create);
usersRouter.put('/user/:id', AcessoRotas, usersControllers.update);
usersRouter.delete('/user/:id', AcessoRotas, usersControllers.delete);


export default usersRouter;