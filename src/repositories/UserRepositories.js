import knex from "../database/knex/index.js"

// vai ser onde eu separo minha query da minha logica e regras de negocio da minha apliação
class UserRepositories{
  
  async findByEmail(email){
    const [ user ]  = await knex("users").where({
      email: email
    })
    
    return user;
  }
  
  async createUser({ email, name, password }){ 
    const [ userId ] = await knex("users").insert({
      email,
      name,
      password
    });

    return {
      id: userId,
      email, 
      name, 
      password
    }; 
  }

}

export default UserRepositories