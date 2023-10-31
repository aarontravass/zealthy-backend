import { createYoga } from 'graphql-yoga'
import { PORT } from './constants'
import { schema } from './schema'
import { verifyUser } from './validation/auth'
import { createServer, IncomingMessage } from 'node:http'

const yoga = createYoga<{ req: IncomingMessage }>({
  schema,
  context: async (req) => {
    const result = await verifyUser(req.request)
    const context = {
      userId: result?.userId,
      authToken: result?.authToken
    }
    return context
  }
})

const server = createServer(yoga)

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`)
})
