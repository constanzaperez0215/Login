import { db } from '../database/dbConection.js'
import bcrypt from 'bcrypt'

export const verificarCredenciales = async (email, password) => {
  const query = 'SELECT * FROM usuarios WHERE email = $1;'
  const values = [email]
  const { rows: [usuario], rowCount } = await db(query, values)

  console.log('usuario desde models:', usuario)
  console.log('rowCount desde models:', rowCount)

  // verifica si encontró el usuario
  if (rowCount === 0) {
    const newError = { code: 401, message: 'Email o contraseña incorrecta' }
    throw newError
  }

  const passwordEncriptada = usuario.password
  // traigo desde mi usuario la clave que ya está encriptada
  console.log('passwordEncriptada:', passwordEncriptada)

  const passwordCorrecta = await bcrypt.compare(password, passwordEncriptada)
  // hace la verificación de la password ingresada con la password que ya está encriptada en db y devuelve un boleano
  console.log('Password Correcta: ', passwordCorrecta)

  if (!passwordCorrecta) {
    const newError = { code: 401, message: 'Email o contraseña incorrecta' }
    throw newError
  }
}

export const registrarUsuario = async ({ nombre, apellido, email, password }) => {
  console.log('Desde registrar usuario:', nombre, apellido, email, password)
  const passwordEncriptada = bcrypt.hashSync(password, 10)

  const query = 'INSERT INTO usuarios (nombre, apellido, email, password) VALUES ($1, $2, $3, $4) RETURNING *;'
  // encripto la clave para poder agregarla a la tabla
  const values = [nombre, apellido, email, passwordEncriptada]
  const { rowCount } = await db(query, values)
  console.log(passwordEncriptada)

  if (!rowCount) {
    const newError = { code: 500, message: 'No se pudo registrar el usuario, por favor intente más tarde' }
    throw newError
  }
}

export const getUser = async (email) => {
  try {
    const query = 'SELECT nombre, apellido FROM usuarios WHERE email = $1;'
    const values = [email]
    const { rows } = await db(query, values)
    return rows
  } catch (error) {
    const newError = { code: 500, message: error }
    throw newError
  }
}
