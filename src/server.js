import app from "./app.js";

app.listen({ port: Number(process.env.PORT_DEV )}, () => console.log(`Servidor rodando na porta 🚀 ${Number(process.env.PORT_DEV )}`));  