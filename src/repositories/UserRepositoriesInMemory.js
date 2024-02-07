// vai ser onde eu separo minha query da minha logica e regras de negocio da minha apliação
class UserRepositoriesInMemory {
  users = [];

  async findByEmail(email) {
    return this.users.find((user) => user.email === email);
  }

  async createUser({ name, email, password }) {
    const user = {
      id: Math.floor(Math.random() * 1000) + 1,
      email,
      password,
      name,
    };

    this.users.push(user);

    return user;
  }
}

export default UserRepositoriesInMemory;
