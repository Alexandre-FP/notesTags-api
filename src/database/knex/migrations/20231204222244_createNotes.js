const up = knex => knex.schema.createTable("notes", table => { // up criar tabela
    table.increments("id");
    table.text("title");
    table.text("descriptions");
    table.integer("user_id").references("id").inTable("users"); // faz referencia ao id que existe na tabela do usuario
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
});

const down = knex => knex.schema.dropTable("notes"); // down deletar tabela ou voltar do atras uma migrations
// rodar a criação da migrations ===  npx knex migrate:latest

export { up, down }

// npm node package manager gerenciador de pacotes para o nodejs
// npx node package execute é um executador de pacotes npm que pode executar qualquer pacote que possui do registro npm semsequer instalar esse pacote