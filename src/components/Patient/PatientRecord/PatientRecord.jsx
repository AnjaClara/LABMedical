import { useEffect } from "react";
import { useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../../Sidebar/Navbar/Navbar"
import { PatientService } from "../../../services/PatientServices/PatientService";
import './PatientRecord'
import { QueryService } from "../../../services/QueryServices/QueryService";
import './PatientRecord.css'
import { ExamService } from '../../../services/ExamService/ExamService.jsx'

function PatientRecord(){

  const [patient, setPatient] = useState()

  const {patientId} = useParams();

  useEffect (() => {
    const asyncfn = async () => {
      setPatient(PatientService.Show(Number(patientId)))
    }    
    patientId && asyncfn();
  },[])


  return(
    <div>
      <div className="sidebar-record">
        <Navbar/>
      </div>
      <body>
        <div className="content-patient-record">
          <div className="title-patient-record">
            <h1><strong>PATIENT RECORD FROM: </strong></h1>
            <h4><strong>{patient?.name}</strong></h4>
          </div>
          <div className="conteiner-patient-record">
            <div className="patient-record">
              <div className="list-infos-patient">
                <div className="infos-patient">
                  <p><strong>Medical Insurance: </strong>{patient?.insurance}</p>
                  <p><strong>Emergency Telephone: </strong>{patient?.etelephone}</p>
                  <p><strong>List of Allergies: </strong>{patient?.allergies}</p>
                  <p><strong>Care List: </strong>{patient?.care}</p>
                </div>
              </div>

            <div className="infos-exam-query">
              <div className="infos-exam">
                
              </div>

              <div className="infos-query">

              </div>

            </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  )
}

export default PatientRecord