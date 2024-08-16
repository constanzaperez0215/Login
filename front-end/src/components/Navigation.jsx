import { Link, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import ModalLogin from './ModalLogin'
import Context from '../context/Context'
import { useContext } from 'react'

const Navigation = () => {
  const navigate = useNavigate()
  const { getNuevoUsuario, setNuevoUsuario } = useContext(Context)

  const logout = () => {
    setNuevoUsuario()
    window.sessionStorage.removeItem('token')
    navigate('/')
  }

  const isLogin = () => {
    if (!getNuevoUsuario) {
      return <ModalLogin />
    }

    return (
      <>
        <Link to='/perfil' className='btn m-1 btn-light'>Mi Perfil</Link>
        <button onClick={logout} className='btn btn-danger'>Salir</button>
      </>
    )
  }

  return (
    <Navbar expand='lg' className='bg-body-tertiary'>
      <Container fluid>
        <Navbar.Brand as={Link} to='/'>Restart Ocean</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto my-2 my-lg-0' style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link as={Link} to='/calendario'>Calendario</Nav.Link>
            <Nav.Link as={Link} to='/foro'>Foro</Nav.Link>
            <Nav.Link as={Link} to='/donaciones'>Donaciones</Nav.Link>
            <NavDropdown title='Conócenos más' id='basic-nav-dropdown'>
              <NavDropdown.Item as={Link} to='/quienes-somos'>Quienes somos</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to='/colaboradores'>Colaboradores</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        {isLogin()}
      </Container>
    </Navbar>
  )
}

export default Navigation
