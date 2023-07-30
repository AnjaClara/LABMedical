import Navbar from '../../components/Sidebar/Navbar/Navbar'
import './ExamRegistration.css'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import * as BiIcon from "react-icons/bi";
import { ExamService } from '../../services/ExamService/ExamService';

const style = { color: "var(--black-purple)"};


function ExamRegistration(){
  const currentDate = new Date();

  const formSchema = Yup.object().shape({
    search: Yup.string()
      .required('We need to know the name')
      .max(50, 'Maximum 50 characters')
      .min(5, 'Minimum 5 characters')
      .matches(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/, 'Name must contain only letters'),
    exam: Yup.string()
      .required('We must know the name of the exam')
      .min(5, 'Minimum 5 characters')
      .max(50, 'Maximum 50 characters'),
    dateQuery: Yup.date()
      .min(currentDate, 'The Exam date must be from today')
      .required('We must know the date'),
    time: Yup.string()
      .required('We need to know the time of the Exam')
      .test('min-max', 'The Exam time should be between 9am and 10pm', (value) => {
        if (!value) return false;
        const [hour, minute] = value.split(':');
        const hourValue = parseInt(hour, 10);
        return hourValue >= 9 && hourValue <= 22;
      }),
    type: Yup.string()
      .required('We must know the type')
      .min(5, 'Minimum 5 characters')
      .max(30, 'Maximum 30 characters'),
    lab: Yup.string()
      .required('We must know the laboratory')
      .min(5, 'Minimum 5 characters')
      .max(30, 'Maximum 30 characters'),
    results: Yup.string()
      .required('We must know the results')
      .min(15, 'Minimum 15 characters')
      .max(1000, 'Maximum 1000 characters'),
  })

  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, setValue, setFocus, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {   
    ExamService.Create(data)
    return alert('Exam successfully registered!!')
  }

  return(
    <div>
      <div className="sidebar">
        <Navbar/>
      </div>
      <body>
      <div className="content-exam">
        <div className="title-exam">
          <h1><strong>EXAM REGISTRATION</strong></h1>
        </div>
        <div className="conteiner-form-exam">
          <form className="form-exam" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
              <div className='search-icon'>
                <BiIcon.BiSearchAlt2 style={style} size={40}/>
              </div>
              <div className="search-user">
                <input name="search" type="text" id="inputSearch" placeholder="search for patient" required {...register('search')} className={`form-control ${errors.search ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.search?.message}</div>
                  <button type="submit" id="buttonSearch" className="btn btn-primary">Search</button>
              </div>

              <div className='exam-from'>
                <p className='exam-from-user'><strong>Exam from {}</strong></p>
              </div>

              <div className="name-exam">
                <label htmlFor="inputReasonExam">Name of the exam</label>
                <textarea name="exam" type="exam" id="inputExam" placeholder="tell us the name..." required {...register('exam')} className={`form-control ${errors.exam ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.exam?.message}</div>
              </div>

              <div className="date-exam">
                <label htmlFor="date-exam">Date of Exam</label>
                <input name="dateExam" type="date" id="inputDateExam" required {...register('dateExam')} className={`form-control ${errors.dateExam ? 'is-invalid' : ''}`}/>
                <div className="invalid-feedback">{errors.dateExam?.message}</div>
              </div>
            </div>

            <div className='time-exam'>
              <label for="time">Exam Time</label>
              <input type="time" id="inputTime" name="time" {...register('time')} className={`form-control ${errors.time ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.time?.message}</div>
            </div>

            <div className="type-exam">
              <label htmlFor="inputType">Type of Exam</label>
              <textarea name="type" type="text" id="inputTYpe" placeholder='tell us the type with details...' required {...register('type')} className={`form-control ${errors.type ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.type?.message}</div>
            </div>

            <div className="lab-exam">
              <label htmlFor="inputLab">Laboratory</label>
              <textarea name="lab" type="text" id="inputLab" placeholder='...' {...register('lab')} className={`form-control ${errors.lab ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.lab?.message}</div>
            </div>

            <div className="url-exam">
              <label htmlFor="inputURL">Document URL</label>
              <input name="url" type="url" id="inputURL" placeholder='https://example.com' {...register('url')} className={`form-control ${errors.url ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.url?.message}</div>
            </div>

            <div className="results-exam">
              <label htmlFor="inputResults">Results</label>
              <textarea name="results" type="text" id="inputResults" placeholder='...' required {...register('results')} className={`form-control ${errors.results ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.results?.message}</div>
            </div>
            
            <button type="submit" id="buttonEdit" className="btn btn-primary" disabled>Edit</button>
            <button type="submit" id="buttonDelete" className="btn btn-primary" disabled>Delete</button>
            <button type="submit" id="buttonSave" className="btn btn-primary">Save</button>
 
          </form>
        </div>
      </div>
      </body>
    </div>
  )
}

export default ExamRegistration