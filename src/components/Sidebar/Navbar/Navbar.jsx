import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Menu from '../../../assets/menu.png';
import { SidebarData } from '../SidebarData/SidebarData';
import Close from '../../../assets/fechar.png'
import Logo from '../../../assets/LABMEDICAL.png'
import './Navbar.css';
import Toolbar from '../../Toolbar/Toolbar';
import { AuthService } from '../../../services/AuthService';

function Navbar(){

  const navigate = useNavigate();

  const handleOut= () =>{
    AuthService.Set(null)
    navigate('/')
  }

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  }

  return(
    <div>
      <div className="navbar">
        <div className='click-menu'>
          <Toolbar/>
          <img className='click-menu' style={{ width: 45, height: 45, cursor:'pointer' }} src={Menu} onClick={showSidebar}/>
          <img style={{  cursor:'pointer' }} src={Logo}/>
        </div>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items'>
          <li className='navbar-toggle'>
            <Link to="#" className='menu-bars'>
              <img className='click-menu' style={{ width: 45, height: 45, cursor:'pointer' }} src={Close} onClick={showSidebar}/>
            </Link>          
          </li>
          {SidebarData.map((item, index) =>{
            return(
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span> {item.title}</span>
                </Link>
              </li>
            )
          })}
          <li className='nav' onClick={handleOut}> Logout</li>
        </ul> 
      </nav>
      
    </div>
  );
}

export default Navbar