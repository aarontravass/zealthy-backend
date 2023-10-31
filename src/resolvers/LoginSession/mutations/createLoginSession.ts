import { GraphQLError } from 'graphql'
import { builder } from '../../../builder'
import { prisma } from '../../../prisma'
import { LoginSession } from '../../../schema/LoginSession.schema'
import { comparePassword, generateAuthToken } from '../../../util'
import { randomUUID } from 'crypto'

builder.mutationField('createLoginSession', (t) =>
  t.prismaField({
    type: LoginSession,
    authScopes: { public: true },
    args: {
      email: t.arg.string({ validate: { email: true } }),
      password: t.arg.string({ validate: { maxLength: 20 } })
    },
    resolve: async (query, root, { email, password }, ctx) => {
      const user = await prisma.user.findUniqueOrThrow({
        where: { email }
      })
      if (!(await comparePassword(password, user.password))) {
        throw new GraphQLError('Invalid Password')
      }
      const authToken = generateAuthToken(user.id)
      const refreshToken = randomUUID()
      return await prisma.loginSession.create({
        ...query,
        data: {
          authToken,
          refreshToken,
          userId: user.id
        }
      })
    }
  })
)
