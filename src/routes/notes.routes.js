import NotesController from "../controllers/NotesControllers.js";
import express from "express";
import AcessoRotas from "../middlewares/AcessoRotas.js";

const notesControllers = new NotesController();
const notesRouter = express.Router()

notesRouter.get("/", AcessoRotas, notesControllers.consultaQuery); 
notesRouter.post("/:user_id", AcessoRotas, notesControllers.create);
notesRouter.get("/buscar/:id", AcessoRotas, notesControllers.show);
notesRouter.delete("/deletar/:id", AcessoRotas, notesControllers.delete);
notesRouter.get("/listar", AcessoRotas, notesControllers.index); 

export default notesRouter; 