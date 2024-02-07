import app from "./app.js";

const PORT = Number(process.env.PORT_DEV ) || 3001;
app.listen({ port: PORT }, () => console.log(`Servidor rodando na porta 🚀 ${PORT}`));  