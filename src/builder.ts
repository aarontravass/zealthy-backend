import SchemaBuilder from '@pothos/core'
import PrismaPlugin from '@pothos/plugin-prisma'
import { prisma } from './prisma'
import ScopeAuthPlugin from '@pothos/plugin-scope-auth'
import ValidationPlugin from '@pothos/plugin-validation'
import { verifyUser } from './validation/auth'
import { DateResolver } from 'graphql-scalars'
import { YogaInitialContext } from 'graphql-yoga'
import { Prisma } from '../prisma/prisma-client'
import type PrismaTypes from '../prisma/pothos-types'

interface CustomContext extends YogaInitialContext {
  userId: string | undefined
  authToken: string | undefined
}
export const builder = new SchemaBuilder<{
  Scalars: {
    Date: {
      Input: Date
      Output: Date
    }
    ID: {
      Input: string
      Output: string
    }
  }
  PrismaTypes: PrismaTypes
  AuthScopes: {
    userRequired: boolean
    public: boolean
    newPost: boolean
  }
  Context: CustomContext
  DefaultInputFieldRequiredness: true
}>({
  defaultInputFieldRequiredness: true,
  plugins: [ValidationPlugin, ScopeAuthPlugin, PrismaPlugin],
  prisma: {
    client: prisma,
    filterConnectionTotalCount: true,
    dmmf: Prisma.dmmf
  },
  authScopes: (context) => ({
    userRequired: async () => !!(await verifyUser(context.request)),
    public: true,
    newPost: true
  }),
  validationOptions: {
    validationError: (zodError, args, ctx, info) => zodError
  },
  scopeAuthOptions: {
    authorizeOnSubscribe: true
  }
})

builder.addScalarType('Date', DateResolver, {})
builder.queryType({})
builder.mutationType()
