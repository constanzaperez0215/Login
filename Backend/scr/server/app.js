import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { jwtSign, jwtDecode } from '../utils/jwt/jwt.js'
import { verificarCredenciales, registrarUsuario, getUser } from '../models/models.users.js'
import { authToken } from '../middlewares/authToken.js'
import path from 'path'
import { fileURLToPath } from 'url'

// Crear __filename y __dirname manualmente
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT ?? 3005

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    // obtengo el email y el password que viene por el body
    await verificarCredenciales(email, password)
    // utilizo la función verificar credenciales para saber si coincide la clave o no
    const token = jwtSign({ email })
    // firmamos el token con jwtSing y le enviamos el email
    res.status(200).json({ token })
    // si tenemos una respuesta positiva, respondemos con el token como objeto porque el front está esperando un objeto
  } catch (error) {
    console.error('Error en el login:', JSON.stringify(error, null, 2))
    res.status(error.code || 500).send(error)
  }
})

app.post('/users', async (req, res) => {
  try {
    const { nombre, apellido, email, password } = req.body
    console.log(nombre, apellido, email, password)
    // obtengo los datos del formulario desde el body
    await registrarUsuario({ nombre, apellido, email, password })
    res.status(201).json({ status: true, message: 'Usuario registrado con éxito' })
  } catch (error) {
    res.status(error.code || 500).json({ message: 'Error en la conexión', error })
  }
})

app.get('/users', authToken, async (req, res) => {
  try {
    const authorization = req.header('Authorization')
    console.log('Authorizatión ruta get: ', authorization)
    // obtengo el authorization enviada desde las cabeceras en el front

    const [, token] = authorization.split(' ')
    console.log('token desde GET:', token)
    // Se envía el bearer y el token desde las cabeceras pero aqui  necesitamos solo el token, así que lo separo con el .split

    const { email } = jwtDecode(token)
    console.log('Email desde GET/users', email)

    const user = await getUser(email)
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ message: error })
  }
})

app.all('*', async (req, res) => {
  res.status(404).json({ code: 404, message: 'La ruta consultada no existe' })
})

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'build')))

// Ruta catch-all para manejar todas las rutas de frontend
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'))
})

app.listen(PORT, () => console.log('Conectados al servidor 3000'))

export default app
