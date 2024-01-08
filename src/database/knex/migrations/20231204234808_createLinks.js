const up = knex => knex.schema.createTable("links", table => { 
    table.increments("id");
    table.text("url").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE"); 
})

const down = knex => knex.schema.dropTable("links");

export { up, down }