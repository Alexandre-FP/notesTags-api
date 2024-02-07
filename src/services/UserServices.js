import bcrypt from "bcrypt";
import AppError from "../utils/AppError.js"; 

class UserServices {
  constructor(userRepositories){
    this.userRepositories = userRepositories
  }

  async execute({ name, email, password }){
    const checkUserExists = await this.userRepositories.findByEmail(email);
    
    if (checkUserExists) {
      throw new AppError("Email já está em uso");
    }
    
    const hashPassword = await bcrypt.hash(password, 8);
    const user = await this.userRepositories.createUser({ name, email, password: hashPassword });

    return user; 
  }
}

export default UserServices;  