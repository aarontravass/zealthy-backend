import { builder } from '../../../builder'
import { prisma } from '../../../prisma'
import { LoginSession } from '../../../schema/LoginSession.schema'

builder.mutationField('deleteLoginSession', (t) =>
  t.prismaField({
    type: LoginSession,
    authScopes: { userRequired: true },
    resolve: async (query, root, args, ctx) =>
      await prisma.loginSession.delete({
        ...query,
        where: {
          ...ctx
        }
      })
  })
)
