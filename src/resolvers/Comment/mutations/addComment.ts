import { builder } from '../../../builder'
import { prisma } from '../../../prisma'
import { Comment } from '../../../schema/Comment.schema'

builder.mutationField('addComment', (t) =>
  t.prismaField({
    type: Comment,
    authScopes: {
      userRequired: true
    },
    args: {
      ticketId: t.arg.id(),
      comment: t.arg.string({
        validate: {
          maxLength: 100
        }
      })
    },
    resolve: async (query, root, { ticketId, comment }, ctx) =>
      await prisma.comment.create({
        data: {
          ticketId: ticketId,
          comment,
          authorId: ctx.userId!
        },
        ...query
      })
  })
)
