import { useState } from "react";
import Navbar from "../../components/Sidebar/Navbar/Navbar"
import { PatientService } from "../../services/PatientServices/PatientService";
import * as BiIcon from "react-icons/bi";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import './MedicalRecordList.css'

const style = { color: "var(--black-purple)"};

function MedicalRecordList(){

  const formSchema = Yup.object().shape({
    search: Yup.string()
      .required('We need to know the patient'),
    
  })

  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, setValue, setFocus, reset, formState } = useForm(formOptions);
  const { errors } = formState;


  const [patient, setPatient] = useState();
  const [query, setQuery] = useState();

  function getPatient(){
    console.log(query)
    const data = PatientService.ShowByEmail(query);
    setPatient(data);
    console.log(data)
  }

  function handleSearch(e){
    setQuery(e.target.value)
  }

  return(
    <div>
      <div className="sidebar-record">
        <Navbar/>
      </div>
      <body>
      <div className="content-record">
        <div className="title-record">
          <h1><strong>QUERY REGISTRATION</strong></h1>
        </div>
        <div className="conteiner-record">
          <div className='search-record'>
            <div className='search-icon'>
              <BiIcon.BiSearchAlt2 style={style} size={40}/>
            </div>
            <div className="search-user">
              <input name="search" type="text" onInput={handleSearch}  id="inputSearch" placeholder="search only for e-mail patient..." required {...register('search')} className={`form-control ${errors.search ? 'is-invalid' : ''}`}/>
                <div className="invalid-feedback">{errors.search?.message}</div>
                <button type="submit" id="buttonSearch" onClick={getPatient} className="btn btn-primary">Search</button>
            </div>
          </div>
        </div>
      </div>
      </body>
    </div>
  )
}

export default MedicalRecordList