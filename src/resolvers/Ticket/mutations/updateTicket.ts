import { GraphQLError } from 'graphql'
import { TicketStatus } from '../../../../prisma/prisma-client'
import { builder } from '../../../builder'
import { Ticket } from '../../../schema/Ticket.schema'
import { prisma } from '../../../prisma'

builder.mutationField('updateTicket', (t) =>
  t.prismaField({
    authScopes: {
      userRequired: true
    },
    args: {
      ticketId: t.arg.id(),
      status: t.arg.string()
    },
    type: Ticket,
    resolve: async (query, args, { ticketId, status }, ctx) => {
      status = status.toUpperCase()
      if (!TicketStatus[status as TicketStatus]) throw new GraphQLError('Invalid status')
      return await prisma.ticket.update({
        where: {
          id: ticketId
        },
        data: {
          status: status as TicketStatus
        },
        ...query
      })
    }
  })
)
