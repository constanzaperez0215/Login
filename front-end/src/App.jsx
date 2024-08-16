import './App.css'
import Navigation from './components/Navigation'
import Context from './context/Context'
import useDeveloper from './hooks/useDeveloper'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './views/home'
import Register from './components/Register'
import Profile from './components/Profile'
import Pills from './components/Pill'

function App () {
  const globalState = useDeveloper()
  return (
    <Context.Provider value={globalState}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/registrarse' element={<Register />} />
          <Route path='/login' element={<Pills />} />
          <Route path='/perfil' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  )
}

export default App
