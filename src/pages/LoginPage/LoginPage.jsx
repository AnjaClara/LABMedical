import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Farmacia from '../../assets/farmacia.png';
import { UserService } from '../../services/DoctorsServices/UserService';
import './LoginPage.css'
import { AuthService } from '../../services/AuthService';

function LoginPage() {

  const navigate = useNavigate();

  const handleRegistration = () =>{
    navigate('/registration')
  }

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required('E-mail is mandatory')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is mendatory')
  })
  
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {

    const user = UserService.ShowByEmail(data.email);

    if(!user){
      alert('Unregistered user');
      reset();
      return;
    }

    if(user.password === data.password && user){
      AuthService.Set(user);
      navigate('/homepage');
      return alert("Welcome!")
    } else {
      alert('Unregistered user');
      reset();
      return;
    }
  }

  return(
    <div>
      <body>
        <div className='content-login'>
          <h1 className='tiltle-login'><img style={{ width: 65, height: 65 }} src={Farmacia}/> <strong>SIGN IN</strong></h1>
          <div className="container-login">

            <form onSubmit={handleSubmit(onSubmit)}>

              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input name="email" type="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="youremail@mail.com" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`}/>
                <div className="invalid-feedback">{errors.email?.message}</div>
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input name="password" type="password" id="exampleInputPassword1" placeholder="********" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`}/>
                <div className="invalid-feedback">{errors.password?.message}</div>
              </div>

              <button type="submit" className="button"><strong>Enter</strong></button>

            </form>

          </div>

          <div className='bottom-login'>
            <p className="obs">Reset your password<a href="#" onClick={() => alert('Function under construction...')} className="click"> here</a></p>
          </div>

          <div className='bottom-login'>
            <p className="obs">Don't have an account?? <a className="click" onClick={handleRegistration}> Create it here!</a></p>
          </div>

        </div>
      </body>
    </div>
  );

}

export default LoginPage