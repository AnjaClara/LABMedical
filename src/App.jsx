import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Sidebar/Navbar/Navbar'
import ToolBar from './components/ToolBar/ToolBar'
import HomePage from './pages/HomePage/HomePage'
import MainPage from './pages/MainPage'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'

function App() {

  return (
    <Router>
      <Routes>
        <Route index element={<MainPage/>}/>
        <Route path='registration' element={<RegistrationPage/>}/>
        <Route path='lateralmenu' element={<Navbar/>}/>
        <Route path='toolbar' element={<ToolBar/>}/>
        <Route path='homepage' element={<HomePage/>}/>
      </Routes>
    </Router>
  )
}

export default App
