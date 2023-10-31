import { builder } from '../../../builder'
import { prisma } from '../../../prisma'
import { Ticket } from '../../../schema/Ticket.schema'

builder.queryField('fetchAllTickets', (t) =>
  t.prismaField({
    type: [Ticket],
    authScopes: {
      userRequired: true
    },
    args: {
      pageNo: t.arg.int({ validate: { min: 1, max: 1000 } }),
      recordsPerPage: t.arg.int({ validate: { min: 1, max: 10 } })
    },
    resolve: async (query, arg, { pageNo, recordsPerPage }, ctx) =>
      await prisma.ticket.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        ...query,
        take: recordsPerPage,
        skip: pageNo * recordsPerPage
      })
  })
)
