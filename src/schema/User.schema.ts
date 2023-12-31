import { builder } from '../builder'

export const User = builder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeID('id'),
    email: t.exposeString('email'),
    firstName: t.exposeString('firstName'),
    lastName: t.exposeString('lastName'),
    createdAt: t.expose('createdAt', { type: 'Date' }),
    updatedAt: t.expose('updatedAt', { type: 'Date' }),
    comment: t.relation('Comment'),
    loginSession: t.relation('loginSession')
  })
})
