import { builder } from '../builder'
import { TicketStatusEnum } from './TicketStatus.enum'

export const Ticket = builder.prismaObject('Ticket', {
  fields: (t) => ({
    id: t.exposeID('id'),
    ticketNumber: t.exposeInt('ticketNumber'),
    email: t.exposeString('email'),
    authorName: t.exposeString('authorName'),
    content: t.exposeString('content'),
    status: t.expose('status', { type: TicketStatusEnum }),
    createdAt: t.expose('createdAt', { type: 'Date' }),
    updatedAt: t.expose('updatedAt', { type: 'Date' }),
    comments: t.relation('Comment')
  })
})
