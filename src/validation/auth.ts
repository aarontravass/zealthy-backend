import { JWT_SECRET } from '../constants'
import { verify as jwtVerify } from 'jsonwebtoken'
import { prisma } from '../prisma'

export const verifyUser = async (req: Request) => {
  try {
    const authToken = req.headers.get('authorization')?.replace('Bearer ', '') || ''
    const decoded: any = jwtVerify(authToken, JWT_SECRET!, {
      issuer: 'zhealthy',
      algorithms: ['ES256']
    })
    const userId = decoded.userId
    await prisma.loginSession.findFirstOrThrow({
      where: {
        authToken,
        userId
      }
    })
    return {
      userId,
      authToken
    }
  } catch (error) {
    return null
  }
}
