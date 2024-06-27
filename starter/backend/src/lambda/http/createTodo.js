import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { createTodo } from '../../businesslogic/todos.mjs'
import { getUserId } from "../utils.mjs";

export const handler = middy()
  .use(httpErrorHandler())
  .use(cors({ credentials: true }))
  .handler(async (e) => {
    const newItem = JSON.parse(e.body)
    const userId = getUserId(e)
    const item = await createTodo(userId, newItem)

    return {
      statusCode: 201,
      body: JSON.stringify({ item })
    }
  })
