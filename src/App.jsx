import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import MainPage from './pages/MainPage'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'

function App() {

  return (
    <Router>
      <Routes>
        <Route index element={<MainPage/>}/>
        <Route path='registration' element={<RegistrationPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
