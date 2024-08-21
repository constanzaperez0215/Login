import pkg from 'pg'
const { Pool } = pkg

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  allowExitOnIdle: true
})

export const db = async (query, values) => {
  try {
    const result = await pool.query(query, values)
    return result
  } catch (error) {
    console.error('[db_conect.js]=> db', error)
    const newError = { status: false, message: error }
    throw newError
  }
}

const testConnection = async () => {
  try {
    const client = await pool.connect()
    const res = await client.query('SELECT NOW()')
    console.log('Conexión exitosa:', res.rows[0])
    client.release()
  } catch (err) {
    console.error('Error en la conexión:', err)
  }
}

testConnection()
