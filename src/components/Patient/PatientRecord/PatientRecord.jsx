import { useEffect } from "react";
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../../Sidebar/Navbar/Navbar"
import { PatientService } from "../../../services/PatientServices/PatientService";
import './PatientRecord'
import { QueryService } from "../../../services/QueryServices/QueryService";
import './PatientRecord.css'
import { ExamService } from '../../../services/ExamService/ExamService.jsx'

function PatientRecord(){

  const navigate = useNavigate()

  const [patient, setPatient] = useState()
  const [query, setQuery] = useState()
  const [exam, setExam] = useState();
  const [filtterdListQuery, setFilttedListQuery] = useState([]);
  const [filtterdListExam, setFilttedListExam] = useState([]);
  const {patientId} = useParams();

  useEffect (() => {
    const asyncfn = async () => {
      setPatient(PatientService.Show(Number(patientId)))
    }    
    patientId && asyncfn();
  },[])

  useEffect (() => {
    const asyncfn = async () => {
      setQuery(QueryService.Show(Number(patientId)))
      setFilttedListQuery(QueryService.Get().filter(q => q.patientId == patientId))
    }    
    patientId && asyncfn();
  },[])

  useEffect (() => {
    const asyncfn = async () => {
      setExam(ExamService.Show(Number(patientId)))
      setFilttedListExam(ExamService.Get().filter(e => e.patientId == patientId))
    }    
    patientId && asyncfn();
  },[])

  const handleQueryEdit= (id) => {
    
    navigate(`/queryedit/${id}`);
  }

  const handleExamEdit= (id) => {
    
    navigate(`/examedit/${id}`);
  }

  return(
    <div>
      <div className="sidebar-record">
        <Navbar/>
      </div>
      <main>
        <div className="content-patient-record">
          <div className="title-patient-record">
            <h1><strong>PATIENT RECORD FROM: </strong></h1>
            <h4><strong>{patient?.name}</strong></h4>
          </div>
          <div className="conteiner-patient-record">
            <div className="patient-record">
              <div className="list-infos-patient">
                <div className="infos-patient">
                  <p><strong>Medical Insurance: </strong>{patient?.insurance ? patient.insurance : 'Medical Insurance not resgitered...'}</p>
                  <p><strong>Emergency Telephone: </strong>{patient?.etelephone}</p>
                  <p><strong>List of Allergies: </strong>{patient?.allergies ? patient.allergies : 'List of allergies not resgitered...'}</p>
                  <p><strong>Care List: </strong>{patient?.care ? patient.care : 'Care list not resgitered...'}</p>
                </div>
              </div>

              <div className="infos-exam-query">
                <div className="infos-query">
                  {filtterdListQuery?.map(q => {
                    return(
                      <div className="show-infos-query">
                        <h3><strong>QUERY {q?.id}</strong> </h3>
                        <p><strong>Reason: </strong>{q?.reason}</p>
                        <p><strong>Date: </strong> {q?.dateQuery}</p>
                        <p><strong>Time: </strong>{q?.time}</p>
                        <p><strong>Problem Description: </strong>{q?.problem}</p>
                        <p><strong>Prescription Medication: </strong>{q?.medication ? q.medication : 'Prescription Medication not resgitered...'}</p>
                        <p><strong>Dosage and Precautions: </strong>{q?.dosage}</p>
                        <div className="buttonQuery">
                        <button type='button' id='buttonHome' className="btn btn-primary" onClick={() => {handleQueryEdit(q.id)}}  data-target={q.id}>More Options...</button>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="infos-exam">
                  {filtterdListExam?.map(e => {
                    return(
                      <div className="show-infos-exam">
                      <h3><strong>EXAM {e?.id}</strong> </h3>
                      <p><strong>Name of the exam: </strong>{e?.exam}</p>
                      <p><strong>Date: </strong> {e?.dateExam}</p>
                      <p><strong>Time: </strong>{e?.time}</p>
                      <p><strong>Type of Exam: </strong>{e?.type}</p>
                      <p><strong>Laboratory: </strong>{e?.lab}</p>
                      <p><strong>Document URL: </strong>{e?.url ? e.url : 'URL not resgitered...'}</p>
                      <p><strong>Results: </strong>{e?.results}</p>
                      <div className="buttonExam">
                      <button type='button' id='buttonHome' className="btn btn-primary" onClick={() => {handleExamEdit(e.id)}}  data-target={e.id}>More Options...</button>
                      </div>
                    </div>
                    )
                  })}

                </div>

              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default PatientRecord