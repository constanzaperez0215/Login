import jwt from 'jsonwebtoken'

const JWT_KEY = process.env.JWT_KEY

export const jwtSign = (payload) => {
  console.log(payload, 'desde jwtSing')
  return jwt.sign(payload, JWT_KEY, { expiresIn: '1h' })
}

export const jwtVerify = (token) => {
  try {
    jwt.verify(token, JWT_KEY)
    console.log('pasaste el jwt jerify')
  } catch (error) {
    throw new Error('Token invalido jwt')
  }
}

export const jwtDecode = (token) => jwt.decode(token, JWT_KEY)
