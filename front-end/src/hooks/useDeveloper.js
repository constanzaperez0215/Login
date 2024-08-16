import { useState } from 'react'

const useDeveloper = () => {
  const [user, setUser] = useState(null)
  // def los estados de los usuarios

  const setNuevoUsuario = (nuevoUsuario) => setUser(nuevoUsuario)
  // actualizo el estado del usuario

  return { getNuevoUsuario: user, setNuevoUsuario }
  // retorno un objeto con las propiedades getNuevoUsuario que es el ESTADO ACTUAL del usuario y setNuevoUsuario que es la f° para ACTUALIZAR el usuario
}

export default useDeveloper
