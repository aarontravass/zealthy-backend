import { TicketStatus } from '../../prisma/prisma-client'
import { builder } from '../builder'

export const TicketStatusEnum = builder.enumType(TicketStatus, {
  name: 'TicketStatus'
})
