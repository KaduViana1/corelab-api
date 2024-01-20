import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Todo from 'App/Models/Todo'
import CreateTodoValidator from 'App/Validators/CreateTodoValidator'

export default class TodosController {
  public async index() {
    return await Todo.all()
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateTodoValidator)
      const newTodo = await Todo.create(payload)
      response.status(201)
      return newTodo
    } catch (error) {
      response.badRequest(error.messages)
    }
  }

  public async search({}: HttpContextContract) {}

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()

    let todo = await Todo.findOrFail(params.id)

    todo.title = body.title
    todo.content = body.content
    todo.isFavorite = body.is_favorite

    return await todo.save()
  }

  public async destroy({ params }: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id)

    return await todo.delete()
  }
}
