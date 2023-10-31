import { builder } from '../builder'

export const Comment = builder.prismaObject('Comment', {
  fields: (t) => ({
    id: t.exposeID('id'),
    comment: t.exposeString('comment'),
    createdAt: t.expose('createdAt', { type: 'Date' }),
    updatedAt: t.expose('updatedAt', { type: 'Date' })
    //author: t.relation('author'),
    //ticket: t.relation('ticket')
  })
})
