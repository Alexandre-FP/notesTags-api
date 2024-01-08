import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

const AcessoRotas = (req, res, next) => {
    const webToken = req.headers.authorization;
    
    if(!webToken){
        throw new AppError("JWT Token não existe", 401);
    }
    
    const [, tokenEncriptado ] = webToken.split(" ");
    try{
        jwt.verify(tokenEncriptado, `${process.env.SECRET_PASS_JWT}`) //
        return next();  // next passa para a proxima pilha
    }catch{
        throw new AppError("JWT Token inválido", 401);   
    }
    
}

export default AcessoRotas; // caso eu queira passa o middleware em todas a minhas rotas