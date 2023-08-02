import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PatientService } from "../../../services/PatientServices/PatientService";
import Navbar from "../../Sidebar/Navbar/Navbar";

function PatientEdit(){

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
      <h1>oi {patient?.name}</h1>
    </div>
  )
}

export default PatientEdit