import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Arquivo from '../../assets/arquivo.png';
import { UserService } from '../../services/DoctorsServices/UserService';
import './RegistrationPage.css';

function RegistrationPage() {

  const navigate = useNavigate();

  const handleLogin = () =>{
    navigate('/')
  }

  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required('We need to know your name')
      .matches(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/, 'Name must contain only letters'),
    email: Yup.string()
      .required('E-mail is mandatory')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is mendatory')
      .min(8, 'Password must be at 8 char long'),
    confirmPwd: Yup.string()
      .required('Password is mendatory')
      .oneOf([Yup.ref('password')], 'Passwords does not match'),
  })

  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {   
    UserService.Create(data);
    return alert('User successfully registered! Go back to the login page to enter the platform.')
  }
  
  return(
    <div>
      <main>
        <div className='content-registration'>
        <h1 className='tiltle-registration'><img style={{ width: 65, height: 65 }} src={Arquivo}/><strong> SIGN UP</strong></h1>
          <div className="container-registration">

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input name="email" type="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="youremail@mail.com" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.email?.message}</div>
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Tell us your name</label>
                  <input name="name" type="text" id="exampleInputName" aria-describedby="name" placeholder="your name" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </div>

                <div className="form-group2">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input name="password" type="password" id="exampleInputPassword" placeholder="********" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.password?.message}</div>
                  <label htmlFor="exampleInputPassword1">Confirm Password</label>
                  <input name="confirmPwd" type="password" id="exampleInputPasswordTrue1" placeholder="********" {...register('confirmPwd')} className={`form-control ${errors.confirmPwd ? 'is-invalid' : ''}`}/>
                  <div className="invalid-feedback">{errors.confirmPwd?.message}</div>
                </div>

                <button type="submit" className="button"><strong>Register</strong></button>
           
            </form>

          </div>

          <div className='bottom-registration'>
            <p className="obs">Back to <a className="click" onClick={handleLogin}> Login Page</a></p>
          </div>

        </div>
      </main>
    </div>
  );

}

export default RegistrationPage