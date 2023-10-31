import { builder } from '../../../builder'
import { prisma } from '../../../prisma'
import { Ticket } from '../../../schema/Ticket.schema'

builder.mutationField('createTicket', (t) =>
  t.prismaField({
    authScopes: {
      newPost: true
    },
    args: {
      email: t.arg.string({ validate: { email: true, maxLength: 30 } }),
      content: t.arg.string({ validate: { maxLength: 500 } }),
      authorName: t.arg.string({ validate: { maxLength: 20 } })
    },
    type: Ticket,
    resolve: async (query, root, { email, content, authorName }, ctx) =>
      await prisma.ticket.create({
        ...query,
        data: {
          email,
          content,
          authorName,
          status: 'NEW'
        }
      })
  })
)
