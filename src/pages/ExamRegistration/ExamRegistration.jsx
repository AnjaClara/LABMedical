import Navbar from '../../components/Sidebar/Navbar/Navbar'
import './ExamRegistration.css'
import { useForm } from "react-hook-form";
import * as BiIcon from "react-icons/bi";
import { ExamService } from '../../services/ExamService/ExamService';
import { PatientService } from '../../services/PatientServices/PatientService';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const style = { color: "var(--black-purple)"};

function ExamRegistration(){

  const { register, handleSubmit, clearErrors, setValue, setFocus, reset, formState } = useForm();
  const { errors } = formState;
  const [patient, setPatient] = useState();
  const [exam, setExam] = useState();
  const {examId} = useParams()
  const navigate = useNavigate();

  function onSubmit(data) { 

    const body = {...data, patientId: patient.id}   
    ExamService.Create(body)
    return alert('Exam successfully registered!!')
    
  }

  function getPatient(){
    const data = PatientService.ShowByEmail(exam);
    setPatient(data);
  }

  function handleSearch(e){
    setExam(e.target.value)
  }

  useEffect(() =>{
    if (examId){
      const dataExam = ExamService.Show(Number(examId))
      setPatient(PatientService.Show(dataExam?.patientId));
    }

  },[])

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

  function validateTime(value) {
    if (!value) {
      return "Exam Time is required";
    }

    const [hours, minutes] = value.split(":").map(Number);

    if (hours < 8 || hours > 22) {
      return "Exams can only be scheduled between 8:00 and 22:00";
    }

    if (hours === 22 && minutes !== 0) {
      return "Exams can only be scheduled between 8:00 and 22:00";
    }

    return true;
  }

  function handleDelete(){
    return alert('In construction...')
    // ExamService.Delete(examId)
    // navigate('/homepage');
  }
  
  return(
    <div>
      <div className="sidebar">
        <Navbar/>
      </div>
      <main>
      <div className="content-exam">
        <div className="title-exam">
          <h1><strong>EXAM REGISTRATION</strong></h1>
        </div>
        <div className="conteiner-form-exam">
          {
            !examId && 
            <div className='search-exam'>
              <div className='search-icon'>
                <BiIcon.BiSearchAlt2 style={style} size={40}/>
              </div>
              <div className="search-user">
                <input name="search" type="text" onInput={handleSearch}  id="inputSearch" placeholder="search only for e-mail patient..." required {...register('search', {
                  required: 'We need to know the patient',
                })} className={`form-control ${errors.search ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.search?.message}</div>
                  <button type="submit" id="buttonSearch" onClick={getPatient} className="btn btn-primary">Search</button>
              </div>
           </div>
          }
          
          <form className="form-exam" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">

              <div className='exam-from'>
                <p className='exam-from-user'><strong>Exam from {patient?.name}</strong></p>
              </div>

              <div className="name-exam">
                <label htmlFor="inputReasonExam">Name of the exam</label>
                <textarea name="exam" type="exam" id="inputExam" placeholder="tell us the name..." required {...register('exam', {
                  required: 'We must know the name of the exam',
                  minLength: {value: 5, message:'Minimum 5 characters'},
                  maxLength: {value: 50, message:'Maximum 50 characters'},
                })} className={`form-control ${errors.exam ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.exam?.message}</div>
              </div>

              <div className="date-exam">
                <label htmlFor="date-exam">Date of Exam</label>
                <input name="dateExam" type="date" id="inputDateExam" required {...register('dateExam', {
                  validate: validateDate,
                })}  className={`form-control ${errors.dateExam ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.dateExam?.message}</div>
              </div>
            </div>

            <div className='time-exam'>
              <label htmlFor="time">Exam Time</label>
              <input type="time" id="inputTime" name="time" {...register('time', {
                required: "Exam Time is required", 
                validate: validateTime,
              }
              )} className={`form-control ${errors.time ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.time?.message}</div>
            </div>

            <div className="type-exam">
              <label htmlFor="inputType">Type of Exam</label>
              <textarea name="type" type="text" id="inputTYpe" placeholder='tell us the type with details...' required {...register('type', {
                required: 'We must know the type',
                minLength: {value: 5, message: 'Minimum 5 characters'},
                maxLength: {value: 30, message: 'Maximum 30 characters'},
              })} className={`form-control ${errors.type ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.type?.message}</div>
            </div>

            <div className="lab-exam">
              <label htmlFor="inputLab">Laboratory</label>
              <textarea name="lab" type="text" id="inputLab" placeholder='...' {...register('lab', {
                required: 'We must know the laboratory',
                minLength: {value: 5, message: 'Minimum 5 characters'},
                maxLength: { value: 30, message: 'Maximum 30 characters'},
              })} className={`form-control ${errors.lab ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.lab?.message}</div>
            </div>

            <div className="url-exam">
              <label htmlFor="inputURL">Document URL</label>
              <input name="url" type="url" id="inputURL" placeholder='https://example.com' {...register('url')} className='form-control'/>
            </div>

            <div className="results-exam">
              <label htmlFor="inputResults">Results</label>
              <textarea name="results" type="text" id="inputResults" placeholder='...' required {...register('results', {
                required: 'We must know the results',
                minLength: {value: 15, message: 'Minimum 15 characters'},
                maxLength: { value: 1000, message: 'Maximum 1000 characters'},
              })} className={`form-control ${errors.results ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.results?.message}</div>
            </div>
            
            <button type='submit' id="buttonEdit" className="btn btn-primary" disabled={!examId}>Edit</button>
            <button type='button' id="buttonDelete" onClick={handleDelete}  className="btn btn-primary" disabled={!examId}>Delete</button>
            <button type="submit" id="buttonSave" className="btn btn-primary" disabled={!!examId}>Save</button>
 
          </form>
        </div>
      </div>
      </main>
    </div>
  )
}

export default ExamRegistration