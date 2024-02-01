import knex from "../database/knex/index.js";

class TagsControllers {
    async index(req, res){
        const { params } = req 

        const tags = await knex("tags").select("*").from("tags").where({
            user_id: Number(params.id)
        }).groupBy("name")

        return res.status(200).json({ content: tags })
    }
    
} 

export default TagsControllers; 