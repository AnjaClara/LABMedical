import Navbar from "../../components/Sidebar/Navbar/Navbar"
import * as BiIcon from "react-icons/bi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PatientService } from "../../services/PatientServices/PatientService";
import { useNavigate } from "react-router-dom";
import * as BsIcon from "react-icons/bs";
import './HomePage.css'
import { QueryService } from "../../services/QueryServices/QueryService";
import { ExamService } from "../../services/ExamService/ExamService";

const style = { color: "var(--black-purple)"};

function HomePage(){

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

  const handlePatientEdit= (id) => {
    
    navigate(`/patientedit/${id}`);
  }

  return(
    <div>
      <div className="sidebar-record">
        <Navbar/>
      </div>
      <main>
        <div className="content-home">
          <div className="title-home">
            <h1><strong>HOME PAGE</strong></h1>
          </div>

          <div className="conteiner-home">
            <div className="show-numbers">
              <div className="numbers-patient">
                <h4><strong>NUMBER OF PATIENTS </strong></h4>
                <div className="numbers">
                  <h4><strong>{PatientService.Get().length}</strong></h4>
                </div>                
              </div>
              <div className="numbers-query">
                <h4><strong>NUMBER OF QUERY </strong></h4>
                <div className="numbers">
                  <h4><strong>{QueryService.Get().length}</strong></h4>
                </div>
              </div>
              <div className="numbers-exam">
                <h4><strong>NUMBER OF EXAMS </strong></h4>
                <div className="numbers">
                  <h4><strong>{ExamService.Get().length}</strong></h4>
                </div>
              </div>
            </div>

            <div className="search-home">
              <div className='search-icon-record'>
                <BiIcon.BiSearchAlt2 style={style} size={40}/>
              </div>
              <div className="input-search-home">
                <input name="search" type="text" onInput={handleSearch}  id="inputSearchHome" placeholder="search only for e-mail patient..." required {...register('search')} className={`form-control ${errors.search ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.search?.message}</div>
                  <button type="submit" id="buttonSearchHome" onClick={getPatient} className="btn btn-primary">Search</button>
              </div>
            </div>

            <div className="show-list-home">
              {filtterdList.map(patient => {
                  return (
                  <div className="list-patient-home">
                    <div className="patient-icon">
                    <BsIcon.BsPersonFill style={style} size={60}/>
                    </div>

                    <div className="patient-shows">
                      <div className="name-home">
                      <h3><strong>{patient.name}</strong></h3>
                      </div>
                      <p><strong>Date of Birth:</strong> {patient.date}</p>
                      <p><strong>E-mail:</strong> {patient.email}</p>
                      <p><strong>Telephone:</strong> {patient.telephone}</p>
                      <p><strong>Medical Insurance:</strong> {patient?.insurance ? patient.insurance : 'Medical Insurance not resgitered...'}</p>
                      <div className="button-modal-home">
                      <button type='button' id='buttonHome' className="btn btn-primary" onClick={() => {handlePatientEdit(patient.id)}}  data-target={patient.id}>More Details</button>
                    </div>
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
      </main>
    </div>
  )
}

export default HomePage