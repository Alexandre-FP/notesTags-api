import UserServices from "./UserServices.js";
import UserRepositoriesInMemory from "../repositories/UserRepositoriesInMemory.js";
import AppError from "../utils/AppError.js";

/* Esta linha declara a expectativa do teste: que 'result' seja igual a 4. O método toEqual() é usado para verificar se 'result' é exatamente igual a 4. **/
describe("Usuarios", () => {
  let userInMemory = null;
  let userService = null;

  beforeEach(() => { // intaciando e reaproveitando código
    userInMemory = new UserRepositoriesInMemory()
    userService = new UserServices(userInMemory);
  })

  it("usuario seja criado com sucesso", async () => { // cada services pode ter um teste
    const user = {
      name: "Alexandre",
      email: "alexandre@email.com",
      password: "250320" 
    }

    const create = await userService.execute(user); 
   
    console.log(create)
  
    expect(create).toHaveProperty("id", "email", "name", "password");
  
  });

  it("teste de email em uso", async () => {
    const userUm = {
      name: "Alexandre 1",
      email: "alexandre@email.com",
      password: "250320" 
    }

    const userDois = {
      name: "Alexandre 2",
      email: "alexandre@email.com",
      password: "250320" 
    }
    
    await userService.execute(userUm); 
    await expect(userService.execute(userDois)).rejects.toEqual(new AppError("Email já está em uso")); 
   
  });
}) 