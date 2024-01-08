import knex from "../database/knex/index.js";

class TagsControllers {
    async index(req, res){
        const tags = await knex("tags").select("*").from("tags")

        return res.status(200).json({ content: tags })
    }
    
}

export default TagsControllers;