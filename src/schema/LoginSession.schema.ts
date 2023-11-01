import { builder } from '../builder'
import { User } from './User.schema'

export const LoginSession = builder.prismaObject('LoginSession', {
  fields: (t) => ({
    authToken: t.exposeString('authToken'),
    refreshToken: t.exposeString('refreshToken'),
    createdAt: t.expose('createdAt', { type: 'Date' }),
    updatedAt: t.expose('updatedAt', { type: 'Date' }),
    user: t.relation('user', { type: User })
  })
})
