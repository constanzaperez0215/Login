import axios from 'axios'
import Context from '../context/Context'
import { useContext, useEffect } from 'react'

const Home = () => {
  const { setNuevoUsuario } = useContext(Context)

  const getNuevoUsuarioData = () => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      axios.get('http://localhost:3000/users', { headers: { Authorization: `Bearer ${token}` } })
      // arreglo de configuracion de lo que le envío a el endpoint
        .then(({ data: [user] }) => setNuevoUsuario({ ...user }))
        // obtengo un arreglo del usuario desde data y actualizo el estado del nuevo usuario con los datos del usuario
        .catch(() => {
          window.sessionStorage.removeItem('token')
          setNuevoUsuario(null)
          // si la respuesta es erronea elimina el token generado y setea el nuevo usuario en null
        })
    }
  }

  useEffect(getNuevoUsuarioData, [setNuevoUsuario])

  return (
    <div>Bienvenido a Restart Ocean</div>
  )
}

export default Home
