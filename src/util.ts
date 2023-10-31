import { compare, hash as bcryptHash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from './constants'
export const comparePassword = async (password: string, dbpassword: string) => await compare(password, dbpassword)

export const hashPassword = async (password: string) => await bcryptHash(password, 10)

export const addQuantityToDate = (date: Date | number, quantity: number, unit: string) => {
  date = new Date(date)
  switch (unit) {
    case 'seconds':
      date = date.setSeconds(date.getSeconds() + quantity)
      break
    case 'minutes':
      date = date.setMinutes(date.getMinutes() + quantity)
      break
    case 'hours':
      date = date.setHours(date.getHours() + quantity)
      break
    case 'days':
      date = date.setHours(date.getHours() + quantity * 24)
      break
    case 'months':
      date = date.setMonth(date.getMonth() + quantity)
      break
    case 'years':
      date = date.setMonth(date.getMonth() + quantity * 12)
      break
    default:
      date = date.setSeconds(date.getSeconds() + quantity)
      break
  }
  return new Date(date)
}

export const generateAuthToken = (userId: string) =>
  jwt.sign(
    {
      userId
    },
    JWT_SECRET!,
    {
      algorithm: 'HS256',
      issuer: 'zhealthy',
      expiresIn: 60 * 60 * 60
    }
  )
