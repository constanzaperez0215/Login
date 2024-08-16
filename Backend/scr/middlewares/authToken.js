import { jwtVerify } from '../utils/jwt/jwt.js'

export const authToken = (req, res, next) => {
  const authorization = req.header('Authorization')
  console.log('Auth desde AuthToken: ', authorization)
  // obtengo el authorization desde las cabeceras del front

  if (authorization === undefined) {
    return res.status(404).json({ message: 'Authorization no proporcionado' })
  }

  const [bearer, token] = authorization.split(' ')
  // desde el authorization extraigo el bearer y el token y los separo por el espacio
  console.log('token', token)
  console.log('bearer', bearer)

  if (bearer.toLowerCase() !== 'bearer') {
    res.status(401).json({ message: 'Bearer no proporcionado' })
  }

  if (token === undefined) {
    res.status(401).json({ message: 'Token no proporcionado' })
  }

  try {
    jwtVerify(token)
    next()
  } catch (error) {
    res.status(401).json({ message: 'token no válido' })
  }
}
