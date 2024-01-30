import "express-async-errors";
import AppError from "./utils/AppError.js";
import express, { json, urlencoded } from "express"; 
import migrationsRun from "./database/sqlite/migrations/index.js";
import cors from "cors"
import { usersRouter, notesRouter, tagsRouter, sessionRouter } from "./routes/index.js";
import { UPLOADS_FOLDER } from "./config/upload.js";

const app = express(); 

migrationsRun();

app.use(json()); // trabalhando com JSON 
app.use(urlencoded({ extended: true })); // trabalhando com JSON 
app.use(cors()); // permissao de acesso 
app.use("/api", usersRouter);
app.use("/api/notes", notesRouter);
app.use("/api/tags", tagsRouter); 
app.use("/api/login", sessionRouter);
app.use("/api/file", express.static(UPLOADS_FOLDER)) // arquivo statico
 
// tratamento de erros
app.use((error, req, res, next) => { 
    if(error instanceof AppError){
        return res.status(error.statusCode).json({ 
            status: "error", 
            menssage: error.message
        }); 
    }

    return res.status(500).json({ 
        status: "error",
        menssage: "Error da Api"
    });
});

export default app;