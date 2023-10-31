import { builder } from '../../../builder'
import { prisma } from '../../../prisma'
import { Ticket } from '../../../schema/Ticket.schema'

builder.queryField('fetchTicket', (t) =>
  t.prismaField({
    args: {
      ticketId: t.arg.id()
    },
    authScopes: {
      userRequired: true
    },
    type: Ticket,
    resolve: async (query, arg, { ticketId }, ctx) =>
      await prisma.ticket.findUniqueOrThrow({
        where: {
          id: ticketId
        },
        ...query
      })
  })
)
