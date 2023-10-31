import { builder } from './builder'

import './resolvers/LoginSession/LoginSession.resolvers'
import './resolvers/Comment/Comment.resolvers'
import './resolvers/Ticket/Ticket.resolvers'

export const schema = builder.toSchema({})
