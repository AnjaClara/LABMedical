import Navbar from "../../components/Sidebar/Navbar/Navbar"
import './PatientRegistration.css'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import { cpf } from "cpf-cnpj-validator";
import * as Yup from 'yup'
import { PatientService } from "../../services/PatientServices/PatientService";

function PatientRegistration(){

  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required('We need to know the name')
      .max(50, 'Maximum 50 characters')
      .min(5, 'Minimum 5 characters')
      .matches(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/, 'Name must contain only letters'),
    email: Yup.string()
      .required('E-mail is mandatory')
      .email('Email is invalid'),
    gender: Yup.string()
      .required()
      .oneOf(['female', 'male', 'other']),
    cpf: Yup.string()
      .required('We need to know the CPF')
      .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Invalid CPF. Use the format 000.000.000-00')
      .test((value) => cpf.isValid(value)),
    rg: Yup.string()
      .required('We need to know the RG')
      .max(20, 'Maximum 20 characters'),
    rgx: Yup.string()
      .required('We need to know the RG issuing authority'),
    marital: Yup.string()
      .required()
      .oneOf(['married', 'single', 'stable-relationship']),
    naturality: Yup.string()
      .required('We need to know the naturality')
      .max(50, 'Maximum 50 characters')
      .min(5, 'Minimum 5 characters'),
    telephone: Yup.string()
      .matches(/^\(\d{2}\)\s\d\s\d{4}-\d{4}$/, 'Invalid phone number. Use the format (99) 9 9999-9999')
      .required('We need to know the telephone number'),
    etelephone: Yup.string()
      .matches(/^\(\d{2}\) \d\ \d{4}-\d{4}$/, 'Invalid phone number. Use the format (99) 9 9999-9999')
      .required('We need to know the telephone number'),
    cep: Yup.string()
      .required('We need to know the CPF'),
    city: Yup.string()
      .required('We need to know the city'),
    uf: Yup.string()
      .required('We need to know the state'),
    street: Yup.string()
      .required('We need to know the street'),
    neighbourhood: Yup.string()
      .required('We need to know the neighbourhood'),
    number: Yup.string()
      .required('We need to know the residence number'),
  })

  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, setValue, setFocus, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {   
    PatientService.Create(data)
    return alert('Patient successfully registered!!')
  }

  const checkBlur =(e) =>{

    const cep = e.target.value.replace(/\D/g, '');

    fetch(`https://viacep.com.br/ws/${cep}/json/`)

      .then(res => res.json())
      .then(data=>{
        setValue('street', data.logradouro);
        setValue('city', data.localidade);
        setValue('uf', data.uf);
        setValue('neighbourhood', data.bairro);
        setFocus('number', data.numero)
      })

  }

  return(
    <div>
      <div className="sidebar">
        <Navbar/>
      </div>
      <body>
      <div className="content-patient-register">
        <div className="title-patient">
          <h1><strong>PATIENT REGISTRATION</strong></h1>
        </div>
        <div className="conteiner-form-patient">
          <form className="form-patient" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
              <div className="form-group1-patient">
                <label htmlFor="inputCompleteName">Full Name</label>
                <input name="patient" type="text" id="inputCompliteNale" placeholder="patient name" required {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.name?.message}</div>
              </div>

              <div className="form-group2-patient">
                <label htmlFor="inputEmail4">Email</label>
                <input name="email" type="email" id="inputEmail4" placeholder="Email" required {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.email?.message}</div>
              </div>

              <div className="form-group3-patient">
                <label htmlFor="inputState">Gender</label>
                <select name="gender" required {...register('gender')} className={`custom-select custom-select-sm ${errors.gender ? 'is-invalid' : ''}`}>
                  <option selected>Select Gender</option>
                  <option value="female">Famele</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
                <div className="invalid-feedback">{errors.gender?.message}</div>
              </div>
            </div>

            <div className="form-group">
                <label htmlFor="date-birth">Date of Birth</label>
                <input name="date" type="date" id="inputDate" className="form-control" max="2005-12-31" required/>
            </div>

            <div className="form-group4-patient">
                <label htmlFor="cpf">CPF</label>
                <input type="text" name="cpf" id="inputCPF" placeholder="000.000.000-00" required {...register('cpf')} className={`form-control ${errors.cpf ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.cpf?.message}</div>
            </div>

            <div className="form-group5-patient">
                <label htmlFor="rg">RG</label>
                <input type="text" name="rg" id="inputRG" placeholder="patient RG" required {...register('rg')} className={`form-control ${errors.rg ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.rg?.message}</div>
            </div>

            <div className="form-group6-patient">
                <label htmlFor="rgX">Issuing Authority</label>
                <input type="rgX" name="rgx" id="inputRGX" placeholder="issuing authority" required {...register('rgx')} className={`form-control ${errors.rgx ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.rgx?.message}</div>
            </div>

            <div className="form-group7-patient">
                <label htmlFor="inputState">Marital Status</label>
                <select name="marital" required {...register('marital')} className={`custom-select custom-select-sm ${errors.marital ? 'is-invalid' : ''}`}>
                  <option id="materital" selected>Select Status</option>
                  <option value="married">Married</option>
                  <option value="single">Single</option>
                  <option value="stable-relationship">Stable Relationship</option>
                </select>
                <div className="invalid-feedback">{errors.marital?.message}</div>
            </div>

            <div className="form-group8-patient">
                <label htmlFor="naturality">Naturality</label>
                <input type="naturality" name="naturality" id="inputNaturality" placeholder="patient naturality" required {...register('naturality')} className={`form-control ${errors.naturality ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.naturality?.message}</div>
            </div>

            <div className="form-group9-patient">
              <label htmlFor="telephone">Telephone</label>
              <input name="telephone" type="tel" id="telephone" required placeholder="(99) 9 9999-9999" {...register('telephone')} className={`form-control ${errors.telephone ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.telephone?.message}</div>           
            </div>

            <div className="form-group10-patient">
              <label htmlFor="Etelephone">Emergency Telephone</label>
              <input name="etelephone" type="tel" id="Etelephone" required placeholder="(99) 9 9999-9999" {...register('etelephone')} className={`form-control ${errors.etelephone ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.etelephone?.message}</div>            
            </div>

            <div className="form-group11-patient">
              <label htmlFor="insurance">Medical Insurance</label>
              <input name="insurance" type="text" id="insurance" className="form-control" placeholder="patient medical insurance"/>
            </div>

            <div className="form-group12-patient">
              <label htmlFor="insurance-number">Insurance Number</label>
              <input name="ninsurance" type="text" id="insurance-number" className="form-control" placeholder="insurance number" />          
            </div>

            <div className="form-group13-patient">
              <label htmlFor="insurance-validity">Insurance Validuty</label>
              <input name="vinsurance" type="text" id="insurance-validity" className="form-control" placeholder="validity"/>            
            </div>

            <div className="form-group14-patient">
              <label htmlFor="inputAddress">CEP</label>
              <input name="cep" required {...register("cep")} className={`form-control ${errors.cep ? 'is-invalid' : ''}`} type="text" id="CEP" onBlur={checkBlur} placeholder="0000-000" />
                  <div className="invalid-feedback">{errors.cep?.message}</div>
            </div>

            <div className="form-group15-patient">
              <label htmlFor="inputCity">City</label>
              <input name="city" type="text" required id="inputCity" placeholder="patient city" {...register('city')} className={`form-control ${errors.city ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.city?.message}</div>
            </div>

            <div className="form-group16-patient">
              <label htmlFor="inputState">State</label>
              <input name="uf" type="text" required id="inputState" placeholder="patient state" {...register('uf')} className={`form-control ${errors.uf ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.uf?.message}</div>
            </div>

            <div className="form-group17-patient">
              <label htmlFor="inputLogadouro">Street</label>
              <input name="street" type="text" required id="inputLogadouro" placeholder="patient street" {...register('street')} className={`form-control ${errors.street ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.street?.message}</div>
            </div>

            <div className="form-group18-patient">
              <label htmlFor="inputResidenceNumber">Residence Number</label>
              <input name="number" type="text" required id="inputResidenceNumber" placeholder="Ex:287" {...register('number')} className={`form-control ${errors.number ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.number?.message}</div>
            </div>

            <div className="form-group19-patient">
              <label htmlFor="inputNeighbourhood">Neighbourhood</label>
              <input name="neighbourhood" type="text"required id="inputNeighbourhood" placeholder="patient neighbourhood" {...register('neighbourhood')} className={`form-control ${errors.neighbourhood ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.neighbourhood?.message}</div>
            </div>

            <div className="form-group20-patient">
              <label htmlFor="inputComplement">Complement</label>
              <input name="complement" type="text" id="inputComplement" className="form-control" placeholder="Ex: apartment, house..."/>
            </div>

            <div className="form-group21-patient">
              <label htmlFor="inputPointOfReference">Point of reference</label>
              <input name="reference" type="text" id="inputPointOfReference" className="form-control" placeholder="Ex: across the shopping street"/>
            </div>

            <div className="form-group22-patient">
              <label htmlFor="inputListOfAllergies">List of Allergies</label>
              <textarea name="allergies" type="text" className="form-control" id="inputListOfAllergies"/>
            </div>

            <div className="form-group23-patient">
              <label htmlFor="inputCareList">Care List</label>
              <textarea name="care" type="text" className="form-control" id="inputCareList"/>
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

export default PatientRegistration