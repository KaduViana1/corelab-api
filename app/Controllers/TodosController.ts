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

  public async update({ params, request }: HttpContextContract) {
    const payload = request.body()

    const todo = await Todo.findOrFail(params.id)

    return await todo.merge(payload).save()
  }

  public async destroy({ params, response }: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id)

    response.status(204)
    return await todo.delete()
  }
}
