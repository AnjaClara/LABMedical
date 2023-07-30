import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Sidebar/Navbar/Navbar'
import Toolbar from './components/Toolbar/Toolbar'
import ExamRegistration from './pages/ExamRegistration/ExamRegistration'
import HomePage from './pages/HomePage/HomePage'
import MainPage from './pages/MainPage'
import MedicalRecordList from './pages/MedicalRecordList/MedicalRecordList'
import PatientRecord from './pages/PatientRecord/PatientRecord'
import PatientRegistration from './pages/PatientRegistration/PatientRegistration'
import QueryRegistration from './pages/QueryRegistration/QueryRegistration'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'

function App() {

  return (
    <Router>
      <Routes>
        <Route index element={<MainPage/>}/>
        <Route path='registration' element={<RegistrationPage/>}/>
        <Route path='lateralmenu' element={<Navbar/>}/>
        <Route path='toolbar' element={<Toolbar/>}/>
        <Route path='homepage' element={<HomePage/>}/>
        <Route path='patientregistration' element={<PatientRegistration/>}/>
        <Route path='queryregistration' element={<QueryRegistration/>}/>
        <Route path='examregistration' element={<ExamRegistration/>}/>
        <Route path='medicalrecordlist' element={<MedicalRecordList/>}/>
        <Route path='patientrecord' element={<PatientRecord/>}/>
      </Routes>
    </Router>
  )
}

export default App
