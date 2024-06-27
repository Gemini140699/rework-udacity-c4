import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { getUserId } from '../utils.mjs'
import { updateTodo } from '../../businesslogic/todos.mjs'

export const handler = middy()
  .use(httpErrorHandler())
  .use(cors({ credentials: true }))
  .handler(async (e) => {
    const userId = getUserId(e)
    const todoId = e.pathParameters.todoId
    const item = JSON.parse(e.body)
    await updateTodo(userId, todoId, item)
  })