import { useEffect, useState } from "react";
import Navbar from "../../components/Sidebar/Navbar/Navbar"
import { PatientService } from "../../services/PatientServices/PatientService";
import * as BiIcon from "react-icons/bi";
import { useForm } from "react-hook-form";
import './MedicalRecordList.css'
import { useNavigate } from "react-router-dom";

const style = { color: "var(--black-purple)"};

function MedicalRecordList(){

  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [filtterdList, setFilttedLit] = useState([]);

  const { register, formState } = useForm();
  const { errors } = formState;
  const [query, setQuery] = useState();

  useEffect(() => {
    setPatients(PatientService.Get())
    setFilttedLit(PatientService.Get())
  },[])

  function getPatient(){
    setFilttedLit(patients.filter(p => p.email === query))
  }

  function handleSearch(e){
    setQuery(e.target.value)
  }

  const handlePatientRecord= (id) => {
    navigate(`/patientrecord/${id}`);
  }

  return(
    <div>
      <div className="sidebar-record">
        <Navbar/>
      </div>
      <body>
      <div className="content-record">
        <div className="title-record">
          <h1><strong>MEDICAL RECORD LIST</strong></h1>
        </div>
        <div className="conteiner-record">
          <div className='search-record'>
            <div className='search-icon-record'>
              <BiIcon.BiSearchAlt2 style={style} size={40}/>
            </div>
            <div className="search-user">
              <input name="search" type="text" onInput={handleSearch}  id="inputSearch" placeholder="search only for e-mail patient..." required {...register('search')} className={`form-control ${errors.search ? 'is-invalid' : ''}`}/>
                <div className="invalid-feedback">{errors.search?.message}</div>
                <button type="submit" id="buttonSearch" onClick={getPatient} className="btn btn-primary">Search</button>
            </div>
          </div>
          <div className="show-list-patient">
            {filtterdList.map(patient => {
              return (
              <div className="list-patient">
                <h3><strong>{patient.name}</strong></h3>
                <p><strong>E-mail:</strong> {patient.email}</p>
                <p><strong>Medical Insurance:</strong> {patient?.insurance ? patient.insurance : 'Medical Insurance not resgitered...'}</p>
                <div className="button-modal-record">
                  <button type='button' id='buttonRecord' className="btn btn-primary" onClick={() => {handlePatientRecord(patient.id)}} data-target={patient.id}>More Details</button>
                </div>
              </div>
              )
            })}

            <div className="patient-not-found">
              {filtterdList.length === 0 && <p><strong>PATIENT NOT FOUND!!</strong></p>}
            </div>

          </div>
        </div>
      </div>
      </body>
    </div>
  )
}

export default MedicalRecordList