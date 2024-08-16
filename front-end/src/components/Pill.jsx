import { useState } from 'react'
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit'
import Login from './Login'
import Register from './Register'

export default function Pills () {
  const [basicActive, setBasicActive] = useState('iniciar sesion')

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return
    }

    setBasicActive(value)
  }

  return (
    <>
      <MDBTabs pills className='mb-3 d-flex justify-content-center '>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('iniciar sesion')} active={basicActive === 'iniciar sesion'}>
            Iniciar sesión
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('registrate')} active={basicActive === 'registrate'}>
            Regístrate
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane open={basicActive === 'iniciar sesion'}><Login /> </MDBTabsPane>
        <MDBTabsPane open={basicActive === 'registrate'}><Register /> </MDBTabsPane>
      </MDBTabsContent>
    </>
  )
}
