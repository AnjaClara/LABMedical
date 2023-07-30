import { useEffect } from 'react';
import { useState } from 'react'
import Doctor from '../../assets/medico.png'
import { AuthService } from '../../services/AuthService';
import './Toolbar.css'

function Toolbar(){

  const [user, setUser]  = useState();

  useEffect(()=>{

    setUser(AuthService.get())

  }, [])

  return(
    <>
    <div className="container-tool">
      <img className='click-menu' style={{ width: 45, height: 45, cursor:'pointer' }} src={Doctor}/>
    </div>
    <div className='name-tool'>
      <span>{user?.name} </span>
    </div>
    </>
  )
}

export default Toolbar