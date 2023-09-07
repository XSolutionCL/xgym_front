import './App.css'
import Login from './pages/Login'
import Clientes from './pages/Clientes'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login/>} exact/>
      <Route path="/home" element={<Home/>} exact/>
      <Route path="/clientes" element={<Clientes/>} exact/>
    </Routes>
  )
}

export default App
