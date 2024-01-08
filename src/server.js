import app from "./app.js";

const PORT = process.env.PORT_DEV || 3001;

app.listen(PORT, () => console.log(`Servidor rodando na porta 🚀 ${PORT}`)); 