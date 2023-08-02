import Navbar from '../../components/Sidebar/Navbar/Navbar'
import './QueryRegistration.css'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import * as BiIcon from "react-icons/bi";
import { QueryService } from '../../services/QueryServices/QueryService';
import { useState } from 'react';
import { PatientService } from '../../services/PatientServices/PatientService';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const style = { color: "var(--black-purple)"};

function QueryRegistration(){

  const currentDate = new Date();

  const formSchema = Yup.object().shape({
    search: Yup.string()
      .required('We need to know the patient'),
    reason: Yup.string()
      .required('We must know the reason query')
      .min(6, 'Minimum 6 characters')
      .max(60, 'Maximum 60 characters'),
    time: Yup.string()
      .required('We need to know the time of the appointment')
      .test('min-max', 'The appointment time should be between 9am and 10pm', (value) => {
        if (!value) return false;
        const [hour, minute] = value.split(':');
        const hourValue = parseInt(hour, 10);
        return hourValue >= 9 && hourValue <= 22;
      }),
    problem: Yup.string()
      .required('We must know the problem')
      .min(15, 'Minimum 15 characters')
      .max(1000, 'Maximum 1000 characters'),
    dosage: Yup.string()
      .required('We must know the dosage and precautions')
      .min(15, 'Minimum 15 characters')
      .max(250, 'Maximum 250 characters'),
  })

  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, setValue, setFocus, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  const [patient, setPatient] = useState();
  const [query, setQuery] = useState();
  const {queryId} = useParams();
  const navigate = useNavigate();

  function onSubmit(data) {  
    const body = {...data, patientId: patient.id} 
    QueryService.Create(body)
    return alert('Query successfully registered!!')
  }

  function getPatient(){
    const data = PatientService.ShowByEmail(query);
    setPatient(data);
  }

  function handleSearch(e){
    setQuery(e.target.value)
  }

  useEffect(() =>{
    if (queryId){
      const dataQuery = QueryService.Show(Number(queryId))
      setPatient(PatientService.Show(dataQuery?.patientId));
    }

  },[])

  function handleDelete(){
    return alert('In construction...')
    // QueryService.Delete(queryId)
    // navigate('/homepage');
  }

  function validateDate(value) {
    if (!value) {
      return "Date of Exam is required";
    }

    const currentDate = new Date().toISOString().split("T")[0];

    if (value < currentDate) {
      return "Date of Exam cannot be in the past";
    }

    clearErrors("dateExam");

    return true; 
  }


  return(
    <div>
      <div className="sidebar">
        <Navbar/>
      </div>
      <main>
      <div className="content-query">
        <div className="title-query">
          <h1><strong>QUERY REGISTRATION</strong></h1>
        </div>
        <div className="conteiner-form-query">
          {
            !queryId && 
            <div className='search'>
              <div className='search-icon'>
                <BiIcon.BiSearchAlt2 style={style} size={40}/>
              </div>
              <div className="search-user">
                <input name="search" type="text" onInput={handleSearch}  id="inputSearch" placeholder="search only for e-mail patient..." required {...register('search')} className={`form-control ${errors.search ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.search?.message}</div>
                  <button type="submit" id="buttonSearch" onClick={getPatient} className="btn btn-primary">Search</button>
              </div>
            </div>
          }
          <form className="form-query" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
              <div className='query-from'>
                <p className='query-from-user'><strong>Query from {patient?.name}</strong></p>
              </div>

              <div className="reason-query">
                <label htmlFor="inputReasonQuery">Reason for Query</label>
                <textarea name="reason" type="reason" id="inputReason" placeholder="state the reason..." required {...register('reason')} className={`form-control ${errors.reason ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.reason?.message}</div>
              </div>

              <div className="date-query">
                <label htmlFor="date-query">Date of Query</label>
                <input name="dateQuery" type="date" id="inputDateQuery" required {...register('dateQuery',  {
                  validate: validateDate,
                })} className={`form-control ${errors.dateQuery ? 'is-invalid' : ''}`}/>
                <div className="invalid-feedback">{errors.dateQuery?.message}</div>
              </div>
            </div>

            <div className='time-query'>
              <label htmlFor="time">Query Time</label>
              <input type="time" id="inputTime" name="time" {...register('time')} className={`form-control ${errors.time ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.time?.message}</div>
            </div>

            <div className="problem-query">
              <label htmlFor="inputProblems">Problem Description</label>
              <textarea name="problem" type="text" id="inputProblem" placeholder='tell us the problem with details...' required {...register('problem')} className={`form-control ${errors.problem ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.problem?.message}</div>
            </div>

            <div className="medication-query">
              <label htmlFor="inputMedication">Prescription Medication</label>
              <textarea name="medication" type="text" id="inputMedication" placeholder='...' {...register('medication')} className='form-control'/>
            </div>

            <div className="dosage-query">
              <label htmlFor="inputDosage">Dosage and Precautions</label>
              <textarea name="dosage" type="text" id="inputDosage" placeholder='...' required {...register('dosage')} className={`form-control ${errors.dosage ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.dosage?.message}</div>
            </div>
            
            <button type="submit" id="buttonEdit" className="btn btn-primary" disabled={!queryId}>Edit</button>
            <button type="button" id="buttonDelete" className="btn btn-primary" onClick={handleDelete} disabled={!queryId}>Delete</button>
            <button type="submit" id="buttonSave" className="btn btn-primary" disabled={!!queryId}>Save</button>
 
          </form>
        </div>
      </div>
      </main>
    </div>
  )
}

export default QueryRegistration