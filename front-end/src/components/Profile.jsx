import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../context/Context'
import axios from 'axios'

const Profile = () => {
  const navigate = useNavigate()
  const { getNuevoUsuario, setNuevoUsuario } = useContext(Context)

  const getNuevoUsuarioData = () => {
    const token = window.sessionStorage.getItem('token')
    // extraigo el token del sesion storage
    console.log('token front:', token) // para saber que está llegando el token

    axios.get('http://localhost:3000/users', { headers: { Authorization: `Bearer ${token}` } })
    // desde el endpoint envío la cabecera con el authorization con el token
      .then(({ data: [user] }) => setNuevoUsuario({ ...user }))
      // desde la petición, de data extraugo un arreglo con el usuario y actualizo el estado del nuevo usuario con user
      .catch(({ response: { data } }) => {
        console.error(data)
        window.sessionStorage.removeItem('token')
        setNuevoUsuario(null)
        navigate('/')
      })
  }

  useEffect(getNuevoUsuarioData, [])

  return (
    <div>
      <h1>Bienvenido {getNuevoUsuario?.nombre} {getNuevoUsuario?.apellido}</h1>
      <p>Esto es Restart Ocean</p>
    </div>
  )
}

export default Profile
