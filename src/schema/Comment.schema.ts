import { builder } from '../builder'
import { Ticket } from './Ticket.schema'
import { User } from './User.schema'

export const Comment = builder.prismaObject('Comment', {
  fields: (t) => ({
    id: t.exposeID('id'),
    comment: t.exposeString('comment'),
    createdAt: t.expose('createdAt', { type: 'Date' }),
    updatedAt: t.expose('updatedAt', { type: 'Date' }),
    author: t.relation('author', { type: User }),
    ticket: t.relation('ticket', { type: Ticket })
  })
})
