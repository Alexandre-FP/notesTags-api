import knex from "../database/knex/index.js"
import AppError from "../utils/AppError.js";

class NotesController {
    async index(req, res){ // rota desabilitada
        const notes  = await knex.select('*').from('notes')


        return res.status(200).json({ content: notes })
    }

    async show(req, res){
        const { params } = req 

        const notes = await knex.select('*').from('notes').where({id: params.id}).first();
        const tags = await knex("tags").where({ note_id: params.id }).orderBy("name")
        const links = await knex("links").where({ note_id: params.id }).orderBy("created_at")

        if(!notes){
            throw new AppError("Notação não encontrado")
        }

        const result = { ...notes }

        return res.status(200).json({ content: result, tags, links })
    }
    
    async create(req, res) {
        const { title, descriptions, tags, links } = req.body
        const { user_id } = req.params
    
        const [note_id] = await knex("notes").insert({
          title,
          descriptions,
          user_id
        })
    
        const linksInsert = links.map(link => {
          return {
            note_id,
            url: link
          }
        })
    
        await knex("links").insert(linksInsert)
    
        const tagsInsert = tags.map(name => {
          return {
            note_id,
            name,
            user_id
          }
        })
    
        await knex("tags").insert(tagsInsert)
    
        res.json()
    }

    async consultaQuery(request, response) {
      const { title, user_id, tags } = request.query

      let notes
  
      if (tags) {
        const filterTags = tags.split(',').map(tag => tag.trim())
  
        notes = await knex("tags")
          .select([
            "notes.id",
            "notes.title",
            "notes.user_id",
          ])
          .where("notes.user_id", user_id)
          .whereLike("notes.title", `%${title}%`)
          .whereIn("name", filterTags)
          .innerJoin("notes", "notes.id", "tags.note_id")
          .orderBy("notes.title")
          
      } else {
        notes = await knex("notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title")
      }

      const userTags = await knex("tags").where({ user_id })
      const notesWhithTags = notes.map(note => {
        const noteTags = userTags.filter(tag => tag.note_id === note.id)
  
        return {
          ...note,
          tags: noteTags
        }
      })
  
      return response.json(notesWhithTags)
    }

    async delete(req, res){
      const { params } = req

      await knex.delete("*").from("notes").where("id", params.id)

      return res.status(200).json({ menssage: "Notes deletado com sucesso!"})
    }
}

export default NotesController; 